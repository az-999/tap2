// получить рейтинг пользователя
import httpClient from '@/httpClient';
import { RatingResponse } from '@/pages/Rating/types';

export async function fetchRating({ hash }: { hash: string }) {
  const response = await httpClient.post<RatingResponse>('/rating', { hash });
  return response.data;
}
