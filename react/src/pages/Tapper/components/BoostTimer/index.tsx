import { observer } from 'mobx-react-lite';

import Text from '@/components/UI/Text';

import Utils from '../../../../utils';
import { DateWrapper } from '../Timer/styled';
import rootStore from '@/store';

const BoostTimer = () => {
  const {
    boostersStore: { boosterTime },
  } = rootStore;

  if (!boosterTime) return null;

  return (
    <DateWrapper>
      <Text fontSize={12} fontWeight={500} color={'#FFFFFF99'}>
        {Utils.formatTime(boosterTime)}
      </Text>
    </DateWrapper>
  );
};

export default observer(BoostTimer);
