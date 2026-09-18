import axios from 'axios';
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';

import nprogressInstance from '@/nprogressInstance';
import {
  checkDailyTask,
  checkFriendsTask,
  checkKolsTask,
  checkMintOGPassTask,
  checkMintShipPartsTask,
  checkMintSpaceshipTask,
  checkMmproPointsTask,
  checkPirateMarkTask,
  checkProtectionMarkTask,
  checkShipLevelTask,
  checkSubscribeTask,
  claimWhiteBitTask,
  fetchAirdropComplete,
  fetchAirdropTasks,
  fetchRatingData,
  postAirdropStart,
  postUserNickWhiteBitTask,
} from '@/pages/Airdrop/api';
import { COMMON_TASKS_RESPONSE_IDS, TASKS_IDS } from '@/pages/Airdrop/const';
import {
  AirdropCompleteResponse,
  AirdropTasks,
  ClaimResponse,
  CommonTaskResponse,
  RatingResponse,
  RegOneTimeTask,
  RegRecurringTask,
  Task1,
  Task2,
  Task3,
  Task4,
  Task5,
  Task5Response,
  Task11,
  TaskKey,
} from '@/pages/Airdrop/types';
import {
  ERROR_DURING_AIRDROP_TASKS_START,
  ERROR_DURING_CHECK_COMMON_AIRDROP_TASK_REWARD,
  ERROR_DURING_CHECK_SHIP_AIRDROP_TASK_REWARD,
  ERROR_DURING_CHECK_SUBSCRIBE_AIRDROP_TASK_REWARD,
  ERROR_DURING_CLAIMING_DAILY_AIRDROP_TASK_REWARD,
  ERROR_DURING_CLAIMING_WHITEBIT_AIRDROP_TASK_REWARD,
  ERROR_DURING_GET_AIRDROP_COMPLETE_DATA,
  ERROR_DURING_GET_AIRDROP_RATING,
  ERROR_DURING_GET_AIRDROP_TASKS,
  ERROR_DURING_POSTING_WHITEBIT_AIRDROP_TASK,
} from '@/services/constants/errorMessages';
import { RootStore } from '@/store';
import { BaseStore } from '@/store/baseStore';

export class AirdropStore extends BaseStore {
  rootStore: RootStore;

  isAirdropTooltipOpen = false;
  availableAirdropTasks: AirdropTasks | null = null;
  ratingData: RatingResponse | null = null;
  airdropComplete: AirdropCompleteResponse | null = null;

  constructor(rootStore: RootStore) {
    super();

    this.rootStore = rootStore;

    makeObservable(this, {
      isAirdropTooltipOpen: observable,
      availableAirdropTasks: observable,
      ratingData: observable,
      airdropComplete: observable,

      startLoader: action,
      stopLoader: action,
      postAirdropStart: action,
      fetchAirdropTasks: action,
      fetchRaringData: action,
      closeAirdropTaskModal: action,
      postWhitebitTask: action,
      claimWhitebitTask: action,
      claimDailyTask: action,
      checkShipTask: action,
      checkKolsTask: action,
      checkSubscribeTask: action,
      checkCommonTask: action,
      fetchAirdropComplete: action,

      taskMatcher: computed,
      isAirdropTasksAvailable: computed,
      airdropPointsBalance: computed,
      airdropSpecialTasks: computed,
      airdropRegularTasks: computed,
      dailyTaskTime: computed,
      tasksCompletedStatus: computed,
      taskProgressBarCompletedStatus: computed,
      myRankPosition: computed,
      ratingList: computed,
      myRating: computed,
      airdropTotalTokenRank: computed,
      userRatingList: computed,
      taskTokenRank: computed,
      secondsUntilNoonUTC: computed,
      airdropSeasonDay: computed,
      isAirdropCompleted: computed,
      isUserRatingDefined: computed,
      airdropCompletedData: computed,
    });
  }

  startLoader = (isWithNprogress?: boolean) => {
    this.rootStore.setIsLoading(true);
    if (isWithNprogress) nprogressInstance.start();
  };

  stopLoader = (isWithNprogress?: boolean) => {
    this.rootStore.setIsLoading(false);
    if (isWithNprogress) nprogressInstance.done();
  };

  postAirdropStart = async () => {
    this.startLoader(true);

    try {
      const hash = this.rootStore.createHash([]);

      await postAirdropStart({ hash });
      await this.fetchAirdropTasks();
    } catch (err) {
      this.rootStore.showError(ERROR_DURING_AIRDROP_TASKS_START, err);
    }

    this.stopLoader(true);
  };

  fetchAirdropTasks = async () => {
    this.rootStore.setIsLoading(true);
    const hash = this.rootStore.createHash([]);

    try {
      const response = await fetchAirdropTasks({ hash });
      const availableAirdropTasks = Object.entries(response).reduce(
        (acc, [key, value]) => {
          if (key === 'task5') {
            Object.values(value as Task5Response).forEach(
              (c: Task5, i) => (acc[`task${i + 5}` as TaskKey] = c),
            );
          } else if (COMMON_TASKS_RESPONSE_IDS.includes(key)) {
            const taskId = COMMON_TASKS_RESPONSE_IDS.indexOf(key) + 11;
            acc[`task${taskId}` as TaskKey] = value as AirdropTasks[TaskKey];
          } else {
            acc[key as TaskKey] = value as AirdropTasks[TaskKey];
          }

          return acc;
        },
        {} as AirdropTasks,
      );

      runInAction(() => (this.availableAirdropTasks = availableAirdropTasks));
    } catch (err) {
      if (
        axios.isAxiosError(err) &&
        'response' in err &&
        err?.response?.status === 403
      ) {
        this.isAirdropTooltipOpen = true;
      }

      this.rootStore.showError(ERROR_DURING_GET_AIRDROP_TASKS, err);
    }

    this.rootStore.setIsLoading(false);
  };

  fetchRaringData = async () => {
    this.rootStore.setIsLoading(true);
    const hash = this.rootStore.createHash([]);

    try {
      const rating = await fetchRatingData({ hash });
      runInAction(() => (this.ratingData = rating));
    } catch (err) {
      this.rootStore.showError(ERROR_DURING_GET_AIRDROP_RATING, err);
    }

    this.rootStore.setIsLoading(false);
  };

  closeAirdropTaskModal = () => (this.isAirdropTooltipOpen = false);

  postWhitebitTask = async ({ whitebitNick }: { whitebitNick: string }) => {
    this.startLoader();

    try {
      const hash = this.rootStore.createHash([{ nik: whitebitNick }]);

      await postUserNickWhiteBitTask({ nik: whitebitNick, hash });
      await this.fetchAirdropTasks();
    } catch (err) {
      this.rootStore.showError(ERROR_DURING_POSTING_WHITEBIT_AIRDROP_TASK, err);
    }

    this.stopLoader();
  };

  claimWhitebitTask = async () => {
    this.startLoader(true);

    try {
      const hash = this.rootStore.createHash([]);

      const { grant } = await claimWhiteBitTask({ hash });
      await this.fetchAirdropTasks();

      this.stopLoader(true);
      return grant;
    } catch (err) {
      this.rootStore.showError(
        ERROR_DURING_CLAIMING_WHITEBIT_AIRDROP_TASK_REWARD,
        err,
      );
      this.stopLoader(true);
    }
  };

  claimDailyTask = async () => {
    this.startLoader(true);

    try {
      const hash = this.rootStore.createHash([]);

      const { grant } = await checkDailyTask({ hash });
      await this.fetchAirdropTasks();

      this.stopLoader(true);
      return grant;
    } catch (err) {
      this.rootStore.showError(
        ERROR_DURING_CLAIMING_DAILY_AIRDROP_TASK_REWARD,
        err,
      );
      this.stopLoader(true);
    }
  };

  checkShipTask = async () => {
    this.startLoader(true);

    try {
      const hash = this.rootStore.createHash([]);

      const { grant } = await checkShipLevelTask({ hash });
      await this.fetchAirdropTasks();

      this.stopLoader(true);
      return grant;
    } catch (err) {
      this.rootStore.showError(
        ERROR_DURING_CHECK_SHIP_AIRDROP_TASK_REWARD,
        err,
      );
      this.stopLoader(true);
    }
  };

  checkKolsTask = async () => {
    this.startLoader(true);

    try {
      const hash = this.rootStore.createHash([]);

      const { grant } = await checkKolsTask({ hash });
      await this.fetchAirdropTasks();

      this.stopLoader(true);
      return grant;
    } catch (err) {
      this.rootStore.showError(
        ERROR_DURING_CHECK_SHIP_AIRDROP_TASK_REWARD,
        err,
      );
      this.stopLoader(true);
    }
  };

  checkSubscribeTask = async ({ id }: { id: number }) => {
    this.startLoader(true);

    try {
      const hash = this.rootStore.createHash([{ id }]);

      const { grant, grant_point, balance } = await checkSubscribeTask({
        id,
        hash,
      });
      await this.fetchAirdropTasks();
      if (balance)
        runInAction(
          () => (this.rootStore.userStore.userInfo.balance = balance),
        );

      this.stopLoader(true);
      return { grant, grant_point };
    } catch (err) {
      this.rootStore.showError(
        ERROR_DURING_CHECK_SUBSCRIBE_AIRDROP_TASK_REWARD,
        err,
      );
      this.stopLoader(true);
    }
  };

  checkCommonTask = async ({ index }: { index: number }) => {
    this.startLoader(true);

    try {
      let response: CommonTaskResponse | ClaimResponse | undefined;
      const hash = this.rootStore.createHash([]);

      switch (index) {
        case 11:
          response = await checkMmproPointsTask({ hash });
          break;
        case 12:
          response = await checkMintShipPartsTask({ hash });
          break;
        case 13:
          response = await checkFriendsTask({ hash });
          break;
        case 14:
          response = await checkProtectionMarkTask({ hash });
          break;
        case 15:
          response = await checkMintOGPassTask({ hash });
          break;
        case 16:
          response = await checkMintSpaceshipTask({ hash });
          break;
        case 17:
          response = await checkPirateMarkTask({ hash });
          break;
      }

      await this.fetchAirdropTasks();

      this.stopLoader(true);
      return response;
    } catch (err) {
      this.rootStore.showError(
        ERROR_DURING_CHECK_COMMON_AIRDROP_TASK_REWARD,
        err,
      );
      this.stopLoader(true);
    }
  };

  fetchAirdropComplete = async () => {
    this.rootStore.setIsLoading(true);
    const hash = this.rootStore.createHash([]);

    try {
      const airdropCompleteData = await fetchAirdropComplete({ hash });
      runInAction(() => (this.airdropComplete = airdropCompleteData));
    } catch (err) {
      this.rootStore.showError(ERROR_DURING_GET_AIRDROP_COMPLETE_DATA, err);
    }

    this.rootStore.setIsLoading(false);
  };

  get taskMatcher() {
    if (!this.availableAirdropTasks) return null;

    return (taskType: 'regular' | 'special') =>
      Object.fromEntries(
        Object.entries(this.availableAirdropTasks ?? {})
          .filter(([key]) =>
            Object.values(TASKS_IDS[taskType]).includes(key as TaskKey),
          )
          .map(([key, value]) => [key.split('task')[1], value]),
      );
  }

  get isAirdropTasksAvailable() {
    return this.availableAirdropTasks !== null;
  }

  get airdropPointsBalance() {
    return this.isAirdropTasksAvailable
      ? (this.availableAirdropTasks?.['balance_ap'] ?? 0)
      : 0;
  }

  get airdropSpecialTasks() {
    return this.taskMatcher?.('special');
  }

  get airdropRegularTasks() {
    return this.taskMatcher?.('regular');
  }

  get dailyTaskTime() {
    const dayInSeconds = 60 * 60 * 24;
    const startTime = this.airdropSpecialTasks
      ? ((this.airdropSpecialTasks[2] as Task2)?.first_time ?? 0)
      : 0;
    const completedDays = this.airdropSpecialTasks
      ? (this.airdropSpecialTasks[2] as Task2)?.day
      : 0;
    const currentTime = startTime
      ? startTime + dayInSeconds * completedDays - this.rootStore.timeNow
      : 0;

    return Math.max(currentTime, 0);
  }

  get tasksCompletedStatus(): null | Record<number, boolean> {
    if (!this.isAirdropTasksAvailable) return null;

    return {
      1: (this.availableAirdropTasks?.task1 as Task1)?.request.status === 3,
      2: (this.availableAirdropTasks?.task2 as Task2)?.day === 30,
      3: (this.availableAirdropTasks?.task3 as Task3)?.status === 1,
      4: true,
      5: (this.availableAirdropTasks?.task5 as Task5)?.status === 2,
      6: (this.availableAirdropTasks?.task6 as Task5)?.status === 2,
      7: (this.availableAirdropTasks?.task7 as Task5)?.status === 2,
      8: (this.availableAirdropTasks?.task8 as Task5)?.status === 2,
      9: (this.availableAirdropTasks?.task9 as Task5)?.status === 2,
      10: (this.availableAirdropTasks?.task10 as Task5)?.status === 2,
      11: true,
      12: true,
      13: true,
      14: !!(this.availableAirdropTasks?.task14 as RegOneTimeTask)?.is_get,
      15: true,
      16: true,
      17: !!(this.availableAirdropTasks?.task17 as RegOneTimeTask)?.is_get,
    };
  }

  get taskProgressBarCompletedStatus() {
    if (!this.isAirdropTasksAvailable) return null;

    return {
      1: true,
      2: true,
      3: true,
      4: !!(this.availableAirdropTasks?.task4 as Task4)?.task4_total_earned,
      5: (this.availableAirdropTasks?.task5 as Task5)?.status === 2,
      6: (this.availableAirdropTasks?.task6 as Task5)?.status === 2,
      7: (this.availableAirdropTasks?.task7 as Task5)?.status === 2,
      8: (this.availableAirdropTasks?.task8 as Task5)?.status === 2,
      9: (this.availableAirdropTasks?.task9 as Task5)?.status === 2,
      10: (this.availableAirdropTasks?.task10 as Task5)?.status === 2,
      11: !!(this.availableAirdropTasks?.task11 as Task11)?.total_earned,
      12: !!(this.availableAirdropTasks?.task12 as RegRecurringTask)
        ?.total_earned,
      13: !!(this.availableAirdropTasks?.task13 as RegRecurringTask)
        ?.total_earned,
      14: !!(this.availableAirdropTasks?.task14 as RegOneTimeTask)?.is_get,
      15: !!(this.availableAirdropTasks?.task15 as RegRecurringTask)
        ?.total_earned,
      16: !!(this.availableAirdropTasks?.task16 as RegRecurringTask)
        ?.total_earned,
      17: !!(this.availableAirdropTasks?.task17 as RegOneTimeTask)?.is_get,
    };
  }

  get myRankPosition() {
    return this.ratingData?.my_place?.place ?? 0;
  }

  get ratingList() {
    return this.ratingData?.list10 ?? [];
  }

  get myRating() {
    return this.ratingData?.my_place ?? null;
  }

  get airdropTotalTokenRank() {
    return this.availableAirdropTasks?.balance_token_rank ?? 0;
  }

  get taskTokenRank() {
    return this.availableAirdropTasks?.balance_token_rank ?? 0;
  }

  get userRatingList() {
    return this.ratingData?.list ?? [];
  }

  get secondsUntilNoonUTC(): number {
    const SECONDS_IN_DAY = 86400;
    const NOON_UTC = 12 * 3600;

    const secondsSinceMidnight = this.rootStore.timeNow % SECONDS_IN_DAY;

    return secondsSinceMidnight < NOON_UTC
      ? NOON_UTC - secondsSinceMidnight
      : SECONDS_IN_DAY - secondsSinceMidnight + NOON_UTC;
  }

  get airdropSeasonDay() {
    const START_SEASON = 1742817600; // 12:00 UTC 24.03.2025
    const SECONDS_IN_DAY = 86400;

    const fullDaysPassed = Math.floor(
      (this.rootStore.timeNow - START_SEASON) / SECONDS_IN_DAY,
    );
    const seasonDay =
      fullDaysPassed + (this.secondsUntilNoonUTC === SECONDS_IN_DAY ? 0 : 1);

    return Math.min(seasonDay, 30);
  }

  get isAirdropCompleted() {
    return !!this.airdropComplete?.season1_is_end;
  }

  get isUserRatingDefined() {
    return !!this.airdropComplete?.data.rating;
  }

  get airdropCompletedData() {
    return this.isAirdropCompleted ? this.airdropComplete?.data : null;
  }
}
