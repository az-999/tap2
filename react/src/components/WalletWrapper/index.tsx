import { useTonAddress } from '@tonconnect/ui-react';
import { observer } from 'mobx-react-lite';
import React, { ReactElement, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useWalletModal } from '@/hooks/useWalletModal';
import rootStore from '@/store';
import { AuthPath, RootPath } from '@/types/routes';

const WalletWrapper = ({ children }: { children: ReactElement }) => {
  const walletAddress = useTonAddress();

  const {
    userStore: {
      isWalletInvalid,
      token,
      addUserWalletAddress,
      postUserWallet,
      isUserBlocked,
      walletUsersList,
      setIsWalletDisconnect,
      isRoadmapShowed,
    },
    shipsStore: { fetchAllShipPartsExistingNfts },
  } = rootStore;

  useWalletModal();
  useEffect(() => {
    const handleDisconnection = async (event: any) => {
      if (event.detail.type === 'disconnection') {
        setIsWalletDisconnect(true);
        addUserWalletAddress('-');
        await postUserWallet();
      }
    };

    window.addEventListener(
      'ton-connect-ui-disconnection',
      handleDisconnection,
    );

    return () =>
      window.addEventListener(
        'ton-connect-ui-disconnection',
        handleDisconnection,
      );
  }, []);

  useEffect(() => {
    if (!token || !walletAddress) return;

    addUserWalletAddress(walletAddress);
    postUserWallet();
  }, [walletAddress, token]);

  useEffect(() => {
    fetchAllShipPartsExistingNfts({ account_id: walletAddress });
  }, [walletAddress]);

  /** если выпала ошибка о подключенном кошельке на мульти аккаунтах
   * и пользователей с таким кошельком более 1 */
  if (
    isWalletInvalid &&
    walletUsersList &&
    walletUsersList.length > 1 &&
    isRoadmapShowed
  )
    return <Navigate to={`${RootPath.auth}/${AuthPath.multiWallet}`} replace />;

  /** если пользователя забанили */
  if (isUserBlocked && isRoadmapShowed)
    return <Navigate to={`${RootPath.auth}/${AuthPath.userBlock}`} replace />;

  return children;
};

export default observer(WalletWrapper);
