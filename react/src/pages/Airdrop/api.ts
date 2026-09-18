import httpClient from '@/httpClient';
import {
  AirdropCompleteResponse,
  AirdropTasksResponse,
  ClaimResponse,
  CommonTaskResponse,
  MmproPointsTaskResponse,
  OneTimeSubscribeTaskResponse,
  RatingResponse,
  UserNickWhiteBitTaskRequest,
  WatchAddTask,
} from '@/pages/Airdrop/types';

// Дает согласие и стартует сезон airdrop для пользователя
export async function postAirdropStart({ hash }: { hash: string }) {
  const response = await httpClient.post<AirdropTasksResponse>(
    '/airdrop/start',
    {
      hash,
    },
  );
  return response.data;
}

// Выдает актуальные таски для пользователя
export async function fetchAirdropTasks({ hash }: { hash: string }) {
  const response = await httpClient.post<AirdropTasksResponse>('/airdrop', {
    hash,
  });
  return response.data;
}

// Принимает от пользователя ник в WHITEBIT и создает заявку
export async function postUserNickWhiteBitTask({
  nik,
  hash,
}: UserNickWhiteBitTaskRequest) {
  const body = { nik, hash };

  const response = await httpClient.post('/airdrop/white-bit-nik', body);
  return response.data;
}

// клеймит награду в WHITEBIT таске
export async function claimWhiteBitTask({ hash }: { hash: string }) {
  const response = await httpClient.post<ClaimResponse>(
    '/airdrop/white-bit-claim',
    { hash },
  );
  return response.data;
}

// Проверяет выполнение таски `Having an NFT Spaceship of Level 3 or Higher`
export async function checkShipLevelTask({ hash }: { hash: string }) {
  const response = await httpClient.post<ClaimResponse>(
    '/airdrop/complete-ship3',
    { hash },
  );
  return response.data;
}

// Проверяет выполнение таски `Check in Daily in the Season`
export async function checkDailyTask({ hash }: { hash: string }) {
  const response = await httpClient.post<ClaimResponse>(
    '/airdrop/complete-daily',
    { hash },
  );
  return response.data;
}

// Проверяет выполнение таски `KOLs`
export async function checkKolsTask({ hash }: { hash: string }) {
  const response = await httpClient.post<ClaimResponse>(
    '/airdrop/complete-kols',
    { hash },
  );
  return response.data;
}

// Проверяет выполнение одноразовой таски с подпиской на канал (таски 5-10)
export async function checkSubscribeTask({
  id,
  hash,
}: {
  id: number;
  hash: string;
}) {
  const response = await httpClient.post<OneTimeSubscribeTaskResponse>(
    '/airdrop/complete',
    { id, hash },
  );
  return response.data;
}

// Проверяет выполнение таски `Reward for every 5,000,000 MMPRO points`
export async function checkMmproPointsTask({ hash }: { hash: string }) {
  const response = await httpClient.post<MmproPointsTaskResponse>(
    '/airdrop/complete-task6',
    { hash },
  );
  return response.data;
}

// Проверяет выполнение таски `Mint NFT Ship Parts`
export async function checkMintShipPartsTask({ hash }: { hash: string }) {
  const response = await httpClient.post<CommonTaskResponse>(
    '/airdrop/complete-task7',
    { hash },
  );
  return response.data;
}

// Проверяет выполнение таски `Reward for Every 3 Friends Invited`
export async function checkFriendsTask({ hash }: { hash: string }) {
  const response = await httpClient.post<CommonTaskResponse>(
    '/airdrop/complete-task8',
    { hash },
  );
  return response.data;
}

// Проверяет выполнение таски `Buy Protection Marks`
export async function checkProtectionMarkTask({ hash }: { hash: string }) {
  const response = await httpClient.post<ClaimResponse>(
    '/airdrop/complete-task9',
    { hash },
  );
  return response.data;
}

// Проверяет выполнение таски `Mint OG Passes`
export async function checkMintOGPassTask({ hash }: { hash: string }) {
  const response = await httpClient.post<CommonTaskResponse>(
    '/airdrop/complete-task10',
    { hash },
  );
  return response.data;
}

// Проверяет выполнение таски `Mint NFT Spaceships`
export async function checkMintSpaceshipTask({ hash }: { hash: string }) {
  const response = await httpClient.post<CommonTaskResponse>(
    '/airdrop/complete-task11',
    { hash },
  );
  return response.data;
}

// Проверяет выполнение таски `Buy Pirate Mark`
export async function checkPirateMarkTask({ hash }: { hash: string }) {
  const response = await httpClient.post<ClaimResponse>(
    '/airdrop/complete-task12',
    { hash },
  );
  return response.data;
}

// Проверяет выполнение таски `Watch Ads`
export async function checkWatchAddTask({ hash }: { hash: string }) {
  const response = await httpClient.post<WatchAddTask>(
    '/airdrop/complete-task13',
    { hash },
  );
  return response.data;
}

// Информация о рейтинге пользователя
export async function fetchRatingData({ hash }: { hash: string }) {
  const response = await httpClient.post<RatingResponse>('/airdrop/rating', {
    hash,
  });
  return response.data;
}

// Информация о завершении сезона
export async function fetchAirdropComplete({ hash }: { hash: string }) {
  const response = await httpClient.post<AirdropCompleteResponse>(
    '/airdrop/result',
    {
      hash,
    },
  );
  return response.data;
}
