import { ReactNode } from 'react';

export type Voucher = {
  id: number;
  name: string;
  price: number;
  nft_id?: number;
  item_id?: number;
  comission?: number;
  image?: string;
  address_base58?: string;
  address_hex?: string;
  total_supply?: number;
  can_buy?: boolean;
  is_soldout?: boolean;
};

export type VouchersResponse = Voucher[];

export type ExistingVouchersResponse = {
  nft_items: ExistingVoucher[];
};

export type TransactionResponse = {
  balance: number;
};

export type ExistingVoucher = {
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
  metadata: Record<any, any>;
  previews: {
    resolution: string;
    url: string;
  }[];
  approved_by: string[];
  trust: string;
};

export type Captcha = {
  verify: boolean;
  // captcha: string;
  up: string;
  up2: string;
  down: string;
  down2: string;
  /*  address?: string;
  price?: number;
  balance?: number;
  balance_block?: number;*/
  status?: 'pending' | 'issue' | 'wait-tx';
  message?: string;
};

export type VerifyCaptchaRequest = {
  // captcha: string;
  nft_id: number;
  position: number;
  position2: number;
  wallet: string;
  hash: string;
};

export type VerifyCaptchaResponse = {
  address: string;
  lock_id: number;
  price: number;
  balance: number;
  balance_block: number;
};

export type VoucherItem = {
  id: number;
  name: string;
  price: number;
  nft_id?: number;
  image?: string;
  comission?: number;
};

export type VoucherCheckResponse = {
  id: number;
  buy_in_progress: boolean;
  address: string;
  transaction_sent: boolean;
  transaction_received: boolean;
  nft_completed: boolean;
  expires_at: string;
};

export type VoucherCheckMintResponse = {
  id: number;
  tg_id: number;
  nft_id: number;
  item_id: number;
  address: string;
  amount: number;
  txid: string;
  query_id: number;
  created_at: string;
  deployed_at: string;
  completed_at: string | null;
  status: 0 | 1 | 2 | 3 | 4;
  error: string | null;
  balance: number;
};

export type VoucherSuccessBuyingResponse = {
  verify: boolean;
  status: 'wait-tx' | 'pending' | 'issue';
  address: string;
  price: number;
  balance: number;
  current_nft_id_farming: number;
};

export type RejectVoucherResponse = {
  status: 'rejected';
  balance: number;
};

export type ExistingAllVouchersResponse = {
  id: number;
  tg_id: number;
  nft_id: number;
  wallet: string;
  commit: number;
  created_at: string;
  tries: number;
  index: number;
  item_address: string;
  collection_address: string;
  name: string;
  image: string;
  price: number;
}[];

export type TransactionStatusResponse = {
  exists: boolean;
  balance: number;
  balance_block: number;
  nft_id: number;
  expires_at: string;
  address: string;
  price: number;
  status: 'wait-tx' | 'pending' | 'issue' | 'none';
};

export type VoucherAndNftTooltipItem = {
  id: number;
  title: string;
  type: VoucherAndNftTooltipItemType;
};

export type VoucherAndNftTooltipItemType =
  | 'voucherBuy'
  | 'nftBuy'
  | 'nftWithdraw'
  | 'nftSale'
  | 'deletedNft'
  | 'extraNftBuy';

export type MmproTokenResponse = {
  amount: number;
  kurs: {
    ton: number;
    mmpro: number;
  };
};

export type MmproTokenBuyResponse = {
  request_id: number;
  status: boolean;
  amount_last_order: number;
} & MmproTokenResponse;

export type MmproTokenCheckResponse = {
  request_id: number;
  result: 0 | 1 | 2;
  amount_last_order: number;
} & MmproTokenResponse;
