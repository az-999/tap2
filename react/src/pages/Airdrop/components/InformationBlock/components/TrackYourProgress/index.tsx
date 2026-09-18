import React from 'react';

import Text from '@/components/UI/Text';

import TitleIcon from '@/pages/Airdrop/components/InformationBlock/components/TrackYourProgress/TitleIcon';
import { TrackYourProgressContainer } from '@/pages/Airdrop/components/InformationBlock/components/TrackYourProgress/styled';

const TrackYourProgress = () => {
  return (
    <TrackYourProgressContainer>
      <TitleIcon />
      <Text fontSize={12} fontWeight={400}>
        Monitor your <span id="green-strong">task progress and ranking</span> in
        real time. The higher you climb on the leaderboard, the more BUMP Tokens
        you'll earn.
      </Text>
    </TrackYourProgressContainer>
  );
};

export default TrackYourProgress;
