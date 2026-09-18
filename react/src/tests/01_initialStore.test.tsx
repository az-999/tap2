import { initialVouchersPageModalContentState } from '@/pages/Vouchers/store';
import rootStore, { RootStore } from '@/store';
import { DEFAULT_USER_INFO } from '@/store/const';

describe('InitialStateStore', () => {
  let store: RootStore;

  beforeEach(() => {
    store = rootStore;
  });

  it('Проверка дефолтных значений стора', () => {
    expect(store.fetchState).toEqual('done');
    expect(store.isLoading).toEqual(false);
    expect(store.timeNow).toEqual(0);
    expect(store.isShowWinTooltip).toEqual(false);
    expect(store.isShowInfoTooltip).toEqual(false);
    expect(store.isVibrateActive).toEqual(true);
    expect(store.isWalletButtonVisible).toEqual(false);
    expect(store.errorTooltips).toEqual([]);

    expect(store.appVersionStore.version).toEqual(null);
    expect(store.appVersionStore.isFirstStart).toEqual(false);
    expect(store.appVersionStore.isNewVersionPopupVisible).toEqual(false);
    expect(store.appVersionStore.isReloadPageNeeded).toEqual(false);

    expect(store.userStore.token).toEqual('');
    expect(store.userStore.isAppReady).toEqual(false);
    expect(store.userStore.userInfo).toEqual(DEFAULT_USER_INFO);
    expect(store.userStore.grantAmount).toEqual(0);
    expect(store.userStore.userWalletAddress).toEqual('');
    expect(store.userStore.isGrantRewardModalVisible).toEqual(false);
    expect(store.userStore.isGrantBoxVisible).toEqual(false);
    expect(store.userStore.userInitData).toEqual(null);
    expect(store.userStore.apiResponses).toEqual([]);

    expect(store.tapperStore.farmLimit).toEqual(0);
    expect(store.tapperStore.tapCount).toEqual(0);
    expect(store.tapperStore.tapCount).toEqual(0);
    expect(store.tapperStore.time).toEqual(0);
    expect(store.tapperStore.cleanFarm).toEqual(0);
    expect(store.tapperStore.isStartMoon).toEqual(false);
    expect(store.tapperStore.isActiveMoon).toEqual(false);
    expect(store.tapperStore.moonWin).toEqual('');
    expect(store.tapperStore.tapShadowCount).toEqual(0);
    expect(store.tapperStore.tapShadowBoost).toEqual(1);
    expect(store.tapperStore.maxShadow).toEqual(88);
    expect(store.tapperStore.maxShadowBoost).toEqual(8);
    expect(store.tapperStore.debugCountTaps).toEqual(0);

    expect(store.boostersStore.boosterTime).toEqual(null);

    expect(store.friendsStore.friends).toEqual(null);
    expect(store.friendsStore.friendsClaim).toEqual(0);
    expect(store.friendsStore.claimSum).toEqual(null);
    expect(store.friendsStore.offset).toEqual(0);
    expect(store.friendsStore.friendsCount).toEqual(0);

    expect(store.ratingStore.rating).toEqual(null);

    expect(store.tasksStore.tasks).toEqual(null);
    expect(store.tasksStore.possibleTasks).toEqual(null);
    expect(store.tasksStore.expiredTasks).toEqual([]);
    expect(store.tasksStore.archiveTasks).toEqual(null);
    expect(store.tasksStore.taskClaim).toEqual(0);
    expect(store.tasksStore.isConfettiExploding).toEqual(false);
    expect(store.tasksStore.isShowTooltip).toEqual(false);
    expect(store.tasksStore.currentCompletedTask).toEqual(null);
    expect(store.tasksStore.isExtraTaskModalVisible).toEqual(false);
    expect(store.tasksStore.grantDay).toEqual(null);
    expect(store.tasksStore.receiveDailyRewardsCurrentDay).toEqual(0);
    expect(store.tasksStore.timeUntilTheNextReward).toEqual(null);
    expect(store.tasksStore.rewardAmount).toEqual(0);
    /*expect(store.tasksStore.isMonthPrizeTooltipVisible).toEqual(false);*/
    expect(store.tasksStore.isMonthPrizeTooltipWithButtonVisible).toEqual(
      false,
    );
    expect(store.tasksStore.actualPrize).toEqual(null);

    expect(store.vouchersStore.modalContent).toEqual(
      initialVouchersPageModalContentState,
    );
    expect(store.vouchersStore.voucherTooltips).toEqual([]);
    expect(store.vouchersStore.captchaResponse).toEqual(null);
    expect(store.vouchersStore.captchaPosition).toEqual(0);
    expect(store.vouchersStore.captchaSecondPosition).toEqual(0);
    expect(store.vouchersStore.captchaWord).toEqual('');
    expect(store.vouchersStore.isCaptchaCompleted).toEqual(false);
    expect(store.vouchersStore.isCommissionCompleted).toEqual(false);
    expect(store.vouchersStore.isTransactionCompleted).toEqual(false);
    expect(store.vouchersStore.isTransactionInProgress).toEqual(false);
    expect(store.vouchersStore.voucherStatus).toEqual(null);
    expect(store.vouchersStore.currentVoucherBuyingId).toEqual(null);
    expect(store.vouchersStore.isNowMoneyToPurchase).toEqual(false);
    expect(store.vouchersStore.commissionWalletAddress).toEqual('');
    expect(store.vouchersStore.commissionValue).toEqual(0);
    expect(store.vouchersStore.isCaptchaLoading).toEqual(false);
    expect(store.vouchersStore.vouchers).toEqual(null);
    expect(store.vouchersStore.activeVoucher).toEqual(null);
    expect(store.vouchersStore.existingVouchers).toEqual([]);
    expect(store.vouchersStore.isBuyingVoucherButtonDisabled).toEqual(false);
    expect(store.vouchersStore.isCommissionsPayButtonDisabled).toEqual(false);
    expect(store.vouchersStore.isSuccessVoucherModalActive).toEqual(false);
    expect(store.vouchersStore.isNftMintModalActive).toEqual(false);

    expect(store.nftsStore.nftsOnMarketplace).toEqual(null);
    expect(store.nftsStore.collection).toEqual(null);
    expect(store.nftsStore.nextNftsOnMarketplaceId).toEqual(0);
    expect(store.nftsStore.isGridViewActive).toEqual(true);
    expect(store.nftsStore.activeNft).toEqual(null);
    expect(store.nftsStore.tonApiNftInfo).toEqual(null);
    expect(store.nftsStore.nftHistory).toEqual(null);
    expect(store.nftsStore.existingNfts).toEqual(null);
    expect(store.nftsStore.saleId).toEqual(null);
    expect(store.nftsStore.saleAddress).toEqual('');
    expect(store.nftsStore.saleNftItem).toEqual(null);
    expect(store.nftsStore.transactionId).toEqual('');
    expect(store.nftsStore.searchValue).toEqual('');
    expect(store.nftsStore.sortRule).toEqual(undefined);
    expect(store.nftsStore.isNftImageTooltipOpen).toEqual(false);
    expect(store.nftsStore.isSubmitButtonDisabled).toEqual(false);
    expect(store.nftsStore.transactionStatus).toEqual('pending');
    expect(store.nftsStore.paymentStatus).toEqual('pending');
    expect(store.nftsStore.isModalOpen).toEqual(false);
    expect(store.nftsStore.isNftsOnMarketplaceSortedByNameTitleFromUp).toEqual(
      null,
    );
    expect(store.nftsStore.isNftsOnMarketplaceSortedByPriceFromUp).toEqual(
      null,
    );

    expect(store.shipsStore.partShipNfts).toEqual(null);
    expect(store.shipsStore.shipNfts).toEqual(null);
    expect(store.shipsStore.firstSelectedShip).toEqual(null);
    expect(store.shipsStore.secondSelectedShip).toEqual(null);
    expect(store.shipsStore.selectShipTooltipIndex).toEqual(null);
    expect(store.shipsStore.selectPartShipTooltipIndex).toEqual(null);
    expect(store.shipsStore.shipsPartsToCombineShips).toEqual(null);
    expect(store.shipsStore.isCraftShipRequestLoading).toEqual(false);
    expect(store.shipsStore.isCraftShipLoading).toEqual(false);
    expect(store.shipsStore.isCraftShipSuccess).toEqual(false);
    expect(store.shipsStore.isCraftShipError).toEqual(false);
    expect(store.shipsStore.isCraftShipGetgemsError).toEqual(false);
    expect(store.shipsStore.isCrossShipsModalActive).toEqual(false);
    expect(store.shipsStore.isSelectShipsTooltipVisible).toEqual(false);
    expect(store.shipsStore.isSelectPartsShipTooltipVisible).toEqual(false);
    expect(store.shipsStore.craftShipGetgemsErrorBody).toEqual(null);
    expect(store.shipsStore.checkCraftShipStatusTimer).toEqual(undefined);

    expect(store.trustWalletStore.isTrustWalletTaskPosted).toEqual(false);
    expect(store.trustWalletStore.isErrorDuringTrustWalletTaskPosted).toEqual(
      false,
    );
  });
});
