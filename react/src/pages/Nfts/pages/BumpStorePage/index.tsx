import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SecureLS from 'secure-ls';
import TonWeb from 'tonweb';

import LoadingIcon from '@/assets/LoadingIcon';

import Modal from '@/components/Modal';
import UnavailablePage from '@/components/UnavailablePage';

import lootboxImage from '@/pages/Nfts/assets/lootbox.png';
import mmproImage from '@/pages/Nfts/assets/mmpro-banner-image.png';
import starWarsImage from '@/pages/Nfts/assets/starWarsImg.png';
import ProcessingContent from '@/pages/Nfts/components/ProcessingContent';
import {
  BumpStoreWrapper,
  LoadingContainer,
} from '@/pages/Nfts/pages/BumpStorePage/styled';
import PurchaseRulesModal from '@/pages/Ships/pages/ShipsCraftPage/components/PurchaseRulesModal';
import Captcha from '@/pages/Vouchers/Components/Captcha';
import InsufficientFunds from '@/pages/Vouchers/Components/InsufficientFunds';
import BuyVoucherContent from '@/pages/Vouchers/Components/ModalsContent/BuyVoucherContent';
import CommissionCompletedContent from '@/pages/Vouchers/Components/ModalsContent/CommissionCompletedContent';
import PayCommissionContent from '@/pages/Vouchers/Components/ModalsContent/PayCommissionContent';
import Voucher from '@/pages/Vouchers/Components/Voucher';
import { initialVouchersPageModalContentState } from '@/pages/Vouchers/store';
import { VoucherItem, Voucher as VoucherType } from '@/pages/Vouchers/types';
import { ERROR_DURING_START_BUY_VOUCHER_BY_POINTS } from '@/services/constants/errorMessages';
import rootStore from '@/store';
import { RootPath } from '@/types/routes';

const ls = new SecureLS();

const BumpStorePage = () => {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonAddress();
  const walletAddress = useTonAddress();
  const navigate = useNavigate();

  const {
    vouchersStore: {
      vouchers,
      getVouchers,
      getAllExistingVouchers,
      resetExistingVouchers,
      isSuccessVoucherModalActive,
      checkTransactionVoucherStatus,
      closeErrorAndSuccessVoucherModal,
      isBuyingVoucherButtonDisabled,
      fetchCaptchaData,
      setActiveVoucher,
      setModalContentActive,
      activeVoucher,

      captchaResponse,
      isTransactionInProgress,
      isNowMoneyToPurchase,
      commissionWalletAddress,
      commissionValue,
      commissionLockId,
      postVoucherPaymentComplete,
      startCheckVoucherTransactionStatus,
      setCommissionCompleted,
      commissionVoucherButtonDisabled,
      rejectVoucherPayment,
      setIsTransactionInProgress,
      setIsNftMintModalActive,

      resetMmproTokenInfo,
      buyMmproToken,
      startCheckTokenBuying,

      modalContent: {
        isNoMoneyMessageActive,
        isErrorMessageActive,
        isCaptchaActive,
        isCommissionActive,
        isBuyVoucherActive,
        isCaptchaIncorrect,
        isTransactionInProgressActive,
        isCommissionCompletedActive,
        isNoMoreAvailableNftsOnStore,
      },
    },
    userStore: {
      isWalletInvalid,
      userInfo: {
        nft: { bumpstore, spaceshipparts, pirate, voucher, mmprotoken },
      },
    },
    shipsStore: { startCheckMarkBuying, isPiracyActive, isDefenseActive },
    nftsStore: { isModalOpen },
    timeNow,
    isLoading,
    setIsWalletButtonVisible,
  } = rootStore;

  useEffect(() => {
    if (!vouchers) {
      getVouchers().catch((e) => console.error(e));
    }
  }, []);

  /** делаем запрос для всех сущ ваучеров
   *
   * если нет кошелька или мы только что вышли из него,
   * то очищаем купленные ваучеры */
  useEffect(() => {
    if (wallet && !isBuyingVoucherButtonDisabled) {
      getAllExistingVouchers().catch((e) => console.error(e));
    }

    if (!wallet) {
      resetExistingVouchers();
    }
  }, [wallet, isBuyingVoucherButtonDisabled]);

  /** проверяем, дождались мы выпуска нфт за поинты,
   * если нет, то продолжаем */
  useEffect(() => {
    if (!wallet) return;

    startCheckTokenBuying({ walletAddress: wallet });
    startCheckMarkBuying();
    checkTransactionVoucherStatus({
      navigateFn: () => navigate(RootPath.base),
    }).catch((e) => console.error(e));
  }, [wallet]);

  const isPurchaseMessageModalVisible =
    isErrorMessageActive ||
    isSuccessVoucherModalActive ||
    isNoMoneyMessageActive ||
    isCaptchaIncorrect;

  const handleBuyVoucherButtonClick = async (voucher: VoucherItem) => {
    if (isWalletInvalid) return;

    setActiveVoucher(voucher);

    /** если у нас есть в ls сохраненная нфт и id выбранной совпадает с нею,
     * то открывает модалку с инфой о покупке */
    if (
      ls.get('secureCurrentVoucherIdBuying') &&
      voucher.id === ls.get('secureCurrentVoucherIdBuying')
    ) {
      setModalContentActive({
        ...initialVouchersPageModalContentState,
        isCommissionCompletedActive: true,
      });

      return;
    }

    /** если у нас есть в ls сохраненная нфт и id выбранной не совпадает с нею,
     * то выводим сообщение (открываем модалку) что у нас пока что заблочена сумма
     * иначе запускаем капчу */
    if (
      ls.get('secureCurrentVoucherIdBuying') &&
      voucher.id !== ls.get('secureCurrentVoucherIdBuying')
    ) {
      setIsTransactionInProgress(true);

      setModalContentActive({
        ...initialVouchersPageModalContentState,
        isTransactionInProgressActive: true,
      });
    } else {
      if (wallet) {
        const isCaptchaActive = await fetchCaptchaData();

        /** проверяем, что ответ капчи не дал ошибку
         * (что не закончилось кол-во доступных покупок),
         * если да, то выкидываем модалку о доступный 5 nft на по-ля*/

        if (!isCaptchaActive) return;
      }

      setModalContentActive({
        ...initialVouchersPageModalContentState,
        isBuyVoucherActive: true,
      });
    }
  };

  const handleStarWarsButtonClick = (voucher: VoucherItem) => {
    if (isWalletInvalid) return;

    setActiveVoucher(voucher);
    setModalContentActive({
      ...initialVouchersPageModalContentState,
      isBuyVoucherActive: true,
    });
  };

  const handleMmproButtonClick = (voucher: VoucherItem) => {
    if (isWalletInvalid) return;

    setActiveVoucher(voucher);
    setModalContentActive({
      ...initialVouchersPageModalContentState,
      isBuyVoucherActive: true,
    });
  };

  const handleModalClose = () => {
    setModalContentActive(initialVouchersPageModalContentState);
    setCommissionCompleted(false);
    closeErrorAndSuccessVoucherModal();
    resetMmproTokenInfo();
  };

  const handleCommissionModalClose = () => {
    setIsNftMintModalActive(true);
    handleModalClose();
  };

  const handleCaptureModalOpen = () => {
    /** если у нас уже висит заблоченная сумма в транзакции, ты выводим сообщение */
    if (isTransactionInProgress) {
      setModalContentActive({
        ...initialVouchersPageModalContentState,
        isTransactionInProgressActive: true,
      });

      return;
    }

    /** если не хватает денег, ты выводим сообщение */
    if (isNowMoneyToPurchase) {
      setModalContentActive({
        ...initialVouchersPageModalContentState,
        isNoMoneyMessageActive: true,
      });

      return;
    }

    if (!captchaResponse) {
      return;
    }

    /** если получили ответ от запроса капчи */
    if (captchaResponse) {
      /** если капча нужна, то переходим в модалку для прохождения капчи */
      if (captchaResponse.verify) {
        commissionVoucherButtonDisabled(false);

        setModalContentActive({
          ...initialVouchersPageModalContentState,
          isCaptchaActive: true,
        });

        return;
      }

      /** если капча уже пройдена, то переходим в модалку для опллаты комиссии
       * ф-л удален, капча проходится всегда */
    }
  };

  const handlePayCommissionButtonClick = () => {
    if (!activeVoucher) return;
    if (!commissionLockId) return;

    setIsWalletButtonVisible(true);
    commissionVoucherButtonDisabled(true);

    setModalContentActive(initialVouchersPageModalContentState);

    const myTransaction = {
      validUntil: timeNow + 360, // 6 минут для выполнения транзакции
      messages: [
        {
          address: commissionWalletAddress,
          amount: commissionValue.toString(),
        },
      ],
    };

    tonConnectUI
      .sendTransaction(myTransaction)
      .then(async (transactionResult) => {
        const hash = await TonWeb.boc.Cell.oneFromBoc(
          TonWeb.utils.base64ToBytes(transactionResult.boc),
        ).hash();
        const txid = TonWeb.utils.bytesToHex(hash);

        await postVoucherPaymentComplete({ txid, walletAddress });

        ls.set('startVoucherBuyingSecure', timeNow);
        ls.set('secureCurrentVoucherIdBuying', activeVoucher.id);
        ls.set('secureCurrentTransactionHash', txid);
        ls.set('secureCurrentLockId', commissionLockId);

        startCheckVoucherTransactionStatus({
          navigateFn: () => navigate(RootPath.base),
        });
        setCommissionCompleted(true);

        setModalContentActive({
          ...initialVouchersPageModalContentState,
          isCommissionCompletedActive: true,
        });
      })
      .catch((err) => {
        rejectVoucherPayment({ lockId: commissionLockId }).catch((e) =>
          console.error(e),
        );

        ls.remove('secureCurrentVoucherIdBuying');
        setModalContentActive({
          ...initialVouchersPageModalContentState,
          isErrorMessageActive: true,
        });

        console.error(ERROR_DURING_START_BUY_VOUCHER_BY_POINTS, err);
      });
  };

  const handleBuyMmproTokenButtonClick = async (price: number) => {
    if (!activeVoucher) return;

    setIsWalletButtonVisible(true);
    setModalContentActive(initialVouchersPageModalContentState);
    await buyMmproToken({ amount: price, tonConnectUI, walletAddress });
  };

  if (
    bumpstore < 1 ||
    (spaceshipparts < 1 && pirate < 1 && voucher < 1 && mmprotoken < 1)
  )
    return <UnavailablePage type="bumpStore" />;

  return isLoading ? (
    <LoadingContainer>
      <LoadingIcon />
    </LoadingContainer>
  ) : (
    <BumpStoreWrapper>
      {mmprotoken > 0 && (
        <Voucher
          voucher={{
            id: 30 * 10 ** 6 + 1,
            name: 'MMPro Token',
            image: mmproImage,
            price: 0,
            comission: 0,
            nft_id: 0,
          }}
          type="forPurchase"
          onBuyVoucherClick={handleMmproButtonClick}
        />
      )}

      {pirate > 0 && (!isDefenseActive || !isPiracyActive) && (
        <Voucher
          voucher={{
            id: 30 * 10 ** 6 + 2,
            name: 'Star Wars',
            image: starWarsImage,
            price: 0,
            comission: 0,
            nft_id: 0,
          }}
          type="forPurchase"
          onBuyVoucherClick={handleStarWarsButtonClick}
        />
      )}

      {vouchers?.map((voucher: VoucherType) => {
        return (
          <Voucher
            key={`${voucher.id}-shop`}
            voucher={voucher}
            type="forPurchase"
            onBuyVoucherClick={handleBuyVoucherButtonClick}
          />
        );
      })}

      <Modal
        isActive={isBuyVoucherActive}
        onClose={handleModalClose}
        withoutHeader={
          activeVoucher?.nft_id === 7 ||
          activeVoucher?.name === 'MMPro Token' ||
          activeVoucher?.name === 'Star Wars'
        }
      >
        <BuyVoucherContent
          onBuyByPoints={handleCaptureModalOpen}
          isDisabled={isBuyingVoucherButtonDisabled}
          onModalClose={handleModalClose}
        />
      </Modal>
      <Modal isActive={isCommissionActive} onClose={handleModalClose}>
        <PayCommissionContent
          onBuyToken={handleBuyMmproTokenButtonClick}
          onPayCommission={handlePayCommissionButtonClick}
        />
      </Modal>
      <Modal
        isActive={isCommissionCompletedActive}
        onClose={() => null}
        withoutCloseButton={true}
      >
        <CommissionCompletedContent onClose={handleCommissionModalClose} />
      </Modal>
      <Modal
        isActive={
          isPurchaseMessageModalVisible || isTransactionInProgressActive
        }
        onClose={handleModalClose}
      >
        <InsufficientFunds isError={isErrorMessageActive} />
      </Modal>
      <Modal isActive={isCaptchaActive} onClose={handleModalClose}>
        <Captcha onModalClose={handleModalClose} />
      </Modal>
      <Modal isActive={isNoMoreAvailableNftsOnStore} onClose={handleModalClose}>
        <PurchaseRulesModal />
      </Modal>

      <Modal
        isActive={isModalOpen}
        onClose={() => null}
        withoutCloseButton={true}
      >
        <ProcessingContent />
      </Modal>
    </BumpStoreWrapper>
  );
};

export default observer(BumpStorePage);
