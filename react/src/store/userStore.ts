import { TelegramAuthData } from '@telegram-auth/react/src/types';
import axios from 'axios';
import { action, computed, makeObservable, observable, toJS } from 'mobx';
import SecureLS from 'secure-ls';

import httpClient from '@/httpClient';
import nprogressInstance from '@/nprogressInstance';
import {
  ERROR_DURING_ACCEPT_GRANT_REWARD,
  ERROR_DURING_FETCH_GRANT_REWARD,
  ERROR_DURING_GET_AUTH_TOKEN,
  ERROR_DURING_GET_REFRESHED_AUTH_TOKEN,
  ERROR_DURING_GET_USER_INFO,
  ERROR_DURING_REJECT_GRANT_REWARD,
  ERROR_DURING_USER_LOGOUT,
  ERROR_MESSAGE_DURING_POST_WALLET_ADDRESS,
} from '@/services/constants/errorMessages';
import {
  acceptGrantReward,
  fetchGrantReward,
  fetchJwtToken,
  fetchStartUserInfo,
  fetchWebJwtToken,
  postUserWallet,
  refreshJwtToken,
  rejectGrantReward,
  userLogout,
} from '@/store/api';
import { BaseStore } from '@/store/baseStore';
import {
  DEFAULT_USER_INFO,
  INIT_DATA,
  SECOND_INIT_DATA,
  TELEGRAM_ID,
} from '@/store/const';
import { RootStore } from '@/store/index';
import {
  ApiResponse,
  RewardTooltip,
  RewardTooltipWithoutBalance,
  StartUserInfo,
  WalletUser,
} from '@/store/types';
import Utils from '@/utils';

const ls = new SecureLS();

export class UserStore extends BaseStore {
  rootStore: RootStore;

  token: string = '';
  isAppReady = false;
  userInfo: StartUserInfo = DEFAULT_USER_INFO;
  grantAmount = 0;
  userWalletAddress = '';
  isGrantRewardModalVisible = false;
  isGrantBoxVisible = false;
  userInitData: TelegramAuthData | null = null;
  walletUsersList: WalletUser[] | null = null;
  isWalletInvalid = false;
  isWalletDisconnect: boolean | null = null;
  isWalletSuccess = false;
  isUserBlocked = false;
  isWalletInvalidModalVisible = false;
  isRoadmapShowed = false;
  rewardTooltip: RewardTooltip[] = [];
  rewardTooltipWithoutBalance: RewardTooltipWithoutBalance[] = [];

  apiResponses: ApiResponse[] = [];
  refreshTokenTimer: NodeJS.Timer | undefined;

  constructor(rootStore: RootStore) {
    super();

    this.rootStore = rootStore;

    makeObservable(this, {
      token: observable,
      isAppReady: observable,
      userInfo: observable,
      grantAmount: observable,
      userWalletAddress: observable,
      isGrantRewardModalVisible: observable,
      isGrantBoxVisible: observable,
      apiResponses: observable,
      userInitData: observable,
      isWalletInvalid: observable,
      isWalletDisconnect: observable,
      isWalletSuccess: observable,
      isUserBlocked: observable,
      isWalletInvalidModalVisible: observable,
      rewardTooltip: observable,
      rewardTooltipWithoutBalance: observable,
      walletUsersList: observable,
      isRoadmapShowed: observable,
      refreshTokenTimer: observable,

      updateUserInitData: action,
      addUserWalletAddress: action,
      setIsRoadmapShowed: action,
      setIsUserBlocked: action,
      postUserWallet: action,
      initUser: action,
      userLogOut: action,
      getAuthToken: action,
      getAuthRefresh: action,
      updateTokenByRefresh: action,
      startUpdateTokenTimer: action,
      fetchGrantReward: action,
      setIsWalletInvalid: action,
      setWalletUsersList: action,
      setIsWalletDisconnect: action,
      getUserInfo: action,
      getUserInitData: action,
      getGrantIds: action,
      getGrantAmount: action,
      acceptGrantReward: action,
      rejectGrantReward: action,
      addGrantRewardBoxVisible: action,
      deleteGrantRewardBoxVisible: action,
      addGrantRewardModalVisible: action,
      deleteGrantRewardModalVisible: action,
      addApiResponse: action,
      addErrorResponse: action,
      setWalletInvalidModal: action,
      addRewardTooltip: action,
      deleteRewardTooltip: action,
      addRewardWithoutBalanceTooltip: action,
      deleteRewardWithoutBalanceTooltip: action,

      mmproPointsBalance: computed,
    });
  }

  updateUserInitData = (userInitData: TelegramAuthData) =>
    (this.userInitData = userInitData);

  initUser = async ({
    showDailyFn,
    showTutorialFn,
  }: {
    showDailyFn: () => void;
    showTutorialFn: () => void;
  }) => {
    this.rootStore.setIsLoading(true);
    await this.getAuthToken();
    this.addApiResponse();

    await this.rootStore.appVersionStore.fetchNewAppVersion();
    await this.getUserInfo();
    await this.rootStore.tapperStore.fetchFarmingInfo();
    await this.rootStore.tasksStore.getTasks();
    await this.rootStore.airdropStore.fetchAirdropTasks();
    await this.rootStore.airdropStore.fetchAirdropComplete();

    this.rootStore.startNowTimer();
    await this.rootStore.sleep(); // ждем 1с пока запустится таймер startNowTimer

    this.rootStore.tasksStore.updateTimeUntilTheNextReward();
    this.startUpdateTokenTimer();
    this.rootStore.tasksStore.startRewardTimer();
    this.rootStore.appVersionStore.startUpdateNewVersionTimer();
    this.startFetchGrantRewardTimer();
    this.rootStore.tapperStore.setinProgressModePreset();
    await this.rootStore.tapperStore.fetchFarmingData();

    /** проверяем, что вышло не более 3 суток с момента последней награды
     * если больше, то обнулеям ежедневные награды
     */
    if (
      this.rootStore.tasksStore.grantDay &&
      this.rootStore.tasksStore.receiveDailyRewardsCurrentDay >
        this.rootStore.tasksStore.grantDay + 2
    ) {
      // console.log(
      //   this.rootStore.tasksStore.receiveDailyRewardsCurrentDay,
      //   this.rootStore.tasksStore.grantDay,
      // );
      await this.rootStore.tasksStore.resetDailyRewards();
    }

    /** проверяем, доступна ли нам награда
     * еcли да, то идем на страницу ежедневных наград
     */
    if (
      this.userInfo.day_grant_first === null ||
      this.rootStore.tasksStore.receiveDailyRewardsCurrentDay ===
        this.rootStore.tasksStore.grantDay

      /** todo на случай включения туториала*/
      /* &&
      ls.get('isShowedTutorialPageBefore') === 'true'*/
    ) {
      showDailyFn();
    }

    /** показать страницу с туториалом */
    /*if (ls.get('isShowedTutorialPageBefore') !== 'true') {
      showTutorialFn();
    }*/

    /** проверяем, что я принял оферту для пиратских миссий,
     * если нет, то выводим модалку */
    if (!this.userInfo.pirate.star_wars_oferta) {
      this.rootStore.shipsStore.pirateAndDefenseTooltips.push(0);
    }

    /** проверяем флаг последнего грабежа, если не 0,
     * то записываем для вывода тултипа */
    if (this.userInfo.pirate.green_metka_modal_flag) {
      this.rootStore.shipsStore.pirateAndDefenseTooltips.push(
        this.userInfo.pirate.green_metka_modal_flag,
      );
    }

    /** проверяем, что корабль вернулся с пиратской миссии
     * если да, то выводим модалку */
    if (this.rootStore.shipsStore.piracyMissionStatus === 'finished') {
      this.rootStore.shipsStore.pirateAndDefenseTooltips.push(4);
    }

    /** проверяем, что у нас есть метка защиты и есть защищенные деньги
     * если да, то выводим модалку */
    if (
      this.userInfo.pirate.green_metka_finish_at &&
      this.rootStore.shipsStore.isDefenseActive &&
      this.rootStore.shipsStore.modalProtectedPoints
    ) {
      this.rootStore.shipsStore.pirateAndDefenseTooltips.push(5);
    }

    /** проверяем, что у нас есть метка защиты и вышло время ее действия
     * если да, то выводим модалку */
    if (
      this.userInfo.pirate.green_metka_finish_at &&
      !this.rootStore.shipsStore.isDefenseActive
    ) {
      this.rootStore.shipsStore.pirateAndDefenseTooltips.push(6);
    }

    this.rootStore.setIsLoading(false);
    this.isAppReady = true;
  };

  addUserWalletAddress = (walletAddress: string) =>
    (this.userWalletAddress = walletAddress);

  setIsRoadmapShowed = (state: boolean) => (this.isRoadmapShowed = state);

  setIsUserBlocked = (state: boolean) => (this.isUserBlocked = state);

  getAuthToken = async () => {
    const errorHandler = (err: unknown) => {
      if (axios.isAxiosError(err)) {
        if ('response' in err && err.response?.data?.code === 403) {
          this.setIsUserBlocked(true);
        }

        console.error(ERROR_DURING_GET_AUTH_TOKEN, err);
        this.rootStore.userStore.addErrorResponse(err);

        if (Utils.getErrorMessage(err)) {
          this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
        }
      } else {
        console.error(ERROR_DURING_GET_AUTH_TOKEN, err);
      }
    };

    /* токен для локальной разработки */
    if (process.env.REACT_APP_MODE === 'dev') {
      try {
        const token = await fetchJwtToken(
          process.env.REACT_APP_BOT_VERSION === '1'
            ? INIT_DATA
            : SECOND_INIT_DATA,
        );
        this.token = String(token.access_token);
        this.setIsUserBlocked(false);

        ls.set('userJWTTokenSecure', token.access_token);
        ls.set('userIdSecure', TELEGRAM_ID);

        return;
      } catch (err) {
        errorHandler(err);

        return;
      }
    }

    const webApp = window.Telegram.WebApp;

    if (webApp.initData) {
      try {
        const initData = webApp.initData;

        const token = await fetchJwtToken(initData);
        this.token = String(token.access_token);
        this.setIsUserBlocked(false);

        ls.set('userJWTTokenSecure', token.access_token);

        const userData = decodeURIComponent(initData)
          .split('&')
          ?.find((item) => item.startsWith('user='))
          ?.replace('user=', '');

        if (userData) {
          const userId = JSON.parse(userData)?.['id'];
          this.updateUserInitData(JSON.parse(userData));

          if (userId) ls.set('userIdSecure', userId);
        }
      } catch (err) {
        errorHandler(err);
      }
    } else {
      const storageUserInitData: string | null =
        localStorage.getItem('userInitData');

      if (storageUserInitData) {
        try {
          const userInitData = JSON.parse(storageUserInitData);
          const token = await fetchWebJwtToken(userInitData);
          this.token = String(token.access_token);
          this.updateUserInitData(userInitData);
          this.setIsUserBlocked(false);

          ls.set('userJWTTokenSecure', token.access_token);
          ls.set('userIdSecure', userInitData.id);
        } catch (err) {
          errorHandler(err);
        }
      }
    }
  };

  userLogOut = async () => {
    const hash = this.rootStore.createHash([]);
    nprogressInstance.start();

    try {
      await userLogout({ hash });
    } catch (err) {
      console.error(ERROR_DURING_USER_LOGOUT, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }

    nprogressInstance.done();
  };

  getAuthRefresh = async () => {
    try {
      if (this.token) {
        const token = await refreshJwtToken();
        this.token = String(token.access_token);

        ls.set('userJWTTokenSecure', token.access_token);
      } else {
        await this.getAuthToken();
      }
    } catch (err) {
      console.error(ERROR_DURING_GET_REFRESHED_AUTH_TOKEN, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }
  };

  updateTokenByRefresh = async () => {
    await this.getAuthRefresh();
  };

  startUpdateTokenTimer = () => {
    if (this.refreshTokenTimer) return;

    this.refreshTokenTimer = setInterval(
      this.updateTokenByRefresh,
      1000 * 60 * 40,
    ); // 40min
  };

  postUserWallet = async () => {
    const hash = this.rootStore.createHash([
      { address: this.userWalletAddress },
    ]);

    try {
      await postUserWallet({
        hash,
        address: this.userWalletAddress,
      });

      if (this.userWalletAddress !== '-' && this.isWalletDisconnect) {
        this.isWalletSuccess = true;
        this.setIsWalletDisconnect(null);
      }

      /** если ошибки нет, но у нас сохранен список с предыдущего раза - очищаем его
       * при условии если польз. 1, иначе очищаем на странице 'multi-wallet' */
      if (this.walletUsersList && this.walletUsersList.length === 1) {
        this.setWalletUsersList(null);
        this.setIsWalletInvalid(false);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (
          'response' in err &&
          err.response?.data?.code === 401 &&
          'user_list' in err.response?.data
        ) {
          this.isWalletSuccess = false;
          this.setIsWalletDisconnect(false);
          this.setIsWalletInvalid(true);
          this.setWalletUsersList(err.response.data.user_list);

          if (this.walletUsersList && this.walletUsersList.length === 1) {
            this.setWalletInvalidModal(true);
          }
        }

        console.error(ERROR_MESSAGE_DURING_POST_WALLET_ADDRESS, err);
        this.rootStore.userStore.addErrorResponse(err);

        if (Utils.getErrorMessage(err)) {
          this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
        }
      } else {
        console.error(ERROR_MESSAGE_DURING_POST_WALLET_ADDRESS, err);
      }
    }
  };

  setIsWalletInvalid = (state: boolean) => (this.isWalletInvalid = state);

  setWalletUsersList = (state: WalletUser[] | null) =>
    (this.walletUsersList = state);

  setIsWalletDisconnect = (state: boolean | null) =>
    (this.isWalletDisconnect = state);

  getUserInfo = async () => {
    try {
      this.userInfo = await fetchStartUserInfo();

      /* todo для мокового начисления наград */
      /* this.userInfo = {
        ...userInfo,
        day_grant_day: 84,
        day_grant_first:
          this.userInfo.system_time - 60 * 60 * 24 * 84 - 60 * 60 * 2,
      };
      console.log(this.userInfo.day_grant_first);*/
      this.rootStore.tapperStore.farmLimit = toJS(this.userInfo.info.farm);
      this.rootStore.deltaTime =
        Math.round(new Date().getTime() / 1000) - this.userInfo.system_time;

      /** проверяем, что на беке не записан кошелек и есть ли подключенный кошелек */
      /*if (!this.userInfo.has_wallet && this.userWalletAddress) {
        await this.postUserWallet();
      }*/

      /** проверяем есть ли у нас начисленные награды */
      if (this.userInfo.grant?.length > 0) {
        this.getGrantAmount();
        this.addGrantRewardBoxVisible();
      }

      /** проверка на то, что мы когда-то уже брали награду */
      if (
        this.userInfo.day_grant_first !== null &&
        this.userInfo.day_grant_day !== null
      ) {
        this.rootStore.tasksStore.receiveDailyRewardsCurrentDay = Math.floor(
          (this.rootStore.timeNow - this.userInfo.day_grant_first) /
            (60 * 60 * 24),
        );
        this.rootStore.tasksStore.grantDay = this.userInfo.day_grant_day;
      }

      if (!this.rootStore.tapperStore.isValidPeriod) {
        this.rootStore.tapperStore.setinProgressModePreset();
      }
    } catch (err) {
      console.error(ERROR_DURING_GET_USER_INFO, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }
  };

  getUserInitData = () => {
    const webApp = window.Telegram.WebApp;

    const getUserParse = (initDataRaw: string) => {
      const params = new URLSearchParams(initDataRaw);
      const userJson = decodeURIComponent(params.get('user')!);

      return JSON.parse(userJson);
    };

    if (process.env.REACT_APP_MODE === 'dev') {
      const initDataRaw =
        process.env.REACT_APP_BOT_VERSION === '1'
          ? INIT_DATA
          : SECOND_INIT_DATA;
      return getUserParse(initDataRaw);
    }

    if (webApp.initData) {
      const initDataRaw = webApp.initData;
      return getUserParse(initDataRaw);
    } else {
      const storageUserInitData = localStorage.getItem('userInitData');

      if (storageUserInitData) {
        const initData = JSON.parse(storageUserInitData);

        if (initData?.language_code) {
          return initData;
        } else {
          const browserLanguage = window.navigator.language;

          if (browserLanguage) {
            const dashIndex = browserLanguage.indexOf('-');
            const language =
              dashIndex !== -1
                ? browserLanguage.slice(0, dashIndex)
                : browserLanguage;

            initData['language_code'] = language;
          }

          return initData;
        }
      }
    }
  };

  getGrantIds = () =>
    this.userInfo.grant
      .reduce<string[]>((acc, item) => {
        acc.push(item.id.toString());

        return acc;
      }, [])
      .join(',');

  getGrantAmount = () =>
    (this.grantAmount = this.userInfo.grant.reduce<number>((acc, item) => {
      acc += item.amount;

      return acc;
    }, 0));

  fetchGrantReward = async () => {
    const hash = this.rootStore.createHash([]);

    try {
      const response = await fetchGrantReward({ hash });

      if (response && response.length > 0) {
        this.userInfo = { ...this.userInfo, grant: response };
        this.getGrantAmount();
        this.addGrantRewardBoxVisible();
      }
    } catch (err) {
      console.error(ERROR_DURING_FETCH_GRANT_REWARD, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }
  };

  startFetchGrantRewardTimer = () =>
    setInterval(this.fetchGrantReward, 1000 * 60 * 15); // 15 minutes

  acceptGrantReward = async (navigateFn: () => void) => {
    const id = this.getGrantIds();
    const hash = this.rootStore.createHash([{ request_id: id }]);

    nprogressInstance.start();

    try {
      navigateFn();

      const response = await acceptGrantReward({ hash, request_id: id });

      if (response) {
        this.deleteGrantRewardModalVisible();
        this.deleteGrantRewardBoxVisible();

        setTimeout(
          () =>
            (this.userInfo = {
              ...this.userInfo,
              grant: [],
              balance: response.balance,
            }),
          1500,
        );
      }
    } catch (err) {
      console.error(ERROR_DURING_ACCEPT_GRANT_REWARD, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }

    nprogressInstance.done();
  };

  rejectGrantReward = async () => {
    const id = this.getGrantIds();
    const hash = this.rootStore.createHash([{ request_id: id }]);

    nprogressInstance.start();

    try {
      await rejectGrantReward({ hash, request_id: id });

      this.deleteGrantRewardModalVisible();
      this.deleteGrantRewardBoxVisible();
    } catch (err) {
      console.error(ERROR_DURING_REJECT_GRANT_REWARD, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }

    nprogressInstance.done();
  };

  addGrantRewardBoxVisible = () => (this.isGrantBoxVisible = true);

  deleteGrantRewardBoxVisible = () => (this.isGrantBoxVisible = false);

  addGrantRewardModalVisible = () => (this.isGrantRewardModalVisible = true);

  deleteGrantRewardModalVisible = () =>
    (this.isGrantRewardModalVisible = false);

  addApiResponse = () => {
    httpClient.interceptors.response.use((response) => {
      if (response) {
        this.apiResponses = [
          ...this.apiResponses,
          {
            code: response.status,
            responseUrl: response.request.responseURL,
            responseBody: JSON.stringify(response.data).replace(
              /,(")/g,
              ', $1',
            ),
          },
        ];
      }

      return response;
    });
  };

  addErrorResponse = (err: any) => {
    if (err && err.response) {
      this.apiResponses = [
        ...this.apiResponses,
        {
          code: err.response.status,
          responseUrl: err.request.responseURL,
          responseBody: err.response.statusText,
        },
      ];
    } else {
      this.apiResponses = [
        ...this.apiResponses,
        {
          code: err?.code,
          responseUrl: err?.config?.baseURL + err?.config?.url,
          responseBody: err?.message,
        },
      ];
    }
  };

  setWalletInvalidModal = (state: boolean) =>
    (this.isWalletInvalidModalVisible = state);

  addRewardTooltip = ({
    reward,
    prevBalance,
  }: {
    reward: number;
    prevBalance: number;
  }) => (this.rewardTooltip = [{ reward, prevBalance }]);

  deleteRewardTooltip = () => (this.rewardTooltip = []);

  addRewardWithoutBalanceTooltip = ({ reward }: { reward: number }) =>
    (this.rewardTooltipWithoutBalance = [{ reward }]);

  deleteRewardWithoutBalanceTooltip = () =>
    (this.rewardTooltipWithoutBalance = []);

  get mmproPointsBalance() {
    return this.userInfo.balance;
  }
}
