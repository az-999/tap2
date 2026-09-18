import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useState } from 'react';

import MmproCoinIcon from '@/components/RewardTooltip/assets/MmproCoinIcon';
import {
  Balance,
  BalanceBottom,
  BalanceTop,
  RewardTooltipContainer,
  TopContainer,
} from '@/components/RewardTooltip/styled';
import Text from '@/components/UI/Text';

import rootStore from '@/store';

interface RewardTooltipItemProps {
  reward: number;
  prevBalance: number;
  removeTooltip: () => void;
}

export const getTextWidth = (text: string, font: string) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  (context as CanvasRenderingContext2D).font = font || '16px Arial';
  const metrics = (context as CanvasRenderingContext2D).measureText(text);
  return Math.ceil(metrics.width);
};

const RewardTooltipItem = ({
  reward,
  prevBalance,
  removeTooltip,
}: RewardTooltipItemProps) => {
  const [balanceValue, setBalanceValue] = useState(prevBalance);
  const [isActive, setIsActive] = useState(false);

  const {
    userStore: {
      userInfo: { balance },
    },
  } = rootStore;

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsActive(true);
    }, 200);

    const timer = setTimeout(() => {
      setBalanceValue(balance);

      setTimeout(() => {
        setIsActive(false);
        setTimeout(removeTooltip, 1000);
      }, 3000);
    }, 2200);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(timer);
    };
  }, []);

  const getContainerWidth = useCallback(() => {
    const balanceValueLength = getTextWidth(
      balanceValue.toLocaleString('ru-RU'),
      '16px Arial',
    );
    const rewardLength = getTextWidth(
      reward.toLocaleString('ru-RU'),
      '16px Arial',
    );

    return (
      Math.max(balanceValueLength, rewardLength) +
      (rewardLength >= balanceValueLength ? 78 : 54)
    );
  }, [balanceValue, reward]);

  return (
    <RewardTooltipContainer $isActive={isActive} $width={getContainerWidth()}>
      <TopContainer>
        <Text fontSize={14} fontWeight={500}>
          Total balance
        </Text>
        <BalanceTop>
          <MmproCoinIcon />
          <Balance
            value={balanceValue}
            format="( ddd)"
            animation="count"
            duration={1400}
          />
        </BalanceTop>
      </TopContainer>

      <BalanceBottom>
        <Text fontSize={14} fontWeight={700}>
          +
        </Text>
        <MmproCoinIcon />
        <Text fontSize={14} fontWeight={700}>
          {reward.toLocaleString('ru-RU')}
        </Text>
      </BalanceBottom>
    </RewardTooltipContainer>
  );
};

export default observer(RewardTooltipItem);
