import { useTonAddress } from '@tonconnect/ui-react';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';

import Text from '@/components/UI/Text';

import {
  BalanceContainer,
  BalanceList,
} from '@/pages/Main/components/Balance/styled';
import BalanceItem from '@/pages/Main/components/BalanceItem';
import { PAGE_DATA } from '@/pages/Main/const';
import rootStore from '@/store';

const Balance = () => {
  const wallet = useTonAddress();

  const {
    userStore: { mmproPointsBalance },
    airdropStore: { airdropPointsBalance },
    stakingStore: { getUserTokenBalance, userTokensBalance },
  } = rootStore;

  useEffect(() => {
    void getUserTokenBalance({ userWalletAddress: wallet });
  }, [wallet]);

  const value: Record<number, number> = {
    0: mmproPointsBalance,
    1: airdropPointsBalance,
    2: Number(userTokensBalance?.toFixed(0)),
    3: 0, // todo: add bump tokens value from wallet
  };

  return (
    <BalanceContainer>
      <Text fontSize={12} fontWeight={500}>
        Your Balance
      </Text>

      <BalanceList>
        {PAGE_DATA.balance.map(({ id, ...data }, i) => (
          <BalanceItem key={id} {...data} value={value[i]} isFullWidth={!i} />
        ))}
      </BalanceList>
    </BalanceContainer>
  );
};

export default observer(Balance);
