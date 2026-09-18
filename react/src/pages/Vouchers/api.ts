// получить все ваучеры
import axios from 'axios';

import httpClient from '@/httpClient';
import {
  Captcha,
  ExistingAllVouchersResponse,
  ExistingVouchersResponse,
  MmproTokenBuyResponse,
  MmproTokenCheckResponse,
  MmproTokenResponse,
  RejectVoucherResponse,
  TransactionResponse,
  TransactionStatusResponse,
  VerifyCaptchaRequest,
  VerifyCaptchaResponse,
  VoucherCheckMintResponse,
  VoucherCheckResponse,
  VoucherSuccessBuyingResponse,
  VouchersResponse,
} from '@/pages/Vouchers/types';

export async function fetchVouchers({ hash }: { hash: string }) {
  const response = await httpClient.post<VouchersResponse>('/nft', { hash });
  return response.data;
}

export async function fetchCaptchaData({
  nft_id,
  hash,
}: {
  nft_id: number;
  hash: string;
}) {
  const response = await httpClient.post<Captcha>('/nft/buy', { nft_id, hash });
  return response.data;
}

export async function fetchVerifyCaptchaData({
  // captcha,
  nft_id,
  position,
  position2,
  wallet,
  hash,
}: VerifyCaptchaRequest) {
  const body = { nft_id, position, position2, wallet, hash };

  const response = await httpClient.post<VerifyCaptchaResponse>(
    '/nft/verify',
    body,
  );
  return response.data;
}

// проверка статуса покупки ваучера за поинты
export async function checkVoucherStatus({
  nft_id,
  hash,
}: {
  nft_id: number;
  hash: string;
}) {
  const response = await httpClient.post<VoucherCheckResponse>('/nft/check', {
    nft_id,
    hash,
  });
  return response.data;
}

// Проверка статуса минта нфт
export async function checkVoucherMintStatus({
  nft_id,
  hash,
}: {
  nft_id: number;
  hash: string;
}) {
  const response = await httpClient.post<VoucherCheckMintResponse>(
    '/nft/mint/check',
    {
      nft_id,
      hash,
    },
  );
  return response.data;
}

// транзакция по переводу комиссии прошла успешно
export async function postVoucherPaymentComplete({
  address,
  nft_id,
  txid,
  lock_id,
  hash,
}: {
  address: string;
  nft_id: number;
  txid: string;
  lock_id: number;
  hash: string;
}) {
  const body = { address, nft_id, txid, lock_id, hash };

  const response = await httpClient.post<VoucherSuccessBuyingResponse>(
    '/nft/sent',
    body,
  );
  return response.data;
}

// транзакция по переводу комиссии прошла с ошибкой
export async function postVoucherPaymentError({
  nft_id,
  lock_id,
  hash,
}: {
  nft_id: number;
  lock_id: number;
  hash: string;
}) {
  const response = await httpClient.post<RejectVoucherResponse>('/nft/reject', {
    nft_id,
    lock_id,
    hash,
  });
  return response.data;
}

// получить купленные ваучеры по заданной коллекции (устарело!!)
export async function getExistingVouchers(collectionPath: string) {
  const response = await axios.get<ExistingVouchersResponse>(
    `${process.env.REACT_APP_TON_API_URL}/nfts/collections/${collectionPath}/items?limit=1000&offset=0`,
  );
  return response.data.nft_items;
}

// получить все имеющиеся ваучеры пользователя
export async function fetchAlExistingVouchers({ hash }: { hash: string }) {
  const response = await httpClient.post<ExistingAllVouchersResponse>(
    '/nft/my-nfts',
    {
      hash,
    },
  );
  return response.data;
}

// проверить есть ли НФТ сейчас в покупке
export async function checkTransactionVoucherStatus({
  hash,
}: {
  hash: string;
}) {
  const response = await httpClient.post<TransactionStatusResponse>(
    '/nft/current',
    {
      hash,
    },
  );
  return response.data;
}

// покупка Mmpro token
export async function buyMmproToken({
  address,
  txid,
  ton,
  hash,
}: {
  address: string;
  txid: string;
  ton: '1' | '10' | '50';
  hash: string;
}) {
  const body = {
    address,
    txid,
    ton,
    hash,
  };

  const response = await httpClient.post<MmproTokenBuyResponse>(
    '/mmpro-token/buy',
    body,
  );
  return response.data;
}

// завершить покупку Mmpro token
export async function checkMmproToken({
  request_id,
  hash,
}: {
  request_id: number;
  hash: string;
}) {
  const response = await httpClient.post<MmproTokenCheckResponse>(
    '/mmpro-token/check',
    { request_id, hash },
  );
  return response.data;
}

// информация о монетах и курсе Mmpro token
export async function infoMmproToken({ hash }: { hash: string }) {
  const response = await httpClient.post<MmproTokenResponse>(
    '/mmpro-token/info',
    { hash },
  );
  return response.data;
}
