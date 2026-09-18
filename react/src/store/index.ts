import CryptoJS from 'crypto-js';
import { action, computed, makeObservable, observable } from 'mobx';

import { AirdropStore } from '@/pages/Airdrop/store';
import { BoostersStore } from '@/pages/Boosters/store';
import { FriendsStore } from '@/pages/Friends/store';
import { StakingStore } from '@/pages/Nfts/store/stakingStore';
import { NftsStore } from '@/pages/Nfts/store/store';
import { RatingStore } from '@/pages/Rating/store';
import { ShipsStore } from '@/pages/Ships/store';
import { TapperStore } from '@/pages/Tapper/store';
import { TasksStore } from '@/pages/Tasks/store';
import { TrustWalletStore } from '@/pages/TrustWalletPage/store';
import { VouchersStore } from '@/pages/Vouchers/store';
import { clearCache, fetchFarmingUserInfo } from '@/store/api';
import { AppVersionStore } from '@/store/appVersionStore';
import { ErrorItem, FetchStateUnion } from '@/store/types';
import { UserStore } from '@/store/userStore';
import Utils from '@/utils';

export class RootStore {
  appVersionStore = new AppVersionStore(this);
  userStore = new UserStore(this);
  tapperStore = new TapperStore(this);
  boostersStore = new BoostersStore(this);
  friendsStore = new FriendsStore(this);
  ratingStore = new RatingStore(this);
  tasksStore = new TasksStore(this);
  vouchersStore = new VouchersStore(this);
  nftsStore = new NftsStore(this);
  stakingStore = new StakingStore(this);
  shipsStore = new ShipsStore(this);
  trustWalletStore = new TrustWalletStore(this);
  airdropStore = new AirdropStore(this);

  fetchState: FetchStateUnion = 'done';
  isLoading: boolean = false;

  nowTimer: NodeJS.Timer | undefined;
  _timeNow = 0;
  _delta = 0;

  isShowWinTooltip = false;
  isShowInfoTooltip = false;
  isVibrateActive = true;

  isWalletButtonVisible = false;

  errorTooltips: ErrorItem[] = [];

  constructor() {
    makeObservable(this, {
      fetchState: observable,
      isLoading: observable,
      nowTimer: observable,
      _timeNow: observable,
      _delta: observable,
      isShowWinTooltip: observable,
      isShowInfoTooltip: observable,
      isVibrateActive: observable,
      isWalletButtonVisible: observable,
      errorTooltips: observable,

      addErrorTooltip: action,
      deleteErrorTooltip: action,
      updateTimeNow: action,
      startNowTimer: action,
      setIsWalletButtonVisible: action,
      createHash: action,
      toggleVibrateActive: action,
      showWinTooltip: action,
      clearCache: action,
      sleep: action,
      showError: action,

      deltaTime: computed,
      timeNow: computed,
    });
  }

  addErrorTooltip = (message: string, type?: 'info' | 'error') =>
    (this.errorTooltips = [
      ...this.errorTooltips,
      { message, id: Date.now(), type },
    ]);

  deleteErrorTooltip = (id: number) => {
    this.errorTooltips = this.errorTooltips.filter(
      (tooltip) => tooltip.id !== id,
    );
  };

  updateTimeNow = async () => {
    const timeNow = Math.round(new Date().getTime() / 1000);
    if (this.timeNow && Math.abs(timeNow - this.timeNow - this.deltaTime) > 5) {
      const { system_time } = await fetchFarmingUserInfo();
      this.userStore.userInfo = { ...this.userStore.userInfo, system_time };
      this.deltaTime =
        Math.round(new Date().getTime() / 1000) -
        this.userStore.userInfo.system_time;
    }

    this.timeNow = Math.round(new Date().getTime() / 1000) - this.deltaTime;
  };

  startNowTimer = () => {
    if (this.nowTimer) return;
    this.nowTimer = setInterval(async () => await this.updateTimeNow(), 1000);
  };

  setIsWalletButtonVisible = (state: boolean) => {
    this.isWalletButtonVisible = state;
  };

  createHash = (reqData: Record<string, number | string>[]) => {
    const privateKey = process.env.REACT_APP_API_PRIVAT_KEY || 'super-key';
    const time = this.timeNow;

    const messagesArr = reqData.reduce((acc, item) => {
      const [key, value] = Object.entries(item)[0];
      acc.push(`${[key]}=${encodeURI(String(value))}`);

      return acc;
    }, [] as string[]);
    const messageStr = messagesArr.join('&');

    const hashedTime = `time=${Math.ceil(time / 60)}`; // 60 сек интервал для проверки хэша на беке
    const message = messageStr ? `${messageStr}&${hashedTime}` : hashedTime;

    return CryptoJS.HmacSHA256(message, privateKey).toString();
  };

  toggleVibrateActive = (isActive: boolean) => {
    this.isVibrateActive = isActive;
  };

  showWinTooltip = (isShowInfoTooltip?: boolean) => {
    isShowInfoTooltip
      ? (this.isShowInfoTooltip = true)
      : (this.isShowWinTooltip = true);

    let time = 3;
    const timer = setInterval(() => {
      time--;
      if (time === 0) {
        isShowInfoTooltip
          ? (this.isShowInfoTooltip = false)
          : (this.isShowWinTooltip = false);

        clearInterval(timer);
      }
    }, 1000);
  };

  clearCache = async () => {
    const hash = this.createHash([]);

    try {
      await clearCache({ hash });
    } catch (err) {
      console.error(err);

      if (Utils.getErrorMessage(err)) {
        this.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }
  };

  setIsLoading = (state: boolean) => (this.isLoading = state);

  sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

  showError = (message: string, err: unknown) => {
    console.error(message, err);
    this.userStore.addErrorResponse(err);

    if (Utils.getErrorMessage(err)) {
      this.addErrorTooltip(Utils.getErrorMessage(err));
    }
  };

  get deltaTime() {
    return this._delta;
  }

  set deltaTime(deltaTime: number) {
    this._delta = deltaTime;
  }

  get timeNow() {
    return this._timeNow;
  }

  set timeNow(time: number) {
    this._timeNow = time;
  }
}

const store = new RootStore();

export default store;
