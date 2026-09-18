import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';

import Text from '@/components/UI/Text';

import RestakingBg from '@/pages/Nfts/components/Lootbox/LootboxTooltips/Tooltips/RestakingTooltip/assets/RestakingBg';
import {
  InnerContainer,
  PreloaderContainer,
  RestakingTooltipContainer,
  TextContainer,
} from '@/pages/Nfts/components/Lootbox/LootboxTooltips/Tooltips/RestakingTooltip/styled';
import PreloaderIcon from '@/pages/Nfts/components/Lootbox/LootboxTooltips/Tooltips/StakingTooltip/assets/PreloaderIcon';
import StakeButton from '@/pages/Nfts/components/Lootbox/StakeButton';
import { SLIDER_DATA } from '@/pages/Nfts/pages/LootboxCraftPage/const';
import rootStore from '@/store';

const RestakingTooltip = () => {
  const [isActive, setIsActive] = useState(false);

  const {
    stakingStore: { stakingTooltips, deleteStakingTooltips },
  } = rootStore;

  useEffect(() => {
    if (stakingTooltips?.[0] !== 1) return;

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
    <RestakingTooltipContainer $isActive={isActive}>
      <RestakingBg />

      <InnerContainer>
        <PreloaderContainer>
          <PreloaderIcon />
          <img src={SLIDER_DATA[0].image} alt="" />
        </PreloaderContainer>

        <TextContainer>
          <Text fontSize={14} fontWeight={700}>
            Recharge Initiated!
          </Text>
          <Text fontSize={12} fontWeight={400}>
            You've boosted the charge, extending its duration. Expect new
            portions of resources in the upcoming cycles!
          </Text>
        </TextContainer>

        <StakeButton disabled={false} onClick={handleClose} height={40}>
          Continue
        </StakeButton>
      </InnerContainer>
    </RestakingTooltipContainer>
  );
};

export default observer(RestakingTooltip);
