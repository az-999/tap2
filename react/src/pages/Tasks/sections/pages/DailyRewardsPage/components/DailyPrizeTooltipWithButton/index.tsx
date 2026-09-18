import { observer } from 'mobx-react-lite';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import TooltipPortal from '@/components/TooltipPortal/tooltipPortal';
import Text from '@/components/UI/Text';

import MmproIcon from '@/pages/Tasks/sections/pages/DailyRewardsPage/components/DailyPrizeTooltipWithButton/assets/MmproIcon';
import { useGetTooltipWithButtonData } from '@/pages/Tasks/sections/pages/DailyRewardsPage/components/DailyPrizeTooltipWithButton/hooks/useGetTooltipWithButtonData';
import {
  DailyPrizeBackground,
  DailyPrizeTooltipContainer,
} from '@/pages/Tasks/sections/pages/DailyRewardsPage/components/DailyPrizeTooltipWithButton/styled';
import Button from '@/pages/Tasks/sections/pages/TasksPages/Button';
import rootStore from '@/store';

const DailyPrizeTooltipWithButton = () => {
  const {
    tasksStore: {
      actualPrize,
      isMonthPrizeTooltipWithButtonVisible,
      deleteMonthPrizeModalVisible,
      rewardAmount,
      grantDay,
    },
    userStore: {
      addRewardTooltip,
      userInfo: { balance },
    },
  } = rootStore;

  const { getTooltipData } = useGetTooltipWithButtonData();
  if (!actualPrize) return null;

  const { imageSrc, day } = getTooltipData(actualPrize);

  const handleClaimClick = () => {
    const container = document.getElementById(
      'daily-reward-page-main-container',
    );

    if (container) {
      container.scrollIntoView({
        behavior: 'smooth',
      });
    }

    /** выводим тулпип о начислении с задержкой в .8 сек */
    setTimeout(
      () =>
        addRewardTooltip({
          reward: rewardAmount,
          prevBalance: balance - rewardAmount,
        }),
      800,
    );
    deleteMonthPrizeModalVisible({ withButton: true });
  };

  return (
    <TooltipPortal>
      <DailyPrizeBackground $isActive={isMonthPrizeTooltipWithButtonVisible}>
        <DailyPrizeTooltipContainer
          $isActive={isMonthPrizeTooltipWithButtonVisible}
        >
          <div>
            <LazyLoadImage src={imageSrc} alt="" effect="blur" />

            <div>
              <Text fontSize={14} fontWeight={600}>
                Congratulations on Your Achievement!
              </Text>
              <Text fontSize={12} fontWeight={400}>
                You have become a stellar explorer! Receive your astronaut
                pioneer statuette for <span>{day} consecutive days</span> of
                adventures in our game!{' '}
                {!(grantDay && grantDay % 84) && (
                  <>
                    You can claim <span>the Grand Prize.</span>
                  </>
                )}
              </Text>
            </div>

            <div id="prize-amount">
              <MmproIcon />
              <Text fontSize={20} fontWeight={700}>
                100 000 000
              </Text>
            </div>

            <div id="prize-button-wrapper">
              <Button onClick={handleClaimClick}>Claim Reward</Button>
            </div>
          </div>
        </DailyPrizeTooltipContainer>
      </DailyPrizeBackground>
    </TooltipPortal>
  );
};

export default observer(DailyPrizeTooltipWithButton);
