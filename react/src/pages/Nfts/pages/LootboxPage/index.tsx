import { observer } from 'mobx-react-lite';
import React from 'react';
import { Outlet } from 'react-router-dom';

import UnavailablePage from '@/components/UnavailablePage';

import { LootboxPageContainer } from '@/pages/Nfts/pages/LootboxPage/styled';
import rootStore from '@/store';

const LootboxPage = () => {
  const {
    userStore: {
      userInfo: {
        nft: { staking },
      },
    },
  } = rootStore;

  if (staking < 1) return <UnavailablePage type="staking" />;

  return (
    <LootboxPageContainer>
      <Outlet />
    </LootboxPageContainer>
  );
};

export default observer(LootboxPage);
