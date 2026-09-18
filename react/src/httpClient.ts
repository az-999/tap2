import axios from 'axios';
import SecureLS from 'secure-ls';

import { fetchJwtToken, fetchWebJwtToken } from '@/store/api';
import { API_VERSION, INIT_DATA } from '@/store/const';
import Utils from '@/utils';

const ls = new SecureLS();

let errResCount = 0;

const httpClient = axios.create({
  baseURL: `${Utils.getApiUrl()}/${API_VERSION}`,
});

httpClient.interceptors.request.use(
  (config) => {
    const token: string = ls.get('userJWTTokenSecure');
    const userId: string = ls.get('userIdSecure');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (userId) {
      config.headers.user_auth = userId;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

httpClient.interceptors.request.use((config) => {
  return config;
});

httpClient.interceptors.response.use(
  (r) => r,
  async (e) => {
    const originalRequest = e.config;

    if (e?.response?.status === 401 && errResCount < 3) {
      try {
        errResCount += 1;
        const webApp = window?.Telegram?.WebApp;
        const storageUserInitData: string | null =
          localStorage.getItem('userInitData');

        if (webApp.initData || process.env.REACT_APP_MODE === 'dev') {
          const newAccessToken = await fetchJwtToken(
            process.env.REACT_APP_MODE === 'dev' ? INIT_DATA : webApp?.initData,
          );

          if (newAccessToken) {
            const newToken = newAccessToken.access_token;

            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            ls.set('userJWTTokenSecure', newToken);
          }
        }

        if (!webApp?.initData && storageUserInitData) {
          const userInitData = JSON.parse(storageUserInitData);
          const newAccessToken = await fetchWebJwtToken(userInitData);

          if (newAccessToken) {
            const newToken = newAccessToken.access_token;

            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            ls.set('userJWTTokenSecure', newToken);
          }
        }

        return httpClient(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    if (errResCount >= 3) {
      errResCount = 0;
    }

    return Promise.reject(e);
  },
);

export default httpClient;
