import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import ArrowIcon from '@/pages/Nfts/components/Lootbox/StakeSelect/assets/ArrowIcon';
import StakingDurationField from '@/pages/Nfts/components/Lootbox/StakeSelect/components/StakingDurationField';
import StakingValueField from '@/pages/Nfts/components/Lootbox/StakeSelect/components/StakingValueField';
import { StakeSelectContainer } from '@/pages/Nfts/components/Lootbox/StakeSelect/styled';
import {
  STAKING_SELECT_DURATION,
  STAKING_SELECT_VALUES,
} from '@/pages/Nfts/store/stakingStore';
import rootStore from '@/store';

interface StakeSelectProps {
  type: 'value' | 'duration';
}

const StakeSelect = ({ type }: StakeSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosed, setIsClosed] = useState(true);

  const {
    stakingStore: { stakingValue, stakingDuration, availableLootboxes },
  } = rootStore;

  const debouncedClose = useDebouncedCallback(() => setIsClosed(true), 100);

  const toggleClick = () => {
    setIsOpen(!isOpen);
    isClosed ? setIsClosed(false) : debouncedClose();
  };

  if (!availableLootboxes) return null;

  return (
    <StakeSelectContainer $isOpen={isOpen}>
      {type === 'value' &&
        (isClosed ? (
          <StakingValueField
            value={stakingValue}
            isClosed={isClosed}
            onClick={toggleClick}
          />
        ) : (
          STAKING_SELECT_VALUES.map((value) => (
            <StakingValueField
              key={`staking-value-${value}`}
              value={value}
              isClosed={isClosed}
              onClick={toggleClick}
            />
          ))
        ))}

      {type === 'duration' &&
        (isClosed ? (
          <StakingDurationField
            duration={stakingDuration}
            isClosed={isClosed}
            onClick={toggleClick}
          />
        ) : (
          STAKING_SELECT_DURATION.map((duration) => (
            <StakingDurationField
              key={`staking-duration-${duration}`}
              duration={duration}
              isClosed={isClosed}
              onClick={toggleClick}
            />
          ))
        ))}

      <ArrowIcon />
    </StakeSelectContainer>
  );
};

export default observer(StakeSelect);
