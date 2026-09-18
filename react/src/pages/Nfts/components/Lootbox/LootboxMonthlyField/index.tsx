import React from 'react';

import Text from '@/components/UI/Text';

import ApyIcon from '@/pages/Nfts/components/Lootbox/LootboxMonthlyField/assets/ApyIcon';
import BoxContainerIcon from '@/pages/Nfts/components/Lootbox/LootboxMonthlyField/assets/BoxContainerIcon';
import MmproTokenIcon from '@/pages/Nfts/components/Lootbox/LootboxMonthlyField/assets/MmproTokenIcon';
import NftIcon from '@/pages/Nfts/components/Lootbox/LootboxMonthlyField/assets/NftIcon';
import {
  ContentContainer,
  LootboxMonthlyFieldContainer,
} from '@/pages/Nfts/components/Lootbox/LootboxMonthlyField/styled';

interface LootboxMonthlyFieldProps {
  tokenValue: number;
  nftValue: number;
  apyValue: number;
}

const LootboxMonthlyField = ({
  tokenValue,
  nftValue,
  apyValue,
}: LootboxMonthlyFieldProps) => {
  return (
    <LootboxMonthlyFieldContainer>
      <BoxContainerIcon />

      <ContentContainer>
        <Text fontSize={12} fontWeight={500}>
          Monthly Reward
        </Text>

        <div>
          <MmproTokenIcon />
          <Text fontSize={14} fontWeight={700}>
            {tokenValue.toFixed(1)}
          </Text>
        </div>

        <div>
          <NftIcon />
          <Text fontSize={14} fontWeight={700}>
            {nftValue} NFT
          </Text>
        </div>

        <div>
          <div id="apy-container">
            <ApyIcon />
            <Text fontSize={10} fontWeight={800}>
              {apyValue}%
            </Text>
          </div>

          <Text fontSize={14} fontWeight={700}>
            APY
          </Text>
        </div>
      </ContentContainer>
    </LootboxMonthlyFieldContainer>
  );
};

export default LootboxMonthlyField;
