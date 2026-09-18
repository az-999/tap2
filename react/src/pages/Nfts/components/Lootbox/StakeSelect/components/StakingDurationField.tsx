import { observer } from 'mobx-react-lite';
import React from 'react';

import Text from '@/components/UI/Text';

import DurationIcon from '@/pages/Nfts/components/Lootbox/StakeSelect/assets/DurationIcon';
import rootStore from '@/store';

interface StakingDurationFieldProps {
  duration: number;
  isClosed: boolean;
  onClick: () => void;
}

const StakingDurationField = ({
  duration,
  isClosed,
  onClick,
}: StakingDurationFieldProps) => {
  const {
    stakingStore: { setStakingDuration },
  } = rootStore;

  const handleClick = () => {
    if (!isClosed) setStakingDuration(duration);
    onClick();
  };

  return (
    <div onClick={handleClick}>
      <DurationIcon />
      <Text fontSize={15} fontWeight={600}>
        {duration} months
      </Text>
    </div>
  );
};

export default observer(StakingDurationField);
