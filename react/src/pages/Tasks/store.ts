import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import SecureLS from 'secure-ls';

import nprogressInstance from '@/nprogressInstance';
import { checkWatchAddTask } from '@/pages/Airdrop/api';
import {
  checkTask,
  claimDailyRewards,
  claimGrantPrize,
  deleteAllTasks,
  fetchTasks,
  resetClaimDailyRewards,
} from '@/pages/Tasks/api';
import { Task, TasksRequest } from '@/pages/Tasks/types';
import {
  ERROR_DURING_CHECK_TASK,
  ERROR_DURING_CHECK_WATCH_ADD_TASK,
  ERROR_DURING_DELETE_TASKS,
  ERROR_DURING_GET_TASKS,
  ERROR_DURING_POST_DAILY_REWARDS,
  ERROR_DURING_POST_DAILY_REWARDS_GRAND_PRIZE,
  ERROR_DURING_RESET_DAILY_REWARDS,
} from '@/services/constants/errorMessages';
import { RootStore } from '@/store';
import { fetchFarmingUserInfo } from '@/store/api';
import { BaseStore } from '@/store/baseStore';
import { PrizeTooltip } from '@/store/types';
import Utils from '@/utils';

const ls = new SecureLS();

export class TasksStore extends BaseStore {
  rootStore: RootStore;

  tasks: Task[] | null = null;
  possibleTasks: Task[] | null = null;
  expiredTasks: Task[] = [];
  archiveTasks: Task[] | null = null;
  taskClaim: number = 0;
  isConfettiExploding = false;
  isShowTooltip = false;
  currentCompletedTask: number | null = null;
  isExtraTaskModalVisible = false;
  isMonetagTaskWatched = false;

  grantDay: number | null = null; //  сколько дней (раз) брал награду
  receiveDailyRewardsCurrentDay: number = 0; //  сколько прошло полных дней с момента взятия награды
  timeUntilTheNextReward: number | null = null; // сколько времени осталось до следующей награды
  rewardAmount: number = 0;
  rewardTimer: NodeJS.Timer | undefined;

  monthPrizeTooltips: PrizeTooltip[] = [];
  isMonthPrizeTooltipWithButtonVisible = false;
  isGrandPrizeVisible = false;
  isGrandPrizeButtonDisable = false;
  actualPrize: number | null = null;

  constructor(rootStore: RootStore) {
    super();

    this.rootStore = rootStore;

    makeObservable(this, {
      tasks: observable,
      taskClaim: observable,
      possibleTasks: observable,
      expiredTasks: observable,
      archiveTasks: observable,
      isConfettiExploding: observable,
      isShowTooltip: observable,
      currentCompletedTask: observable,
      isExtraTaskModalVisible: observable,
      isMonetagTaskWatched: observable,
      grantDay: observable,
      rewardAmount: observable,
      rewardTimer: observable,
      timeUntilTheNextReward: observable,
      receiveDailyRewardsCurrentDay: observable,
      monthPrizeTooltips: observable,
      isMonthPrizeTooltipWithButtonVisible: observable,
      isGrandPrizeVisible: observable,
      isGrandPrizeButtonDisable: observable,
      actualPrize: observable,

      showTaskTooltip: action,
      getTasks: action,
      setIsExtraTaskModalVisible: action,
      setIsMonetagTaskWatched: action,
      deleteAllTasks: action,
      checkTask: action,
      checkWatchAddTask: action,
      updateTimeUntilTheNextReward: action,
      startRewardTimer: action,
      postDailyRewards: action,
      resetDailyRewards: action,
      postGrandPrizeReward: action,
      addMonthPrizeModalVisible: action,
      deleteMonthPrizeModalVisible: action,
      setIsGrandPrizeVisible: action,
      updateCurrentTask: action,

      communityTasks: computed,
      kolsTasks: computed,
      communityArchiveTasks: computed,
      kolsArchiveTasks: computed,
    });
  }

  getTasks = async () => {
    this.rootStore.setIsLoading(true);

    try {
      const userInitData = this.rootStore.userStore.getUserInitData();
      const isPremium: boolean | undefined = userInitData?.is_premium;
      const isPremiumNumber = isPremium ? 1 : 0;
      const languageCode: string | undefined = userInitData?.language_code;
      const hashData = [];

      if (isPremium !== undefined)
        hashData.push({ is_premium: isPremiumNumber });
      if (languageCode) hashData.push({ language: languageCode });

      const hash = this.rootStore.createHash(hashData);
      const bodyData: TasksRequest = { hash };

      if (languageCode) bodyData['language'] = languageCode;
      if (isPremium) bodyData['is_premium'] = isPremiumNumber;

      await fetchTasks(bodyData).then((resp) => {
        runInAction(() => {
          this.tasks = resp;
          this.possibleTasks = resp.filter(
            (task) => task.status === 'possible' && task.is_active,
          );

          this.expiredTasks = resp.filter((task) => !task.is_active);

          const archiveTasks = resp
            .filter((task) => task.status === 'granted')
            .sort(
              (a, b) => (b.claimed_at as number) - (a.claimed_at as number),
            );

          this.archiveTasks = [...archiveTasks, ...this.expiredTasks];

          if (
            /*todo поменять на нужный id*/
            this.possibleTasks?.some((task) => task.id === 458) &&
            !ls.get(`isExtraTask${458}Exist`)
          ) {
            this.setIsExtraTaskModalVisible(true);
          }
        });
      });
    } catch (err) {
      console.error(ERROR_DURING_GET_TASKS, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }

    this.rootStore.setIsLoading(false);
  };

  setIsExtraTaskModalVisible = (state: boolean) =>
    (this.isExtraTaskModalVisible = state);

  // for debug
  deleteAllTasks = async () => {
    try {
      const hash = this.rootStore.createHash([]);

      const response = await deleteAllTasks({ hash });

      if (response) {
        await this.getTasks();
      }
    } catch (err) {
      console.error(ERROR_DURING_DELETE_TASKS, err);
    }
  };

  setIsMonetagTaskWatched = (state: boolean) =>
    (this.isMonetagTaskWatched = state);

  checkTask = async (taskId: number) => {
    try {
      const hash = this.rootStore.createHash([{ id: taskId }]);

      const response = await checkTask({ taskId, hash });

      /** ставим на первые 3 сек статус done для активации иконки справа */
      if (response.task.status === 'granted') {
        this.possibleTasks = (this.possibleTasks as Task[]).map((task) => ({
          ...task,
          status: task.id === taskId ? 'done' : task.status,
        }));
      }

      this.rootStore.userStore.userInfo.balance = response.balance;
      this.taskClaim =
        response.task.status === 'granted' ? response.task.grant : 0;

      /** если таска не выполнена, то завершаем все */
      if (response.task.status !== 'granted') {
        this.rootStore.addErrorTooltip('Task not completed', 'error');

        return false;
      }

      this.currentCompletedTask = null;
      this.isConfettiExploding = response.task.status === 'granted';

      setTimeout(() => this.clearConfettiExploding, 1500);
      setTimeout(() => this.showTaskTooltip(), 1000);

      /** через 3 сек убираем проверяемую таску в архив */
      setTimeout(() => {
        this.tasks = (this.tasks as Task[]).map((task) => ({
          ...task,
          status: task.id === taskId ? response.task.status : task.status,
          claimed_at:
            task.id === taskId ? this.rootStore.timeNow : task.claimed_at,
        }));

        this.possibleTasks = this.tasks.filter(
          (task) => task.status === 'possible' && task.is_active,
        );

        /* проверяем что у нас есть заклейменные таски */
        if (this.possibleTasks.length < this.tasks.length) {
          const archiveTasks = this.tasks
            .filter((task) => task.status === 'granted')
            .sort(
              (a, b) => (b.claimed_at as number) - (a.claimed_at as number),
            );

          this.archiveTasks = [...archiveTasks, ...this.expiredTasks];
        }
      }, 3000);

      return response.task.status === 'granted';
    } catch (err) {
      console.error(ERROR_DURING_CHECK_TASK, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }
  };

  checkWatchAddTask = async () => {
    try {
      const hash = this.rootStore.createHash([]);
      const { grant, balance } = await checkWatchAddTask({ hash });

      this.rootStore.userStore.userInfo.balance = balance;
      this.taskClaim = grant ?? 0;

      this.currentCompletedTask = null;
      this.isConfettiExploding = true;

      setTimeout(() => this.clearConfettiExploding, 1500);
      setTimeout(() => this.showTaskTooltip(), 1000);

      return grant;
    } catch (err) {
      this.rootStore.showError(ERROR_DURING_CHECK_WATCH_ADD_TASK, err);
    }
  };

  clearConfettiExploding = () => {
    this.isConfettiExploding = false;
  };

  showTaskTooltip = () => {
    this.isShowTooltip = true;

    let time = 3;
    const timer = setInterval(() => {
      time--;
      if (time === 0) {
        this.isShowTooltip = false;

        clearInterval(timer);
      }
    }, 1000);
  };

  updateTimeUntilTheNextReward = () => {
    /** если награду брали только 1 раз*/
    if (
      this.rootStore.userStore.userInfo.day_grant_day === 1 &&
      this.rootStore.userStore.userInfo.day_grant_first
    ) {
      this.timeUntilTheNextReward =
        this.rootStore.userStore.userInfo.day_grant_first +
        60 * 60 * 24 -
        this.rootStore.timeNow;
    }

    /** если награду брали больше 1 раза */
    if (
      this.rootStore.userStore.userInfo.day_grant_day &&
      this.rootStore.userStore.userInfo.day_grant_day > 1 &&
      this.rootStore.userStore.userInfo.day_grant_first
    ) {
      this.timeUntilTheNextReward =
        this.rootStore.userStore.userInfo.day_grant_first +
        60 * 60 * 24 * this.rootStore.userStore.userInfo.day_grant_day -
        this.rootStore.timeNow;
    }

    // Если время истекло, выводим сообщение и останавливаем таймер
    if (
      this.timeUntilTheNextReward !== null &&
      this.timeUntilTheNextReward <= 1
    ) {
      clearInterval(this.rewardTimer); // Останавливаем таймер
      this.rewardTimer = undefined; // обнуляем таймер
      this.timeUntilTheNextReward = null; // обнуляем время

      if (
        this.rootStore.userStore.userInfo.day_grant_first !== null &&
        this.rootStore.userStore.userInfo.day_grant_day !== null
      ) {
        this.receiveDailyRewardsCurrentDay = Math.floor(
          (this.rootStore.timeNow -
            this.rootStore.userStore.userInfo.day_grant_first) /
            (60 * 60 * 24),
        );
      }

      return;
    }
  };

  startRewardTimer = () => {
    if (this.rewardTimer) return;

    this.rewardTimer = setInterval(
      this.updateTimeUntilTheNextReward,
      1000 * 60,
    );
  };

  postDailyRewards = async (amount: number) => {
    nprogressInstance.start();

    try {
      const hash = this.rootStore.createHash([]);
      const response = await claimDailyRewards({ hash });

      if (response) {
        const { day_grant_day, day_grant_first, balance } = response;

        this.rewardAmount = amount;

        /** если у нас последняя награда в месяце,
         * то выводим тултип о начислении с задержкой,
         * что б успел сработать скролл вверх страницы
         * (вывод с задержкой выполнен в ф-ии клейма в модалке)*/
        if (day_grant_day % 28) {
          this.rootStore.showWinTooltip();
        }

        this.receiveDailyRewardsCurrentDay =
          day_grant_first === this.rootStore.timeNow
            ? 0
            : Math.floor(
                (this.rootStore.timeNow - day_grant_first) / (60 * 60 * 24),
              );
        this.grantDay = day_grant_day;
        this.rootStore.userStore.userInfo = {
          ...this.rootStore.userStore.userInfo,
          balance,
          day_grant_first,
          day_grant_day,
        };

        if (this.grantDay && !(this.grantDay % 84)) {
          const { day_grant_prize_possible } = await fetchFarmingUserInfo();
          this.rootStore.userStore.userInfo = {
            ...this.rootStore.userStore.userInfo,
            day_grant_prize_possible,
          };
        }

        this.updateTimeUntilTheNextReward();
      }
    } catch (err) {
      console.error(ERROR_DURING_POST_DAILY_REWARDS, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }

    nprogressInstance.done();
  };

  resetDailyRewards = async () => {
    try {
      const hash = this.rootStore.createHash([]);
      await resetClaimDailyRewards({ hash });

      this.receiveDailyRewardsCurrentDay = 0;
      this.grantDay = null;

      this.rootStore.userStore.userInfo = {
        ...this.rootStore.userStore.userInfo,
        day_grant_day: null,
        day_grant_first: null,
      };
    } catch (err) {
      console.error(ERROR_DURING_RESET_DAILY_REWARDS, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }
  };

  postGrandPrizeReward = async () => {
    nprogressInstance.start();
    this.isGrandPrizeButtonDisable = true;

    try {
      const hash = this.rootStore.createHash([]);
      const response = await claimGrantPrize({ hash });
      const { day_grant_prize_possible } = await fetchFarmingUserInfo();

      this.rewardAmount =
        response.balance - this.rootStore.userStore.userInfo.balance;
      this.rootStore.userStore.userInfo = {
        ...this.rootStore.userStore.userInfo,
        balance: response.balance,
        day_grant_prize_possible,
      };

      nprogressInstance.done();
      this.isGrandPrizeButtonDisable = false;

      return true;
    } catch (err) {
      console.error(ERROR_DURING_POST_DAILY_REWARDS_GRAND_PRIZE, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }

      nprogressInstance.done();
      this.isGrandPrizeButtonDisable = false;
    }
  };

  addMonthPrizeModalVisible = ({
    withButton,
    id,
  }: {
    withButton: boolean;
    id: number;
  }) => {
    this.actualPrize = id;

    withButton
      ? (this.isMonthPrizeTooltipWithButtonVisible = true)
      : (this.monthPrizeTooltips = [{ id }]);
  };

  deleteMonthPrizeModalVisible = ({ withButton }: { withButton: boolean }) => {
    withButton
      ? (this.isMonthPrizeTooltipWithButtonVisible = false)
      : (this.monthPrizeTooltips = []);
  };

  setIsGrandPrizeVisible = (state: boolean) =>
    (this.isGrandPrizeVisible = state);

  updateCurrentTask = (id: number | null) => (this.currentCompletedTask = id);

  get communityTasks(): Task[] | null {
    return (
      this.possibleTasks?.filter((task) => task.category === 'default') || null
    );
  }

  get kolsTasks() {
    return this.possibleTasks?.filter((task) => task.category === 'cols') || [];
  }

  get communityArchiveTasks() {
    return (
      this.archiveTasks?.filter((task) => task.category === 'default') || []
    );
  }

  get kolsArchiveTasks() {
    return this.archiveTasks?.filter((task) => task.category === 'cols') || [];
  }
}
