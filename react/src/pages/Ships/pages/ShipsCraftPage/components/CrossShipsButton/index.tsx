import { observer } from 'mobx-react-lite';
import React from 'react';

import Text from '@/components/UI/Text';

import {
  ButtonInfo,
  CrossButton,
  CrossShipContainer,
} from '@/pages/Ships/pages/ShipsCraftPage/components/CrossShipsButton/styled';
import Info from '@/pages/Ships/pages/ShipsCraftPage/components/EntireCraftedItem/assets/Info';
import CrossShips from '@/pages/Ships/pages/ShipsCraftPage/components/ShipsCraft/assets/CrossShips';
import rootStore from '@/store';

const CrossShipsButton = () => {
  const {
    showWinTooltip,
    shipsStore: { setIsCrossShipsModalActive },
  } = rootStore;

  return (
    <CrossShipContainer>
      <ButtonInfo
        onClick={() => showWinTooltip(true)}
        data-tooltip-id="info-cross-space-ship-tooltip"
      >
        <Info />
      </ButtonInfo>

      <CrossButton onClick={() => setIsCrossShipsModalActive(true)}>
        <div>
          <CrossShips />
          <Text fontSize={14} fontWeight={600}>
            +
          </Text>
          <CrossShips />
        </div>

        <div>
          <Text fontSize={14} fontWeight={600}>
            Merge ships
          </Text>
        </div>
      </CrossButton>
    </CrossShipContainer>
  );
};

export default observer(CrossShipsButton);
