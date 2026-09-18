import { observer } from 'mobx-react-lite';
import React from 'react';

import Text from '@/components/UI/Text';

import ApyIcon from '@/pages/Nfts/components/Lootbox/LootboxMonthlyField/assets/ApyIcon';
import MmproTokenIcon from '@/pages/Nfts/components/Lootbox/LootboxMonthlyField/assets/MmproTokenIcon';
import NftIcon from '@/pages/Nfts/components/Lootbox/LootboxMonthlyField/assets/NftIcon';
import {
  Conditions,
  MonthlyReward,
  StakingItems,
  StakingTitleContainer,
} from '@/pages/Nfts/components/Lootbox/Modals/styled';
import DurationIcon from '@/pages/Nfts/components/Lootbox/StakeSelect/assets/DurationIcon';
import rootStore from '@/store';

const StakingItemsField = () => {
  const {
    stakingStore: { activeSlideIndex, availableLootboxes },
  } = rootStore;

  if (!availableLootboxes) return null;

  const { reward, apy, nft_count, months, name, price } =
    availableLootboxes[activeSlideIndex];

  return (
    <StakingItems>
      <StakingTitleContainer>
        <Text fontSize={14} fontWeight={700}>
          {name}
        </Text>

        <div id="apy-container">
          <ApyIcon />
          <Text fontSize={10} fontWeight={800}>
            {apy}%
          </Text>
        </div>

        <Text fontSize={14} fontWeight={700}>
          APY
        </Text>
      </StakingTitleContainer>

      <Conditions>
        <div>
          <Text fontSize={12} fontWeight={500}>
            Staked
          </Text>

          <div>
            <MmproTokenIcon />
            <Text fontSize={14} fontWeight={700}>
              {price.toLocaleString('ru-RU')}
            </Text>
          </div>
        </div>
        <div>
          <Text fontSize={12} fontWeight={500}>
            Period
          </Text>

          <div>
            <DurationIcon />
            <Text fontSize={14} fontWeight={700}>
              {`${months} ${months === 1 ? 'month' : 'months'}`}
            </Text>
          </div>
        </div>
      </Conditions>

      <MonthlyReward>
        <Text fontSize={12} fontWeight={500}>
          Monthly Reward
        </Text>

        <div>
          <MmproTokenIcon />
          <Text fontSize={14} fontWeight={700}>
            {reward.toFixed(1)}
          </Text>
        </div>

        <div>
          <NftIcon />
          <Text fontSize={14} fontWeight={700}>
            {nft_count} NFT
          </Text>
        </div>
      </MonthlyReward>
    </StakingItems>
  );
};

export default observer(StakingItemsField);
