import { observer } from 'mobx-react-lite';
import React from 'react';

import {
  MonthlyRewardProgress,
  MonthlyRewardProgressBarContainer,
} from '@/pages/Nfts/components/Lootbox/LootboxStakingItem/styled';
import rootStore from '@/store';

interface MonthlyRewardProgressBarProps {
  months: number;
  claims: number;
  nextClaim: number;
  maxClaims: number;
  endOfStaking: number;
  duration: number;
}

const MonthlyRewardProgressBar = ({
  months,
  claims,
  nextClaim,
  maxClaims,
  endOfStaking,
  duration,
}: MonthlyRewardProgressBarProps) => {
  const { timeNow } = rootStore;

  /** сколько прошло полных месяцев относительно создания стейкинга */
  const claimTime =
    timeNow >= endOfStaking
      ? maxClaims
      : timeNow > nextClaim
        ? claims + Math.floor((timeNow - nextClaim) / duration + 1)
        : claims;

  return (
    <MonthlyRewardProgressBarContainer>
      {new Array(months).fill(null).map((_, index) => (
        <MonthlyRewardProgress
          key={`monthly-reward-progress-bar-${index}`}
          $isCompleted={!!(claims && claims > index)}
          $isOnProgress={claimTime === index}
          $isActive={claimTime > index}
        />
      ))}
    </MonthlyRewardProgressBarContainer>
  );
};

export default observer(MonthlyRewardProgressBar);
