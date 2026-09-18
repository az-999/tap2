import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import CloseButton from '@/components/CloseButton';
import InfoTooltip from '@/components/InfoTooltip';
import Text from '@/components/UI/Text';

import { useGetMode } from '@/hooks/useGetMode';
import DailyRewardsTitleIcon from '@/pages/Tasks/sections/assets/dailyRewards/DailyRewardsTitleIcon';
import DailyMonthPrize from '@/pages/Tasks/sections/pages/DailyRewardsPage/components/DailyMonthPrize';
import DailyPrizeTooltip from '@/pages/Tasks/sections/pages/DailyRewardsPage/components/DailyPrizeTooltip';
import DailyPrizeTooltipWithButton from '@/pages/Tasks/sections/pages/DailyRewardsPage/components/DailyPrizeTooltipWithButton';
import GrandPrizeTooltip from '@/pages/Tasks/sections/pages/DailyRewardsPage/components/GrandPrizeTooltip';
import RewardItem from '@/pages/Tasks/sections/pages/DailyRewardsPage/components/RewardItem';
import { dailyRewardsData } from '@/pages/Tasks/sections/pages/DailyRewardsPage/components/RewardItem/data';
import {
  ContentContainer,
  DailyRewardsContainer,
  ModalContainer,
  TitleContainer,
} from '@/pages/Tasks/styled';
import rootStore from '@/store';

const DailyRewardsPage = () => {
  const navigate = useNavigate();
  const { isProdMode, isStageMode } = useGetMode();

  const {
    tasksStore: { resetDailyRewards, rewardAmount, grantDay },
    isShowWinTooltip,
    clearCache,
  } = rootStore;

  const formattedAmount = Number(rewardAmount).toLocaleString('ru-RU') || 0;
  const topTooltipRules =
    (grantDay &&
      ((grantDay % 84 >= 1 && grantDay % 84 < 4) ||
        (grantDay % 84 >= 28 && grantDay % 84 < 31) ||
        (grantDay % 84 >= 56 && grantDay % 84 < 59) ||
        grantDay === 84)) ||
    grantDay === null;
  const bottomTooltipRules =
    grantDay &&
    ((grantDay % 84 >= 4 && grantDay % 84 < 28) ||
      (grantDay % 84 >= 31 && grantDay % 84 < 56) ||
      (grantDay % 84 >= 59 && grantDay % 84 < 84));

  const getTooltipPosition = useCallback(() => {
    if (topTooltipRules) {
      return 'daily-rewards-modal-top';
    }

    if (bottomTooltipRules) {
      return 'daily-rewards-modal-bottom';
    }

    return '';
  }, [grantDay]);

  return (
    <DailyRewardsContainer id="daily-reward-page-main-container">
      <CloseButton onClick={() => navigate(-1)} color="green" top={25} />
      <TitleContainer>
        <div
          onClick={isProdMode || isStageMode ? () => null : () => clearCache()}
        >
          <DailyRewardsTitleIcon />

          <Text fontSize={18} fontWeight={700}>
            Daily Login Rewards
          </Text>

          {/** показываем сверху экрана, если у нас первые 3 карточки на странице */}
          <ModalContainer
            $isTopPosition
            data-tooltip-id="daily-rewards-modal-top"
          />
        </div>

        <div id="daily-title-container">
          <Text fontSize={14} fontWeight={500}>
            Collect statuettes and earn a Grand Prize!
          </Text>
          <Text fontSize={12} fontWeight={400}>
            For every completed 28 days of Daily Rewards, you receive a
            statuette and advance to the next stage!
          </Text>
        </div>

        <DailyMonthPrize />

        <div
          id="daily-title-container"
          onClick={
            isProdMode || isStageMode ? () => null : () => resetDailyRewards()
          }
        >
          <Text fontSize={14} fontWeight={500}>
            Log in daily for increasing rewards and extra points!
          </Text>
          <Text fontSize={12} fontWeight={400}>
            Earn daily reward cases with MMPro Points and a bigger weekly
            reward!
          </Text>
        </div>
      </TitleContainer>

      <ModalContainer
        $isTopPosition={false}
        data-tooltip-id="daily-rewards-modal-bottom"
      />

      <InfoTooltip
        isShowTooltip={isShowWinTooltip}
        tooltipId={getTooltipPosition()}
      >
        You Got <span style={{ fontWeight: 600 }}>+{formattedAmount}</span>{' '}
        MMPro Points
      </InfoTooltip>

      <ContentContainer>
        {dailyRewardsData.map((item) => (
          <RewardItem
            day={item.day}
            reward={item.reward}
            src={item.src}
            key={`daily-reward-${item.day}`}
          />
        ))}
      </ContentContainer>

      <DailyPrizeTooltip />
      <DailyPrizeTooltipWithButton />
      <GrandPrizeTooltip />
    </DailyRewardsContainer>
  );
};

export default observer(DailyRewardsPage);
