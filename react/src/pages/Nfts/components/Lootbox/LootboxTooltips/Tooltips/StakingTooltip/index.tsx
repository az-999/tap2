import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';

import Text from '@/components/UI/Text';

import PreloaderIcon from '@/pages/Nfts/components/Lootbox/LootboxTooltips/Tooltips/StakingTooltip/assets/PreloaderIcon';
import StakingBg from '@/pages/Nfts/components/Lootbox/LootboxTooltips/Tooltips/StakingTooltip/assets/StakingBg';
import {
  InnerContainer,
  PreloaderContainer,
  StakingTooltipContainer,
  TextContainer,
} from '@/pages/Nfts/components/Lootbox/LootboxTooltips/Tooltips/StakingTooltip/styled';
import StakeButton from '@/pages/Nfts/components/Lootbox/StakeButton';
import { SLIDER_DATA } from '@/pages/Nfts/pages/LootboxCraftPage/const';
import rootStore from '@/store';

const StakingTooltip = () => {
  const [isActive, setIsActive] = useState(false);

  const {
    stakingStore: { stakingTooltips, deleteStakingTooltips },
  } = rootStore;

  useEffect(() => {
    if (stakingTooltips?.[0] !== 0) return;

    const timer = setTimeout(() => {
      setIsActive(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [stakingTooltips.length]);

  const handleClose = async () => {
    setIsActive(false);
    setTimeout(deleteStakingTooltips, 100);
  };

  return (
    <StakingTooltipContainer $isActive={isActive}>
      <StakingBg />

      <InnerContainer>
        <PreloaderContainer>
          <PreloaderIcon />
          <img src={SLIDER_DATA[0].image} alt="" />
        </PreloaderContainer>

        <TextContainer>
          <Text fontSize={14} fontWeight={700}>
            Engine Charging Started!
          </Text>
          <Text fontSize={12} fontWeight={400}>
            You've <strong>activated one of the charges</strong> for the
            propulsion system. The longer it accumulates energy, the{' '}
            <strong>
              more resources will appear for your cosmic adventures!
            </strong>
          </Text>
        </TextContainer>

        <StakeButton disabled={false} onClick={handleClose} height={40}>
          Continue
        </StakeButton>
      </InnerContainer>
    </StakingTooltipContainer>
  );
};

export default observer(StakingTooltip);
