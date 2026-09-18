import React, { useCallback, useEffect, useState } from 'react';

import MmproCoinIcon from '@/components/RewardTooltip/assets/MmproCoinIcon';
import { getTextWidth } from '@/components/RewardTooltip/components/RewardTooltipItem';
import { RewardTooltipContainer } from '@/components/RewardTooltipWithoutBalance/styled';
import Text from '@/components/UI/Text';

interface RewardTooltipWithoutBalanceProps {
  reward: number;
  removeTooltip: () => void;
}

const RewardTooltipItem = ({
  reward,
  removeTooltip,
}: RewardTooltipWithoutBalanceProps) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsActive(true);
    }, 200);

    const timer = setTimeout(() => {
      setIsActive(false);
      setTimeout(removeTooltip, 1000);
    }, 2000);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(timer);
    };
  }, []);

  const getContainerWidth = useCallback(() => {
    const rewardLength = getTextWidth(
      reward.toLocaleString('ru-RU'),
      '16px Arial',
    );

    return rewardLength + 78;
  }, [reward]);

  return (
    <RewardTooltipContainer $isActive={isActive} $width={getContainerWidth()}>
      <MmproCoinIcon />
      <Text fontSize={14} fontWeight={700}>
        + {reward}
      </Text>
    </RewardTooltipContainer>
  );
};

export default RewardTooltipItem;
