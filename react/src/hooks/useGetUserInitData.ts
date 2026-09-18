import { TelegramAuthData } from '@telegram-auth/react/src/types';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { useEffect } from 'react';

import { useGetMode } from '@/hooks/useGetMode';
import { useGetUserAvatarSize } from '@/hooks/useGetUserAvatarSize';
import { VERIFY_TELEGRAM_DATA } from '@/store/const';

export const useGetUserInitData = (userInitData: TelegramAuthData | null) => {
  const WebApp = useWebApp();
  const { isDevMode } = useGetMode();
  const { isAvatarExist, fetchAvatarSize } = useGetUserAvatarSize();

  const telegramInitData: string = WebApp?.initData;
  const storageUserInitData: string | null = isDevMode
    ? VERIFY_TELEGRAM_DATA
    : localStorage.getItem('userInitData');

  const isUserDataExist = !!(telegramInitData || storageUserInitData);

  const getInitData = () => {
    if (!storageUserInitData && !userInitData) return null;

    return storageUserInitData ? JSON.parse(storageUserInitData) : userInitData;
  };

  useEffect(() => {
    void fetchAvatarSize(getInitData()?.photo_url ?? '');
  }, [userInitData]);

  return {
    isUserDataExist,
    isAvatarExist,
    id: getInitData()?.id,
    photo_url: getInitData()?.photo_url,
    username: getInitData()?.username,
  };
};
