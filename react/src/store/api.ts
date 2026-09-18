// получение ключа авторизации (JWT token)
import httpClient from '@/httpClient';
import {
  FarmingUserInfo,
  GrantReward,
  GrantRewardResponse,
  LoginResponse,
  StartUserInfo,
  WebLoginRequest,
} from '@/store/types';

export async function fetchJwtToken(initData: string) {
  const response = await httpClient.post<LoginResponse>('/loginJwt', {
    initData,
  });
  return response.data;
}

export async function fetchWebJwtToken(userInitData: WebLoginRequest) {
  const response = await httpClient.post<LoginResponse>(
    '/loginWeb',
    userInitData,
  );
  return response.data;
}

export async function userLogout({ hash }: { hash: string }) {
  const response = await httpClient.post('/auth/logout', { hash });
  return response.data;
}

// получение информации о пользователе (при старте приложения)
export async function fetchStartUserInfo() {
  const response = await httpClient.post<StartUserInfo>('/start');
  return response.data;
}

// получение информации о пользователе (в процессе работы приложения)
export async function fetchFarmingUserInfo() {
  const response = await httpClient.post<FarmingUserInfo>('/farming');
  return response.data;
}

// рефреш ключа авторизации (JWT token)
export async function refreshJwtToken() {
  const response = await httpClient.post<LoginResponse>('/auth/refresh');
  return response.data;
}

// записать на беке информацию о подключенном кошельке пользователя
export async function postUserWallet({
  address,
  hash,
}: {
  address: string;
  hash: string;
}) {
  const response = await httpClient.post('/wallet', { address, hash });
  return response.data;
}

// получить список наград (ручное доначисление) (если такое имеется в /farming)
export async function fetchGrantReward({ hash }: { hash: string }) {
  const response = await httpClient.post<GrantReward[]>('/grant', {
    hash,
  });
  return response.data;
}

// забирать награду (ручное доначисление) (если такое имеется в /farming)
export async function acceptGrantReward({
  request_id,
  hash,
}: {
  request_id: string; // в формате '1,2'
  hash: string;
}) {
  const response = await httpClient.post<GrantRewardResponse>('/grant/accept', {
    request_id,
    hash,
  });
  return response.data;
}

// отказаться от награды (ручное доначисление) (если такое имеется в /farming)
export async function rejectGrantReward({
  request_id, // в формате '1,2'
  hash,
}: {
  request_id: string;
  hash: string;
}) {
  const response = await httpClient.post('/grant/reject', { request_id, hash });
  return response.data;
}

// сброс кеша на беке
export async function clearCache({ hash }: { hash: string }) {
  const response = await httpClient.post('/auth/clear-cache', { hash });
  return response.data;
}
