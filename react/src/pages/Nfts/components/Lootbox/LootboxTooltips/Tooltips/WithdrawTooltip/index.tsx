import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';

import Text from '@/components/UI/Text';

import PreloaderIcon from '@/pages/Nfts/components/Lootbox/LootboxTooltips/Tooltips/WithdrawTooltip/assets/PreloaderIcon';
import WithdrawBg from '@/pages/Nfts/components/Lootbox/LootboxTooltips/Tooltips/WithdrawTooltip/assets/WithdrawBg';
import {
  InnerContainer,
  PreloaderContainer,
  TextContainer,
  WithdrawTooltipContainer,
} from '@/pages/Nfts/components/Lootbox/LootboxTooltips/Tooltips/WithdrawTooltip/styled';
import StakeButton from '@/pages/Nfts/components/Lootbox/StakeButton';
import { SLIDER_DATA } from '@/pages/Nfts/pages/LootboxCraftPage/const';
import rootStore from '@/store';

const WithdrawTooltip = () => {
  const [isActive, setIsActive] = useState(false);

  const {
    stakingStore: { stakingTooltips, deleteStakingTooltips },
  } = rootStore;

  useEffect(() => {
    if (stakingTooltips?.[0] !== 2) return;

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
    <WithdrawTooltipContainer $isActive={isActive}>
      <WithdrawBg />

      <InnerContainer>
        <PreloaderContainer>
          <PreloaderIcon />
          <img src={SLIDER_DATA[0].image} alt="" />
        </PreloaderContainer>

        <TextContainer>
          <Text fontSize={14} fontWeight={700}>
            Energy Returned
          </Text>
          <Text fontSize={12} fontWeight={400}>
            You've <strong>deactivated one of the charges</strong> for the
            propulsion system. The energy needed for the launch is returned to
            you.{' '}
            <strong>
              You're free to invest it in new tasks and directions!
            </strong>
          </Text>
        </TextContainer>

        <StakeButton
          disabled={false}
          onClick={handleClose}
          height={40}
          color="green"
        >
          Continue
        </StakeButton>
      </InnerContainer>
    </WithdrawTooltipContainer>
  );
};

export default observer(WithdrawTooltip);
