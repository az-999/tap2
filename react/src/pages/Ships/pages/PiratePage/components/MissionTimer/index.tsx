import { observer } from 'mobx-react-lite';
import React from 'react';

import Text from '@/components/UI/Text';

import { MissionTimerContainer } from '@/pages/Ships/pages/PiratePage/components/MissionTimer/styled';
import rootStore from '@/store';
import Utils from '@/utils';

const MissionTimer = () => {
  const {
    shipsStore: { piracyMissionActiveTime },
  } = rootStore;

  return (
    <MissionTimerContainer>
      <Text fontSize={11} fontWeight={600}>
        piracy mission
      </Text>
      <Text fontSize={18} fontWeight={700}>
        {Utils.formatTime(piracyMissionActiveTime, true)}
      </Text>
    </MissionTimerContainer>
  );
};

export default observer(MissionTimer);
