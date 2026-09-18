import { NftMarketplace } from '@/pages/Nfts/types';
import { PirateInfo } from '@/store/types';

export type CraftShipRequest = {
  nft1: string;
  nft2: string;
  nft3: string;
  nft4: string;
  nft5: string;
  nft6: string;
  ship_level: number;
  hash: string;
};

export type UpgradeShipRequest = {
  nft1: string;
  nft2: string;
  nft3: string;
  nft4: string;
  nft5: string;
  nft6: string;
  nft7: string;
  ship_level: number;
  hash: string;
};

export type CraftShipResponse = {
  address: string;
  value: string;
  body: string; // - payload для контракта
  signature: string; // - подпись
  publicKey: string; // - публичный ключ
};

export type PartShipNfts = {
  [key in PartShipKey]: NftMarketplace[];
};

export type PartShipKey =
  | 'Cabin Module'
  | 'Right Wing Module'
  | 'Left Wing Module'
  | 'Engine Unit Module'
  | 'Ship Nose Module'
  | 'Tail Section Module';

export type ShipPartsToCombineShips = NftMarketplace & {
  detailIndex: number;
  detailImage: string;
};

export type CraftGetgemsError = {
  address_hex: string;
  address_base58: string;
  url_getgems: string;
  metadata: {
    project: string;
    attributes: {
      trait_type: string;
      value: string;
    }[];
    description: string;
    name: string;
    image: string;
  };
  previews: {
    resolution: '5x5' | '100x100' | '500x500' | '1500x1500';
    url: string;
  }[];
};

export type StartPirateMissionResponse = {
  black_metka_start_at: number;
  black_metka_finish_at: number;
};

export type FinishPirateMissionResponse = {
  balance: number;
  grant: number;
};

export type TonApiTransactionStatus = {
  hash: string;
  lt: number;
  account: {
    address: string;
    name: string;
    is_scam: boolean;
    icon: string;
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
      name: string;
      is_scam: boolean;
      icon: string;
      is_wallet: boolean;
    };
    source: {
      address: string;
      name: string;
      is_scam: boolean;
      icon: string;
      is_wallet: boolean;
    };
    import_fee: number;
    created_at: number;
    op_code: string;
    init: {
      boc: string;
      interfaces: [string];
    };
    hash: string;
    raw_body: string;
    decoded_op_name: string;
    decoded_body: string;
  };
  out_msgs: [
    {
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
        name: string;
        is_scam: boolean;
        icon: string;
        is_wallet: boolean;
      };
      source: {
        address: string;
        name: string;
        is_scam: boolean;
        icon: string;
        is_wallet: boolean;
      };
      import_fee: number;
      created_at: number;
      op_code: string;
      init: {
        boc: string;
        interfaces: [string];
      };
      hash: string;
      raw_body: string;
      decoded_op_name: string;
      decoded_body: string;
    },
  ];
  block: string;
  prev_trans_hash: string;
  prev_trans_lt: number;
  compute_phase: {
    skipped: boolean;
    skip_reason: string;
    success: boolean;
    gas_fees: number;
    gas_used: number;
    vm_steps: number;
    exit_code: number;
    exit_code_description: string;
  };
  storage_phase: {
    fees_collected: number;
    fees_due: number;
    status_change: string;
  };
  credit_phase: {
    fees_collected: number;
    credit: number;
  };
  action_phase: {
    success: boolean;
    result_code: number;
    total_actions: number;
    skipped_actions: number;
    fwd_fees: number;
    total_fees: number;
    result_code_description: string;
  };
  bounce_phase: string;
  aborted: boolean;
  destroyed: boolean;
  raw: string;
};

export type PirateBuyResponse = {
  request_id: number;
};

export type PirateBuyCheckResponse = {
  request: {
    tg_id: number;
    address: string;
    txid: string;
    product_id: number;
    amount: number;
    created_at: number;
    status: 0 | 1 | 2; // статус заявки. 0 - создана, 1 - выполнена, 2 - отклонена
    error: string; // ошибка в поле `error`
  };
};

export type PirateOfferAcceptResponse = {
  balance: number;
};

export type PirateInfoResponse = {
  pirate: PirateInfo;
};
