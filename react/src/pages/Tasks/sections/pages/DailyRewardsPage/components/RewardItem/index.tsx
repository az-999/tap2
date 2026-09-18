import {
  useHapticFeedback,
  useWebApp,
} from '@vkruglikov/react-telegram-web-app';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';

import Text from '@/components/UI/Text';

import {
  ExplodingContainer,
  RewardItemContainer,
  RewardItemWrapper,
  StyledImg,
  Timer,
  TitleContainer,
} from './styled';
import TimerIcon from '@/pages/Tasks/Assets/TimerIcon';
import CompletedIcon from '@/pages/Tasks/sections/assets/dailyRewards/CompletedIcon';
import MmproIcon from '@/pages/Tasks/sections/assets/dailyRewards/MmproIcon';
import rootStore from '@/store';
import Utils from '@/utils';

interface RewardItemProps {
  day: number;
  reward: number;
  src: string;
}

const grandDayIndexes = [
  28 - 1,
  28 * 2 - 1,
  28 * 3 - 1,
  28 * 4 - 1,
  28 * 5 - 1,
  28 * 6 - 1,
  28 * 7 - 1,
  28 * 8 - 1,
  28 * 9 - 1,
];

const RewardItem = ({ day, reward, src }: RewardItemProps) => {
  const [rewardDay, setRewardDay] = useState(day);

  const {
    tasksStore: {
      postDailyRewards,
      receiveDailyRewardsCurrentDay,
      grantDay,
      timeUntilTheNextReward,
      addMonthPrizeModalVisible,
    },
    isVibrateActive,
  } = rootStore;

  const [isExploding, setIsExploding] = useState(false);
  const [impactOccurred] = useHapticFeedback();
  const WebApp = useWebApp();

  useEffect(() => {
    if (!grantDay || grantDay < 28) return;

    const step = 28;
    let multiplier = 1;

    // Цикл, который проверяет диапазоны шагом в 28 дней
    while (grantDay >= multiplier * step) {
      multiplier++;
    }

    setRewardDay(day + (multiplier - 1) * step);
  }, [grantDay, day]);

  const isCurrentDayReward = receiveDailyRewardsCurrentDay === grantDay;

  const isFullWidth = !(rewardDay % 7); // каждый 7 день

  const isActive =
    (grantDay === null && rewardDay === 1) || // первый день наград
    (isCurrentDayReward && grantDay && rewardDay === grantDay + 1); // последующие дни в течение суток (если превышено время суток, то не активно)

  const isCompleted = grantDay && rewardDay <= grantDay;

  const handleClick = async () => {
    if (!isActive) return;

    await postDailyRewards(reward);
    setIsExploding(true);

    if (grantDay && grandDayIndexes.includes(grantDay)) {
      setTimeout(
        () =>
          addMonthPrizeModalVisible({
            withButton: true,
            id: grandDayIndexes.indexOf(grantDay) + 1,
          }),
        900,
      );
    }

    if (isVibrateActive) {
      if (WebApp.initData) {
        impactOccurred('medium');
      }

      if (!WebApp.initData && 'vibrate' in window.navigator) {
        window.navigator.vibrate(30);
      }
    }

    setTimeout(setIsExploding, 3000);

    return;
  };

  return (
    <RewardItemContainer $isFullWidth={isFullWidth} onClick={handleClick}>
      {isCompleted && <CompletedIcon />}

      <RewardItemWrapper
        $isActive={isActive || false}
        $isCompleted={isCompleted || false}
        $isFullWidth={isFullWidth}
      >
        <StyledImg src={src} rel="preload" />
        <Text fontSize={10} fontWeight={700}>{`Day ${rewardDay}`}</Text>
        <TitleContainer $isFullWidth={isFullWidth}>
          <MmproIcon />
          <Text fontSize={isFullWidth ? 20 : 10} fontWeight={700}>
            {Number(reward).toLocaleString('ru-RU')}
          </Text>
        </TitleContainer>
      </RewardItemWrapper>

      {grantDay &&
        rewardDay === grantDay + 1 &&
        !isActive &&
        timeUntilTheNextReward &&
        timeUntilTheNextReward > 0 && (
          <Timer $time={timeUntilTheNextReward} $isFullWidth={isFullWidth}>
            <TimerIcon />
            <div>
              <Text fontSize={10} fontWeight={500}>
                {Utils.formatDailyTime(timeUntilTheNextReward)}
              </Text>
            </div>
          </Timer>
        )}

      {isExploding && (
        <ExplodingContainer>
          <ConfettiExplosion
            force={0.9}
            duration={2500}
            particleCount={300}
            zIndex={100}
          />
        </ExplodingContainer>
      )}
    </RewardItemContainer>
  );
};

export default observer(RewardItem);
