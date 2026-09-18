import { observer } from 'mobx-react-lite';
import React from 'react';

import Text from '@/components/UI/Text';

import MmproTokenIcon from '@/pages/Nfts/components/Lootbox/LootboxMonthlyField/assets/MmproTokenIcon';
import rootStore from '@/store';

interface StakingValueFieldProps {
  value: number;
  isClosed: boolean;
  onClick: () => void;
}

const StakingValueField = ({
  value,
  isClosed,
  onClick,
}: StakingValueFieldProps) => {
  const {
    stakingStore: { setStakingValue },
  } = rootStore;

  const handleClick = () => {
    if (!isClosed) setStakingValue(value);
    onClick();
  };

  return (
    <div onClick={handleClick}>
      <MmproTokenIcon />
      <Text fontSize={16} fontWeight={700}>
        {value.toLocaleString('ru-RU')}
      </Text>
    </div>
  );
};

export default observer(StakingValueField);
