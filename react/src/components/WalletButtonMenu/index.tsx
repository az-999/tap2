import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import React from 'react';

import WalletPageButton from '@/components/WalletPageButton';
import WebAppWalletPageButton from '@/components/WebAppWalletPageButton';

const WalletButtonMenu = () => {
  const WebApp = useWebApp();
  const initData = WebApp.initData;

  return initData ? <WalletPageButton /> : <WebAppWalletPageButton />;
};

export default WalletButtonMenu;
