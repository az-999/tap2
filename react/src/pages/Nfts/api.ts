import axios from 'axios';

import httpClient from '@/httpClient';
import {
  ActiveSaleNftOnMarketplaceResponse,
  AllExistingTonApiNftsResponse,
  AllNftsOnMarketplaceRequest,
  AllNftsOnMarketplaceResponse,
  BuyNftOnMarketplaceRequest,
  BuyNftOnMarketplaceResponse,
  CancelSellNftsOnMarketplaceRequest,
  CancelSellNftsOnMarketplaceResponse,
  ChangePriceOnSellNftsOnMarketplaceRequest,
  ChangePriceOnSellNftsOnMarketplaceResponse,
  CheckTransactionTonApiResponse,
  ConfirmBuyNftOnMarketplaceRequest,
  ConfirmBuyNftOnMarketplaceResponse,
  ConfirmCancelSellNftsOnMarketplaceRequest,
  ConfirmCancelSellNftsOnMarketplaceResponse,
  ConfirmChangePriceOnSellNftsOnMarketplaceRequest,
  ConfirmChangePriceOnSellNftsOnMarketplaceResponse,
  ConfirmClaimStakeLootboxRequest,
  ConfirmClaimStakeLootboxResponse,
  ConfirmRestakeLootboxRequest,
  ConfirmOnSellNftsOnMarketplaceRequest,
  ConfirmOnSellNftsOnMarketplaceResponse,
  ConfirmStakeLootboxRequest,
  ConfirmStakeLootboxResponse,
  FetchClaimStakeLootboxRequest,
  FetchClaimStakeLootboxResponse,
  HistoryOfNftOnMarketplaceRequest,
  HistoryOfNftOnMarketplaceResponse,
  Lootbox,
  NftsCollectionsOnMarketplaceResponse,
  RejectOnSellNftsOnMarketplaceRequest,
  RejectStakeLootboxRequest,
  RejectStakeLootboxResponse,
  SellNftsOnMarketplaceRequest,
  SellNftsOnMarketplaceResponse,
  StakeLootboxInfoRequest,
  StakeLootboxInfoResponse,
  StakedLootbox,
  StakedLootboxRequest,
  StakedLootboxResponse,
  SyncLootboxRequest,
  SyncLootboxResponse,
  TonApiEvent,
  TonApiNftInfoResponse,
  TonApiNftResponse,
  UserTokensBalance,
} from '@/pages/Nfts/types';

// Выводит список нфт на маркетплейсе
export async function fetchAllNftsOnMarketplace({
  address,
  limit,
  sort,
  next,
  name,
  hash,
}: AllNftsOnMarketplaceRequest) {
  const body = { address, limit, sort, name, next, hash };

  const response = await httpClient.post<AllNftsOnMarketplaceResponse>(
    '/nft/market',
    body,
  );
  return response.data;
}

// Выводит список коллекций на маркетплейсе
export async function fetchNftsCollectionsOnMarketplace({
  hash,
}: {
  hash: string;
}) {
  const response = await httpClient.post<NftsCollectionsOnMarketplaceResponse>(
    '/nft/market/collections',
    {
      hash,
    },
  );
  return response.data;
}

// Выводит информацию о конкретной нфт из tonapi
export async function fetchTonApiNftOnMarketplace({
  nft_address,
}: {
  nft_address: string;
}) {
  const response = await axios.get<TonApiNftResponse>(`/nfts/${nft_address}`, {
    baseURL: process.env.REACT_APP_TON_API_URL,
  });
  return response.data;
}

// Выводит информацию о продаже из tonapi
export async function fetchTonApiNftInfo({ owner }: { owner: string }) {
  const response = await axios.get<TonApiNftInfoResponse>(
    `/blockchain/accounts/${owner}/methods/get_fix_price_data_bump`,
    {
      baseURL: process.env.REACT_APP_TON_API_URL,
    },
  );
  return response.data;
}

// Проверяем на tonapi, прошла ли транзакция
export async function checkTransactionTonApiNft({
  msg_id,
}: {
  msg_id: string;
}) {
  console.log('Checking transaction details:', { msg_id });
  try {
    const response = await axios.get<CheckTransactionTonApiResponse>(
      `/traces/${msg_id}`,
      {
        baseURL: process.env.REACT_APP_TON_API_URL,
      },
    );
    console.log('Transaction details response:', response.data);
    return response.data;
  } catch (err) {
    console.error('Error checking transaction details:', err);
    throw err;
  }
}

// Выводит список всех нфт пользователя в кошельке из tonapi
export async function fetchAllExistingTonApiNfts({
  account_id,
}: {
  account_id: string;
}) {
  const response = await axios.get<AllExistingTonApiNftsResponse>(
    `/accounts/${account_id}/nfts?indirect_ownership=1`,
    {
      baseURL: process.env.REACT_APP_TON_API_URL,
    },
  );
  return response.data;
}

// Запрос продажи нфт на маркетплейсе
export async function sellNftOnMarketplace({
  nft_id,
  price,
  nft_address,
  owner,
  name,
  description,
  image,
  collection_address,
  collection_name,
  hash,
}: SellNftsOnMarketplaceRequest) {
  const body = {
    nft_id,
    price,
    nft_address,
    owner,
    name,
    description,
    image,
    collection_address,
    collection_name,
    hash,
  };

  const response = await httpClient.post<SellNftsOnMarketplaceResponse>(
    '/nft/market/put',
    body,
  );
  return response.data;
}

// Подтверждение выставления нфт на продажу (запись в ДБ результата операции)
export async function confirmOnSellNftOnMarketplace({
  id,
  sale_address,
  user_address,
  txid,
  hash,
}: ConfirmOnSellNftsOnMarketplaceRequest) {
  const body = { id, sale_address, user_address, txid, hash };

  const response =
    await httpClient.post<ConfirmOnSellNftsOnMarketplaceResponse>(
      '/nft/market/put/confirm',
      body,
    );
  return response.data;
}

// Отклонение выставления нфт на продажу
export async function rejectOnSellNftOnMarketplace({
  id,
  hash,
}: RejectOnSellNftsOnMarketplaceRequest) {
  const response = await httpClient.post('/nft/market/put/reject', {
    id,
    hash,
  });
  return response.data;
}

// Изменение цены нфт на маркетплейсе
export async function priceChangeOnSellNftOnMarketplace({
  id,
  price,
  hash,
}: ChangePriceOnSellNftsOnMarketplaceRequest) {
  const response =
    await httpClient.post<ChangePriceOnSellNftsOnMarketplaceResponse>(
      '/nft/market/change/price',
      {
        id,
        price,
        hash,
      },
    );
  return response.data;
}

// Подтверждение изменения цены нфт на маркетплейсе (запись в ДБ результата операции)
export async function confirmPriceChangeOnSellNftOnMarketplace({
  id,
  price,
  txid,
  hash,
}: ConfirmChangePriceOnSellNftsOnMarketplaceRequest) {
  const body = { id, price, txid, hash };

  const response =
    await httpClient.post<ConfirmChangePriceOnSellNftsOnMarketplaceResponse>(
      '/nft/market/change/price/confirm',
      body,
    );
  return response.data;
}

// Отмена выставления нфт на маркетплейсе (снятие с продажи)
export async function cancelSellNftOnMarketplace({
  id,
  hash,
}: CancelSellNftsOnMarketplaceRequest) {
  const response = await httpClient.post<CancelSellNftsOnMarketplaceResponse>(
    '/nft/market/cancel',
    { id, hash },
  );
  return response.data;
}

// Отмена выставления нфт на маркетплейсе (снятие с продажи) - БЕЗ АЙДИ
export async function cancelSellNftOnMarketplaceWithoutId({
  address,
  hash,
}: {
  address: string; // - адрес сейла
  hash: string;
}) {
  const response = await httpClient.post<CancelSellNftsOnMarketplaceResponse>(
    '/nft/market/cancel/payload',
    { address, hash },
  );
  return response.data;
}

// Подтверждение отмены выставления нфт на маркетплейсе (запись в ДБ результата операции)
export async function confirmCancelSellNftOnMarketplace({
  id,
  txid,
  owner,
  hash,
}: ConfirmCancelSellNftsOnMarketplaceRequest) {
  const body = { id, txid, owner, hash };

  const response =
    await httpClient.post<ConfirmCancelSellNftsOnMarketplaceResponse>(
      '/nft/market/cancel/confirm',
      body,
    );
  return response.data;
}

// Купить нфт на маркетплейсе
export async function buyNftOnMarketplace({
  id,
  hash,
}: BuyNftOnMarketplaceRequest) {
  const response = await httpClient.post<BuyNftOnMarketplaceResponse>(
    '/nft/market/buy',
    { id, hash },
  );
  return response.data;
}

// Подтверждение покупки нфт на маркетплейсе (запись в ДБ результата операции)
export async function confirmBuyNftOnMarketplace({
  id,
  txid,
  new_owner,
  hash,
}: ConfirmBuyNftOnMarketplaceRequest) {
  const body = { id, txid, new_owner, hash };

  const response = await httpClient.post<ConfirmBuyNftOnMarketplaceResponse>(
    '/nft/market/buy/confirm',
    body,
  );
  return response.data;
}

// Получить историю выставления нфт на маркетплейсе
export async function fetchHistoryOfNftOnMarketplace({
  address,
  next,
  limit,
  hash,
}: HistoryOfNftOnMarketplaceRequest) {
  const body = { address, next, limit, hash };

  const response = await httpClient.post<HistoryOfNftOnMarketplaceResponse>(
    '/nft/market/history',
    body,
  );
  return response.data;
}

// Получить активный сейл по адресу нфт
export async function getActiveSaleNftOnMarketplace({
  address,
  hash,
}: {
  address: string; // - адрес нфт
  hash: string;
}) {
  const body = { address, hash };

  const response = await httpClient.post<ActiveSaleNftOnMarketplaceResponse>(
    '/nft/market/get',
    body,
  );
  return response.data;
}

// Удалить нфт с маркетплейса
export async function deleteNftOnMarketplace({
  id,
  hash,
}: {
  id: number; // - id нфт
  hash: string;
}) {
  const body = { id, hash };

  const response = await httpClient.post('/nft/market/fix', body);
  return response.data;
}

// Проверяем на tonapi баланс токенов у пользователя
export async function fetchUserBalanceByTonApi({
  userWalletAddress,
}: {
  userWalletAddress: string;
}) {
  const response = await axios.get<UserTokensBalance>(
    `/accounts/${userWalletAddress}/jettons/EQDrqXZfdR-MqwAYImYkR0YHPDazMiI5-oUzaLxvuH4vM_J7?supported_extensions=custom_payload`,
    {
      baseURL: process.env.REACT_APP_TON_API_URL,
    },
  );
  return response.data;
}

// Проверяем на tonapi, что у нас появилась транзакция
export async function checkTonApiTransactionAdded({ txid }: { txid: string }) {
  console.log('Checking transaction status:', { txid });
  try {
    const response = await axios.get<TonApiEvent>(`/events/${txid}`, {
      baseURL: process.env.REACT_APP_TON_API_URL,
    });
    console.log('Transaction status response:', response.data);
    return response.data;
  } catch (err) {
    console.error('Error checking transaction status:', err);
    throw err;
  }
}

// Выводит список доступных лутбоксов
export async function fetchLootboxes({ hash }: { hash: string }) {
  const response = await httpClient.post<Lootbox[]>('/lootboxes', { hash });
  return response.data;
}

// Выводит список доступных лутбоксов
export async function fetchStakedLootboxes({
  offset,
  limit,
  hash,
}: StakedLootboxRequest) {
  const body = { offset, limit, hash };

  const response = await httpClient.post<StakedLootboxResponse>(
    '/lootboxes/list',
    body,
  );
  return response.data;
}

// Получить данные для покупки лутбокса через tonconnect
export async function fetchStakeLootboxInfo({
  id,
  address,
  hash,
}: StakeLootboxInfoRequest) {
  const body = { id, address, hash };

  const response = await httpClient.post<StakeLootboxInfoResponse>(
    '/lootboxes/stake',
    body,
  );
  return response.data;
}

// Подтвердить покупку лутбокса через tonconnect
export async function confirmStakeLootbox({
  id,
  txid,
  address,
  hash,
}: ConfirmStakeLootboxRequest) {
  const body = { id, txid, address, hash };

  const response = await httpClient.post<ConfirmStakeLootboxResponse>(
    '/lootboxes/stake/confirm',
    body,
  );
  return response.data;
}

// Сообщить о ошибке покупки лутбокса через tonconnect
export async function rejectStakeLootbox({
  id,
  error,
  hash,
}: RejectStakeLootboxRequest) {
  const body = { id, error, hash };

  const response = await httpClient.post<RejectStakeLootboxResponse>(
    '/lootboxes/stake/error',
    body,
  );
  return response.data;
}

// Получить данные для получения награды лутбокса через tonconnect
export async function fetchClaimStakeLootbox({
  id,
  hash,
}: FetchClaimStakeLootboxRequest) {
  const body = { id, hash };

  const response = await httpClient.post<FetchClaimStakeLootboxResponse>(
    '/lootboxes/claim',
    body,
  );
  return response.data;
}

// Подтвердить получение награды лутбокса через tonconnect
export async function confirmClaimStakeLootbox({
  id,
  txid,
  hash,
  owner_address,
}: ConfirmClaimStakeLootboxRequest) {
  const body = { id, txid, hash, owner_address };

  const response = await httpClient.post<ConfirmClaimStakeLootboxResponse>(
    '/lootboxes/claim/confirm',
    body,
  );
  return response.data;
}

// Получить данные для повторной покупки лутбокса через tonconnect
export async function fetchRestakeLootboxInfo({
  id,
  hash,
  owner_address,
}: Omit<StakeLootboxInfoRequest, 'address'>) {
  const body = { id, hash, owner_address };

  const response = await httpClient.post<StakeLootboxInfoResponse>(
    '/lootboxes/restake',
    body,
  );
  return response.data;
}

// Подтвердить повторную покупку лутбокса через tonconnect
export async function confirmRestakeLootbox({
  id,
  txid,
  hash,
  owner_address,
}: ConfirmRestakeLootboxRequest) {
  const body = { id, txid, hash, owner_address };

  const response = await httpClient.post<ConfirmStakeLootboxResponse>(
    '/lootboxes/restake/confirm',
    body,
  );
  return response.data;
}

// Получить данные для вывода лутбокса через tonconnect
export async function fetchWithdrawLootboxInfo({
  id,
  hash,
  owner_address,
}: Omit<StakeLootboxInfoRequest, 'address'>) {
  const body = { id, hash, owner_address };
  console.log('[Withdraw] Request:', body);

  try {
    const response = await httpClient.post<StakeLootboxInfoResponse>(
      '/lootboxes/withdraw',
      body,
    );
    console.log('[Withdraw] Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('[Withdraw] Error:', error);
    throw error;
  }
}

// Подтвердить вывод лутбокса через tonconnect
export async function confirmWithdrawLootbox({
  id,
  txid,
  hash,
}: Omit<ConfirmStakeLootboxRequest, 'address'>) {
  const body = { id, txid, hash };

  const response = await httpClient.post<ConfirmStakeLootboxResponse>(
    '/lootboxes/withdraw/confirm',
    body,
  );
  return response.data;
}

// Синхронизировать данные о лутбоксе с блокчейном
export async function syncLootbox({ id, hash }: SyncLootboxRequest) {
  const body = { id, hash };

  const response = await httpClient.post<SyncLootboxResponse>(
    '/lootboxes/sync',
    body,
  );
  return response.data;
}
