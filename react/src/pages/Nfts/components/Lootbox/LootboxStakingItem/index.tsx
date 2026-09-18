import { observer } from 'mobx-react-lite';
import React from 'react';

import Text from '@/components/UI/Text';

import ApyIcon from '@/pages/Nfts/components/Lootbox/LootboxMonthlyField/assets/ApyIcon';
import MmproTokenIcon from '@/pages/Nfts/components/Lootbox/LootboxMonthlyField/assets/MmproTokenIcon';
import NftIcon from '@/pages/Nfts/components/Lootbox/LootboxMonthlyField/assets/NftIcon';
import PreloaderIcon from '@/pages/Nfts/components/Lootbox/LootboxStakingItem/assets/PreloaderIcon';
import StakingBoxContainerIcon from '@/pages/Nfts/components/Lootbox/LootboxStakingItem/assets/StakingBoxContainerIcon';
import BottomProgressbar from '@/pages/Nfts/components/Lootbox/LootboxStakingItem/components/BottomProgressbar/BottomProgressbar';
import MonthlyRewardProgressBar from '@/pages/Nfts/components/Lootbox/LootboxStakingItem/components/MonthlyRewardProgressBar/MonthlyRewardProgressBar';
import MonthlyRewardTime from '@/pages/Nfts/components/Lootbox/LootboxStakingItem/components/MonthlyRewardTime/MonthlyRewardTime';
import SubmitButtons from '@/pages/Nfts/components/Lootbox/LootboxStakingItem/components/SubmitButtons';
import {
  Border,
  LootboxStakingItemContainer,
  MonthlyRewardContainer,
  PreloaderContainer,
  TopContentContainer,
  TopTitleContainer,
  TopTitleInnerContainer,
} from '@/pages/Nfts/components/Lootbox/LootboxStakingItem/styled';
import StakeButton from '@/pages/Nfts/components/Lootbox/StakeButton';
import DurationIcon from '@/pages/Nfts/components/Lootbox/StakeSelect/assets/DurationIcon';
import { useGetStakingTime } from '@/pages/Nfts/hooks/useGetStakingTime';
import { StakedLootbox } from '@/pages/Nfts/types';
import rootStore from '@/store';

interface LootboxStakingItemProps extends StakedLootbox {
  image: string;
}

const LootboxStakingItem = ({ image, ...props }: LootboxStakingItemProps) => {
  const {
    lootbox: { name, apy, price, months, nft_count, reward, id },
    claims,
    created_at,
    next_claim,
    max_claims,
    end_time,
    id: activeStakingId,
  } = props;

  const { endOfStaking, duration } = useGetStakingTime({
    maxClaims: max_claims,
    nextClaim: next_claim,
    claims,
    endTime: end_time,
  });

  const {
    stakingStore: {},
  } = rootStore;

  const isStakingCompleted = claims === months;

  return (
    <LootboxStakingItemContainer>
      <StakingBoxContainerIcon />

      <TopContentContainer>
        <TopTitleContainer>
          <PreloaderContainer>
            <PreloaderIcon />
            <img src={image} alt="" />
          </PreloaderContainer>

          <TopTitleInnerContainer>
            <div>
              <Text fontSize={14} fontWeight={700}>
                {name}
              </Text>

              <div>
                <div id="apy-container">
                  <ApyIcon />
                  <Text fontSize={10} fontWeight={800}>
                    {apy}%
                  </Text>
                </div>

                <Text fontSize={14} fontWeight={700}>
                  APY
                </Text>
              </div>
            </div>

            <div>
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
            </div>
          </TopTitleInnerContainer>
        </TopTitleContainer>

        <Border />

        <MonthlyRewardContainer>
          <MonthlyRewardTime
            nextClaim={next_claim}
            endOfStaking={endOfStaking}
            duration={duration}
          />

          <div>
            <div>
              <MmproTokenIcon />
              <Text fontSize={14} fontWeight={700}>
                {reward}
              </Text>
            </div>

            <div>
              <NftIcon />
              <Text fontSize={14} fontWeight={700}>
                {nft_count} NFT
              </Text>
            </div>
          </div>
        </MonthlyRewardContainer>

        <MonthlyRewardProgressBar
          months={months}
          claims={claims}
          nextClaim={next_claim}
          maxClaims={max_claims}
          endOfStaking={endOfStaking}
          duration={duration}
        />

        <SubmitButtons
          isStakingCompleted={isStakingCompleted}
          nextClaim={next_claim}
          maxClaims={max_claims}
          claims={claims}
          activeLootbox={{
            activeLootboxId: id,
            activeStakingId,
          }}
        />
      </TopContentContainer>

      <BottomProgressbar
        createdAt={created_at}
        endOfStaking={endOfStaking}
        stakingId={activeStakingId}
      />
    </LootboxStakingItemContainer>
  );
};

export default observer(LootboxStakingItem);
