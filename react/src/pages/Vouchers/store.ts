import { toNano } from '@ton/core';
import { TonConnectUI } from '@tonconnect/ui-react';
import axios from 'axios';
import { action, computed, makeObservable, observable } from 'mobx';
import SecureLS from 'secure-ls';
import TonWeb from 'tonweb';

import { TransactionStatus } from '@/pages/Nfts/types';
import { fetchTonApiTransactionStatus } from '@/pages/Ships/api';
import {
  buyMmproToken,
  checkMmproToken,
  checkTransactionVoucherStatus,
  checkVoucherMintStatus,
  checkVoucherStatus,
  fetchAlExistingVouchers,
  fetchCaptchaData,
  fetchVerifyCaptchaData,
  fetchVouchers,
  infoMmproToken,
  postVoucherPaymentComplete,
  postVoucherPaymentError,
} from '@/pages/Vouchers/api';
import {
  Captcha,
  MmproTokenCheckResponse,
  MmproTokenResponse,
  Voucher,
  VoucherAndNftTooltipItem,
  VoucherAndNftTooltipItemType,
  VoucherItem,
} from '@/pages/Vouchers/types';
import {
  ERROR_DURING_BUY_MMPRO_TOKEN,
  ERROR_DURING_CHECK_BUYING_MMPRO_TOKEN,
  ERROR_DURING_CHECK_BUYING_OF_MMPRO_TOKEN,
  ERROR_DURING_CHECK_VOUCHER_STATUS,
  ERROR_DURING_FETCH_MMPRO_TOKEN_INFO,
  ERROR_DURING_GET_ALL_EXISTING_VOUCHERS,
  ERROR_DURING_GET_CAPTCHA_DATA,
  ERROR_DURING_GET_VOUCHERS,
  ERROR_DURING_PAY_COMMISSION_OF_MMPRO_TOKEN,
  ERROR_DURING_POST_CAPTCHA_DATA,
  ERROR_DURING_REJECT_BUY_VOUCHER_BY_POINTS,
} from '@/services/constants/errorMessages';
import { RootStore } from '@/store';
import { BaseStore } from '@/store/baseStore';
import { HIGHLOAD_WALLET_ADDRESS } from '@/store/const';
import Utils from '@/utils';

const ls = new SecureLS();

type ModalContent = {
  isBuyVoucherActive: boolean;
  isErrorMessageActive: boolean;
  isNoMoneyMessageActive: boolean;
  isCaptchaActive: boolean;
  isCommissionActive: boolean;
  isCommissionCompletedActive: boolean;
  isTransactionInProgressActive: boolean;
  isCaptchaIncorrect: boolean;
  isNoMoreAvailableNftsOnStore: boolean;
};

export const initialVouchersPageModalContentState = {
  isBuyVoucherActive: false,
  isErrorMessageActive: false,
  isNoMoneyMessageActive: false,
  isCaptchaActive: false,
  isCommissionActive: false,
  isCommissionCompletedActive: false,
  isTransactionInProgressActive: false,
  isCaptchaIncorrect: false,
  isNoMoreAvailableNftsOnStore: false,
};

export class VouchersStore extends BaseStore {
  rootStore: RootStore;

  modalContent: ModalContent = initialVouchersPageModalContentState;
  voucherTooltips: VoucherAndNftTooltipItem[] = [];

  captchaResponse: null | Captcha = null;
  captchaPosition = 0;
  captchaSecondPosition = 0;
  captchaWord = '';
  isCaptchaCompleted = false;
  isCommissionCompleted = false;
  isTransactionCompleted = false;
  isTransactionInProgress = false;
  voucherStatus: 'pending' | null = null;
  currentVoucherBuyingId: null | number = null;
  isNowMoneyToPurchase = false;
  commissionWalletAddress = '';
  commissionValue = 0;
  commissionLockId: number | null = null;
  isCaptchaLoading = false;
  vouchers: Voucher[] | null = null;
  activeVoucher: VoucherItem | null = null;
  existingVouchers: Voucher[] = [];
  isBuyingVoucherButtonDisabled: boolean = false;
  isCommissionsPayButtonDisabled: boolean = false;
  isSuccessVoucherModalActive: boolean = false;
  isNftMintModalActive: boolean = false;

  mmproTokenInfo: MmproTokenResponse | MmproTokenCheckResponse | null = null;

  fetchCount = 0;

  checkStatusTimer: NodeJS.Timeout | undefined;
  checkTokenBuyingTimer: NodeJS.Timeout | undefined;
  checkBuyingCompleteTokenTimer: NodeJS.Timeout | undefined;

  constructor(rootStore: RootStore) {
    super();

    this.rootStore = rootStore;

    makeObservable(this, {
      voucherTooltips: observable,
      modalContent: observable,
      captchaResponse: observable,
      isCaptchaLoading: observable,
      captchaPosition: observable,
      captchaSecondPosition: observable,
      captchaWord: observable,
      isCaptchaCompleted: observable,
      isCommissionCompleted: observable,
      isTransactionCompleted: observable,
      isTransactionInProgress: observable,
      isNowMoneyToPurchase: observable,
      voucherStatus: observable,
      currentVoucherBuyingId: observable,
      commissionWalletAddress: observable,
      commissionValue: observable,
      commissionLockId: observable,
      vouchers: observable,
      activeVoucher: observable,
      existingVouchers: observable,
      isBuyingVoucherButtonDisabled: observable,
      isCommissionsPayButtonDisabled: observable,
      isSuccessVoucherModalActive: observable,
      fetchCount: observable,
      checkStatusTimer: observable,
      checkTokenBuyingTimer: observable,
      checkBuyingCompleteTokenTimer: observable,
      isNftMintModalActive: observable,
      mmproTokenInfo: observable,

      addVoucherTooltip: action,
      deleteVoucherTooltip: action,
      getVouchers: action,
      setModalContentActive: action,
      setIsTransactionInProgress: action,
      fetchCaptchaData: action,
      getCaptchaPosition: action,
      getCaptchaSecondPosition: action,
      postVerifyCaptcha: action,
      postVoucherPaymentComplete: action,
      rejectVoucherPayment: action,
      resetVoucherCheckStatusTimer: action,
      startCheckVoucherTransactionStatus: action,
      checkTransactionVoucherStatus: action,
      checkVoucherTransactionStatus: action,
      setActiveVoucher: action,
      setCommissionCompleted: action,
      getAllExistingVouchers: action,
      resetExistingVouchers: action,
      resetVoucherFromStorage: action,
      closeErrorAndSuccessVoucherModal: action,
      buyingVoucherButtonDisabled: action,
      commissionVoucherButtonDisabled: action,
      setIsNftMintModalActive: action,
      getMmproTokenInfo: action,
      resetMmproTokenInfo: action,
      buyMmproToken: action,
      startCheckTokenBuying: action,
      checkTokenBuying: action,
      buyToken: action,
      startCheckBuyingCompleteMmproToken: action,
      checkBuyingCompleteMmproToken: action,

      mmproTokenMarketPrice: computed,
      mmproTokenAmount: computed,
    });
  }

  addVoucherTooltip = ({
    title,
    type,
  }: {
    title: string;
    type: VoucherAndNftTooltipItemType;
  }) => (this.voucherTooltips = [{ id: Date.now(), title, type }]);

  deleteVoucherTooltip = (id: number) => {
    this.voucherTooltips = this.voucherTooltips.filter(
      (tooltip) => tooltip.id !== id,
    );
  };

  getVouchers = async () => {
    this.rootStore.fetchState = 'pending';
    this.rootStore.setIsLoading(true);

    try {
      const hash = this.rootStore.createHash([]);

      const vouchers = await fetchVouchers({ hash });

      if (this.rootStore.userStore.userInfo.nft.ogpass < 1) {
        this.vouchers = vouchers.filter((voucher) => voucher.nft_id !== 7);
      } else {
        this.vouchers = vouchers;
      }

      this.rootStore.fetchState = 'done';
      this.rootStore.setIsLoading(false);
    } catch (err) {
      console.error(ERROR_DURING_GET_VOUCHERS, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }

      this.rootStore.fetchState = 'error';
      this.rootStore.setIsLoading(false);
    }
  };

  setModalContentActive = (modalState: ModalContent) => {
    this.modalContent = modalState;
  };

  buyingVoucherButtonDisabled = (state: boolean) => {
    this.isBuyingVoucherButtonDisabled = state;
  };

  commissionVoucherButtonDisabled = (state: boolean) => {
    this.isCommissionsPayButtonDisabled = state;
  };

  setIsTransactionInProgress = (state: boolean) =>
    (this.isTransactionInProgress = state);

  fetchCaptchaData = async () => {
    this.isCaptchaLoading = true;

    if (!this.activeVoucher) {
      return;
    }

    try {
      this.buyingVoucherButtonDisabled(false);
      this.setIsTransactionInProgress(false);
      this.isNowMoneyToPurchase = false;

      const hash = this.rootStore.createHash([
        { nft_id: this.activeVoucher.id },
      ]);

      this.captchaResponse = await fetchCaptchaData({
        hash,
        nft_id: this.activeVoucher.id,
      });

      if ('verify' in this.captchaResponse && !this.captchaResponse.verify) {
        this.isCaptchaCompleted = true;

        this.setModalContentActive({
          ...initialVouchersPageModalContentState,
          isNoMoreAvailableNftsOnStore: true,
        });

        this.isCaptchaLoading = false;
        return false;
      }

      this.isCaptchaLoading = false;
      return true;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if ('response' in err && err.response?.data?.code === 420) {
          this.isNowMoneyToPurchase = true;
          this.setModalContentActive({
            ...initialVouchersPageModalContentState,
            isNoMoneyMessageActive: true,
          });
        }

        if ('response' in err && err.response?.data?.code === 401) {
          this.setIsTransactionInProgress(true);
        }

        console.error(ERROR_DURING_GET_CAPTCHA_DATA, err);
        this.rootStore.userStore.addErrorResponse(err);

        if (Utils.getErrorMessage(err)) {
          this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
        }
      } else {
        console.error(ERROR_DURING_GET_CAPTCHA_DATA, err);
      }

      this.isCaptchaLoading = false;
    }
  };

  getCaptchaPosition = (position: number) => {
    this.captchaPosition = position;
  };

  getCaptchaSecondPosition = (position: number) => {
    this.captchaSecondPosition = position;
  };

  postVerifyCaptcha = async ({
    walletAddress,
  }: {
    // word: string;
    walletAddress: string;
  }) => {
    // this.captchaWord = word;
    this.rootStore.userStore.userWalletAddress = walletAddress;

    if (!this.activeVoucher) {
      return;
    }

    const requestBody = {
      // captcha: this.captchaWord,
      nft_id: this.activeVoucher.id,
      position: this.captchaPosition,
      position2: this.captchaSecondPosition,
      wallet: this.rootStore.userStore.userWalletAddress,
    };

    const hashValues = Object.entries(requestBody).reduce<
      Record<string, string | number>[]
    >((acc, [key, value]) => {
      acc.push({ [key]: value });

      return acc;
    }, []);

    const hash = this.rootStore.createHash(hashValues);

    try {
      const response = await fetchVerifyCaptchaData({
        ...requestBody,
        hash,
      });

      if (response) {
        this.isCaptchaCompleted = true;
        this.commissionWalletAddress = response.address;
        this.commissionValue = response.price;
        this.commissionLockId = response.lock_id;

        this.rootStore.userStore.userInfo = {
          ...this.rootStore.userStore.userInfo,
          balance: response.balance,
          balance_block: response.balance_block,
        };

        this.setModalContentActive({
          ...initialVouchersPageModalContentState,
          isCommissionActive: true,
        });
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if ('response' in err && err.response?.data?.code === 400) {
          this.setModalContentActive({
            ...initialVouchersPageModalContentState,
            isNoMoneyMessageActive: true,
          });
        }

        if (
          'response' in err &&
          (err.response?.data?.code === 422 || err.response?.data?.code === 423)
        ) {
          this.setModalContentActive({
            ...initialVouchersPageModalContentState,
            isCaptchaIncorrect: true,
          });
        }

        console.error(ERROR_DURING_POST_CAPTCHA_DATA, err);
        this.rootStore.userStore.addErrorResponse(err);

        if (Utils.getErrorMessage(err)) {
          this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
        }
      } else {
        console.error(ERROR_DURING_POST_CAPTCHA_DATA, err);
      }
    }
  };

  postVoucherPaymentComplete = async ({
    txid,
    walletAddress,
  }: {
    txid: string;
    walletAddress: string;
  }) => {
    if (!this.activeVoucher) return;
    if (!this.commissionLockId) return;

    this.rootStore.userStore.userWalletAddress = walletAddress;

    try {
      const hash = this.rootStore.createHash([
        { address: walletAddress },
        { lock_id: this.commissionLockId },
        { nft_id: this.activeVoucher.id },
        { txid },
      ]);

      const response = await postVoucherPaymentComplete({
        address: walletAddress,
        hash,
        nft_id: this.activeVoucher.id,
        lock_id: this.commissionLockId,
        txid,
      });

      if (response) {
        this.rootStore.userStore.userInfo.current_nft_id_farming =
          response.current_nft_id_farming;
      }

      if (response && response.status === 'pending') {
        this.voucherStatus = 'pending';
        this.buyingVoucherButtonDisabled(true);
      }
    } catch (err) {
      console.error('err', err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }
  };

  rejectVoucherPayment = async ({ lockId }: { lockId: number }) => {
    if (!this.activeVoucher) return;
    if (!lockId) return;

    try {
      const hash = this.rootStore.createHash([
        { lock_id: lockId },
        { nft_id: this.activeVoucher.id },
      ]);

      const response = await postVoucherPaymentError({
        hash,
        lock_id: lockId,
        nft_id: this.activeVoucher.id,
      });

      if (response) {
        this.rootStore.userStore.userInfo = {
          ...this.rootStore.userStore.userInfo,
          balance: response.balance,
        };
      }
    } catch (err) {
      console.error(ERROR_DURING_REJECT_BUY_VOUCHER_BY_POINTS, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }
  };

  checkVoucherTransactionStatus = async ({
    navigateFn,
  }: {
    navigateFn?: () => void;
  } = {}) => {
    const startTime = ls.get('startVoucherBuyingSecure');
    const voucherId = ls.get('secureCurrentVoucherIdBuying');
    const lockId = ls.get('secureCurrentLockId');

    if (!startTime || !voucherId) {
      return;
    }

    try {
      const hash = this.rootStore.createHash([{ nft_id: voucherId }]);

      const response = await checkVoucherMintStatus({
        hash,
        nft_id: voucherId,
      });

      if (response && response.status === 3) {
        const title = this.vouchers?.find(
          (voucher) => voucher.id === voucherId,
        )?.name;

        await this.getAllExistingVouchers();
        this.isTransactionCompleted = true;

        this.setModalContentActive(initialVouchersPageModalContentState);
        this.setCommissionCompleted(false);

        if (title) {
          this.addVoucherTooltip({
            title,
            type: response.nft_id === 7 ? 'extraNftBuy' : 'voucherBuy',
          });

          /** если нфт OG Pass, то идем на главную страницу */
          if (response.nft_id === 7 && navigateFn) {
            navigateFn();
            this.rootStore.setIsWalletButtonVisible(false);

            setTimeout(() => {
              this.rootStore.userStore.userInfo = {
                ...this.rootStore.userStore.userInfo,
                balance: response.balance,
              };
            }, 10_000);
          }
        }

        this.resetVoucherCheckStatusTimer();

        return;
      }

      if (response && response.status === 4) {
        await this.rejectVoucherPayment({ lockId });
        this.resetVoucherCheckStatusTimer();

        this.setModalContentActive({
          ...initialVouchersPageModalContentState,
          isErrorMessageActive: true,
        });

        return;
      }

      if (startTime && Number(startTime) + 1200 < this.rootStore.timeNow) {
        this.resetVoucherCheckStatusTimer();

        this.setModalContentActive({
          ...initialVouchersPageModalContentState,
          isErrorMessageActive: true,
        });
      }
    } catch (err) {
      console.error(ERROR_DURING_CHECK_VOUCHER_STATUS, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }
  };

  resetVoucherCheckStatusTimer = () => {
    clearInterval(this.checkStatusTimer);
    this.checkStatusTimer = undefined;

    this.setIsTransactionInProgress(false);
    this.rootStore.userStore.userInfo.current_nft_id_farming = null;
    this.voucherStatus = null;
    this.resetVoucherFromStorage();
    this.setIsNftMintModalActive(false);
  };

  startCheckVoucherTransactionStatus = ({
    navigateFn,
  }: {
    navigateFn: () => void;
  }) => {
    if (this.checkStatusTimer) return;

    this.checkStatusTimer = setInterval(
      () =>
        this.checkVoucherTransactionStatus({
          navigateFn,
        }),
      1000 * 30,
    );
  };

  setActiveVoucher = (voucher: VoucherItem) => {
    this.activeVoucher = voucher;
  };

  setCommissionCompleted = (state: boolean) => {
    this.isCommissionCompleted = state;
  };

  checkTransactionVoucherStatus = async ({
    navigateFn,
  }: {
    navigateFn: () => void;
  }) => {
    const hash = this.rootStore.createHash([]);
    const startTime = ls.get('startVoucherBuyingSecure');

    try {
      const response = await checkTransactionVoucherStatus({ hash });

      if (response) {
        this.rootStore.userStore.userInfo.current_nft_id_farming =
          response.nft_id;

        if (response.exists) {
          this.startCheckVoucherTransactionStatus({ navigateFn });
        }

        if (!response.exists && startTime) {
          this.resetVoucherCheckStatusTimer();
        }
      }
    } catch (err) {
      console.error(err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }
  };

  getAllExistingVouchers = async () => {
    const hash = this.rootStore.createHash([]);
    this.rootStore.setIsLoading(true);

    try {
      const response = await fetchAlExistingVouchers({ hash });

      if (response) {
        const vouchers: Voucher[] = [];

        response.forEach((voucherResponse) => {
          vouchers.push({
            id: voucherResponse.nft_id,
            name: voucherResponse.name,
            image: voucherResponse.image,
            price: voucherResponse.price,
          });
        });

        this.existingVouchers = [...vouchers];
      }

      this.rootStore.setIsLoading(false);
    } catch (err) {
      console.error(ERROR_DURING_GET_ALL_EXISTING_VOUCHERS, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }

      this.rootStore.setIsLoading(false);
      throw err;
    }
  };

  resetExistingVouchers = () => {
    this.existingVouchers = [];
  };

  resetVoucherFromStorage = () => {
    ls.remove('startVoucherBuyingSecure');
    ls.remove('secureCurrentVoucherIdBuying');
    ls.remove('secureCurrentTransactionHash');
    ls.remove('secureCurrentLockId');
    this.buyingVoucherButtonDisabled(false);
  };

  closeErrorAndSuccessVoucherModal = () => {
    // this.isErrorVoucherModalActive = false;
    this.isSuccessVoucherModalActive = false;
  };

  setIsNftMintModalActive = (state: boolean) =>
    (this.isNftMintModalActive = state);

  getMmproTokenInfo = async () => {
    const hash = this.rootStore.createHash([]);

    try {
      this.mmproTokenInfo = await infoMmproToken({ hash });
    } catch (err) {
      console.error(ERROR_DURING_FETCH_MMPRO_TOKEN_INFO, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }

      this.rootStore.setIsLoading(false);
    }
  };

  resetMmproTokenInfo = () => (this.mmproTokenInfo = null);

  buyMmproToken = async ({
    amount,
    tonConnectUI,
    walletAddress,
  }: {
    amount: number;
    tonConnectUI: TonConnectUI;
    walletAddress: string;
  }) => {
    try {
      const nanoAmount = toNano(amount).toString();
      const tx = {
        validUntil: Math.floor(Date.now() / 1000) + 60,
        messages: [
          {
            address: HIGHLOAD_WALLET_ADDRESS,
            amount: nanoAmount,
          },
        ],
      };

      this.rootStore.nftsStore.transactionStatus = 'processing';
      const transactionResult = await tonConnectUI.sendTransaction(tx, {
        returnStrategy: 'back',
      });

      this.rootStore.nftsStore.setIsModalOpen(true);

      if (transactionResult) {
        this.rootStore.nftsStore.transactionStatus = 'fulfilled';

        const hash = await TonWeb.boc.Cell.oneFromBoc(
          TonWeb.utils.base64ToBytes(transactionResult.boc),
        ).hash();
        this.rootStore.nftsStore.transactionId = TonWeb.utils.bytesToHex(hash);

        this.rootStore.nftsStore.paymentStatus = 'processing';

        /** делаем сразу запрос на бек о начале покупки токена */
        const hashRequest = this.rootStore.createHash([
          { address: walletAddress },
          { ton: amount.toString() },
          { txid: this.rootStore.nftsStore.transactionId },
        ]);

        const { request_id } = await buyMmproToken({
          address: walletAddress,
          ton: amount.toString() as '1' | '10' | '50',
          txid: this.rootStore.nftsStore.transactionId,
          hash: hashRequest,
        });

        ls.set('startBuyingMmproTokenSecure', this.rootStore.timeNow); // записываем время начала транзакции
        ls.set(
          'buyMmproTokenTransactionIdSecure',
          this.rootStore.nftsStore.transactionId,
        ); // записываем ID транзакции
        ls.set('tokenAmountSecure', amount); // записываем сумму покупки
        ls.set('checkBuyingCompleteMmproTokenRequestIdSecure', request_id); // записываем ID запроса

        this.startCheckTokenBuying({ walletAddress }); // начинаем проверять tonApi на предмет окончания транзакции
      }
    } catch (err) {
      this.rootStore.vouchersStore.setModalContentActive({
        ...initialVouchersPageModalContentState,
        isErrorMessageActive: true,
      });
      this.rootStore.nftsStore.transactionStatus = 'rejected';
      console.error(ERROR_DURING_PAY_COMMISSION_OF_MMPRO_TOKEN, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }
  };

  startCheckTokenBuying = ({ walletAddress }: { walletAddress: string }) => {
    if (this.checkTokenBuyingTimer) return;

    this.checkTokenBuyingTimer = setInterval(
      () => this.checkTokenBuying({ walletAddress }),
      1000 * 10,
    );
  };

  checkTokenBuying = async ({ walletAddress }: { walletAddress: string }) => {
    const startTime = ls.get('startBuyingMmproTokenSecure');
    const transactionId = ls.get('buyMmproTokenTransactionIdSecure');

    const resetTimer = () => {
      clearInterval(this.checkTokenBuyingTimer);
      this.checkTokenBuyingTimer = undefined;
    };

    /**если в LS нет времени начала покупки */
    if (!startTime || !transactionId) {
      resetTimer();
      return;
    }

    try {
      /**если прошло более 15 минут, то убиваем проверку */
      if (Number(startTime) + 900 < this.rootStore.timeNow) {
        resetTimer();
        this.rootStore.nftsStore.paymentStatus = 'rejected';
        return;
      }

      const tonApiTransactionResponse = await fetchTonApiTransactionStatus({
        txid: transactionId,
      });

      if (tonApiTransactionResponse.success) {
        this.fetchCount = 0;
        resetTimer();
        this.buyToken({ walletAddress });
      }
    } catch (err) {
      /** проверяем 900с (15мин),
       * тк tonApi выдает `{"error":"entity not found"}` */
      if (this.fetchCount < 180) {
        this.fetchCount++;
        return;
      }

      resetTimer();
      this.rootStore.nftsStore.paymentStatus = 'rejected';

      console.error(ERROR_DURING_CHECK_BUYING_OF_MMPRO_TOKEN, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }

      this.fetchCount = 0;
    }
  };

  buyToken = ({ walletAddress }: { walletAddress: string }) => {
    const ton = ls.get('tokenAmountSecure');
    const txid = ls.get('buyMmproTokenTransactionIdSecure');

    if (!ton || !txid) {
      this.rootStore.nftsStore.paymentStatus = 'rejected';
      return;
    }

    ls.set('startCheckBuyingCompleteMmproTokenSecure', this.rootStore.timeNow); // записываем время начала транзакции

    this.startCheckBuyingCompleteMmproToken(); // начинаем проверять бек на предмет окончания покупки токена
  };

  startCheckBuyingCompleteMmproToken = () => {
    if (this.checkBuyingCompleteTokenTimer) return;

    this.checkBuyingCompleteTokenTimer = setInterval(
      () => this.checkBuyingCompleteMmproToken(),
      1000 * 5,
    );
  };

  checkBuyingCompleteMmproToken = async () => {
    const startTime = ls.get('startCheckBuyingCompleteMmproTokenSecure');
    const requestId = ls.get('checkBuyingCompleteMmproTokenRequestIdSecure');

    const resetTimer = () => {
      clearInterval(this.checkBuyingCompleteTokenTimer);
      this.checkBuyingCompleteTokenTimer = undefined;

      ls.remove('startBuyingMmproTokenSecure');
      ls.remove('buyMmproTokenTransactionIdSecure');
      ls.remove('tokenAmountSecure');
      ls.remove('checkBuyingCompleteMmproTokenRequestIdSecure');
      ls.remove('startCheckBuyingCompleteMmproTokenSecure');
    };

    /**если в LS нет времени начала покупки */
    if (!startTime || !requestId) {
      resetTimer();
      return;
    }

    const hash = this.rootStore.createHash([{ request_id: requestId }]);

    try {
      /**если прошло более 15 минут, то убиваем проверку */
      if (Number(startTime) + 900 < this.rootStore.timeNow) {
        resetTimer();
        this.rootStore.nftsStore.paymentStatus = 'rejected';
        return;
      }

      const response = await checkMmproToken({
        request_id: requestId,
        hash,
      });

      if (response.result === 1) {
        this.rootStore.nftsStore.paymentStatus = 'fulfilled';
        this.mmproTokenInfo = response;
        resetTimer();
      }
    } catch (err) {
      /** проверяем 10min,
       * тк tonApi выдает `{"error":"entity not found"}` */
      if (this.fetchCount < 120) {
        this.fetchCount++;
        return;
      }

      resetTimer();

      console.error(ERROR_DURING_CHECK_BUYING_MMPRO_TOKEN, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }

      this.rootStore.nftsStore.paymentStatus = 'rejected';
    }
  };

  get mmproTokenMarketPrice() {
    if (!this.mmproTokenInfo) return 0;

    return Number(
      (this.mmproTokenInfo.kurs.ton / this.mmproTokenInfo.kurs.mmpro).toFixed(
        2,
      ),
    );
  }

  get mmproTokenAmount() {
    return this.mmproTokenInfo ? this.mmproTokenInfo.amount.toFixed(2) : '0';
  }
}
