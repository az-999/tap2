import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useGetPathname } from '@/hooks/useGetPathname';
import AirdropCompleted from '@/pages/Airdrop/components/AirdropCompleted';
import BottomBlock from '@/pages/Airdrop/components/BottomBlock';
import TopBlock from '@/pages/Airdrop/components/TopBlock';
import { AirdropContainer } from '@/pages/Airdrop/styled';
import rootStore from '@/store';

const Airdrop = () => {
  const { isAirdropPage } = useGetPathname();

  const {
    airdropStore: {
      fetchAirdropTasks,
      fetchRaringData,
      fetchAirdropComplete,
      isAirdropCompleted,
    },
  } = rootStore;

  useEffect(() => {
    void fetchAirdropTasks();
    void fetchRaringData();
    void fetchAirdropComplete();
  }, []);

  return (
    <AirdropContainer>
      {isAirdropPage ? (
        isAirdropCompleted ? (
          <AirdropCompleted />
        ) : (
          <>
            <TopBlock />
            <BottomBlock />
          </>
        )
      ) : (
        <Outlet />
      )}
    </AirdropContainer>
  );
};

export default observer(Airdrop);
