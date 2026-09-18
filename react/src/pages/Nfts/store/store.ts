import { toUserFriendlyAddress } from '@tonconnect/sdk';
import { TonConnectUI } from '@tonconnect/ui-react';
import axios from 'axios';
import { action, makeObservable, observable } from 'mobx';
import SecureLS from 'secure-ls';
import TonWeb from 'tonweb';

import {
  buyNftOnMarketplace,
  cancelSellNftOnMarketplaceWithoutId,
  checkTransactionTonApiNft,
  confirmBuyNftOnMarketplace,
  confirmCancelSellNftOnMarketplace,
  confirmOnSellNftOnMarketplace,
  deleteNftOnMarketplace,
  fetchAllExistingTonApiNfts,
  fetchAllNftsOnMarketplace,
  fetchHistoryOfNftOnMarketplace,
  fetchNftsCollectionsOnMarketplace,
  fetchTonApiNftInfo,
  fetchTonApiNftOnMarketplace,
  getActiveSaleNftOnMarketplace,
  rejectOnSellNftOnMarketplace,
  sellNftOnMarketplace,
} from '@/pages/Nfts/api';
import {
  AllNftsOnMarketplaceRequest,
  CheckTransactionTonApiResponse,
  HistoryOfNftOnMarketplaceResponse,
  NftMarketplace,
  NftSellErrorTooltip,
  TonApiNftResponse,
  TransactionStatus,
} from '@/pages/Nfts/types';
import {
  ERROR_DURING_BUY_NFT_ON_MARKETPLACE,
  ERROR_DURING_CANCEL_SALE_NFT_ON_MARKETPLACE,
  ERROR_DURING_CHECK_API_TON_NFT_STATUS,
  ERROR_DURING_CHECK_BUYING_NFT_STATUS,
  ERROR_DURING_CHECK_OWNER_ON_MARKETPLACE,
  ERROR_DURING_CHECK_SALE_NFT_STATUS,
  ERROR_DURING_CONFIRM_BUY_NFT_ON_MARKETPLACE,
  ERROR_DURING_CONFIRM_CANCEL_SALE_NFT_ON_MARKETPLACE,
  ERROR_DURING_CONFIRM_SELL_NFT_ON_MARKETPLACE,
  ERROR_DURING_DELETE_NFT_ON_MARKETPLACE,
  ERROR_DURING_GET_ALL_EXISTING_NFTS,
  ERROR_DURING_GET_ALL_USER_EXISTING_NFTS,
  ERROR_DURING_GET_NFT_COLLECTION,
  ERROR_DURING_GET_NFT_HISTORY,
  ERROR_DURING_GET_NFT_INFO_FROM_TON_API,
  ERROR_DURING_GET_SELL_NFT_ON_MARKETPLACE,
  ERROR_DURING_REJECT_SELL_NFT_ON_MARKETPLACE,
  ERROR_DURING_SELL_NFT_ON_MARKETPLACE,
} from '@/services/constants/errorMessages';
import { RootStore } from '@/store';
import { BaseStore } from '@/store/baseStore';
import Utils from '@/utils';

const ls = new SecureLS();
export const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));
const Address = TonWeb.utils.Address;

export class NftsStore extends BaseStore {
  rootStore: RootStore;

  nftsOnMarketplace: NftMarketplace[] | null = null;
  collection: string[] | null = null;
  nextNftsOnMarketplaceId: number = 0;

  isGridViewActive = true;
  activeNft: NftMarketplace | null = null;
  tonApiNftInfo: TonApiNftResponse | null = null;
  nftHistory: HistoryOfNftOnMarketplaceResponse | null = null;
  existingNfts: NftMarketplace[] | null = null;

  saleId: number | null = null;
  saleAddress: string = ''; // todo - не используется!!
  saleNftItem: Omit<Required<NftMarketplace>, 'collection' | 'sale'> | null =
    null;
  transactionId: string = '';
  searchValue = '';
  sortRule:
    | 'name-asc'
    | 'name-desc'
    | 'sale_price-asc'
    | 'sale_price-desc'
    | undefined = undefined;
  isNftImageTooltipOpen = false;
  isSubmitButtonDisabled = false;
  nftSellErrorTooltip: NftSellErrorTooltip | null = null;

  transactionStatus: TransactionStatus = 'pending';
  paymentStatus: TransactionStatus = 'pending';
  isModalOpen = false;

  isNftsOnMarketplaceSortedByNameTitleFromUp: boolean | null = null;
  isNftsOnMarketplaceSortedByPriceFromUp: boolean | null = null;

  checkStatusTimer: NodeJS.Timeout | undefined;
  checkCancelStatusTimer: NodeJS.Timeout | undefined;
  checkBuyingStatusTimer: NodeJS.Timeout | undefined;

  fetchCount = 0;

  constructor(rootStore: RootStore) {
    super();

    this.rootStore = rootStore;

    makeObservable(this, {
      nftsOnMarketplace: observable,
      collection: observable,
      nextNftsOnMarketplaceId: observable,
      isGridViewActive: observable,
      activeNft: observable,
      tonApiNftInfo: observable,
      nftHistory: observable,
      existingNfts: observable,
      saleId: observable,
      transactionId: observable,
      searchValue: observable,
      sortRule: observable,
      isNftImageTooltipOpen: observable,
      saleAddress: observable,
      saleNftItem: observable,
      isSubmitButtonDisabled: observable,
      nftSellErrorTooltip: observable,
      transactionStatus: observable,
      paymentStatus: observable,
      isModalOpen: observable,
      isNftsOnMarketplaceSortedByNameTitleFromUp: observable,
      isNftsOnMarketplaceSortedByPriceFromUp: observable,
      checkStatusTimer: observable,
      checkCancelStatusTimer: observable,
      checkBuyingStatusTimer: observable,
      fetchCount: observable,

      setIsGridViewActive: action,
      setIsModalOpen: action,
      fetchAllNftsOnMarketplace: action,
      resetAllNftsOnMarketplace: action,
      fetchNftsCollections: action,
      setActiveNft: action,
      sortAllNftsOnMarketplaceByPrice: action,
      sortAllNftsOnMarketplaceByNameTitle: action,
      fetchTonApiNftInfo: action,
      fetchHistoryOfNftOnMarketplace: action,
      getExistingNftsOnMarketplace: action,
      fetchAllExistingNfts: action,
      sellNftOnMarketplace: action,
      checkTonApiSaleNft: action,
      startCheckNftSaleStatus: action,
      startCheckNftCancelSaleStatus: action,
      confirmOnSellNftOnMarketplace: action,
      getCheckOwner: action,
      rejectNftOnMarketplace: action,
      cancelSellNftOnMarketplace: action,
      confirmCancelSellNftOnMarketplace: action,
      getSaleItemNft: action,
      buyNftOnMarketplace: action,
      startCheckNftBuyingStatus: action,
      checkTransactionTonApi: action,
      checkTonApiBuyNft: action,
      confirmBuyingNftOnMarketplace: action,
      deleteNftFromMarketplace: action,
      addNftImageTooltipVisible: action,
      deleteNftImageTooltipVisible: action,
      addNftSellErrorTooltip: action,
      deleteNftSellErrorTooltip: action,
      resetStatuses: action,
    });
  }

  setIsGridViewActive = (state: boolean) => (this.isGridViewActive = state);

  setIsModalOpen = (state: boolean) => (this.isModalOpen = state);

  fetchAllNftsOnMarketplace = async ({
    sortRule,
    searchValue,
  }: {
    sortRule?: 'name-asc' | 'name-desc' | 'sale_price-asc' | 'sale_price-desc';
    searchValue?: string | null;
  }) => {
    if (typeof searchValue === 'object') return;

    if (this.nextNftsOnMarketplaceId === 0 && !sortRule && !searchValue) {
      this.rootStore.setIsLoading(true);
    }

    if (this.searchValue !== searchValue && searchValue !== undefined) {
      this.searchValue = searchValue;
      this.nextNftsOnMarketplaceId = 0;
    }

    const limit = 30;

    const getHash = () => {
      if (sortRule && !this.searchValue) {
        return this.rootStore.createHash([
          { limit },
          { next: this.nextNftsOnMarketplaceId },
          { sort: sortRule },
        ]);
      }

      if (!sortRule && this.searchValue) {
        return this.rootStore.createHash([
          { limit },
          { name: this.searchValue },
          { next: this.nextNftsOnMarketplaceId },
        ]);
      }

      if (sortRule && this.searchValue) {
        return this.rootStore.createHash([
          { limit },
          { name: this.searchValue },
          { next: this.nextNftsOnMarketplaceId },
          { sort: sortRule },
        ]);
      }

      if (!sortRule && !this.searchValue) {
        return this.rootStore.createHash([
          { limit },
          { next: this.nextNftsOnMarketplaceId },
        ]);
      }
    };

    const getBody = () => {
      if (sortRule && !this.searchValue) {
        return {
          next: this.nextNftsOnMarketplaceId,
          sort: sortRule,
          limit,
          hash: getHash(),
        };
      }

      if (!sortRule && this.searchValue) {
        return {
          next: this.nextNftsOnMarketplaceId,
          name: this.searchValue,
          limit,
          hash: getHash(),
        };
      }

      if (sortRule && this.searchValue) {
        return {
          next: this.nextNftsOnMarketplaceId,
          sort: sortRule,
          name: this.searchValue,
          limit,
          hash: getHash(),
        };
      }

      return {
        next: this.nextNftsOnMarketplaceId,
        limit,
        hash: getHash(),
      };
    };

    try {
      const response = await fetchAllNftsOnMarketplace(
        getBody() as AllNftsOnMarketplaceRequest,
      );

      if (response) {
        /** если есть правило сортировки или в поиске пустая строка,
         * то пишем сразу ответ с бека,
         * иначе проверяем, есть ли загр. нфт и если что добавляем к ним,
         * или грузим с бека (первая загрузка) */
        this.nftsOnMarketplace =
          this.nextNftsOnMarketplaceId === 0
            ? response.items
            : this.nftsOnMarketplace !== null
              ? [...this.nftsOnMarketplace, ...response.items]
              : response.items;

        if (this.searchValue === searchValue || searchValue === undefined) {
          this.nextNftsOnMarketplaceId = response.next;
        }
      }
    } catch (err) {
      console.error(ERROR_DURING_GET_ALL_EXISTING_NFTS, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }

    this.rootStore.setIsLoading(false);
  };

  resetAllNftsOnMarketplace = () => {
    this.nftsOnMarketplace = null;
    this.nextNftsOnMarketplaceId = 0;
    this.searchValue = '';
    this.sortRule = undefined;
    this.isNftsOnMarketplaceSortedByNameTitleFromUp = null;
    this.isNftsOnMarketplaceSortedByPriceFromUp = null;
  };

  fetchNftsCollections = async () => {
    this.rootStore.setIsLoading(true);
    const hash = this.rootStore.createHash([]);

    try {
      this.collection = (
        await fetchNftsCollectionsOnMarketplace({ hash })
      ).collections;
    } catch (err) {
      console.error(ERROR_DURING_GET_NFT_COLLECTION, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }

    this.rootStore.setIsLoading(false);
  };

  setActiveNft = (nftItem: NftMarketplace) => (this.activeNft = nftItem);

  sortAllNftsOnMarketplaceByPrice = async () => {
    if (this.nftsOnMarketplace === null) return;

    this.nextNftsOnMarketplaceId = 0;
    this.isNftsOnMarketplaceSortedByPriceFromUp =
      !this.isNftsOnMarketplaceSortedByPriceFromUp;
    this.isNftsOnMarketplaceSortedByNameTitleFromUp = null;

    this.sortRule = this.isNftsOnMarketplaceSortedByPriceFromUp
      ? 'sale_price-desc'
      : 'sale_price-asc';

    await this.fetchAllNftsOnMarketplace({
      sortRule: this.isNftsOnMarketplaceSortedByPriceFromUp
        ? 'sale_price-desc'
        : 'sale_price-asc',
      searchValue: this.searchValue,
    });
  };

  sortAllNftsOnMarketplaceByNameTitle = async () => {
    if (this.nftsOnMarketplace === null) return;

    this.nextNftsOnMarketplaceId = 0;
    this.isNftsOnMarketplaceSortedByNameTitleFromUp =
      !this.isNftsOnMarketplaceSortedByNameTitleFromUp;
    this.isNftsOnMarketplaceSortedByPriceFromUp = null;

    this.sortRule = this.isNftsOnMarketplaceSortedByNameTitleFromUp
      ? 'name-asc'
      : 'name-desc';

    await this.fetchAllNftsOnMarketplace({
      sortRule: this.isNftsOnMarketplaceSortedByNameTitleFromUp
        ? 'name-asc'
        : 'name-desc',
      searchValue: this.searchValue,
    });
  };

  getCheckOwner = async ({ nft_address }: { nft_address: string }) => {
    try {
      this.tonApiNftInfo = await fetchTonApiNftOnMarketplace({ nft_address });

      await sleep();
      const checkOwnerResponse = await fetchTonApiNftInfo({
        owner: this.tonApiNftInfo?.owner.address,
      });

      return {
        address: this.tonApiNftInfo?.owner.address,
        checkOwnerResponse,
      };
    } catch (err) {
      console.error(ERROR_DURING_CHECK_OWNER_ON_MARKETPLACE, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }
  };

  fetchTonApiNftInfo = async ({ nft_address }: { nft_address: string }) => {
    this.isSubmitButtonDisabled = false;

    try {
      const checkOwner = await this.getCheckOwner({
        nft_address,
      });

      if (
        (this.activeNft &&
          checkOwner &&
          checkOwner.checkOwnerResponse.success) ||
        !checkOwner ||
        !this.activeNft?.id
      ) {
        return;
      }

      this.rootStore.vouchersStore.addVoucherTooltip({
        title: this.activeNft.name,
        type: 'deletedNft',
      });

      await this.deleteNftFromMarketplace({ id: this.activeNft.id });
      this.resetAllNftsOnMarketplace();
      await this.fetchAllNftsOnMarketplace({});

      return true;

      /* if (checkOwner && checkOwner.checkOwnerResponse.success) {
        const saleAddress = toUserFriendlyAddress(checkOwner.address);

        if (
          this.activeNft &&
          this.activeNft?.id &&
          saleAddress !== this.activeNft?.sale_address
        ) {
          this.isSubmitButtonDisabled = true;

          if (pathname === '/nfts/shop') {

            /!*await this.deleteNftFromMarketplace({ id: this.activeNft.id });*!/
          }
        }

        return;
      }

      if (
        checkOwner &&
        !checkOwner.checkOwnerResponse.success &&
        this.activeNft?.id
      ) {

        /!*await this.deleteNftFromMarketplace({ id: this.activeNft.id });*!/
      }*/
    } catch (err) {
      console.error(ERROR_DURING_GET_NFT_INFO_FROM_TON_API, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }
  };

  fetchHistoryOfNftOnMarketplace = async ({
    nft_address,
  }: {
    nft_address: string;
  }) => {
    const limit = 100;
    const next = 0;

    const hash = this.rootStore.createHash([
      { limit },
      { next },
      { nft_address },
    ]);

    try {
      this.nftHistory = await fetchHistoryOfNftOnMarketplace({
        address: nft_address,
        limit,
        next,
        hash,
      });
    } catch (err) {
      console.error(ERROR_DURING_GET_NFT_HISTORY, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }
  };

  getExistingNftsOnMarketplace = async ({
    account_id,
  }: {
    account_id: string;
  }) => {
    try {
      const existingNftsOnWallet = await fetchAllExistingTonApiNfts({
        account_id,
      });

      return existingNftsOnWallet.nft_items
        .filter((nftItem) =>
          nftItem.collection
            ? this.collection?.includes(nftItem.collection.address)
            : false,
        )
        .map(
          ({
            address,
            metadata: { name, description, ship_level },
            previews,
            owner: { address: ownerAddress },
            collection: { name: collectionName, address: collectionAddress },
          }) => {
            const formattedNftAddress = toUserFriendlyAddress(address);
            const formattedUserAddress = toUserFriendlyAddress(ownerAddress);

            return {
              nft_address: formattedNftAddress,
              name,
              description,
              ship_level,
              image:
                previews.find((image) => image.resolution === '500x500')?.url ??
                '',
              owner: formattedUserAddress,
              collection: collectionName,
              collection_name: collectionName,
              collection_address: collectionAddress,
              sale: {
                is_sale: false,
                sale_price: '',
              },
            };
          },
        );
    } catch (err) {
      console.error(ERROR_DURING_GET_ALL_USER_EXISTING_NFTS, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }

    this.rootStore.setIsLoading(false);
  };

  fetchAllExistingNfts = async ({ account_id }: { account_id: string }) => {
    this.rootStore.setIsLoading(true);

    const limit = 1000,
      next = 0;

    const hash = this.rootStore.createHash([
      { address: account_id },
      { limit },
      { next },
    ]);

    try {
      const existingNftsOnSale = await fetchAllNftsOnMarketplace({
        address: account_id,
        limit,
        next,
        hash,
      });

      const filteredNftsOnWallet =
        (await this.getExistingNftsOnMarketplace({
          account_id,
        })) ?? [];

      const filteredExistingNftsOnSale = existingNftsOnSale?.items.map(
        ({
          nft_address,
          name,
          description,
          image,
          owner,
          collection_address,
          collection_name,
          sale_price,
        }) => ({
          nft_address,
          name,
          description,
          image,
          owner,
          collection_name,
          collection_address,
          sale: {
            is_sale: true,
            sale_price,
          },
        }),
      );

      this.existingNfts = [
        ...filteredExistingNftsOnSale,
        ...filteredNftsOnWallet,
      ];
    } catch (err) {
      console.error(ERROR_DURING_GET_ALL_USER_EXISTING_NFTS, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }

    this.rootStore.setIsLoading(false);
  };

  sellNftOnMarketplace = async ({
    price,
    tonConnectUI,
  }: {
    price: string;
    tonConnectUI: TonConnectUI;
  }) => {
    if (!this.activeNft) return;

    /** нфт id по адресу коллекции для определения nft_id если его нет */
    const nftsId: Record<string, number> = {
      '0:b95e118b379c241107227f3b22c8ea4fbc37c0a8b073430b1f104655452ecb03': 1,
      '0:8bc4eb5443ba2ec8d76a9f3c5c1ae0a1b6ac5c6cb2aac51b119942ac4199e3c2': 2,
      '0:c25378c53e27c0d0ca29b410eac92e1377c4cab8d378330d4df805bf5461cacf': 3,
      '0:f536170199b56035815132d9520d57567304139af57860d9054b2743dc568e3d': 4,
      '0:aff593dd43d2d0ae79566e043b6ed0f9aa0cb38b5b96a9bf6dae03667522f57a': 5,
      '0:a5261daebcee8d8cfbeaedef4d731f108e631276983bdf14e8df6e3fd1324f16': 1,
      '0:6d89c9c49bde6cfb117420067efaa6d06f739855f7667d3225d07ad40971c5ed': 0,
      '0:a6b396b011a5ae02918f637ce9b54e101035bf22430a793159b841c14e27bdb1': 6,
      '0:b017bf8e4221c1c4a78f88114e016c331c34c51e4251f658a43aa4d8150734f0': 6,
      '0:b0a3e32c6eb99668cb41dcf6fe7a0042a3665f66d73cbd9fb19ceb3c07a3beb4': 6,
      '0:a2a9a1da49c6901635f59304c3c7928744e54fb79e1c9acdab607066d5483a13': 6,
      '0:8d00d46f5cef99e462bab8b6c132acde08eb0d8f1558547cf49d3dbb13fc849b': 7,
    };

    const {
      image,
      name,
      description,
      nft_address,
      nft_id,
      owner,
      collection_address,
      collection_name,
    } = this.activeNft;

    const hexAddress = new Address(collection_address).toString(false);
    const hash = this.rootStore.createHash([
      { collection_address },
      { collection_name },
      { description },
      { image },
      { name },
      { nft_address },
      { nft_id: nft_id ?? nftsId?.[hexAddress] ?? 0 },
      { owner },
      { price },
    ]);

    try {
      this.transactionStatus = 'processing';

      /** делаем запрос на наш сервер на выставление нфт на продажу */
      const sellNftResponse = await sellNftOnMarketplace({
        image,
        name,
        description,
        nft_address,
        nft_id: nft_id ?? nftsId?.[hexAddress] ?? 0,
        owner,
        price,
        collection_address,
        collection_name,
        hash,
      });

      /** если все ок, то запускаем транзакцию через tonConnect */
      if (sellNftResponse) {
        const {
          to_address,
          value,
          payload,
          item: { id },
        } = sellNftResponse;
        this.saleId = id;

        const bounceableAddress = new TonWeb.Address(to_address).toString(
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
              amount: value.toString(),
              payload,
            },
          ],
        };

        try {
          const transactionResult = await tonConnectUI.sendTransaction(tx, {
            returnStrategy: 'back',
          });

          this.setIsModalOpen(true);

          if (transactionResult) {
            const hash = await TonWeb.boc.Cell.oneFromBoc(
              TonWeb.utils.base64ToBytes(transactionResult.boc),
            ).hash();
            this.transactionId = TonWeb.utils.bytesToHex(hash);

            const isErrorCodeExist = await this.checkTransactionTonApi({
              transactionId: this.transactionId,
            });

            if (!isErrorCodeExist) {
              this.transactionStatus = 'fulfilled';

              ls.set('startSaleNftSecure', this.rootStore.timeNow); // записываем время начала транзакции
              ls.set('nftAddressSecure', nft_address); // записываем адрес нфт
              ls.set('nftIdFromServerSecure', id); // записываем айди нфт из БД
              ls.set('saleTransactionIdSecure', this.transactionId); // записываем ID транзакции
              ls.set(
                'saleOwnerAddressSecure',
                toUserFriendlyAddress(tonConnectUI.account?.address || ''),
              ); // записываем адрес владельца

              this.paymentStatus = 'processing';
              this.startCheckNftSaleStatus(); // начинаем проверять tonApi на предмет появления поля sale у nft
            } else {
              this.transactionStatus = 'rejected';
            }
          }
        } catch (e) {
          this.transactionStatus = 'rejected';
          console.error('error during send transaction', e);
        }
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if ('response' in err && err.response?.data?.code === 555) {
          const userInitData = this.rootStore.userStore.getUserInitData();
          const userId: number | undefined = userInitData?.id;

          if (userId)
            this.addNftSellErrorTooltip({
              nftAddress: nft_address,
              walletAddress: this.rootStore.userStore.userWalletAddress,
              telegramId: userId,
              image,
            });
        }
      }

      console.error(ERROR_DURING_SELL_NFT_ON_MARKETPLACE, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }

      await this.rejectNftOnMarketplace();
      this.transactionStatus = 'rejected';
    }
  };

  checkTonApiSaleNft = async () => {
    const startTime = ls.get('startSaleNftSecure');
    const nftAddress = ls.get('nftAddressSecure');
    const nftId = ls.get('nftIdFromServerSecure');
    const transactionId = ls.get('saleTransactionIdSecure');
    const ownerAddress = ls.get('saleOwnerAddressSecure');

    const resetTimer = () => {
      clearInterval(this.checkStatusTimer);
      this.checkStatusTimer = undefined;

      ls.remove('startSaleNftSecure');
      ls.remove('nftAddressSecure');
      ls.remove('nftIdFromServerSecure');
      ls.remove('saleTransactionIdSecure');
      ls.remove('saleOwnerAddressSecure');
    };

    /**если в LS нет времени начала выставления на продажу */
    if (!startTime && !nftAddress) {
      resetTimer();
      return;
    }

    try {
      /**если прошло более 10 минут, то убиваем проверку */
      if (Number(startTime) + 600 < this.rootStore.timeNow) {
        resetTimer();
        return;
      }

      const checkOwner = await this.getCheckOwner({
        nft_address: nftAddress,
      });

      if (checkOwner && checkOwner.checkOwnerResponse.success) {
        /** если мы перезагрузили страницу и потеряли данные выбранной nft TODO */
        if (!this.saleId || !this.transactionId) {
          this.saleId = nftId;
          this.transactionId = transactionId;
        }

        const status: TransactionStatus =
          await this.confirmOnSellNftOnMarketplace({
            sale_address: toUserFriendlyAddress(checkOwner.address),
            owner: ownerAddress,
          });

        if (status === 'processing') return;

        /** обнуляем все нфт в маркетплейсе и запрашиваем занова */
        this.nftsOnMarketplace = null;

        clearInterval(this.checkStatusTimer);
        this.checkStatusTimer = undefined;
        this.paymentStatus = 'fulfilled';

        ls.remove('startSaleNftSecure');
        ls.remove('nftAddressSecure');
        ls.remove('nftIdFromServerSecure');
        ls.remove('saleTransactionIdSecure');
        ls.remove('saleOwnerAddressSecure');

        if (status === 'fulfilled') this.paymentStatus = 'fulfilled';
        if (status === 'rejected') this.paymentStatus = 'rejected';
      }
    } catch (err) {
      console.error(ERROR_DURING_CHECK_SALE_NFT_STATUS, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }
  };

  checkTonApiCancelSaleNft = async () => {
    const startTime = ls.get('startCancelSaleNftSecure');
    const nftAddress = ls.get('saleNftAddressSecure');
    const transactionId = ls.get('saleCancelTransactionIdSecure');

    const resetTimer = () => {
      clearInterval(this.checkCancelStatusTimer);
      this.checkCancelStatusTimer = undefined;

      ls.remove('startCancelSaleNftSecure');
      ls.remove('saleNftAddressSecure');
      ls.remove('saleCancelTransactionIdSecure');
    };

    /**если в LS нет времени начала снятия с продажи */
    if (!startTime && !nftAddress) {
      resetTimer();
      return;
    }

    try {
      /**если прошло более 10 минут, то убиваем проверку*/
      if (Number(startTime) + 600 < this.rootStore.timeNow) {
        resetTimer();
        return;
      }

      const checkOwner = await this.getCheckOwner({
        nft_address: nftAddress,
      });

      if (checkOwner && !checkOwner.checkOwnerResponse.success) {
        if (!this.transactionId) {
          this.transactionId = transactionId;
        }

        const status: TransactionStatus =
          await this.confirmCancelSellNftOnMarketplace({
            owner: toUserFriendlyAddress(checkOwner.address),
          });

        if (status === 'processing') return;

        /** обнуляем все нфт в маркетплейсе и запрашиваем занова */
        this.nftsOnMarketplace = null;

        clearInterval(this.checkCancelStatusTimer);
        this.checkCancelStatusTimer = undefined;
        ls.remove('startCancelSaleNftSecure');
        ls.remove('saleNftAddressSecure');
        ls.remove('saleCancelTransactionIdSecure');

        if (status === 'fulfilled') this.paymentStatus = 'fulfilled';
        if (status === 'rejected') this.paymentStatus = 'rejected';
      }
    } catch (err) {
      console.error(ERROR_DURING_CHECK_SALE_NFT_STATUS, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }
  };

  startCheckNftSaleStatus = () => {
    if (this.checkStatusTimer) return;

    this.checkStatusTimer = setInterval(this.checkTonApiSaleNft, 1000 * 5);
  };

  startCheckNftCancelSaleStatus = () => {
    if (this.checkCancelStatusTimer) return;

    this.checkCancelStatusTimer = setInterval(
      this.checkTonApiCancelSaleNft,
      1000 * 5,
    );
  };

  confirmOnSellNftOnMarketplace = async ({
    sale_address,
    owner,
  }: {
    sale_address: string;
    owner: string;
  }) => {
    const hash = this.rootStore.createHash([
      {
        id: this.saleId as number,
      },
      { sale_address },
      { txid: this.transactionId },
      { user_address: owner },
    ]);

    try {
      const response = await confirmOnSellNftOnMarketplace({
        id: this.saleId as number,
        sale_address,
        user_address: owner,
        txid: this.transactionId,
        hash,
      });

      this.rootStore.vouchersStore.addVoucherTooltip({
        title: response.item.name,
        type: 'nftSale',
      });
      this.fetchCount = 0;

      return 'fulfilled';
    } catch (e) {
      if (this.fetchCount < 10) {
        this.fetchCount++;
        return 'processing';
      }

      console.error(ERROR_DURING_CONFIRM_SELL_NFT_ON_MARKETPLACE, e);
      this.rootStore.userStore.addErrorResponse(e);

      if (Utils.getErrorMessage(e)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(e));
      }

      this.fetchCount = 0;
      return 'rejected';
    }
  };

  rejectNftOnMarketplace = async () => {
    const hash = this.rootStore.createHash([{ id: this.saleId! }]);

    try {
      await rejectOnSellNftOnMarketplace({ id: this.saleId!, hash });
    } catch (e) {
      console.error(ERROR_DURING_REJECT_SELL_NFT_ON_MARKETPLACE, e);
      this.rootStore.userStore.addErrorResponse(e);

      if (Utils.getErrorMessage(e)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(e));
      }
    }
  };

  cancelSellNftOnMarketplace = async ({
    tonConnectUI,
  }: {
    tonConnectUI: TonConnectUI;
  }) => {
    /*TODO убрать моки после сброса покупки !!!*/

    if (!this.activeNft) return;

    try {
      const checkOwner = await this.getCheckOwner({
        nft_address: this.activeNft.nft_address,
      });

      if (checkOwner) {
        const formattedSaleNftAddress = checkOwner.checkOwnerResponse.success
          ? toUserFriendlyAddress(checkOwner.address)
          : (this.activeNft.sale_address as string);

        this.transactionStatus = 'processing';
        const hash = this.rootStore.createHash([
          { id: formattedSaleNftAddress },
        ]);

        const response = await cancelSellNftOnMarketplaceWithoutId({
          address: formattedSaleNftAddress,
          hash,
        });

        if (response) {
          try {
            const { to_address, value, payload } = response;

            const bounceableAddress = new TonWeb.Address(to_address).toString(
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
                  amount: value.toString(),
                  payload,
                },
              ],
            };

            const sendTransaction = await tonConnectUI.sendTransaction(tx, {
              returnStrategy: 'back',
            });

            this.setIsModalOpen(true);

            if (sendTransaction) {
              const hash = await TonWeb.boc.Cell.oneFromBoc(
                TonWeb.utils.base64ToBytes(sendTransaction.boc),
              ).hash();
              this.transactionId = TonWeb.utils.bytesToHex(hash);

              const isErrorCodeExist = await this.checkTransactionTonApi({
                transactionId: this.transactionId,
              });

              if (!isErrorCodeExist) {
                this.transactionStatus = 'fulfilled';
                ls.set('startCancelSaleNftSecure', this.rootStore.timeNow); // записываем время начала транзакции
                ls.set(
                  'saleNftAddressSecure',
                  this.activeNft?.nft_address as string,
                ); // записываем адрес нфт
                ls.set('saleCancelTransactionIdSecure', this.transactionId); // записываем ID транзакции

                this.paymentStatus = 'processing';
                this.startCheckNftCancelSaleStatus(); // начинаем проверять tonApi на предмет удаления поля sale у nft
              } else {
                this.transactionStatus = 'rejected';
              }
            }
          } catch (e) {
            this.transactionStatus = 'rejected';
            console.error('error during send transaction', e);
          }
        }
      }
    } catch (err) {
      console.error(ERROR_DURING_CANCEL_SALE_NFT_ON_MARKETPLACE, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }
  };

  confirmCancelSellNftOnMarketplace = async ({ owner }: { owner: string }) => {
    if (!this.saleNftItem) {
      await this.getSaleItemNft();
    }

    if (!this.saleNftItem) return 'rejected';

    const { id } = this.saleNftItem;
    const hash = this.rootStore.createHash([
      { id },
      { owner },
      { txid: this.transactionId },
    ]);

    try {
      const response = await confirmCancelSellNftOnMarketplace({
        id,
        owner,
        txid: this.transactionId,
        hash,
      });

      this.rootStore.vouchersStore.addVoucherTooltip({
        title: response.item.name,
        type: 'nftWithdraw',
      });
      this.fetchCount = 0;

      return 'fulfilled';
    } catch (err) {
      if (this.fetchCount < 10) {
        this.fetchCount++;
        return 'processing';
      }

      console.error(ERROR_DURING_CONFIRM_CANCEL_SALE_NFT_ON_MARKETPLACE, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }

      this.fetchCount = 0;
      return 'rejected';
    }
  };

  getSaleItemNft = async () => {
    const nftAddress = ls.get('saleNftAddressSecure');

    const hash = this.rootStore.createHash([
      { address: this.activeNft?.nft_address ?? nftAddress },
    ]);

    try {
      const response = await getActiveSaleNftOnMarketplace({
        address: this.activeNft?.nft_address ?? nftAddress,
        hash,
      });

      if (response) {
        this.saleNftItem = response.item;
      }
    } catch (err) {
      console.error(ERROR_DURING_GET_SELL_NFT_ON_MARKETPLACE, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }

      throw err;
    }
  };

  buyNftOnMarketplace = async ({
    tonConnectUI,
  }: {
    tonConnectUI: TonConnectUI;
  }) => {
    if (!this.activeNft?.id) return;

    this.saleId = this.activeNft.id;
    const hash = this.rootStore.createHash([{ id: this.saleId }]);

    try {
      this.transactionStatus = 'processing';

      /** делаем запрос на наш сервер на покупку нфт */
      const response = await buyNftOnMarketplace({
        id: this.saleId,
        hash,
      });

      /** если все ок, то запускаем транзакцию через tonConnect */
      if (response) {
        const { to_address, value, payload } = response;

        /*
        const ADDRESS = 'EQBIZXImGDMWMBtQDLICowseoWH8dprer8v82XYy0bd52HB8';
        const AMOUNT = 56 * 10 ** 8;
*/

        const bounceableAddress = new TonWeb.Address(to_address).toString(
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
              amount: value.toString(),
              payload,
            },
          ],
        };

        try {
          const transactionResult = await tonConnectUI.sendTransaction(tx, {
            returnStrategy: 'back',
          });

          this.setIsModalOpen(true);

          if (transactionResult) {
            const hash = await TonWeb.boc.Cell.oneFromBoc(
              TonWeb.utils.base64ToBytes(transactionResult.boc),
            ).hash();
            this.transactionId = TonWeb.utils.bytesToHex(hash);

            const isErrorCodeExist = await this.checkTransactionTonApi({
              transactionId: this.transactionId,
            });

            if (!isErrorCodeExist) {
              this.transactionStatus = 'fulfilled';
              ls.set('startBuyingNftSecure', this.rootStore.timeNow); // записываем время начала транзакции
              ls.set(
                'buyNftAddressSecure',
                this.activeNft?.nft_address as string,
              ); // записываем адрес нфт
              ls.set('buyNftIdFromServerSecure', this.saleId); // записываем айди нфт из БД
              ls.set('buyTransactionIdSecure', this.transactionId); // записываем ID транзакции

              this.paymentStatus = 'processing';
              this.startCheckNftBuyingStatus(); // начинаем проверять tonApi на предмет появления поля sale у nft
            } else {
              this.transactionStatus = 'rejected';
            }
          }
        } catch (err) {
          this.transactionStatus = 'rejected';
          console.error('error during check transaction', err);
        }
      }
    } catch (err) {
      console.error(ERROR_DURING_BUY_NFT_ON_MARKETPLACE, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }
  };

  startCheckNftBuyingStatus = () => {
    if (this.checkBuyingStatusTimer) return;

    this.checkBuyingStatusTimer = setInterval(this.checkTonApiBuyNft, 1000 * 5);
  };

  checkTransactionTonApi = async ({
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
          transaction: { compute_phase },
          children,
        } = response;

        if (compute_phase.exit_code && compute_phase.exit_code !== 0) {
          return true;
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
      this.transactionStatus = 'rejected';
      console.error(ERROR_DURING_CHECK_API_TON_NFT_STATUS, err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }
  };

  checkTonApiBuyNft = async () => {
    const startTime = ls.get('startBuyingNftSecure');
    const nftAddress = ls.get('buyNftAddressSecure');
    const transactionId = ls.get('buyTransactionIdSecure');
    const saleId = ls.get('buyNftIdFromServerSecure');

    const resetTimer = () => {
      clearInterval(this.checkBuyingStatusTimer);
      this.checkBuyingStatusTimer = undefined;

      ls.remove('startBuyingNftSecure');
      ls.remove('buyNftAddressSecure');
      ls.remove('buyTransactionIdSecure');
      ls.remove('buyNftIdFromServerSecure');
    };

    /**если в LS нет времени начала покупки */
    if (!startTime && !nftAddress) {
      resetTimer();
      return;
    }

    try {
      /**если прошло более 10 минут, то убиваем проверку */
      if (Number(startTime) + 600 < this.rootStore.timeNow) {
        resetTimer();
        return;
      }

      const checkOwner = await this.getCheckOwner({
        nft_address: nftAddress,
      });

      if (checkOwner && !checkOwner.checkOwnerResponse.success) {
        if (!this.transactionId || this.saleId) {
          this.transactionId = transactionId;
          this.saleId = saleId;
        }

        const status: TransactionStatus =
          await this.confirmBuyingNftOnMarketplace({
            new_owner: toUserFriendlyAddress(checkOwner.address),
          });

        if (status === 'processing') return;

        /** обнуляем все нфт в маркетплейсе и запрашиваем занова */
        this.nftsOnMarketplace = null;

        clearInterval(this.checkBuyingStatusTimer);
        this.checkBuyingStatusTimer = undefined;
        ls.remove('startBuyingNftSecure');
        ls.remove('buyNftAddressSecure');
        ls.remove('buyTransactionIdSecure');
        ls.remove('buyNftIdFromServerSecure');

        if (status === 'fulfilled') this.paymentStatus = 'fulfilled';
        if (status === 'rejected') this.paymentStatus = 'rejected';
      }
    } catch (err) {
      console.error(ERROR_DURING_CHECK_BUYING_NFT_STATUS, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }
  };

  confirmBuyingNftOnMarketplace = async ({
    new_owner,
  }: {
    new_owner: string;
  }) => {
    const hash = this.rootStore.createHash([
      { id: this.saleId as number },
      { new_owner },
      { txid: this.transactionId },
    ]);

    try {
      const response = await confirmBuyNftOnMarketplace({
        id: this.saleId as number,
        txid: this.transactionId,
        new_owner,
        hash,
      });

      this.rootStore.vouchersStore.addVoucherTooltip({
        title: response.item.name,
        type: 'nftBuy',
      });
      this.fetchCount = 0;

      return 'fulfilled';
    } catch (err) {
      if (this.fetchCount < 10) {
        this.fetchCount++;
        return 'processing';
      }

      console.error(ERROR_DURING_CONFIRM_BUY_NFT_ON_MARKETPLACE, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }

      this.fetchCount = 0;
      return 'rejected';
    }
  };

  deleteNftFromMarketplace = async ({ id }: { id: number }) => {
    const hash = this.rootStore.createHash([{ id }]);

    try {
      await deleteNftOnMarketplace({ id, hash });
    } catch (err) {
      console.error(ERROR_DURING_DELETE_NFT_ON_MARKETPLACE, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }
  };

  addNftImageTooltipVisible = () => (this.isNftImageTooltipOpen = true);

  deleteNftImageTooltipVisible = () => (this.isNftImageTooltipOpen = false);

  addNftSellErrorTooltip = (data: NftSellErrorTooltip) =>
    (this.nftSellErrorTooltip = data);

  deleteNftSellErrorTooltip = () => (this.nftSellErrorTooltip = null);

  resetStatuses = () => {
    this.transactionStatus = 'pending';
    this.paymentStatus = 'pending';
  };
}
