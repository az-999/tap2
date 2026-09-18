// получение друзей
import httpClient from '@/httpClient';
import {
  ClaimResponse,
  Friend,
  FriendRequest,
  FriendResponse,
} from '@/pages/Friends/types';

export async function fetchFriends({ hash, offset, limit }: FriendRequest) {
  const body = { hash, offset, limit };

  const response = await httpClient.post<FriendResponse>('/friends', body);
  return response.data;
}

// получить claim
export async function postClaim({ hash }: { hash: string }) {
  const response = await httpClient.post<ClaimResponse>('/friends/claim', {
    hash,
  });
  return response.data;
}
