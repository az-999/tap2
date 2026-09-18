import {
  TonConnectButton,
  useTonConnectModal,
  useTonWallet,
} from '@tonconnect/ui-react';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { register } from 'swiper/element/bundle';

import CloseIcon from './assets/CloseIcon';
import TelegramIcon from './assets/TelegramIcon';
import TonkeeperIcon from './assets/TonkeeperIcon';
import WalletIcon from './assets/WalletIcon';
import { IconWrapper, WalletContainer, WalletIconContainer } from './styled';
import rootStore from '@/store';

const WalletPageButton = () => {
  const wallet = useTonWallet();
  const { open } = useTonConnectModal();

  const { isWalletButtonVisible, setIsWalletButtonVisible } = rootStore;

  useEffect(() => {
    register();
  }, []);

  return !wallet ? (
    <WalletContainer $isWalletConnect={!!wallet} onClick={open}>
      <WalletIconContainer id="wallet-icon">
        <WalletIcon fill={'rgba(255,255,255,0.6)'} />
      </WalletIconContainer>

      <IconWrapper>
        <swiper-container
          slides-per-view="1"
          grabCursor={false}
          space-between={30}
          loop={true}
          autoplay={true}
        >
          <swiper-slide>
            <TonkeeperIcon />
          </swiper-slide>
          <swiper-slide>
            <TelegramIcon />
          </swiper-slide>
        </swiper-container>
      </IconWrapper>
    </WalletContainer>
  ) : (
    <WalletContainer
      $isOpen={isWalletButtonVisible}
      $isWalletConnect={!!wallet}
      onClick={
        isWalletButtonVisible
          ? () => null
          : () => setIsWalletButtonVisible(true)
      }
    >
      <WalletIconContainer
        id="wallet-icon"
        $isWalletConnect={!!wallet}
        onClick={
          isWalletButtonVisible
            ? () => setIsWalletButtonVisible(false)
            : () => null
        }
      >
        {isWalletButtonVisible ? (
          <CloseIcon fill={'rgba(255,255,255,1)'} />
        ) : (
          <WalletIcon fill={'rgba(255,255,255,1)'} />
        )}
      </WalletIconContainer>
      <TonConnectButton />
    </WalletContainer>
  );
};

export default observer(WalletPageButton);
