import { observer } from 'mobx-react-lite';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import TooltipPortal from '@/components/TooltipPortal/tooltipPortal';
import Text from '@/components/UI/Text';

import MmproCoinIcon from '@/pages/Tasks/sections/pages/DailyRewardsPage/components/GrandPrizeTooltip/assets/MmproCoinIcon';
import MmproIcon from '@/pages/Tasks/sections/pages/DailyRewardsPage/components/GrandPrizeTooltip/assets/MmproIcon';
import { useGetGrandPrizeTooltipData } from '@/pages/Tasks/sections/pages/DailyRewardsPage/components/GrandPrizeTooltip/hooks/useGetGrandPrizeTooltipData';
import {
  ContentContainer,
  GrandPrizeBackground,
  GrandPrizeTooltipContainer,
  ImageContainer,
  Logo,
} from '@/pages/Tasks/sections/pages/DailyRewardsPage/components/GrandPrizeTooltip/styled';
import rootStore from '@/store';

const GrandPrizeTooltip = () => {
  const { getGrandPrizeTooltipData } = useGetGrandPrizeTooltipData();

  const {
    tasksStore: {
      isGrandPrizeVisible,
      setIsGrandPrizeVisible,
      grantDay,
      rewardAmount,
    },
    userStore: {
      addRewardTooltip,
      userInfo: { balance },
    },
  } = rootStore;

  const handleGrindPrizeButtonClick = () => {
    setTimeout(
      () =>
        addRewardTooltip({
          reward: rewardAmount,
          prevBalance: balance - rewardAmount,
        }),
      800,
    );
    setIsGrandPrizeVisible(false);
  };

  if (!grantDay) return null;

  return (
    <TooltipPortal>
      <GrandPrizeBackground $isActive={isGrandPrizeVisible}>
        <GrandPrizeTooltipContainer $isActive={isGrandPrizeVisible}>
          <ImageContainer>
            <LazyLoadImage
              src={
                getGrandPrizeTooltipData(Math.floor(grantDay / 84))?.imageSrc
              }
              alt=""
              effect="blur"
            />
            <Logo>
              <MmproIcon />
            </Logo>
          </ImageContainer>

          <ContentContainer>
            <Text fontSize={18} fontWeight={600}>
              Congratulations!
            </Text>
            <Text fontSize={12} fontWeight={400}>
              In addition to the daily rewards you receive
            </Text>

            <div>
              <MmproCoinIcon />
              <Text fontSize={28} fontWeight={700}>
                {rewardAmount.toLocaleString('ru-RU')}
              </Text>
            </div>

            <button onClick={handleGrindPrizeButtonClick}>Claim Reward</button>
          </ContentContainer>
        </GrandPrizeTooltipContainer>
      </GrandPrizeBackground>
    </TooltipPortal>
  );
};

export default observer(GrandPrizeTooltip);
