import { observer } from 'mobx-react-lite';
import React from 'react';

import Text from '@/components/UI/Text';

import MmproIcon from '@/pages/Ships/pages/DefensePage/assets/MmproIcon';
import ShieldIcon from '@/pages/Ships/pages/DefensePage/assets/ShieldIcon';
import SkullIcon from '@/pages/Ships/pages/DefensePage/assets/SkullIcon';
import {
  BalanceContainer,
  BalanceFieldContainer,
  TitleContainer,
} from '@/pages/Ships/pages/DefensePage/componets/BalanceField/styled';
import rootStore from '@/store';

interface BalanceFieldProps {
  type: 'protected' | 'stolen';
}

const BalanceField = ({ type }: BalanceFieldProps) => {
  const {
    shipsStore: { protectedPoints, stolenPoints },
  } = rootStore;

  return (
    <BalanceFieldContainer>
      {type === 'protected' ? (
        <TitleContainer>
          <ShieldIcon />
          <Text fontSize={11} fontWeight={600}>
            Protected points
          </Text>
        </TitleContainer>
      ) : (
        <TitleContainer>
          <SkullIcon />
          <Text fontSize={11} fontWeight={600}>
            Stolen from you
          </Text>
        </TitleContainer>
      )}

      <BalanceContainer>
        <MmproIcon />
        <Text fontSize={14} fontWeight={700}>
          {type === 'protected'
            ? protectedPoints.toLocaleString('ru-RU')
            : stolenPoints.toLocaleString('ru-RU')}
        </Text>
      </BalanceContainer>
    </BalanceFieldContainer>
  );
};

export default observer(BalanceField);
