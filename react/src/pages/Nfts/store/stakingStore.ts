import { fromNano, toNano } from '@ton/core';
import { SendTransactionRequest, TonConnectUI } from '@tonconnect/ui-react';
import { action, computed, makeObservable, observable } from 'mobx';
import SecureLS from 'secure-ls';
import TonWeb from 'tonweb';

import {
  checkTonApiTransactionAdded,
  checkTransactionTonApiNft,
  confirmClaimStakeLootbox,
  confirmRestakeLootbox,
  confirmStakeLootbox,
  confirmWithdrawLootbox,
  fetchClaimStakeLootbox,
  fetchLootboxes,
  fetchRestakeLootboxInfo,
  fetchStakeLootboxInfo,
  fetchStakedLootboxes,
  fetchUserBalanceByTonApi,
  fetchWithdrawLootboxInfo,
  rejectStakeLootbox,
  syncLootbox,
} from '@/pages/Nfts/api';
import {
  ActiveLootbox,
  CheckTransactionTonApiResponse,
  Lootbox,
  LootboxRewards,
  StakedLootbox,
  StakingRewards,
} from '@/pages/Nfts/types';
import { PartShipKey } from '@/pages/Ships/types';
import {
  ERROR_DURING_CHECK_API_TON_NFT_STATUS,
  ERROR_DURING_CHECK_BUYING_OF_STAKE_LOOTBOX,
  ERROR_DURING_CONFIRM_BUYING_OF_STAKE_LOOTBOX,
  ERROR_DURING_FETCHING_CLAIM_STAKE_LOOTBOX_DATA,
  ERROR_DURING_GET_LOOTBOXES,
  ERROR_DURING_GET_STAKED_LOOTBOXES,
  ERROR_DURING_GET_STAKE_LOOTBOX_INFO,
  ERROR_DURING_GET_USER_TOKENS_BALANCE,
  ERROR_DURING_STAKE_LOOTBOX_SEND_TRANSACTION,
} from '@/services/constants/errorMessages';
import { RootStore } from '@/store';
import { BaseStore } from '@/store/baseStore';
import Utils from '@/utils';

export const STAKING_SELECT_VALUES = [1000, 10_000, 50_000];
export const STAKING_SELECT_DURATION = [1, 3, 6];
const VALUES_INDEX: Record<number, number> = {
  1000: 0,
  10_000: 3,
  50_000: 6,
};
const MONTHLY_INDEX: Record<number, number> = { 1: 0, 3: 1, 6: 2 };
const VALUES_BY_SLIDE_INDEX: Record<
  number,
  Record<'value' | 'monthly', number>
> = {
  0: { value: 1000, monthly: 1 },
  1: { value: 1000, monthly: 3 },
  2: { value: 1000, monthly: 6 },
  3: { value: 10_000, monthly: 1 },
  4: { value: 10_000, monthly: 3 },
  5: { value: 10_000, monthly: 6 },
  6: { value: 50_000, monthly: 1 },
  7: { value: 50_000, monthly: 3 },
  8: { value: 50_000, monthly: 6 },
};
const ls = new SecureLS();

const oldStakeIds = [
  "4","5","30","31","33","34","36","37","38","39","40","41","42","43","44","45","49","66","70","97",
  "111","112","113","115","116","117","118","125","126","127","128","131","136","137","139","141","143","144","146","148",
  "150","156","157","160","162","163","164","170","171","172","173","179","181","182","183","185","186","189","191","197",
  "202","203","206","207","208","211","212","214","222","229","232","239","243","247","253","255","260","261","262","266",
  "267","269","271","272","273","276","281","284","289","290","291","292","293","294","297","298","299","300","301","302",
  "305","306","307","308","309","310","311","312","313","314","315","316","317","321","322","323","324","325","326","327",
  "328","331","333","334","337","338","343","344","348","352","353","354","355","356","359","360","361","363","364","369",
  "372","376","378","379","381","382","383","385","386","388","394","396","398","403","409","414","416","417","427","432",
  "435","443","448","452","455","457","459","460","461","463","472","473","474","475","476","477","479","480","481","482",
  "493","494","499","500","502","503","515","523","529","534","537","539","540","541","542","545","549","552","553","558",
  "559","561","564","567","568","569","571","572","573","575","576","586","587","589","590","593","594","595","596","598",
  "599","600","604","607","608","609","614","621","628","629","630","632","634","635","636","638","640","642","647","648",
  "651","654","657","660","664","665","669","678","681","682","683","684","685","686","688","689","690","692","699","702",
  "703","722","725","730","732","733","734","739","740","749","750","751","752","754","756","758","762","763","764","771",
  "777","782","785","795","797","798","799","802","805","809","813","814","815","819","820","822","826","827","828","829",
  "830","831","834","835","838","842","845","847","848","858","859","860","1145","1146","1147","1149","1151","1152","1154","1155",
  "1156","1157","1161","1166","1167","1175","1176","1177","1178","1179","1181","1186","1202","1203","1204","1205","1206","1208","1209","1210",
  "1211","1213","1214","1215","1216","1217","1218","1221","1226","1228","1229","1233","1234","1235","1236","1237","1238","1239","1241","1242",
  "1243","1244","1245","1246","1248","1249","1250","1252","1253","1254","1255","1256","1257","1258","1260","1261","1262","1264","1265","1267",
  "1273","1280","1281","1284","1285","1288","1290","1291","1297","1300","1301","1302","1303","1305","1307","1311","1312","1313","1315","1316",
  "1317","1321","1325","1327","1331","1332","1333","1339","1340","1342","1347","1348","1355","1359","1360","1362","1364","1365","1366","1367",
  "1376","1377","1378","1380","1381","1382","1383","1384","1385","1386","1387","1388","1390","1401","1402","1403","1407","1411","1412","1413",
  "1414","1415","1416","1417","1419","1420","1421","1423","1425","1430","1431","1432","1441","1442","1444","1445","1448","1449","1450","1451",
  "1452","1453","1454","1455","1456","1457","1462","1466","1469","1470","1471","1472","1473","1474","1476","1642","1643","1644","1645","1646",
  "1647","1648","1649","1650","1651","1652","1653","1654","1655","1656","1657","1658","1659","1660","1661","1662","1663","1664","1665","1666",
  "1667","1668","1669","1670","1671","1672","1673","1674","1675","1676","1677","1678","1679","1680","1681","1682","1683","1684","1685","1686",
  "1687","1688","1689","1690","1691","1692","1693","1694","1695","1696","1697","1698","1699","1700","1701","1702","1703","1704","1705","1706",
  "1707","1708","1709","1710","1711","1712","1713","1714","1715","1716","1717","1718","1719","1720","1721","1722","1723","1724","1725","1726",
  "1727","1728","1729","1730","1731","1732","1733","1734","1735","1736","1737","1738","1739","1740","1741","1742","1743","1744","1745","1878",
  "1930"
];

export class StakingStore extends BaseStore {
  rootStore: RootStore;

  _activeSlideIndex = 0;
  _stakingValue: number = 1;
  _stakingDuration: number = 1;
  stakingModalsIndex: 1 | 2 | 3 | 4 | 5 | null = null;
  stakingTooltips: number[] = [];
  userTokensBalance: number = 0;

  availableLootboxes: Lootbox[] | null = null;
  stakedLootboxes: StakedLootbox[] | null = null;
  stakingRewards: StakingRewards | null = null;
  activeLootbox: ActiveLootbox | null = null;

  transactionId: string = '';
  isStakingLoading = false;
  isRestakingLoading = false;
  isUnstakingLoading = false;
  isStakingVideoLoading = false;
  isButtonDisable = false;

  stakingCheckStatusTimer: NodeJS.Timeout | undefined;
  restakingCheckStatusTimer: NodeJS.Timeout | undefined;
  unstakingCheckStatusTimer: NodeJS.Timeout | undefined;
  claimStakingCheckStatusTimer: NodeJS.Timeout | undefined;
  fetchCount = 0;

  constructor(rootStore: RootStore) {
    super();

    this.rootStore = rootStore;

    makeObservable(this, {
      _activeSlideIndex: observable,
      _stakingValue: observable,
      _stakingDuration: observable,
      stakingModalsIndex: observable,
      stakingTooltips: observable,
      userTokensBalance: observable,
      availableLootboxes: observable,
      stakedLootboxes: observable,
      stakingRewards: observable,
      activeLootbox: observable,
      transactionId: observable,
      isStakingLoading: observable,
      isRestakingLoading: observable,
      isUnstakingLoading: observable,
      isStakingVideoLoading: observable,
      isButtonDisable: observable,
      stakingCheckStatusTimer: observable,
      restakingCheckStatusTimer: observable,
      unstakingCheckStatusTimer: observable,
      claimStakingCheckStatusTimer: observable,
      fetchCount: observable,

      setActiveSlideIndex: action,
      setStakingValue: action,
      setStakingDuration: action,
      addStakingTooltips: action,
      deleteStakingTooltips: action,
      deleteStakingRewards: action,
      addStakingModal: action,
      deleteStakingModal: action,
      setActiveLootbox: action,
      fetchLootboxes: action,
      fetchStakedLootboxes: action,
      getUserTokenBalance: action,
      checkTransactionTonApi: action,
      rejectStaking: action,
      stakeLootbox: action,
      startCheckStakingStatus: action,
      checkStakingStatus: action,
      confirmStakingLootbox: action,
      claimStakeLootbox: action,
      startCheckClaimStakingStatus: action,
      checkClaimStakingStatus: action,
      confirmClaimStakingLootbox: action,
      restakeLootbox: action,
      startCheckRestakingStatus: action,
      checkRestakingStatus: action,
      confirmRestakingLootbox: action,
      withdrawLootbox: action,
      startCheckUnstakingStatus: action,
      checkUnstakingStatus: action,
      confirmUnstakingLootbox: action,

      stakingValue: computed,
      stakingDuration: computed,
      activeSlideIndex: computed,
      isOldStake: computed,
    });
  }

  setActiveSlideIndex = (state: number) => (this._activeSlideIndex = state);

  setStakingValue = (state: number) => {
    this._stakingValue = state;
    this._activeSlideIndex =
      VALUES_INDEX[this._stakingValue] + MONTHLY_INDEX[this.stakingDuration];
  };

  setStakingDuration = (state: number) => {
    this._stakingDuration = state;
    this._activeSlideIndex =
      VALUES_INDEX[this.stakingValue] + MONTHLY_INDEX[this._stakingDuration];
  };

  addStakingTooltips = (value: number) => this.stakingTooltips.push(value);

  deleteStakingTooltips = () => this.stakingTooltips.shift();

  addStakingModal = (value: 1 | 2 | 3 | 4 | 5) =>
    (this.stakingModalsIndex = value);

  deleteStakingModal = () => (this.stakingModalsIndex = null);

  deleteStakingRewards = () => (this.stakingRewards = null);

  setActiveLootbox = (activeLootbox: ActiveLootbox) =>
    (this.activeLootbox = activeLootbox);

  fetchLootboxes = async () => {
    this.rootStore.setIsLoading(true);
    const hash = this.rootStore.createHash([]);

    try {
      this.availableLootboxes = await fetchLootboxes({ hash });
    } catch (err) {
      console.error(ERROR_DURING_GET_LOOTBOXES, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }

    this.rootStore.setIsLoading(false);
  };

  fetchStakedLootboxes = async ({
    limit = 100,
    offset = 0,
    withLoading = true,
  }: {
    limit?: number;
    offset?: number;
    withLoading?: boolean;
  } = {}) => {
    if (withLoading) this.rootStore.setIsLoading(true);

    const hash = this.rootStore.createHash([{ limit }, { offset }]);

    try {
      this.stakedLootboxes = (
        await fetchStakedLootboxes({
          limit,
          offset,
          hash,
        })
      ).list;
    } catch (err) {
      console.error(ERROR_DURING_GET_STAKED_LOOTBOXES, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }

    if (withLoading) this.rootStore.setIsLoading(false);
  };

  getUserTokenBalance = async ({
    userWalletAddress,
  }: {
    userWalletAddress: string;
  }) => {
    try {
      const { balance } = await fetchUserBalanceByTonApi({ userWalletAddress });
      this.userTokensBalance = Number(
        fromNano(Number(fromNano(balance)).toFixed(0)),
      );
    } catch (err) {
      console.error(ERROR_DURING_GET_USER_TOKENS_BALANCE, err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }
  };

  checkTransactionTonApi = async ({
    transactionId,
  }: {
    transactionId: string;
  }) => {
    // Получаем флаг старого стейка из localStorage
    const isOldStake = ls.get('isOldStakeSecure');
    console.log('Checking transaction:', { transactionId, isOldStake });
    try {
      console.log('Checking transaction status in TonAPI:', transactionId);
      const response = await checkTransactionTonApiNft({
        msg_id: transactionId,
      });
      console.log('TonAPI response:', JSON.stringify(response, null, 2));

      // Для старых стейков проверяем только успешность транзакции
      if (isOldStake) {
        const { success, aborted } = response.transaction;
        const isError = !success || aborted;
        console.log('Old stake transaction check result:', { success, aborted, isError });
        return isError;
      }

      const checkExitCode = (response: CheckTransactionTonApiResponse) => {
        const {
          transaction: { compute_phase, success, aborted },
          children,
        } = response;

        console.log('Checking transaction:', {
          hasChildren: !!children,
          childrenCount: children?.length,
          compute_phase,
          transaction_type: response.transaction.transaction_type,
          success,
          aborted
        });

        // Проверяем только success, игнорируем aborted так как он может быть true при SendDestroyIfZero
        if (!success) {
          console.log('Transaction failed');
          return true;
        }

        // Проверяем compute_phase только если она не пропущена
        if (!compute_phase.skipped && compute_phase.exit_code && compute_phase.exit_code !== 0) {
          console.log('Non-zero exit code:', compute_phase.exit_code);
          return true;
        }

        if (!children) return false;

        console.log('Checking children transactions:', children.length);
        for (const [index, el] of children.entries()) {
          console.log(`Checking child transaction ${index}:`, {
            type: el.transaction.transaction_type,
            success: el.transaction.success,
            compute_phase: el.transaction.compute_phase,
            aborted: el.transaction.aborted
          });
          if (checkExitCode(el)) {
            console.log('Found error in child transaction', index);
            return true;
          }
        }

        return false;
      };

      return checkExitCode(response);
    } catch (err) {
      console.error(ERROR_DURING_CHECK_API_TON_NFT_STATUS, err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }
  };

  rejectStaking = async ({ id, error }: { id: number; error: string }) => {
    const hash = this.rootStore.createHash([{ id }, { error }]);
    await rejectStakeLootbox({ id, error, hash });

    this.isStakingLoading = false;
    this.addStakingModal(5);
  };

  // STAKE //

  stakeLootbox = async ({
    id,
    address,
    tonConnectUI,
  }: {
    id: number;
    address: string;
    tonConnectUI: TonConnectUI;
  }) => {
    const hash = this.rootStore.createHash([{ address }, { id }]);

    try {
      const {
        value,
        to,
        body,
        id: lootBoxId,
      } = await fetchStakeLootboxInfo({
        id,
        address,
        hash,
      });

      const bounceableAddress = new TonWeb.Address(to).toString(
        true,
        true,
        true,
        false,
      );
      const tx: SendTransactionRequest = {
        validUntil: Math.floor(Date.now() / 1000) + 60,
        messages: [
          {
            address: bounceableAddress,
            amount: toNano(value).toString(),
            payload: body,
          },
        ],
      };

      try {
        const transactionResult = await tonConnectUI.sendTransaction(tx, {
          returnStrategy: 'back',
        });

        if (transactionResult) {
          this.isStakingLoading = true;

          const hash = await TonWeb.boc.Cell.oneFromBoc(
            TonWeb.utils.base64ToBytes(transactionResult.boc),
          ).hash();
          this.transactionId = TonWeb.utils.bytesToHex(hash);

          ls.set('startStakingLootboxSecure', this.rootStore.timeNow); // записываем время начала транзакции
          ls.set('stakingLootboxTransactionIdSecure', this.transactionId); // записываем ID транзакции
          ls.set('stakingLootboxAddressSecure', address); // записываем адрес владельца
          ls.set('stakingLootboxIdSecure', lootBoxId); // записываем id купленного лутбокса

          this.startCheckStakingStatus({ walletAddress: address }); // начинаем проверять tonApi
        }
      } catch (err) {
        await this.rejectStaking({
          id,
          error: ERROR_DURING_STAKE_LOOTBOX_SEND_TRANSACTION,
        });

        console.error(err);
        this.rootStore.userStore.addErrorResponse(err);

        if (Utils.getErrorMessage(err)) {
          this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
        }
      }
    } catch (err) {
      await this.rejectStaking({
        id,
        error: ERROR_DURING_GET_STAKE_LOOTBOX_INFO,
      });

      console.error(err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }
  };

  startCheckStakingStatus = ({ walletAddress }: { walletAddress: string }) => {
    if (this.stakingCheckStatusTimer) return;

    this.stakingCheckStatusTimer = setInterval(
      () => this.checkStakingStatus({ walletAddress }),
      1000 * 10,
    );
  };

  checkStakingStatus = async ({ walletAddress }: { walletAddress: string }) => {
    const startTime = ls.get('startStakingLootboxSecure');
    const transactionId = ls.get('stakingLootboxTransactionIdSecure');
    const id = ls.get('stakingLootboxIdSecure');

    const resetStorage = () => {
      ls.remove('startStakingLootboxSecure');
      ls.remove('stakingLootboxTransactionIdSecure');
      ls.remove('stakingLootboxAddressSecure');
      ls.remove('stakingLootboxIdSecure');
    };

    const resetTimer = () => {
      clearInterval(this.stakingCheckStatusTimer);
      this.stakingCheckStatusTimer = undefined;
    };

    /**если в LS нет времени начала покупки */
    if (!startTime || !transactionId) {
      resetTimer();
      return;
    }

    try {
      /**если прошло более 15 минут, то убиваем проверку */
      if (Number(startTime) + 900 < this.rootStore.timeNow) {
        const error = 'It took more than 15 minutes during the operation';
        await this.rejectStaking({ id, error });

        resetTimer();
        resetStorage();
        this.isButtonDisable = false;

        return;
      }

      this.isButtonDisable = true;
      const { in_progress, actions } = await checkTonApiTransactionAdded({
        txid: transactionId,
      });

      if (!in_progress) {
        const address = actions.find(
          (action) =>
            action?.ContractDeploy?.address &&
            action?.ContractDeploy?.interfaces.length === 0,
        )?.ContractDeploy?.address;

        const isErrorCodeExist = await this.checkTransactionTonApi({
          transactionId,
        });

        if (!isErrorCodeExist && address) {
          this.fetchCount = 0;
          resetTimer();
          await this.rootStore.sleep(45_000); // Увеличиваем время ожидания до 45 секунд
          await this.confirmStakingLootbox({ address, walletAddress });
        } else {
          resetTimer();
          this.fetchCount = 0;
          await this.rejectStaking({
            id,
            error: ERROR_DURING_CHECK_BUYING_OF_STAKE_LOOTBOX,
          });
        }
      }
    } catch (err) {
      /** проверяем 900с (15мин),
       * тк tonApi выдает `{"error":"entity not found"}` */
      if (this.fetchCount < 180) {
        this.fetchCount++;
        return;
      }
      resetTimer();
      resetStorage();

      await this.rejectStaking({
        id,
        error: ERROR_DURING_CHECK_BUYING_OF_STAKE_LOOTBOX,
      });

      console.error(err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }

      this.fetchCount = 0;
      this.isButtonDisable = false;
    }
  };

  confirmStakingLootbox = async ({
    address,
    walletAddress,
  }: {
    address: string;
    walletAddress: string;
  }) => {
    const id = ls.get('stakingLootboxIdSecure');
    const txid = ls.get('stakingLootboxTransactionIdSecure');

    const hash = this.rootStore.createHash([{ address }, { id }, { txid }]);

    try {
      await confirmStakeLootbox({ id, address, txid, hash });
      await this.fetchStakedLootboxes({ withLoading: false });
      await this.getUserTokenBalance({ userWalletAddress: walletAddress });

      this.isStakingLoading = false;
      this.addStakingTooltips(0);
    } catch (err) {
      console.error(ERROR_DURING_CONFIRM_BUYING_OF_STAKE_LOOTBOX, err);
      this.isStakingLoading = false;
      this.addStakingModal(5);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }

    ls.remove('startStakingLootboxSecure');
    ls.remove('stakingLootboxTransactionIdSecure');
    ls.remove('stakingLootboxAddressSecure');
    ls.remove('stakingLootboxIdSecure');
    ls.remove('isOldStakeSecure'); // Очищаем флаг старого стейка
    this.isButtonDisable = false;
  };

  // CLAIM_STAKE //

  claimStakeLootbox = async ({
    id,
    tonConnectUI,
  }: {
    id: number;
    tonConnectUI: TonConnectUI;
  }) => {
    const isOldStake = oldStakeIds.includes(id.toString()) || (id >= 1642 && id <= 1745);
    console.log('Claiming stake:', { id, isOldStake });
    const hash = this.rootStore.createHash([{ id }]);

    try {
      const {
        id: lootBoxId,
        to,
        body,
        value,
      } = await fetchClaimStakeLootbox({
        id,
        hash,
      });

      const bounceableAddress = new TonWeb.Address(to).toString(
        true,
        true,
        true,
        false,
      );
      const tx: SendTransactionRequest = {
        validUntil: Math.floor(Date.now() / 1000) + 60,
        messages: [
          {
            address: bounceableAddress,
            amount: toNano(value).toString(),
            payload: body,
          },
        ],
      };

      try {
        const transactionResult = await tonConnectUI.sendTransaction(tx, {
          returnStrategy: 'back',
        });

        if (transactionResult) {
          this.isStakingVideoLoading = true;

          const hash = await TonWeb.boc.Cell.oneFromBoc(
            TonWeb.utils.base64ToBytes(transactionResult.boc),
          ).hash();
          this.transactionId = TonWeb.utils.bytesToHex(hash);

          ls.set('startClaimStakingLootboxSecure', this.rootStore.timeNow); // записываем время начала транзакции
          ls.set('claimStakingLootboxTransactionIdSecure', this.transactionId); // записываем ID транзакции
          ls.set('claimStakingLootboxIdSecure', lootBoxId); // записываем id купленного лутбокса
          ls.set('isOldStakeSecure', isOldStake); // записываем флаг старого стейка

          this.startCheckClaimStakingStatus(); // начинаем проверять tonApi
        }
      } catch (err) {
        console.error(err);
        this.rootStore.userStore.addErrorResponse(err);

        if (Utils.getErrorMessage(err)) {
          this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
        }
      }
    } catch (err) {
      await this.rootStore.sleep(30_000);
      await syncLootbox({ hash, id });

      console.error(ERROR_DURING_FETCHING_CLAIM_STAKE_LOOTBOX_DATA, err);
      this.isStakingVideoLoading = false;
      this.addStakingModal(5);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }
  };

  startCheckClaimStakingStatus = () => {
    if (this.claimStakingCheckStatusTimer) return;

    this.claimStakingCheckStatusTimer = setInterval(
      this.checkClaimStakingStatus,
      1000 * 10,
    );
  };

  checkClaimStakingStatus = async () => {
    const startTime = ls.get('startClaimStakingLootboxSecure');
    const transactionId = ls.get('claimStakingLootboxTransactionIdSecure');

    const resetTimer = () => {
      clearInterval(this.claimStakingCheckStatusTimer);
      this.claimStakingCheckStatusTimer = undefined;
    };

    const resetStorage = () => {
      ls.remove('startClaimStakingLootboxSecure');
      ls.remove('claimStakingLootboxTransactionIdSecure');
      ls.remove('claimStakingLootboxIdSecure');
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
        resetStorage();
        this.isButtonDisable = false;

        return;
      }

      this.isButtonDisable = true;
      console.log('Checking claim status:', { transactionId });
      const { in_progress, actions } = await checkTonApiTransactionAdded({
        txid: transactionId,
      });
      console.log('Claim status response:', { in_progress, actions });

      if (!in_progress) {
        console.log('Transaction is not in progress, checking for errors...');
        const isErrorCodeExist = await this.checkTransactionTonApi({
          transactionId,
        });
        console.log('Error check result:', { isErrorCodeExist });

        if (!isErrorCodeExist) {
          console.log('No errors found, proceeding with claim confirmation...');
          this.fetchCount = 0;
          resetTimer();
          await this.rootStore.sleep(30_000);
          await this.confirmClaimStakingLootbox();
        } else {
          console.log('Error found, resetting state...');
          resetTimer();
          resetStorage();
          this.fetchCount = 0;
          this.isButtonDisable = false;
          this.isStakingVideoLoading = false;
        }
      } else {
        console.log('Transaction is still in progress...');
      }
    } catch (err) {
      /** проверяем 900с (15мин),
       * тк tonApi выдает `{"error":"entity not found"}` */
      if (this.fetchCount < 180) {
        this.fetchCount++;
        return;
      }
      resetTimer();
      resetStorage();

      console.error(err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }

      this.fetchCount = 0;
      this.isButtonDisable = false;
      this.isStakingVideoLoading = false;
    }
  };

  confirmClaimStakingLootbox = async () => {
    const id = ls.get('claimStakingLootboxIdSecure');
    const txid = ls.get('claimStakingLootboxTransactionIdSecure');

    const hash = this.rootStore.createHash([{ id }, { txid }]);

    try {
      const { minted, claims, max_claims, reward } =
        await confirmClaimStakeLootbox({
          id,
          txid,
          hash,
          owner_address: this.rootStore.userStore.userWalletAddress,
        });
      await this.fetchStakedLootboxes({ withLoading: false });

      const rewards = minted.reduce((acc, item) => {
        const key = item.name as PartShipKey;
        const itemWithImageUrl = {
          ...item,
          image: `${Utils.getApiUrl()}${item.image}`,
        };
        acc[key] = acc[key]
          ? [...acc[key], itemWithImageUrl]
          : [itemWithImageUrl];

        return acc;
      }, {} as LootboxRewards);

      this.isStakingVideoLoading = false;
      this.stakingRewards = {
        type: claims === max_claims ? 'lastStaking' : 'staking',
        rewards,
        rewardAmount: reward,
      };
    } catch (err) {
      console.error(ERROR_DURING_CONFIRM_BUYING_OF_STAKE_LOOTBOX, err);
      this.isStakingVideoLoading = false;
      this.addStakingModal(5);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }

    ls.remove('startClaimStakingLootboxSecure');
    ls.remove('claimStakingLootboxTransactionIdSecure');
    ls.remove('claimStakingLootboxIdSecure');
    ls.remove('isOldStakeSecure'); // Очищаем флаг старого стейка
    this.isButtonDisable = false;
  };

  // RESTAKE //

  restakeLootbox = async ({
    id,
    tonConnectUI,
  }: {
    id: number;
    tonConnectUI: TonConnectUI;
  }) => {
    const hash = this.rootStore.createHash([{ id }]);

    try {
      const {
        value,
        to,
        body,
        id: lootBoxId,
      } = await fetchRestakeLootboxInfo({
        id,
        hash,
        owner_address: this.rootStore.userStore.userWalletAddress,
      });

      const bounceableAddress = new TonWeb.Address(to).toString(
        true,
        true,
        true,
        false,
      );
      const tx: SendTransactionRequest = {
        validUntil: Math.floor(Date.now() / 1000) + 60,
        messages: [
          {
            address: bounceableAddress,
            amount: toNano(value).toString(),
            payload: body,
          },
        ],
      };

      try {
        const transactionResult = await tonConnectUI.sendTransaction(tx, {
          returnStrategy: 'back',
        });

        if (transactionResult) {
          this.isRestakingLoading = true;

          const hash = await TonWeb.boc.Cell.oneFromBoc(
            TonWeb.utils.base64ToBytes(transactionResult.boc),
          ).hash();
          this.transactionId = TonWeb.utils.bytesToHex(hash);

          ls.set('startRestakingLootboxSecure', this.rootStore.timeNow); // записываем время начала транзакции
          ls.set('restakingLootboxTransactionIdSecure', this.transactionId); // записываем ID транзакции
          ls.set('restakingLootboxIdSecure', lootBoxId); // записываем id купленного лутбокса

          this.startCheckRestakingStatus(); // начинаем проверять tonApi
        }
      } catch (err) {
        console.error(err);
        this.rootStore.userStore.addErrorResponse(err);
        this.isRestakingLoading = false;

        if (Utils.getErrorMessage(err)) {
          this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
        }
      }
    } catch (err) {
      await this.rootStore.sleep(30_000);
      await syncLootbox({ hash, id });

      console.error(err);
      this.rootStore.userStore.addErrorResponse(err);
      this.isRestakingLoading = false;

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }
  };

  startCheckRestakingStatus = () => {
    if (this.restakingCheckStatusTimer) return;

    this.restakingCheckStatusTimer = setInterval(
      this.checkRestakingStatus,
      1000 * 10,
    );
  };

  checkRestakingStatus = async () => {
    const startTime = ls.get('startRestakingLootboxSecure');
    const transactionId = ls.get('restakingLootboxTransactionIdSecure');

    const resetStorage = () => {
      ls.remove('startRestakingLootboxSecure');
      ls.remove('restakingLootboxTransactionIdSecure');
      ls.remove('restakingLootboxIdSecure');
    };

    const resetTimer = () => {
      clearInterval(this.restakingCheckStatusTimer);
      this.restakingCheckStatusTimer = undefined;
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
        resetStorage();
        this.isButtonDisable = false;

        return;
      }

      this.isButtonDisable = true;
      const { in_progress, actions } = await checkTonApiTransactionAdded({
        txid: transactionId,
      });

      if (!in_progress) {
        const isErrorCodeExist = await this.checkTransactionTonApi({
          transactionId,
        });

        if (!isErrorCodeExist) {
          this.fetchCount = 0;
          resetTimer();
          await this.confirmRestakingLootbox();
        } else {
          resetTimer();
          resetStorage();
          this.fetchCount = 0;
          this.isRestakingLoading = false;
          this.isButtonDisable = false;
        }
      }
    } catch (err) {
      /** проверяем 900с (15мин),
       * тк tonApi выдает `{"error":"entity not found"}` */
      if (this.fetchCount < 180) {
        this.fetchCount++;
        return;
      }
      resetTimer();
      resetStorage();

      console.error(err);
      this.rootStore.userStore.addErrorResponse(err);
      this.isRestakingLoading = false;

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }

      this.fetchCount = 0;
      this.isButtonDisable = false;
    }
  };

  confirmRestakingLootbox = async () => {
    const id = ls.get('restakingLootboxIdSecure');
    const txid = ls.get('restakingLootboxTransactionIdSecure');

    const hash = this.rootStore.createHash([{ id }, { txid }]);

    try {
      const owner_address = this.rootStore.userStore.userWalletAddress;
      await confirmRestakeLootbox({ id, txid, hash, owner_address });
      await this.fetchStakedLootboxes({ withLoading: false });

      this.isRestakingLoading = false;
      this.addStakingTooltips(1);
    } catch (err) {
      console.error(ERROR_DURING_CONFIRM_BUYING_OF_STAKE_LOOTBOX, err);
      this.isRestakingLoading = false;
      this.addStakingModal(5);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }

    ls.remove('startRestakingLootboxSecure');
    ls.remove('restakingLootboxTransactionIdSecure');
    ls.remove('restakingLootboxIdSecure');
    ls.remove('isOldStakeSecure'); // Очищаем флаг старого стейка
    this.isButtonDisable = false;
  };

  // WITHDRAW //

  withdrawLootbox = async ({
    id,
    tonConnectUI,
  }: {
    id: number;
    tonConnectUI: TonConnectUI;
  }) => {
    const hash = this.rootStore.createHash([{ id }]);

    try {
      const {
        value,
        to,
        body,
        id: lootBoxId,
      } = await fetchWithdrawLootboxInfo({
        id,
        hash,
        owner_address: this.rootStore.userStore.userWalletAddress,
      });

      const bounceableAddress = new TonWeb.Address(to).toString(
        true,
        true,
        true,
        false,
      );
      const tx: SendTransactionRequest = {
        validUntil: Math.floor(Date.now() / 1000) + 60,
        messages: [
          {
            address: bounceableAddress,
            amount: toNano(value).toString(),
            payload: body,
          },
        ],
      };

      try {
        const transactionResult = await tonConnectUI.sendTransaction(tx, {
          returnStrategy: 'back',
        });

        if (transactionResult) {
          this.isUnstakingLoading = true;

          const hash = await TonWeb.boc.Cell.oneFromBoc(
            TonWeb.utils.base64ToBytes(transactionResult.boc),
          ).hash();
          this.transactionId = TonWeb.utils.bytesToHex(hash);

          ls.set('startUnstakingLootboxSecure', this.rootStore.timeNow); // записываем время начала транзакции
          ls.set('unstakingLootboxTransactionIdSecure', this.transactionId); // записываем ID транзакции
          ls.set('unstakingLootboxIdSecure', lootBoxId); // записываем id купленного лутбокса

          this.startCheckUnstakingStatus(); // начинаем проверять tonApi
        }
      } catch (err) {
        console.error(err);
        this.rootStore.userStore.addErrorResponse(err);
        this.isUnstakingLoading = false;

        if (Utils.getErrorMessage(err)) {
          this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
        }
      }
    } catch (err) {
      await this.rootStore.sleep(30_000);
      await syncLootbox({ hash, id });

      console.error(err);
      this.rootStore.userStore.addErrorResponse(err);
      this.isUnstakingLoading = false;

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }
  };

  startCheckUnstakingStatus = () => {
    if (this.unstakingCheckStatusTimer) return;

    this.unstakingCheckStatusTimer = setInterval(
      this.checkUnstakingStatus,
      1000 * 10,
    );
  };

  checkUnstakingStatus = async () => {
    const startTime = ls.get('startUnstakingLootboxSecure');
    const transactionId = ls.get('unstakingLootboxTransactionIdSecure');

    const resetStorage = () => {
      ls.remove('startUnstakingLootboxSecure');
      ls.remove('unstakingLootboxTransactionIdSecure');
      ls.remove('unstakingLootboxIdSecure');
    };

    const resetTimer = () => {
      clearInterval(this.unstakingCheckStatusTimer);
      this.unstakingCheckStatusTimer = undefined;
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
        resetStorage();
        this.isButtonDisable = false;

        return;
      }

      this.isButtonDisable = true;
      console.log('Checking unstaking status:', { transactionId });
      const { in_progress, actions } = await checkTonApiTransactionAdded({
        txid: transactionId,
      });
      console.log('Unstaking status response:', {
        transactionId,
        in_progress,
        actionsCount: actions?.length
      });

      if (!in_progress) {
        console.log('Transaction is not in progress, checking for errors...');
        const isErrorCodeExist = await this.checkTransactionTonApi({
          transactionId,
        });
        console.log('Error check result:', {
          transactionId,
          isErrorCodeExist
        });

        if (!isErrorCodeExist) {
          console.log('No errors found, proceeding with unstaking confirmation...');
          this.fetchCount = 0;
          resetTimer();
          await this.confirmUnstakingLootbox();
        } else {
          console.log('Error found, resetting state...');
          resetTimer();
          resetStorage();
          this.fetchCount = 0;
          this.isUnstakingLoading = false;
          this.isButtonDisable = false;
        }
      } else {
        console.log('Transaction is still in progress...');
      }
    } catch (err) {
      /** проверяем 900с (15мин),
       * тк tonApi выдает `{"error":"entity not found"}` */
      if (this.fetchCount < 180) {
        this.fetchCount++;
        return;
      }
      resetTimer();
      resetStorage();

      console.error(err);
      this.rootStore.userStore.addErrorResponse(err);
      this.isUnstakingLoading = false;

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }

      this.fetchCount = 0;
      this.isButtonDisable = false;
    }
  };

  confirmUnstakingLootbox = async () => {
    const id = ls.get('unstakingLootboxIdSecure');
    const txid = ls.get('unstakingLootboxTransactionIdSecure');

    const hash = this.rootStore.createHash([{ id }, { txid }]);

    try {
      await confirmWithdrawLootbox({ id, txid, hash });
      await this.fetchStakedLootboxes({ withLoading: false });

      this.isUnstakingLoading = false;
      this.addStakingTooltips(2);
    } catch (err) {
      console.error(ERROR_DURING_CONFIRM_BUYING_OF_STAKE_LOOTBOX, err);
      this.isUnstakingLoading = false;
      this.addStakingModal(5);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }

    ls.remove('startUnstakingLootboxSecure');
    ls.remove('unstakingLootboxTransactionIdSecure');
    ls.remove('unstakingLootboxIdSecure');
    this.isButtonDisable = false;
  };

  get stakingValue() {
    return VALUES_BY_SLIDE_INDEX[this.activeSlideIndex].value;
  }

  get stakingDuration() {
    return VALUES_BY_SLIDE_INDEX[this.activeSlideIndex].monthly;
  }

  get activeSlideIndex() {
    return this._activeSlideIndex;
  }

  get isOldStake() {
    return (stakeId: number) => {
      // Если id < 1456 и его нет в массиве oldStakeIds - кнопки будут не активны
      if (stakeId < 1456 && !oldStakeIds.includes(stakeId.toString())) {
        return true;
      }
      return false;
    }
  }

}
