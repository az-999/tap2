import { toNano } from '@ton/core';
import { TonConnectUI } from '@tonconnect/ui-react';
import axios from 'axios';
import { action, computed, makeObservable, observable, toJS } from 'mobx';
import SecureLS from 'secure-ls';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import TonWeb from 'tonweb';

import nprogressInstance from '@/nprogressInstance';
import {
  checkTransactionTonApiNft,
  fetchTonApiNftOnMarketplace,
} from '@/pages/Nfts/api';
import {
  CheckTransactionTonApiResponse,
  NftMarketplace,
} from '@/pages/Nfts/types';
import {
  buyPirateMark,
  checkPirateMark,
  craftShip,
  fetchPirateInfo,
  fetchTonApiTransactionStatus,
  finishPirateMission,
  mergeShips,
  pirateOfferAccept,
  saveCraftedShip,
  startPirateMission,
  upgradeShip,
} from '@/pages/Ships/api';
import { partShipKeys } from '@/pages/Ships/pages/ShipsCraftPage/components/ShipsCraft';
import { LOOTBOX_CRAFT } from '@/pages/Ships/pages/ShipsCraftPage/components/ShipsCraft/const';
import {
  CraftGetgemsError,
  PartShipKey,
  PartShipNfts,
  ShipPartsToCombineShips,
} from '@/pages/Ships/types';
import { initialVouchersPageModalContentState } from '@/pages/Vouchers/store';
import {
  ERROR_DURING_ACCEPTING_PIRATE_OFFER,
  ERROR_DURING_CHECK_API_TON_NFT_STATUS,
  ERROR_DURING_CHECK_BUYING_OF_PIRATE_OR_DEFENCE_MARK,
  ERROR_DURING_CHECK_BUYING_PIRATE_OR_DEFENSE_MARK_STATUS,
  ERROR_DURING_CHECK_CRAFT_SHIP_STATUS,
  ERROR_DURING_CRAFT_SHIP,
  ERROR_DURING_GET_ALL_USER_SHIP_PARTS_EXISTING_NFTS,
  ERROR_DURING_GET_NFT_INFO_FROM_TON_API,
  ERROR_DURING_GET_USER_INFO,
  ERROR_DURING_PAY_COMMISSION_OF_PIRATE_OR_DEFENCE_MARK,
  ERROR_DURING_START_PIRATE_MISSION,
  ERROR_DURING_STOP_PIRATE_MISSION,
  ERROR_DURING_UPGRADE_CRAFT_SHIP,
} from '@/services/constants/errorMessages';
import { RootStore } from '@/store';
import { BaseStore } from '@/store/baseStore';
import {
  HIGHLOAD_WALLET_ADDRESS,
  defaultSweetAlertOptions,
} from '@/store/const';
import Utils from '@/utils';

const ls = new SecureLS();
const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

export class ShipsStore extends BaseStore {
  rootStore: RootStore;

  partShipNfts: PartShipNfts | null = null;
  shipNfts: (NftMarketplace | Record<'name' | 'image', string>)[] | null = null;
  firstSelectedShip: NftMarketplace | null = null;
  secondSelectedShip: NftMarketplace | null = null;
  selectShipTooltipIndex: number | null = null;
  selectPartShipTooltipIndex: number | null = null;

  shipsPartsToCombineShips: ShipPartsToCombineShips[] | null = null;
  isCraftShipRequestLoading = false;
  isCraftShipLoading = false;
  isCraftShipSuccess = false;
  isCraftShipError = false;
  isCraftShipGetgemsError = false;
  isCrossShipsModalActive = false;
  isSelectShipsTooltipVisible = false;
  isSelectPartsShipTooltipVisible = false;

  craftShipGetgemsErrorBody: CraftGetgemsError[] | null = null;
  checkCraftShipStatusTimer: NodeJS.Timeout | undefined;
  checkMarkBuyingTimer: NodeJS.Timeout | undefined;
  checkBuyingCompleteMarkTimer: NodeJS.Timeout | undefined;

  fetchCount = 0;

  pirateAndDefenseTooltips: number[] = [];

  constructor(rootStore: RootStore) {
    super();

    this.rootStore = rootStore;

    makeObservable(this, {
      partShipNfts: observable,
      shipNfts: observable,
      firstSelectedShip: observable,
      secondSelectedShip: observable,
      selectShipTooltipIndex: observable,
      selectPartShipTooltipIndex: observable,
      shipsPartsToCombineShips: observable,
      isCraftShipRequestLoading: observable,
      isCraftShipLoading: observable,
      isCraftShipSuccess: observable,
      isCraftShipError: observable,
      isCraftShipGetgemsError: observable,
      isCrossShipsModalActive: observable,
      isSelectShipsTooltipVisible: observable,
      isSelectPartsShipTooltipVisible: observable,

      craftShipGetgemsErrorBody: observable,
      checkCraftShipStatusTimer: observable,
      checkMarkBuyingTimer: observable,
      checkBuyingCompleteMarkTimer: observable,
      fetchCount: observable,

      pirateAndDefenseTooltips: observable,

      fetchAllShipPartsExistingNfts: action,
      craftShip: action,
      startCheckCraftShipStatus: action,
      checkShipCraftNft: action,
      checkTransactionCraftShipTonApi: action,
      setShipsPartsToCombineShips: action,
      deleteShipsPartItemToCombineShips: action,
      setCraftShip: action,
      upgradeShipLevel: action,
      fetchTonApiShipPartInfo: action,
      setIsCraftShipSuccess: action,
      setIsCraftShipGetgemsError: action,
      setIsCraftShipError: action,
      setIsCrossShipsModalActive: action,
      setSelectShipTooltipIndex: action,
      setSelectPartShipTooltipIndex: action,
      setIsSelectShipsTooltipVisible: action,
      setIsSelectPartsShipTooltipVisible: action,
      buyPirateOrDefenseMark: action,
      startCheckMarkBuying: action,
      checkMarkBuying: action,
      buyPirateMark: action,
      startCheckBuyingCompleteMark: action,
      checkBuyingCompleteMark: action,
      pirateOfferAccept: action,
      startPirateMission: action,
      finishPirateMission: action,
      updatePirateValues: action,
      addPirateAndDefenseTooltips: action,
      deletePirateAndDefenseTooltips: action,

      defenseChargeLevel: computed,
      isDefenseActive: computed,
      protectedPoints: computed,
      modalProtectedPoints: computed,
      stolenPoints: computed,
      isPiracyActive: computed,
      isPiracyMissionActive: computed,
      piracyMissionStatus: computed,
      piracyMissionActiveTime: computed,
      piracyAllTimePoints: computed,
      piracyMissionReward: computed,
      modalStolenPoints: computed,
      isModalShowMoreOneDay: computed,
      defenseActiveTime: computed,
    });
  }

  fetchAllShipPartsExistingNfts = async ({
    account_id,
  }: {
    account_id: string;
  }) => {
    const mockShip = {
      name: LOOTBOX_CRAFT.title,
      image: LOOTBOX_CRAFT.imageSrc,
    };
    this.rootStore.setIsLoading(true);

    if (!account_id) {
      this.shipNfts = [mockShip];

      return;
    }

    try {
      await this.rootStore.nftsStore.fetchNftsCollections();

      const filteredNftsOnWallet =
        (await this.rootStore.nftsStore.getExistingNftsOnMarketplace({
          account_id,
        })) ?? [];

      this.partShipNfts = filteredNftsOnWallet.reduce((acc, item) => {
        if (partShipKeys.includes(item.name as PartShipKey)) {
          const key = item.name as PartShipKey;

          acc[key] = acc[key] ? [...acc[key], item] : [item];
          return acc;
        }

        return acc;
      }, {} as PartShipNfts);

      const shipNfts =
        filteredNftsOnWallet.filter((nftItem) =>
          nftItem.name.startsWith('Voyager'),
        ) || [];
      this.shipNfts =
        shipNfts.length > 0
          ? shipNfts.reduceRight(
              (acc, item, index) => {
                if (index === 0) {
                  acc.push(item);
                  acc.push(mockShip);

                  return acc;
                } else {
                  acc.push(item);
                }

                return acc;
              },
              [] as (NftMarketplace | Record<'name' | 'image', string>)[],
            )
          : [mockShip];
    } catch (err) {
      console.error(ERROR_DURING_GET_ALL_USER_SHIP_PARTS_EXISTING_NFTS, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }

    this.rootStore.setIsLoading(false);
  };

  craftShip = async ({
    shipParts: { nft1, nft2, nft3, nft4, nft5, nft6 },
    tonConnectUI,
  }: {
    shipParts: {
      nft1: string;
      nft2: string;
      nft3: string;
      nft4: string;
      nft5: string;
      nft6: string;
    };
    tonConnectUI: TonConnectUI;
  }) => {
    this.isCraftShipRequestLoading = true;

    const hash = this.rootStore.createHash([
      { nft1 },
      { nft2 },
      { nft3 },
      { nft4 },
      { nft5 },
      { nft6 },
    ]);
    const shipLevel = 1;
    ls.remove('craftShipLevelSecure');

    try {
      const response = await craftShip({
        nft1,
        nft2,
        nft3,
        nft4,
        nft5,
        nft6,
        ship_level: shipLevel,
        hash,
      });

      if (response) {
        const { address, body: payload, value } = response;

        const bounceableAddress = new TonWeb.Address(address).toString(
          true,
          true,
          true,
          false,
        );
        const tx = {
          validUntil: Math.floor(Date.now() / 1000) + 60,
          messages: [
            {
              address: bounceableAddress,
              amount: (10 ** 9 * Number(value)).toString(),
              payload,
            },
          ],
        };

        try {
          const transactionResult = await tonConnectUI.sendTransaction(tx, {
            returnStrategy: 'back',
          });

          if (transactionResult) {
            const hash = await TonWeb.boc.Cell.oneFromBoc(
              TonWeb.utils.base64ToBytes(transactionResult.boc),
            ).hash();
            this.rootStore.nftsStore.transactionId =
              TonWeb.utils.bytesToHex(hash);
            this.isCraftShipLoading = true;

            await sleep(60_000);
            const isErrorCodeExist =
              await this.rootStore.nftsStore.checkTransactionTonApi({
                transactionId: this.rootStore.nftsStore.transactionId,
              });

            if (!isErrorCodeExist) {
              ls.set('startShipCraftSecure', this.rootStore.timeNow);
              ls.set(
                'craftShipTransactionIdSecure',
                this.rootStore.nftsStore.transactionId,
              );
              ls.set('craftShipLevelSecure', shipLevel);

              this.startCheckCraftShipStatus();
            } else {
              this.isCraftShipLoading = false;
            }
          }
        } catch (e) {
          this.rootStore.nftsStore.transactionStatus = 'rejected';
          console.error('error during send transaction', e);
        }
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if ('response' in err && err?.response?.status === 400) {
          this.craftShipGetgemsErrorBody = err?.response?.data?.errors ?? null;

          if (this.craftShipGetgemsErrorBody) {
            this.setIsCraftShipGetgemsError(true);
          }
        }

        console.error(ERROR_DURING_CRAFT_SHIP, err);
        this.rootStore.userStore.addErrorResponse(err);

        if (Utils.getErrorMessage(err)) {
          this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
        }
      } else {
        console.error(ERROR_DURING_CRAFT_SHIP, err);
      }
    }

    this.isCraftShipRequestLoading = false;
  };

  startCheckCraftShipStatus = () => {
    if (this.checkCraftShipStatusTimer) return;

    this.checkCraftShipStatusTimer = setInterval(
      this.checkShipCraftNft,
      1000 * 5,
    );
  };

  checkShipCraftNft = async () => {
    this.isCraftShipError = false;
    this.isCraftShipRequestLoading = true;

    const startTime = ls.get('startShipCraftSecure');
    const transactionId = ls.get('craftShipTransactionIdSecure');

    const resetTimer = () => {
      this.isCraftShipLoading = false;
      this.isCraftShipRequestLoading = false;

      clearInterval(this.checkCraftShipStatusTimer);
      this.checkCraftShipStatusTimer = undefined;

      ls.remove('startShipCraftSecure');
      ls.remove('craftShipTransactionIdSecure');
    };

    /**если в LS нет времени начала покупки */
    if (!startTime && !transactionId) {
      resetTimer();
      return;
    }

    try {
      /**если прошло более 10 минут, то убиваем проверку */
      if (Number(startTime) + 600 < this.rootStore.timeNow) {
        resetTimer();
        return;
      }

      const isNotReady = await this.checkTransactionCraftShipTonApi({
        transactionId,
      });

      if (isNotReady === undefined) {
        this.isCraftShipError = true;

        resetTimer();
        return;
      }

      if (!isNotReady) {
        clearInterval(this.checkCraftShipStatusTimer);
        this.checkCraftShipStatusTimer = undefined;

        const hash = this.rootStore.createHash([{ txid: transactionId }]);
        await saveCraftedShip({ hash, txid: transactionId });

        await sleep(30_000);

        this.setCraftShip({ fistShip: null, secondShip: null });
        this.shipsPartsToCombineShips = null;
        this.setIsCraftShipSuccess(true);
        resetTimer();
      }
    } catch (err) {
      console.error(ERROR_DURING_CHECK_CRAFT_SHIP_STATUS, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }

      this.isCraftShipRequestLoading = false;
    }
  };

  checkTransactionCraftShipTonApi = async ({
    transactionId,
  }: {
    transactionId: string;
  }) => {
    try {
      const response = await checkTransactionTonApiNft({
        msg_id: transactionId,
      });

      const checkExitCode = (response: CheckTransactionTonApiResponse) => {
        const {
          transaction: { out_msgs, success },
          children,
        } = response;

        if (
          out_msgs.some(
            (item) =>
              item.hash ===
              '0000000000000000000000000000000000000000000000000000000000000000',
          )
        ) {
          return true;
        }

        if (!success) {
          console.log('success', success);
          throw Error(ERROR_DURING_CHECK_API_TON_NFT_STATUS);
        }

        if (!children) return false;

        for (const el of children) {
          if (checkExitCode(el)) {
            return true;
          }
        }

        return false;
      };

      return checkExitCode(response);
    } catch (err) {
      this.rootStore.nftsStore.transactionStatus = 'rejected';
      console.error(ERROR_DURING_CHECK_API_TON_NFT_STATUS, err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }
  };

  setShipsPartsToCombineShips = ({
    shipPart,
    index,
    image,
  }: {
    shipPart: NftMarketplace;
    index: number;
    image: string;
  }) => {
    this.shipsPartsToCombineShips = this.shipsPartsToCombineShips
      ? [
          ...this.shipsPartsToCombineShips,
          {
            ...shipPart,
            detailIndex: index,
            detailImage: image,
          },
        ]
      : [
          {
            ...shipPart,
            detailIndex: index,
            detailImage: image,
          },
        ];
  };

  deleteShipsPartItemToCombineShips = (index: number) =>
    (this.shipsPartsToCombineShips =
      this.shipsPartsToCombineShips?.filter(
        (ship) => ship.detailIndex !== index,
      ) ?? null);

  setCraftShip = ({
    fistShip,
    secondShip,
  }: {
    fistShip?: NftMarketplace | null;
    secondShip?: NftMarketplace | null;
  }) => {
    if (fistShip !== undefined) {
      this.firstSelectedShip = fistShip;
    }

    if (secondShip !== undefined) {
      this.secondSelectedShip = secondShip;
    }
  };

  fetchTonApiShipPartInfo = async ({
    nft_address,
  }: {
    nft_address: string;
  }) => {
    try {
      const res = await fetchTonApiNftOnMarketplace({ nft_address });

      if (res && res.owner.address) {
        return;
      }

      await withReactContent(Swal).fire({
        ...defaultSweetAlertOptions,
        icon: 'success',
        background: '#20252C',
        title: 'This nft was deleted!!',
        confirmButtonText: 'OK',
        returnFocus: false,
      });

      return true;
    } catch (err) {
      console.error(ERROR_DURING_GET_NFT_INFO_FROM_TON_API, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }
  };

  upgradeShipLevel = async ({
    shipParts: { nft1, nft2, nft3, nft4, nft5, nft6, nft7, shipLevel },
    tonConnectUI,
    type,
  }: {
    shipParts: {
      nft1: string;
      nft2: string;
      nft3: string;
      nft4: string;
      nft5: string;
      nft6: string;
      nft7: string;
      shipLevel: number;
    };
    tonConnectUI: TonConnectUI;
    type: 'upgrade' | 'merge';
  }) => {
    this.isCraftShipRequestLoading = true;

    const hash = this.rootStore.createHash([
      { nft1 },
      { nft2 },
      { nft3 },
      { nft4 },
      { nft5 },
      { nft6 },
      { nft7 },
      { ship_level: shipLevel },
    ]);
    const body = {
      nft1,
      nft2,
      nft3,
      nft4,
      nft5,
      nft6,
      nft7,
      ship_level: shipLevel,
      hash,
    };

    ls.remove('craftShipLevelSecure');

    try {
      const response =
        type === 'upgrade' ? await upgradeShip(body) : await mergeShips(body);

      if (response) {
        const { address, body: payload, value } = response;

        const bounceableAddress = new TonWeb.Address(address).toString(
          true,
          true,
          true,
          false,
        );
        const tx = {
          validUntil: Math.floor(Date.now() / 1000) + 60,
          messages: [
            {
              address: bounceableAddress,
              amount: (10 ** 9 * Number(value)).toString(),
              payload,
            },
          ],
        };

        try {
          const transactionResult = await tonConnectUI.sendTransaction(tx, {
            returnStrategy: 'back',
          });

          if (transactionResult) {
            const hash = await TonWeb.boc.Cell.oneFromBoc(
              TonWeb.utils.base64ToBytes(transactionResult.boc),
            ).hash();
            this.rootStore.nftsStore.transactionId =
              TonWeb.utils.bytesToHex(hash);
            this.isCraftShipLoading = true;

            await sleep(60_000);
            const isErrorCodeExist =
              await this.rootStore.nftsStore.checkTransactionTonApi({
                transactionId: this.rootStore.nftsStore.transactionId,
              });

            if (!isErrorCodeExist) {
              ls.set('startShipCraftSecure', this.rootStore.timeNow);
              ls.set(
                'craftShipTransactionIdSecure',
                this.rootStore.nftsStore.transactionId,
              );
              ls.set('craftShipLevelSecure', shipLevel);

              this.startCheckCraftShipStatus();
            } else {
              this.isCraftShipLoading = false;
            }
          }
        } catch (e) {
          this.rootStore.nftsStore.transactionStatus = 'rejected';
          console.error('error during send transaction', e);
        }
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if ('response' in err && err?.response?.status === 400) {
          this.craftShipGetgemsErrorBody = err?.response?.data?.errors ?? null;

          if (this.craftShipGetgemsErrorBody) {
            this.setIsCraftShipGetgemsError(true);
          }
        }

        this.rootStore.nftsStore.transactionStatus = 'rejected';
        console.error(ERROR_DURING_UPGRADE_CRAFT_SHIP, err);

        if (Utils.getErrorMessage(err)) {
          this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
        }
      } else {
        console.error(ERROR_DURING_UPGRADE_CRAFT_SHIP, err);
      }
    }

    this.isCraftShipRequestLoading = false;
  };

  setIsCraftShipSuccess = (state: boolean) => (this.isCraftShipSuccess = state);

  setIsCraftShipGetgemsError = (state: boolean) =>
    (this.isCraftShipGetgemsError = state);

  setIsCraftShipError = (state: boolean) => (this.isCraftShipError = state);

  setIsCrossShipsModalActive = (state: boolean) =>
    (this.isCrossShipsModalActive = state);

  setSelectShipTooltipIndex = (state: number | null) =>
    (this.selectShipTooltipIndex = state);

  setSelectPartShipTooltipIndex = (state: number | null) =>
    (this.selectPartShipTooltipIndex = state);

  setIsSelectShipsTooltipVisible = (state: boolean) =>
    (this.isSelectShipsTooltipVisible = state);

  setIsSelectPartsShipTooltipVisible = (state: boolean) =>
    (this.isSelectPartsShipTooltipVisible = state);

  buyPirateOrDefenseMark = async ({
    amount,
    product_id,
    tonConnectUI,
    walletAddress,
  }: {
    amount: number;
    product_id: '1' | '2';
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

        /** делаем сразу запрос на бек о начале покупки метки */
        const hashRequest = this.rootStore.createHash([
          { address: walletAddress },
          { amount: Number(nanoAmount) },
          { product_id },
          { txid: this.rootStore.nftsStore.transactionId },
        ]);

        const { request_id } = await buyPirateMark({
          address: walletAddress,
          amount: Number(nanoAmount),
          product_id,
          txid: this.rootStore.nftsStore.transactionId,
          hash: hashRequest,
        });

        ls.set('startBuyingMarkSecure', this.rootStore.timeNow); // записываем время начала транзакции
        ls.set(
          'buyMarkTransactionIdSecure',
          this.rootStore.nftsStore.transactionId,
        ); // записываем ID транзакции
        ls.set('buyingMarkRequestIdSecure', request_id); // записываем ID запроса

        this.startCheckMarkBuying(); // начинаем проверять tonApi на предмет окончания транзакции
      }
    } catch (err) {
      this.rootStore.vouchersStore.setModalContentActive({
        ...initialVouchersPageModalContentState,
        isErrorMessageActive: true,
      });
      this.rootStore.nftsStore.transactionStatus = 'rejected';
      console.error(ERROR_DURING_PAY_COMMISSION_OF_PIRATE_OR_DEFENCE_MARK, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }
  };

  startCheckMarkBuying = () => {
    if (this.checkMarkBuyingTimer) return;

    this.checkMarkBuyingTimer = setInterval(
      () => this.checkMarkBuying(),
      1000 * 10,
    );
  };

  checkMarkBuying = async () => {
    const startTime = ls.get('startBuyingMarkSecure');
    const transactionId = ls.get('buyMarkTransactionIdSecure');

    const resetTimer = () => {
      clearInterval(this.checkMarkBuyingTimer);
      this.checkMarkBuyingTimer = undefined;
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
        this.buyPirateMark();
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

      console.error(
        ERROR_DURING_CHECK_BUYING_PIRATE_OR_DEFENSE_MARK_STATUS,
        err,
      );
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }

      this.fetchCount = 0;
    }
  };

  buyPirateMark = () => {
    const requestId = ls.get('buyingMarkRequestIdSecure');
    const txid = ls.get('buyMarkTransactionIdSecure');

    if (!requestId || !txid) {
      this.rootStore.nftsStore.paymentStatus = 'rejected';
      return;
    }

    ls.set('startCheckBuyingCompleteMarkSecure', this.rootStore.timeNow); // записываем время начала транзакции

    this.startCheckBuyingCompleteMark(); // начинаем проверять бек на предмет окончания покупки
  };

  startCheckBuyingCompleteMark = () => {
    if (this.checkBuyingCompleteMarkTimer) return;

    this.checkBuyingCompleteMarkTimer = setInterval(
      () => this.checkBuyingCompleteMark(),
      1000 * 5,
    );
  };

  checkBuyingCompleteMark = async () => {
    const startTime = ls.get('startCheckBuyingCompleteMarkSecure');
    const requestId = ls.get('buyingMarkRequestIdSecure');

    const resetTimer = () => {
      clearInterval(this.checkBuyingCompleteMarkTimer);
      this.checkBuyingCompleteMarkTimer = undefined;

      ls.remove('buyingMarkRequestIdSecure');
      ls.remove('buyMarkTransactionIdSecure');
      ls.remove('startBuyingMarkSecure');
      ls.remove('startCheckBuyingCompleteMarkSecure');
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

      const response = await checkPirateMark({
        request_id: requestId,
        hash,
      });

      if (response.request.status === 1) {
        this.rootStore.nftsStore.paymentStatus = 'fulfilled';

        const { pirate } = await fetchPirateInfo();
        this.rootStore.userStore.userInfo = {
          ...this.rootStore.userStore.userInfo,
          pirate,
        };

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

      console.error(ERROR_DURING_CHECK_BUYING_OF_PIRATE_OR_DEFENCE_MARK, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }

      this.rootStore.nftsStore.paymentStatus = 'rejected';
    }
  };

  pirateOfferAccept = async () => {
    try {
      await sleep(400);
      const { balance } = await pirateOfferAccept();
      const prevBalance = toJS(this.rootStore.userStore.userInfo.balance);

      this.rootStore.userStore.userInfo = {
        ...this.rootStore.userStore.userInfo,
        balance,
      };

      /** todo убрал начисление через модалку,
       *  так как мы и так на главной странице */
      /* await sleep(400);
      this.rootStore.userStore.addRewardTooltip({
        reward: balance - prevBalance,
        prevBalance,
      });*/
    } catch (err) {
      console.error(ERROR_DURING_ACCEPTING_PIRATE_OFFER, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }
  };

  startPirateMission = async () => {
    try {
      await this.rootStore.sleep(1500);

      const { black_metka_finish_at } = await startPirateMission();
      this.rootStore.userStore.userInfo = {
        ...this.rootStore.userStore.userInfo,
        pirate: {
          ...this.rootStore.userStore.userInfo.pirate,
          black_metka_finish_at,
        },
      };

      await this.updatePirateValues();
    } catch (err) {
      console.error(ERROR_DURING_START_PIRATE_MISSION, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }
  };

  finishPirateMission = async () => {
    nprogressInstance.start();

    try {
      const { grant, balance } = await finishPirateMission();
      const { pirate } = await fetchPirateInfo();

      this.rootStore.userStore.userInfo = {
        ...this.rootStore.userStore.userInfo,
        balance,
        pirate,
      };
      this.rootStore.userStore.addRewardTooltip({
        reward: grant,
        prevBalance: balance - grant,
      });
    } catch (err) {
      console.error(ERROR_DURING_STOP_PIRATE_MISSION, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }

    nprogressInstance.done();
  };

  updatePirateValues = async () => {
    try {
      const { pirate } = await fetchPirateInfo();
      this.rootStore.userStore.userInfo = {
        ...this.rootStore.userStore.userInfo,
        pirate,
      };
    } catch (err) {
      console.error(ERROR_DURING_GET_USER_INFO, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }
  };

  addPirateAndDefenseTooltips = (value: number) =>
    this.pirateAndDefenseTooltips.push(value);

  deletePirateAndDefenseTooltips = () => this.pirateAndDefenseTooltips.shift();

  get isDefenseActive() {
    return !!this.defenseChargeLevel;
  }

  get defenseChargeLevel() {
    const defenseDays = this.rootStore.userStore.userInfo.pirate
      ?.green_metka_finish_at
      ? Math.ceil(
          (this.rootStore.userStore.userInfo.pirate.green_metka_finish_at -
            this.rootStore.timeNow) /
            (24 * 60 * 60),
        )
      : 0;

    return defenseDays >= 1 ? defenseDays : 0;
  }

  get protectedPoints() {
    return this.rootStore.userStore.userInfo.pirate?.shield_count_all ?? 0;
  }

  get modalProtectedPoints() {
    return this.rootStore.userStore.userInfo.pirate?.shield_count ?? 0;
  }

  get stolenPoints() {
    return this.rootStore.userStore.userInfo.pirate?.black_metka_count_all ?? 0;
  }

  get isPiracyActive() {
    return !!this.rootStore.userStore.userInfo.pirate?.black_metka_count;
  }

  get isPiracyMissionActive() {
    return !!this.piracyMissionActiveTime;
  }

  get piracyMissionStatus() {
    return this.rootStore.userStore.userInfo?.pirate?.status;
  }

  get piracyMissionActiveTime() {
    const finishAt = this.rootStore.userStore.userInfo?.pirate
      ?.black_metka_finish_at
      ? this.rootStore.userStore.userInfo.pirate.black_metka_finish_at -
        this.rootStore.timeNow
      : 0;

    return finishAt > 0 ? finishAt : 0;
  }

  get piracyAllTimePoints() {
    return (
      this.rootStore.userStore.userInfo.pirate?.black_metka_count_grant_all ?? 0
    );
  }

  get piracyMissionReward() {
    return this.rootStore.userStore.userInfo.pirate?.grant ?? 0;
  }

  get modalStolenPoints() {
    return (
      this.rootStore.userStore.userInfo.pirate.green_metka_modal_count ?? 0
    );
  }

  get isModalShowMoreOneDay() {
    return (
      this.rootStore.timeNow -
        this.rootStore.userStore.userInfo.pirate
          .green_metka_modal_last_show_at >
      86400
    );
  }

  get defenseActiveTime() {
    const time =
      (this.rootStore.userStore.userInfo.pirate.green_metka_finish_at ?? 0) *
      1000;
    const date = new Date(time);

    const day = Utils.padZero(date.getDate());
    const month = Utils.padZero(date.getMonth() + 1);
    const year = Utils.padZero(date.getFullYear());

    return `${day}.${month}.${year}`;
  }
}
