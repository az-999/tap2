import { TelegramAuthData } from '@telegram-auth/react/src/types';
import {
  TonConnectButton,
  useTonConnectModal,
  useTonWallet,
} from '@tonconnect/ui-react';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import CloseIcon from '@/components/WalletPageButton/assets/CloseIcon';
import DefaultWalletIcon from '@/components/WebAppWalletPageButton/assets/DefaultWalletIcon';
import LogoutIcon from '@/components/WebAppWalletPageButton/assets/LogoutIcon';
import TonkeeperWalletIcon from '@/components/WebAppWalletPageButton/assets/TonkeeperWalletIcon';
import UserIcon from '@/components/WebAppWalletPageButton/assets/UserIcon';
import WalletIcon from '@/components/WebAppWalletPageButton/assets/WalletIcon';
import {
  DefaultUserImage,
  Row,
  RowItem,
  UserImage,
  UserWallet,
  WalletContainer,
  WalletIconContainer,
} from '@/components/WebAppWalletPageButton/styled';

import { useGetUserInitData } from '@/hooks/useGetUserInitData';
import rootStore from '@/store';
import { RootPath } from '@/types/routes';

const WebAppWalletPageButton = () => {
  const {
    userStore: { userInitData, userLogOut },
    isWalletButtonVisible,
    setIsWalletButtonVisible,
  } = rootStore;

  const navigate = useNavigate();
  const wallet = useTonWallet();
  const { open } = useTonConnectModal();
  const { isAvatarExist, photo_url, id } = useGetUserInitData(userInitData);

  const isTonkeeperWallet =
    wallet?.device.appName.toLowerCase() === 'tonkeeper';

  const handleLogOutClick = async () => {
    await userLogOut();
    localStorage.removeItem('userInitData');
    navigate(RootPath.base);
  };

  return (
    <WalletContainer
      $isOpen={isWalletButtonVisible}
      onClick={
        isWalletButtonVisible
          ? () => null
          : () => setIsWalletButtonVisible(true)
      }
    >
      <WalletIconContainer
        id="wallet-icon"
        $isOpen={isWalletButtonVisible}
        onClick={
          isWalletButtonVisible
            ? () => setIsWalletButtonVisible(false)
            : () => null
        }
      >
        <CloseIcon fill={'rgba(255,255,255,1)'} />
      </WalletIconContainer>

      <Row $isSpaceBetween>
        {photo_url && isAvatarExist ? (
          <UserImage src={photo_url} />
        ) : (
          <DefaultUserImage
            $isWalletExist={!!wallet}
            $isTonkeeperWallet={isTonkeeperWallet}
          >
            <UserIcon
              fill={
                wallet ? (isTonkeeperWallet ? '#62acef' : '#fff') : '#FFFFFF99'
              }
            />
          </DefaultUserImage>
        )}

        {isWalletButtonVisible && (
          <>
            <p>ID:{id}</p>

            <RowItem $width={wallet ? 0 : 71} onClick={handleLogOutClick}>
              <LogoutIcon />
              <span>Log Out</span>
            </RowItem>
          </>
        )}
      </Row>

      <Row>
        {wallet ? (
          <UserWallet $isWalletExist={!!wallet}>
            {isTonkeeperWallet ? (
              <TonkeeperWalletIcon />
            ) : (
              <DefaultWalletIcon />
            )}
          </UserWallet>
        ) : (
          <UserWallet $isWalletExist={!!wallet}>
            <WalletIcon />
          </UserWallet>
        )}

        {isWalletButtonVisible && (
          <>
            {wallet ? (
              <TonConnectButton />
            ) : (
              <RowItem onClick={open}>
                <DefaultWalletIcon />
                <span>TON Wallet</span>
              </RowItem>
            )}

            {!wallet && (
              <RowItem onClick={open} $width={71}>
                <TonkeeperWalletIcon />
                <span>Tonkeeper</span>
              </RowItem>
            )}
          </>
        )}
      </Row>
    </WalletContainer>
  );
};

export default observer(WebAppWalletPageButton);
