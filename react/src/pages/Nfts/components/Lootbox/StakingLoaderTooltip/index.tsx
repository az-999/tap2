import { observer } from 'mobx-react-lite';
import React from 'react';

import TooltipPortal from '@/components/TooltipPortal/tooltipPortal';
import Text from '@/components/UI/Text';

import PreloaderIcon from '@/pages/Nfts/components/Lootbox/StakingLoaderTooltip/assets/PreloaderIcon';
import {
  ContentContainer,
  PreloaderContainer,
  ProcessingContainer,
  StyledBackground,
} from '@/pages/Nfts/components/Lootbox/StakingLoaderTooltip/styled';
import { useGetLootboxUrl } from '@/pages/Nfts/hooks/useGetLootboxUrl';
import MmproIcon from '@/pages/Nfts/pages/LootboxCraftPage/assets/MmproIcon';
import rootStore from '@/store';

const StakingLoaderTooltip = () => {
  const {
    stakingStore: {
      isStakingLoading,
      isRestakingLoading,
      activeSlideIndex,
      isUnstakingLoading,
    },
  } = rootStore;

  const { getLootboxUrl } = useGetLootboxUrl(activeSlideIndex + 1);
  const getTitle = () => {
    if (isStakingLoading) return 'Staking';
    if (isRestakingLoading) return 'Restaking';
    if (isUnstakingLoading) return 'Unstaking';
  };

  return (
    <TooltipPortal>
      <StyledBackground
        $isActive={isStakingLoading || isRestakingLoading || isUnstakingLoading}
      >
        <ContentContainer>
          <PreloaderContainer>
            <PreloaderIcon />

            <img src={getLootboxUrl()} alt="" />
          </PreloaderContainer>

          <ProcessingContainer>
            <Text fontSize={16} fontWeight={700}>
              {getTitle()} Activation
            </Text>
            <Text fontSize={12} fontWeight={400}>
              Installing the energy system
            </Text>
          </ProcessingContainer>

          <MmproIcon />
        </ContentContainer>
      </StyledBackground>
    </TooltipPortal>
  );
};

export default observer(StakingLoaderTooltip);
