import httpClient from '@/httpClient';
import {
  FarmingFinishRequest,
  FarmingFinishResponse,
  FarmingStartRequest,
  FarmingStartResponse,
  SessionStatus,
  UnblockEnergyResponse,
} from '@/pages/Tapper/types';

// клейм луны
export async function claimMoonReward({ hash }: { hash: string }) {
  const response = await httpClient.post<{ balance: number }>(
    '/farming/moon-claim',
    { hash },
  );
  return response.data;
}

// разблокировка энергии
export async function unblockEnergy({ hash }: { hash: string }) {
  const response = await httpClient.post<UnblockEnergyResponse>(
    '/farming/unblock',
    { hash },
  );
  return response.data;
}

// старт фарминга
export async function farmingStart({
  status,
  hash,
}: {
  status: SessionStatus;
  hash: string;
}) {
  const body: FarmingStartRequest = {
    status,
    hash,
  };
  const response = await httpClient.post<FarmingStartResponse>(
    '/farming/start',
    body,
  );
  return response.data;
}

// окончание фарминга
export async function finishFarming({
  tapCount,
  hash,
}: {
  tapCount: number;
  hash: string;
}) {
  const body: FarmingFinishRequest = {
    tapCount: tapCount || 0,
    hash,
  };
  const response = await httpClient.post<FarmingFinishResponse>(
    '/farming/finish',
    body,
  );
  return response.data;
}
