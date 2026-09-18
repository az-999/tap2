import { observer } from 'mobx-react-lite';
import React from 'react';

import Text from '@/components/UI/Text';

import MmproIcon from '@/pages/Ships/pages/DefensePage/assets/MmproIcon';
import ShieldIcon from '@/pages/Ships/pages/DefensePage/assets/ShieldIcon';
import defenseTipLogo from '@/pages/Ships/pages/DefensePage/assets/top-logo.png';
import leftBorderIcon from '@/pages/Ships/pages/DefenseWidgetPage/assets/main-left-border.png';
import rightBorderIcon from '@/pages/Ships/pages/DefenseWidgetPage/assets/main-right-border.png';
import shipIcon from '@/pages/Ships/pages/DefenseWidgetPage/assets/shipImg.png';
import {
  BalanceContainer,
  DefenseWidgetPageContainer,
  ShipContainer,
  TopContainer,
} from '@/pages/Ships/pages/DefenseWidgetPage/styled';
import rootStore from '@/store';

const DefenseWidgetPage = () => {
  const {
    shipsStore: { protectedPoints },
  } = rootStore;

  return (
    <DefenseWidgetPageContainer>
      <TopContainer>
        <img src={defenseTipLogo} alt="" />
        <Text fontSize={12} fontWeight={800}>
          Defense Mode
        </Text>
      </TopContainer>

      <ShipContainer>
        <img src={shipIcon} alt="" id="ship-icon" />
        <img src={leftBorderIcon} alt="" id="left-border" />
        <img src={rightBorderIcon} alt="" id="right-border" />
      </ShipContainer>

      <BalanceContainer>
        <div>
          <ShieldIcon />
          <Text fontSize={13} fontWeight={600}>
            Protected points
          </Text>
        </div>

        <div>
          <MmproIcon />
          <Text fontSize={17} fontWeight={700}>
            {protectedPoints.toLocaleString('ru-RU')}
          </Text>
        </div>
      </BalanceContainer>
    </DefenseWidgetPageContainer>
  );
};

export default observer(DefenseWidgetPage);
