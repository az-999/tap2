import { Action, ValueFlow } from '@/pages/Nfts/tonApiTypes';
import { PartShipKey, PartShipNfts } from '@/pages/Ships/types';

export type HistoryItem = {
  price: number;
  time: number;
  from: string;
  to: string;
};

export type NftItem = {
  id: string | number;
  title: string;
  price: number;
  owner: string;
  imageSrc: string;
  collection: string;
  contractAddress: string;
  tokenID: string;
  metaData: string;
  status?: 'sale' | 'moderation' | 'default';
  history: {
    putUpForSale?: HistoryItem;
    withdrawnFromSale?: HistoryItem;
    sale?: HistoryItem;
  };
};

export type Sale = {
  address: string;
  market: {
    address: string;
    is_scam: boolean;
    is_wallet: boolean;
  };
  owner: {
    address: string;
    is_scam: boolean;
    is_wallet: boolean;
  };
  price: {
    value: string;
    token_name: string;
  };
};

export type NftMarketplace = {
  id?: number;
  tg_id?: number;
  nft_id?: number;
  nft_address: string;
  sale_address?: string;
  sale_price?: string;
  status?: 0 | 1 | 2 | 3;
  name: string;
  description: string;
  ship_level?: string;
  image: string;
  owner: string;

  collection_name: string;
  collection_address: string;
  created_at?: string | null;
  deployed_at?: string | null;
  completed_at?: string | null;
  collection?: string;
  sale?: {
    is_sale: boolean;
    sale_price: string;
  };
};

export type AllNftsOnMarketplaceRequest = {
  next: number; // - id следующей записи
  limit: number; // - кол-во записей
  sort?: string; // - сортировка записей, `asc - по возрастанию, desc - по убыванию` (id-asc|id-desc), например `sort: 'nft_address-desc'`
  address?: string; // адрес владельца нфт
  name?: string; // поиск по названию
  hash: string;
};

export type AllNftsOnMarketplaceResponse = {
  items: Required<NftMarketplace>[];
  next: number;
};

export type NftsCollectionsOnMarketplaceResponse = {
  collections: string[];
};

export type TonApiNftResponse = {
  address: string;
  index: number;
  owner: {
    address: string;
    is_scam: boolean;
    is_wallet: boolean;
  };
  collection: {
    address: string;
    name: string;
    description: string;
  };
  verified: boolean;
  metadata: {
    edition: number;
    points_price: string;
    tokens_price: string;
    name: string;
    image: string;
    date: number;
    project: string;
    percent: string;
    description: string;
    dna: string;
    ship_level?: string;
    attributes: { trait_type: string; value: string }[];
  };
  previews: {
    resolution: '5x5' | '100x100' | '500x500' | '1500x1500';
    url: string;
  }[];

  approved_by: unknown;
  trust: string;
  sale?: Sale;
};

export type TonApiNftInfoResponse = {
  success: boolean;
  exit_code: number;
  stack: {
    type: string;
    cell?: string;
    num?: string;
  }[];
};

export type CheckTransactionTonApiResponse = {
  transaction: {
    hash: string;
    lt: number;
    account: {
      address: string;
      is_scam: boolean;
      is_wallet: boolean;
    };
    success: boolean;
    utime: number;
    orig_status: string;
    end_status: string;
    total_fees: number;
    end_balance: number;
    transaction_type: string;
    state_update_old: string;
    state_update_new: string;
    in_msg: {
      msg_type: string;
      created_lt: number;
      ihr_disabled: boolean;
      bounce: boolean;
      bounced: boolean;
      value: number;
      fwd_fee: number;
      ihr_fee: number;
      destination: {
        address: string;
        is_scam: boolean;
        is_wallet: boolean;
      };
      import_fee: number;
      created_at: number;
      hash: string;
      raw_body: string;
      decoded_op_name: string;
      decoded_body: {
        signature: string;
        subwallet_id: number;
        valid_until: number;
        seqno: 16;
        op: 0;
        payload: [
          {
            mode: 3;
            message: {
              sum_type: string;
              message_internal: {
                ihr_disabled: boolean;
                bounce: boolean;
                bounced: boolean;
                src: string;
                dest: string;
                value: { grams: string; other: {} };
                ihr_fee: string;
                fwd_fee: string;
                created_lt: number;
                created_at: number;
                init: null;
                body: {
                  is_right: boolean;
                  value: {
                    sum_type: string;
                    op_code: 2;
                    value: string;
                  };
                };
              };
            };
          },
        ];
      };
    };
    out_msgs: [{ hash: string }];
    block: string;
    prev_trans_hash: string;
    prev_trans_lt: number;
    compute_phase: {
      skipped: boolean;
      success: boolean;
      gas_fees: number;
      gas_used: number;
      vm_steps: number;
      exit_code: number;
      exit_code_description: string;
    };
    storage_phase: { fees_collected: number; status_change: string };
    action_phase: {
      success: boolean;
      result_code: number;
      total_actions: number;
      skipped_actions: number;
      fwd_fees: number;
      total_fees: number;
    };
    aborted: boolean;
    destroyed: boolean;
    raw: string;
  };
  interfaces: [string];
  children: CheckTransactionTonApiResponse[];
};

export type AllExistingTonApiNftsResponse = {
  nft_items: TonApiNftResponse[];
};

export type SellNftsOnMarketplaceRequest = {
  nft_id: number; // - id коллекции
  price: string; // - цена
  nft_address: string; // - адрес нфт
  owner: string; // - владелец
  name: string; // - название нфт
  description: string; // - Описание нфт
  image: string; // - картинка нфт
  collection_address: string;
  collection_name: string;
  hash: string;
};

export type SellNftsOnMarketplaceResponse = {
  item: Omit<
    Required<NftMarketplace>,
    'created_at' | 'deployed_at' | 'completed_at'
  >;
  payload: string;
  to_address: string;
  value: number;
};

export type ConfirmOnSellNftsOnMarketplaceRequest = {
  id: number; // - id сейла
  sale_address: string; // - адрес сейла
  user_address: string; // - адрес пользователя
  txid: string; // - id транзакции
  hash: string;
};

export type ConfirmOnSellNftsOnMarketplaceResponse = {
  item: Required<NftMarketplace>;
};

export type RejectOnSellNftsOnMarketplaceRequest = {
  id: number; // - id сейла
  hash: string;
};

export type ChangePriceOnSellNftsOnMarketplaceRequest = {
  id: number; // - id сейла
  price: string; // - новая цена
  hash: string;
};

export type ChangePriceOnSellNftsOnMarketplaceResponse = {
  payload: string;
  to_address: string;
  value: number;
};

export type ConfirmChangePriceOnSellNftsOnMarketplaceRequest = {
  id: number; // - id сейла
  price: string; // - новая цена
  txid: string; // - id транзакции
  hash: string;
};

export type ConfirmChangePriceOnSellNftsOnMarketplaceResponse = {
  item: Required<NftMarketplace>;
};

export type CancelSellNftsOnMarketplaceRequest = {
  id: number; // - id сейла
  hash: string;
};

export type CancelSellNftsOnMarketplaceResponse = {
  payload: string;
  to_address: string;
  value: number;
};

export type ConfirmCancelSellNftsOnMarketplaceRequest = {
  id: number; // - id сейла
  txid: string; // - id транзакции
  owner: string; // - владелец
  hash: string;
};

export type ConfirmCancelSellNftsOnMarketplaceResponse = {
  item: Required<NftMarketplace>;
};

export type BuyNftOnMarketplaceRequest = {
  id: number; // - id сейла
  hash: string;
};

export type BuyNftOnMarketplaceResponse = {
  payload: string;
  to_address: string;
  value: number;
};

export type ConfirmBuyNftOnMarketplaceRequest = {
  id: number; // - id сейла
  txid: string; // - id транзакции
  new_owner: string; // - новый владелец
  hash: string;
};

export type ConfirmBuyNftOnMarketplaceResponse = {
  item: Required<NftMarketplace>;
};

export type HistoryOfNftOnMarketplaceRequest = {
  address: string; // - адрес нфт
  next: number; // - id следующей записи
  limit: number; // - кол-во записей
  hash: string;
};

export type HistoryNft = {
  id: number;
  nft_id: number;
  nft_address: string;
  action: 0 | 1 | 2 | 3;
  to_address: string;
  from_address: string;
  price: string;
  created_at: string;
  txid: string;
};

export type HistoryOfNftOnMarketplaceResponse = {
  items: HistoryNft[];
  next: number;
};

export type TransactionStatus =
  | 'pending'
  | 'processing'
  | 'fulfilled'
  | 'rejected';

export type ActiveSaleNftOnMarketplaceResponse = {
  item: Omit<Required<NftMarketplace>, 'collection' | 'sale'>;
};

export type NftSellErrorTooltip = {
  telegramId: number;
  walletAddress: string;
  nftAddress: string;
  image: string;
};

export type UserTokensBalance = {
  balance: string;
  price: {
    prices: {
      TON: number;
    };
    diff_24h: {
      TON: string;
    };
    diff_7d: {
      TON: string;
    };
    diff_30d: {
      TON: string;
    };
  };
  wallet_address: {
    address: string;
    name: string;
    is_scam: true;
    icon: string;
    is_wallet: boolean;
  };
  jetton: {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    image: string;
    verification: string;
    custom_payload_api_uri: string;
  };
  extensions: string[];
  lock: {
    amount: string;
    till: number;
  };
};

export type TonApiEvent = {
  event_id: string;
  timestamp: number;
  actions: Action[];
  value_flow: ValueFlow[];
  is_scam: boolean;
  lt: number;
  in_progress: boolean;
};

export type Lootbox = {
  id: number;
  name: string;
  price: number;
  months: number;
  reward: number;
  apy: number;
  nft_count: number;
  duration: number;
  max_claim: number;
};

export type StakedLootboxRequest = {
  offset: number;
  limit: number;
  hash: string;
};

export type StakedLootbox = {
  id: number;
  tg_id: number;
  lootbox_id: number;
  amount: number;
  out_amount: number;
  mint_count: number;
  duration: number;
  max_claims: number;
  claims: number;
  address: string;
  owner: string;
  txid: string;
  status: number;
  created_at: number;
  next_claim: number;
  last_claim: number;
  finished_at: number | null;
  end_time: number;
  error: string;
  lootbox: Lootbox;
};

export type StakedLootboxResponse = {
  list: StakedLootbox[];
  total: number;
};

export type StakeLootboxInfoResponse = {
  id: number;
  body: string;
  to: string;
  value: string;
};

export type StakeLootboxInfoRequest = {
  id: number;
  address: string;
  hash: string;
  owner_address?: string;
};

export type ConfirmStakeLootboxRequest = {
  id: number;
  txid: string;
  address: string;
  hash: string;
};
export type ConfirmStakeLootboxResponse = {
  id: number;
  claims: number;
  max_claims: number;
  status: number;
};

export type RejectStakeLootboxResponse = {
  id: number;
  status: number;
};

export type RejectStakeLootboxRequest = {
  id: number;
  error: string;
  hash: string;
};

export type FetchClaimStakeLootboxResponse = {
  id: number;
  body: string;
  to: string;
  value: string;
};

export type FetchClaimStakeLootboxRequest = {
  id: number;
  hash: string;
};

export type ConfirmClaimStakeLootboxRequest = {
  id: number;
  txid: string;
  hash: string;
  owner_address: string;
};

export type ConfirmClaimStakeLootboxResponse = {
  id: number;
  status: number;
  claims: number;
  max_claims: number;
  reward: string;
  minted: MintedShipPart[];
};

export type MintedShipPart = {
  id: number;
  nft_id: number;
  item_id: number;
  name: PartShipKey;
  price: number;
  comission: number;
  image: string;
  address_base58: string;
  address_hex: string;
  total_supply: number;
};

export type StakingRewards = {
  type: 'staking' | 'lastStaking';
  rewards: LootboxRewards;
  rewardAmount: string;
};

export type LootboxRewards = {
  [key in PartShipKey]: MintedShipPart[];
};

export type ActiveLootbox = {
  activeLootboxId: number; // id lootbox'а
  activeStakingId: number; // id стейка
};

export type SyncLootboxRequest = {
  id: number;
  hash: string;
};

export type ConfirmRestakeLootboxRequest = {
  id: number;
  txid: string;
  hash: string;
  owner_address: string;
};

export type SyncLootboxResponse = {
  success: boolean;
  id: number;
  status: number;
  claims: number;
  max_claims: number;
  next_claim: number;
};
