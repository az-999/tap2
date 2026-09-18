import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
  toJS,
} from 'mobx';
import SecureLS from 'secure-ls';

import {
  claimMoonReward,
  farmingStart,
  finishFarming,
  unblockEnergy,
} from '@/pages/Tapper/api';
import {
  ERROR_DURING_FETCH_FARMING_DATA,
  ERROR_DURING_GET_FARMING_INFO,
  ERROR_DURING_ON_ACTIVE_MOON,
  ERROR_DURING_RUN_FARMING,
  ERROR_DURING_STOP_FARM,
} from '@/services/constants/errorMessages';
import { RootStore } from '@/store';
import { fetchFarmingUserInfo } from '@/store/api';
import { BaseStore } from '@/store/baseStore';
import { DEFAULT_FARMING_INFO } from '@/store/const';
import { SessionInfo } from '@/store/types';
import Utils from '@/utils';

const ls = new SecureLS();
export const FARMING_PERIOD = process.env.REACT_APP_FARMING_PERIOD
  ? Number(process.env.REACT_APP_FARMING_PERIOD)
  : 0;

export const DEFAULT_ENERGY = process.env.REACT_APP_DEFAULT_ENERGY
  ? Number(process.env.REACT_APP_DEFAULT_ENERGY)
  : 45000;

export class TapperStore extends BaseStore {
  rootStore: RootStore;

  farmingInfo: {
    session: SessionInfo;
  } = DEFAULT_FARMING_INFO;
  farmLimit = 0;
  tapCount = 0;
  energy: number = DEFAULT_ENERGY;
  defaultEnergy: number = DEFAULT_ENERGY;
  isFreezeMode: boolean = false;

  timer: any;
  time = 0;
  cleanFarm = 0;

  // New states for moon timer
  moonTimer: any;
  isStartMoon: boolean = false;
  isActiveMoon: boolean = false;
  moonWin: string = '';

  tapShadowCount: number = 0;
  tapShadowBoost: number = 1;
  maxShadow: number = 88;
  maxShadowBoost: number = 8;

  /** для открытия дебаг страницы */
  debugCountTaps = 0;

  constructor(rootStore: RootStore) {
    super();

    this.rootStore = rootStore;

    makeObservable(this, {
      farmingInfo: observable,
      farmLimit: observable,
      tapCount: observable,
      energy: observable,
      defaultEnergy: observable,
      isFreezeMode: observable,
      timer: observable,
      time: observable,
      cleanFarm: observable,
      moonTimer: observable,
      isStartMoon: observable,
      isActiveMoon: observable,
      moonWin: observable,
      tapShadowCount: observable,
      tapShadowBoost: observable,
      maxShadow: observable,
      maxShadowBoost: observable,
      debugCountTaps: observable,

      fetchFarmingInfo: action,
      setinProgressModePreset: action,
      runFarming: action,
      startMoonTimer: action,
      stopMoonTimer: action,
      onActiveMoon: action,
      fetchFarmingData: action,
      tap: action,
      resetTapShadow: action,
      stopFarm: action,
      startTimer: action,
      deleteTimer: action,
      addDebugCountTaps: action,

      timeSpendFromStart: computed,
      isValidPeriod: computed,

      setFreezeOn: action,
      setFreezeOff: action,
    });
  }

  fetchFarmingInfo = async () => {
    try {
      const { session } = await fetchFarmingUserInfo();
      this.farmingInfo.session = session;
    } catch (err) {
      console.error(ERROR_DURING_GET_FARMING_INFO, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }
  };

  setinProgressModePreset = () => {
    if (this.farmingInfo.session.status === 'inProgress') {
      if (this.isValidPeriod) {
        this.tapCount = Number(ls.get('tapCountSecure')) || 0;

        this.startTimer();
        this.startMoonTimer();
      } else {
        this.farmingInfo.session.status = 'finished';
        this.deleteTimer();
        this.stopMoonTimer();
      }
    } else {
      this.stopMoonTimer();
    }
  };

  runFarming = async () => {
    this.rootStore.setIsLoading(true);
    const { session } = this.farmingInfo;

    ls.remove('tapCountSecure');
    this.tapCount = 0;
    this.time = 0;
    this.energy = this.defaultEnergy;

    try {
      const hash = this.rootStore.createHash([{ status: 'inProgress' }]);
      const resp = await farmingStart({ status: 'inProgress', hash });

      runInAction(() => {
        session.status = resp.status;
        session.start_at = resp.start_at;
        session.moon_time = resp.moon_time;
        this.startTimer();
        this.startMoonTimer();
        this.resetTapShadow();
      });
    } catch (err) {
      console.error(ERROR_DURING_RUN_FARMING, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }

    this.rootStore.setIsLoading(false);
  };

  startMoonTimer = () => {
    const currentTime = this.rootStore.timeNow;
    const delay = this.farmingInfo.session.moon_time! - currentTime;

    this.isActiveMoon = false;
    if (delay >= 0 && this.farmingInfo.session.status === 'inProgress') {
      this.moonTimer = setTimeout(() => {
        this.isStartMoon = true;
        this.moonWin = '';
      }, delay * 1000);
    }
  };

  stopMoonTimer = () => {
    if (this.moonTimer) {
      clearTimeout(this.moonTimer);
      this.moonTimer = null;
      this.isStartMoon = false;
    }
  };

  onActiveMoon = async () => {
    try {
      const hash = this.rootStore.createHash([]);

      await claimMoonReward({ hash }).then((response) => {
        runInAction(() => {
          this.moonWin = String(
            response?.balance -
              Number(this.rootStore.userStore.userInfo.balance),
          );
          this.rootStore.userStore.userInfo.balance = response?.balance;
          this.isActiveMoon = true;
        });
      });
    } catch (err) {
      console.error(ERROR_DURING_ON_ACTIVE_MOON, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }
  };

  setCompletedFreeze = async () => {
    try {
      this.setFreezeOff();
      this.defaultEnergy = this.tapCount + DEFAULT_ENERGY;
      this.energy = this.defaultEnergy;
      ls.set('defaultEnergy', String(this.tapCount + DEFAULT_ENERGY));

      const hash = this.rootStore.createHash([]);

      await unblockEnergy({ hash }).then((response) => {
        runInAction(async () => {
          const { grant, balance } = response;

          this.moonWin = String(
            balance - Number(this.rootStore.userStore.userInfo.balance),
          );

          this.rootStore.userStore.addRewardWithoutBalanceTooltip({
            reward: grant,
          });

          await this.rootStore.sleep();
          this.rootStore.userStore.userInfo.balance = balance;
        });
      });
    } catch (err) {
      console.error(ERROR_DURING_ON_ACTIVE_MOON, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }
  };

  // Метод для получения данных из /farming
  fetchFarmingData = async () => {
    try {
      this.farmLimit = toJS(this.rootStore.userStore.userInfo.info.farm);
      this.rootStore.boostersStore.boosterTime = this.rootStore.userStore
        .userInfo.info.active_booster_finish_at
        ? toJS(
            this.rootStore.userStore.userInfo.info.active_booster_finish_at,
          ) - this.rootStore.timeNow
        : 0;

      this.defaultEnergy = Number(ls.get('defaultEnergy')) || DEFAULT_ENERGY;
      this.energy =
        this.defaultEnergy - this.tapCount <= 0
          ? 0
          : this.defaultEnergy - this.tapCount;

      if (this.energy <= 0) {
        this.setFreezeOn();
      }

      if (this.farmingInfo.session.moon_time) {
        this.startMoonTimer();
      }

      if (
        !this.isValidPeriod &&
        this.farmingInfo.session.status === 'inProgress'
      ) {
        this.farmingInfo.session.status = 'finished';
        this.setFreezeOff();
      }
    } catch (err) {
      console.error(ERROR_DURING_FETCH_FARMING_DATA, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }
  };

  tap = () => {
    const ratio = this.isFreezeMode
      ? 1
      : (this.rootStore.userStore.userInfo.info?.boost &&
          Number(
            this.rootStore.userStore.userInfo.info.boost.replace('x', ''),
          )) ||
        1;

    this.tapCount = this.tapCount + ratio * (this.tapShadowBoost || 1);

    if (this.tapShadowCount < this.maxShadow) {
      this.tapShadowCount =
        this.tapShadowCount + this.maxShadow / this.maxShadowBoost;

      this.tapShadowBoost =
        this.tapShadowBoost < this.maxShadowBoost
          ? this.tapShadowBoost + 1
          : this.tapShadowBoost;
    }

    ls.set('tapCountSecure', String(this.tapCount));

    this.energy =
      this.tapCount < this.defaultEnergy
        ? this.defaultEnergy - this.tapCount
        : 0;

    if (this.energy <= 0) {
      this.setFreezeOn();
    }

    if (this.isFreezeMode) {
      ls.set('defaultEnergy', String(this.tapCount));
      this.defaultEnergy = this.tapCount;
    }
  };

  resetTapShadow = () => {
    this.tapShadowCount = 0;
    this.tapShadowBoost = 1;
  };

  stopFarm = async () => {
    this.rootStore.setIsLoading(true);

    // по идее надо делать при получении ответа от сервера, но тогда очень большая задержка на клик
    this.farmingInfo.session.status = 'await';

    try {
      const tapCount = this.tapCount || Number(ls.get('tapCountSecure')) || 0;
      const hash = this.rootStore.createHash([{ tapCount }]);

      await finishFarming({ tapCount, hash }).then((resp) => {
        runInAction(() => {
          this.rootStore.userStore.userInfo.info.farm = 0;
          this.rootStore.userStore.userInfo.info.taps = 0;
          this.cleanFarm =
            resp.balance - Number(this.rootStore.userStore.userInfo.balance);
          this.rootStore.showWinTooltip();
          this.rootStore.userStore.userInfo.balance = resp.balance;
          // дублируем статус
          this.farmingInfo.session.status = 'await';
          this.farmingInfo.session.start_at = 0;

          ls.remove('tapCountSecure');
          this.tapCount = 0;
          this.time = 0;
          this.energy = DEFAULT_ENERGY;
          this.defaultEnergy = DEFAULT_ENERGY;
          this.resetTapShadow();

          this.setFreezeOff();
          ls.remove('defaultEnergy');

          this.deleteTimer();
          this.stopMoonTimer(); // Stop the moon timer

          setTimeout(() => (this.cleanFarm = 0), 3000);
        });
      });
    } catch (err) {
      console.error(ERROR_DURING_STOP_FARM, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }

    this.rootStore.setIsLoading(false);
  };

  startTimer = () => {
    this.time = this.isValidPeriod ? this.timeSpendFromStart : 0;
    this.timer = setInterval(() => {
      if (this.time >= FARMING_PERIOD) {
        this.deleteTimer();
        this.farmingInfo.session.status = 'finished';
      } else {
        this.time++;
      }
    }, 1000);
  };

  deleteTimer = () => {
    clearInterval(this.timer);
    this.timer = null; // Ensure the timer reference is reset
  };

  addDebugCountTaps = (fn: () => void) => {
    this.debugCountTaps += 1;

    if (this.debugCountTaps === 8) {
      this.debugCountTaps = 0;
      fn();
    }
  };

  get timeSpendFromStart() {
    const startTimeInSeconds = this.farmingInfo.session.start_at;
    const currentTimeInSeconds = this.rootStore.timeNow;
    return currentTimeInSeconds - startTimeInSeconds!;
  }

  get isValidPeriod() {
    return FARMING_PERIOD >= this.timeSpendFromStart;
  }

  setFreezeOn = () => {
    this.isFreezeMode = true;
    this.tapShadowCount = 0;
    this.maxShadow = 44;
    this.maxShadowBoost = 4;
  };
  setFreezeOff = () => {
    this.isFreezeMode = false;
    this.tapShadowCount = 0;
    this.maxShadow = 88;
    this.maxShadowBoost = 8;
  };
}
