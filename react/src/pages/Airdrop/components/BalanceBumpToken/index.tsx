import { observer } from 'mobx-react-lite';
import React from 'react';

import Text from '@/components/UI/Text';

import BumpTokenIcon from '@/pages/Airdrop/assets/BumpTokenIcon';
import { BalanceBumpTokenContainer } from '@/pages/Airdrop/components/BalanceBumpToken/styled';
import rootStore from '@/store';

const BalanceBumpToken = () => {
  const {
    airdropStore: { airdropTotalTokenRank },
  } = rootStore;

  return (
    <BalanceBumpTokenContainer>
      <Text fontSize={12} fontWeight={500}>
        Total token balance for all activities
      </Text>

      <div>
        <BumpTokenIcon />
        <Text fontSize={26} fontWeight={700}>
          {airdropTotalTokenRank.toLocaleString('ru-RU')}
        </Text>
      </div>
    </BalanceBumpTokenContainer>
  );
};

export default observer(BalanceBumpToken);
