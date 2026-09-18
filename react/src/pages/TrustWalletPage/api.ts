import axios from 'axios';

import { API_VERSION } from '@/store/const';
import Utils from '@/utils';

export async function postTrustWalletTask({
  hash,
  address,
  token,
}: {
  hash: string;
  address: string;
  token: string;
}) {
  const response = await axios.post(
    '/trustwallet',
    { hash, address },
    {
      baseURL: `${Utils.getApiUrl()}/${API_VERSION}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}
