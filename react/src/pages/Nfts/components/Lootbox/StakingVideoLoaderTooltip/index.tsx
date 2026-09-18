import { observer } from 'mobx-react-lite';
import React from 'react';

import TooltipPortal from '@/components/TooltipPortal/tooltipPortal';
import Text from '@/components/UI/Text';

import {
  ProcessingContainer,
  StyledBackground,
  VideoContainer,
} from '@/pages/Nfts/components/Lootbox/StakingVideoLoaderTooltip/styled';
import ProcessingIcon from '@/pages/Nfts/components/ProcessingContent/assets/ProcessingIcon';
import { useGetLootboxUrl } from '@/pages/Nfts/hooks/useGetLootboxUrl';
import rootStore from '@/store';

const StakingVideoLoaderTooltip = () => {
  const {
    stakingStore: { isStakingVideoLoading, activeLootbox, activeSlideIndex },
  } = rootStore;

  const { getVideoLootboxUrl } = useGetLootboxUrl(
    activeLootbox ? activeLootbox.activeLootboxId : activeSlideIndex + 1,
  );

  return (
    <TooltipPortal>
      <StyledBackground $isActive={isStakingVideoLoading}>
        <VideoContainer $isActive={isStakingVideoLoading}>
          {isStakingVideoLoading && (
            <video loop={true} autoPlay={true} muted={true} preload="auto">
              <source src={getVideoLootboxUrl()} type="video/mp4" />
            </video>
          )}

          <ProcessingContainer>
            <Text fontSize={16} fontWeight={700}>
              Reward Distribution
            </Text>
            <Text fontSize={12} fontWeight={400}>
              A new set of charges will soon be delivered to the ship
            </Text>
          </ProcessingContainer>

          <ProcessingIcon />
        </VideoContainer>
      </StyledBackground>
    </TooltipPortal>
  );
};

export default observer(StakingVideoLoaderTooltip);
