// получение тасков
import httpClient from '@/httpClient';
import {
  CheckTaskRequest,
  CheckTaskResponse,
  DailyRewardResponse,
  GrandPrizeResponse,
  Task,
  TasksRequest,
} from '@/pages/Tasks/types';

export async function fetchTasks({ hash, is_premium, language }: TasksRequest) {
  const response = await httpClient.post<Task[]>('/task-list', {
    hash,
    is_premium,
    language,
  });
  return response.data;
}

// удаление буста (для разработки)
export async function deleteAllTasks({ hash }: { hash: string }) {
  const response = await httpClient.post('/task-list/drop-all', { hash });
  return response.data;
}

// проверка статуса таски
export async function checkTask({
  taskId,
  hash,
}: {
  taskId: number;
  hash: string;
}) {
  const body: CheckTaskRequest = {
    id: taskId,
    hash,
  };
  const response = await httpClient.post<CheckTaskResponse>(
    '/task-list/complete',
    body,
  );
  return response.data;
}

// получение ежедневной награды
export async function claimDailyRewards({ hash }: { hash: string }) {
  const response = await httpClient.post<DailyRewardResponse>(
    '/grant-day/claim',
    { hash },
  );
  return response.data;
}

// сброс ежедневной награды (если прошло более суток)
export async function resetClaimDailyRewards({ hash }: { hash: string }) {
  const response = await httpClient.post('/grant-day/reset', { hash });
  return response.data;
}

// получение грант приза
export async function claimGrantPrize({ hash }: { hash: string }) {
  const response = await httpClient.post<GrandPrizeResponse>(
    '/grant-day/prize',
    { hash },
  );
  return response.data;
}
