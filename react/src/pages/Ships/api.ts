import axios from 'axios';

import httpClient from '@/httpClient';
import {
  CraftShipRequest,
  CraftShipResponse,
  FinishPirateMissionResponse,
  PirateBuyCheckResponse,
  PirateBuyResponse,
  PirateInfoResponse,
  PirateOfferAcceptResponse,
  StartPirateMissionResponse,
  TonApiTransactionStatus,
  UpgradeShipRequest,
} from '@/pages/Ships/types';

// Сборка (крафт) корабля
export async function craftShip({
  nft1,
  nft2,
  nft3,
  nft4,
  nft5,
  nft6,
  ship_level,
  hash,
}: CraftShipRequest) {
  const body = { nft1, nft2, nft3, nft4, nft5, nft6, ship_level, hash };

  const response = await httpClient.post<CraftShipResponse>(
    '/nft-ship/kraft',
    body,
  );
  return response.data;
}

// апгрейд корабля
export async function upgradeShip({
  nft1,
  nft2,
  nft3,
  nft4,
  nft5,
  nft6,
  nft7,
  ship_level,
  hash,
}: UpgradeShipRequest) {
  const body = { nft1, nft2, nft3, nft4, nft5, nft6, nft7, ship_level, hash };

  const response = await httpClient.post<CraftShipResponse>(
    '/nft-ship/upgrade',
    body,
  );
  return response.data;
}

// скрещивание кораблей
export async function mergeShips({
  nft1,
  nft2,
  nft3,
  nft4,
  nft5,
  nft6,
  nft7,
  ship_level,
  hash,
}: UpgradeShipRequest) {
  const body = { nft1, nft2, nft3, nft4, nft5, nft6, nft7, ship_level, hash };

  const response = await httpClient.post<CraftShipResponse>(
    '/nft-ship/union',
    body,
  );
  return response.data;
}

// Купить пиратскую метку
export async function buyPirateMark({
  address,
  txid,
  product_id,
  amount,
  hash,
}: {
  address: string;
  txid: string;
  product_id: '1' | '2';
  amount: number;
  hash: string;
}) {
  const body = {
    address,
    txid,
    product_id,
    amount,
    hash,
  };

  const response = await httpClient.post<PirateBuyResponse>(
    '/pirate/buy',
    body,
  );
  return response.data;
}

// Завершить покупку пиратской метки
export async function checkPirateMark({
  request_id,
  hash,
}: {
  request_id: number;
  hash: string;
}) {
  const response = await httpClient.post<PirateBuyCheckResponse>(
    '/pirate/buy-info',
    {
      request_id,
      hash,
    },
  );
  return response.data;
}

// Принимает оферту звездных войн, если нет денег то начисляется 1Bpoint.
export async function pirateOfferAccept() {
  const response = await httpClient.post<PirateOfferAcceptResponse>(
    '/pirate/oferta-accept',
  );
  return response.data;
}

// Старт пиратской миссии
export async function startPirateMission() {
  const response =
    await httpClient.post<StartPirateMissionResponse>('/pirate/start');
  return response.data;
}

// Финиш пиратской миссии
export async function finishPirateMission() {
  const response =
    await httpClient.post<FinishPirateMissionResponse>('/pirate/finish');
  return response.data;
}

// Запрос данных по всем элементам пиратских миссий и защиты
export async function fetchPirateInfo() {
  const response = await httpClient.post<PirateInfoResponse>('/pirate/info');
  return response.data;
}

// проверка статуса транзакции на сети TON
export async function fetchTonApiTransactionStatus({ txid }: { txid: string }) {
  const response = await axios.get<TonApiTransactionStatus>(
    `/blockchain/transactions/${txid}`,
    {
      baseURL: process.env.REACT_APP_TON_API_URL,
    },
  );
  return response.data;
}

// Сохраняет транзакцию сделанного(craft) корабля
export async function saveCraftedShip({
  txid,
  hash,
}: {
  txid: string;
  hash: string;
}) {
  const response = await httpClient.post('/airdrop/save-ship-craft', {
    txid,
    hash,
  });
  return response.data;
}
