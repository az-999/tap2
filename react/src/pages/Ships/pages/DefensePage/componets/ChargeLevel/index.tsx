import { observer } from 'mobx-react-lite';
import React from 'react';

import ShieldIcon from '@/pages/Ships/pages/DefensePage/assets/ShieldIcon';
import {
  ChargeItem,
  ChargeLevelContainer,
  ChargeList,
} from '@/pages/Ships/pages/DefensePage/componets/ChargeLevel/styled';
import rootState from '@/store';

const ChargeLevel = () => {
  const {
    shipsStore: { defenseChargeLevel },
  } = rootState;

  return (
    <ChargeLevelContainer $noDefenseLevel={!defenseChargeLevel}>
      <ShieldIcon />

      <ChargeList>
        {new Array(30).fill(null).map((_, index) => (
          <ChargeItem
            key={`charge-level-${index}`}
            $isActive={defenseChargeLevel >= index + 1}
          />
        ))}
      </ChargeList>
    </ChargeLevelContainer>
  );
};

export default observer(ChargeLevel);
