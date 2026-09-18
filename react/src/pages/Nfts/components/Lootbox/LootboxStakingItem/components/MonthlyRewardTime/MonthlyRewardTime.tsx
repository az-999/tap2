import { observer } from 'mobx-react-lite';
import React from 'react';

import Text from '@/components/UI/Text';

import rootStore from '@/store';
import Utils from '@/utils';

interface MonthlyRewardTimeProps {
  nextClaim: number;
  endOfStaking: number;
  duration: number;
}

const MonthlyRewardTime = ({
  nextClaim,

  endOfStaking,
  duration,
}: MonthlyRewardTimeProps) => {
  const { timeNow } = rootStore;

  const actualTime =
    timeNow >= endOfStaking
      ? 0
      : timeNow > nextClaim
        ? (endOfStaking - timeNow) % duration
        : nextClaim - timeNow;

  return (
    <div>
      <Text fontSize={12} fontWeight={500}>
        Monthly Reward
      </Text>

      <Text fontSize={10} fontWeight={600}>
        {Utils.formatTime(actualTime)}
      </Text>
    </div>
  );
};

export default observer(MonthlyRewardTime);
