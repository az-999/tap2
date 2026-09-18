import { observer } from 'mobx-react-lite';
import React from 'react';
import { css } from 'styled-components/macro';

import Text from '@/components/UI/Text';

import {
  BottomContainer,
  ProgressBar,
  TimerContainer,
} from '@/pages/Nfts/components/Lootbox/LootboxStakingItem/styled';
import rootStore from '@/store';
import Utils from '@/utils';

interface BottomProgressbarProps {
  createdAt: number;
  endOfStaking: number;
  stakingId: number;
}

const BottomProgressbar = ({
  createdAt,
  endOfStaking,
  stakingId,
}: BottomProgressbarProps) => {
  const { timeNow } = rootStore;

  const durationValue =
    100 + ((0 - 100) / (createdAt - endOfStaking)) * (timeNow - endOfStaking);
  const progressValue = timeNow >= endOfStaking ? 100 : durationValue;
  const timeValue = timeNow >= endOfStaking ? 0 : endOfStaking - timeNow;

  return (
    <BottomContainer>
      <ProgressBar $value={progressValue} />

      <div>
        <Text
          fontSize={10}
          fontWeight={500}
          styledFragment={css`
            opacity: 0.5;
            color: #38f4f1;
            position: absolute;
            bottom: 45%;
            left: 50%;
            transform: translate(-50%, 50%);
          `}
        >
          #{stakingId}
        </Text>

        {!!timeValue && (
          <TimerContainer>
            <Text fontSize={10} fontWeight={500}>
              Staking Countdown
            </Text>
            <Text fontSize={10} fontWeight={500}>
              {Utils.formatStakingTime(timeValue)}
            </Text>
          </TimerContainer>
        )}
      </div>
    </BottomContainer>
  );
};

export default observer(BottomProgressbar);
