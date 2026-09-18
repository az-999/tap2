import React from 'react';

import Text from '@/components/UI/Text';

import { ByTonContainer } from '@/pages/Nfts/components/ByTonContent/styled';
import LootboxButton from '@/pages/Nfts/components/Lootbox/LootboxButton';
import TonCoin from '@/pages/Nfts/components/Lootbox/TitleSlider/assets/TonCoin';

const ByTonContent = () => {
  return (
    <ByTonContainer>
      <Text fontSize={12} fontWeight={500}>
        Price
      </Text>

      <div>
        <TonCoin />
        <Text fontSize={30} fontWeight={600}>
          2.00
        </Text>
      </div>

      <LootboxButton disabled={false} title="Open Lootbox for TON" />
    </ByTonContainer>
  );
};

export default ByTonContent;
