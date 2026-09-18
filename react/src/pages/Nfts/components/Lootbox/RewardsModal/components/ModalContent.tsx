import { observer } from 'mobx-react-lite';
import React from 'react';

import Text from '@/components/UI/Text';

import MmproIcon from '@/pages/Nfts/components/Lootbox/RewardsModal/assets/MmproIcon';
import bg from '@/pages/Nfts/components/Lootbox/RewardsModal/assets/lootbox-bg.png';
import RewardItem from '@/pages/Nfts/components/Lootbox/RewardsModal/components/RewardItem';
import {
  Button,
  ButtonContainer,
  LootboxImageWrapper,
  ModalContent,
  RewardContainer,
  RewardsPartsList,
  TitleContainer,
} from '@/pages/Nfts/components/Lootbox/RewardsModal/styled';
import { useGetLootboxUrl } from '@/pages/Nfts/hooks/useGetLootboxUrl';
import { PartShipKey } from '@/pages/Ships/types';
import rootStore from '@/store';

const RewardsModalContent = () => {
  const {
    stakingStore: {
      stakingRewards,
      deleteStakingRewards,
      activeSlideIndex,
      activeLootbox,
    },
  } = rootStore;

  const { getLootboxUrl } = useGetLootboxUrl(
    activeLootbox ? activeLootbox.activeLootboxId : activeSlideIndex + 1,
  );

  if (!stakingRewards) return null;
  const { type, rewards, rewardAmount } = stakingRewards;

  return (
    <ModalContent>
      <LootboxImageWrapper>
        <img src={getLootboxUrl()} alt="" />
        <img src={bg} alt="" />
      </LootboxImageWrapper>

      <TitleContainer $type={type}>
        <Text fontSize={16} fontWeight={700}>
          {type === 'staking'
            ? 'Resources Ready for Collection!'
            : 'Charge Complete!'}
        </Text>
        <Text fontSize={12} fontWeight={400}>
          {type === 'staking'
            ? "Part of your charge's energy has been transformed into valuable resources. Take them with you on your journey while the charge continues to refill with new energy"
            : 'The final portion of accumulated resources is waiting for you. Collect the earnings and decide what to do with the charge next'}
        </Text>
      </TitleContainer>

      <RewardContainer>
        <MmproIcon />
        <Text fontSize={24} fontWeight={700}>
          {rewardAmount}
        </Text>
      </RewardContainer>

      <RewardsPartsList>
        {Object.keys(rewards).map((reward) => (
          <RewardItem rewards={rewards[reward as PartShipKey]!} />
        ))}
      </RewardsPartsList>

      <ButtonContainer>
        <Button onClick={deleteStakingRewards}>Get a Reward</Button>
      </ButtonContainer>
    </ModalContent>
  );
};

export default observer(RewardsModalContent);
