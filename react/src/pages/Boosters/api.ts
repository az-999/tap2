// покупка буста
import httpClient from '@/httpClient';
import { Boost, BoostRequest } from '@/pages/Boosters/types';

export async function buyBoost({
  boostId,
  hash,
}: {
  boostId: Boost['id'];
  hash: string;
}) {
  const body: BoostRequest = {
    id: boostId,
    hash,
  };

  const response = await httpClient.post<Boost>('/product-list/buy', body);
  return response.data;
}

// удаление буста (для разработки)
export async function deleteBoost({ hash }: { hash: string }) {
  const response = await httpClient.post('/product-list/delete', { hash });
  return response.data;
}
