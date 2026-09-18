import { observer } from 'mobx-react-lite';
import React from 'react';

import Text from '@/components/UI/Text';

import InfoIcon from '@/pages/Airdrop/assets/InfoIcon';
import {
  BottomBlock,
  InnerContainer,
  RatingTimerComponents,
  TopBlock,
} from '@/pages/Airdrop/components/RatingTimer/styled';
import rootStore from '@/store';
import Utils from '@/utils';

const RatingTimer = () => {
  const {
    airdropStore: { secondsUntilNoonUTC, airdropSeasonDay },
  } = rootStore;

  return (
    <RatingTimerComponents style={{ color: 'red' }}>
      <InnerContainer>
        <TopBlock>
          <Text fontSize={12} fontWeight={600}>
            Airdrop season
          </Text>

          <Text fontSize={12} fontWeight={600}>
            {Utils.formatStakingTime(secondsUntilNoonUTC)}
          </Text>

          <div>
            <Text fontSize={12} fontWeight={600}>
              {airdropSeasonDay}
            </Text>
            <Text fontSize={12} fontWeight={600}>
              / 30 days
            </Text>
          </div>
        </TopBlock>

        <BottomBlock>
          <InfoIcon />
          <Text fontSize={10} fontWeight={500}>
            Rank position updates daily throughout the season
          </Text>
        </BottomBlock>
      </InnerContainer>
    </RatingTimerComponents>
  );
};

export default observer(RatingTimer);
