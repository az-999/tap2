import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';

import BackButton from '@/components/BackButton';
import Text from '@/components/UI/Text';

import { useGetMode } from '@/hooks/useGetMode';
import defenseTipLogo from '@/pages/Ships/pages/DefensePage/assets/top-logo.png';
import BalanceField from '@/pages/Ships/pages/DefensePage/componets/BalanceField';
import Button from '@/pages/Ships/pages/DefensePage/componets/Button/Button';
import ChargeLevel from '@/pages/Ships/pages/DefensePage/componets/ChargeLevel';
import {
  BalancesContainer,
  BottomContainer,
  DefensePageContainer,
  TitleContainer,
  TopContainer,
} from '@/pages/Ships/pages/DefensePage/styled';
import rootStore from '@/store';
import { AppPath, ShipsPath } from '@/types/routes';

const DefensePage = () => {
  const {
    shipsStore: { isDefenseActive },
  } = rootStore;

  const { isProdMode, isStageMode } = useGetMode();

  return (
    <DefensePageContainer $isDefenseActive={isDefenseActive}>
      {!isProdMode && !isStageMode && (
        <Link to="/ships/defense-widget">WIDGET</Link>
      )}

      <BackButton
        navigatePath={`${AppPath.ships}/${ShipsPath.modeSelection}`}
      />

      <TopContainer>
        <img src={defenseTipLogo} alt="" />
        <Text fontSize={12} fontWeight={800}>
          Defense Mode
        </Text>
      </TopContainer>

      <BottomContainer>
        <TitleContainer>
          <Text fontSize={12} fontWeight={600}>
            Time left in defense
          </Text>
          <ChargeLevel />
        </TitleContainer>
        <Button />
        <BalancesContainer>
          <BalanceField type="protected" />
          <BalanceField type="stolen" />
        </BalancesContainer>
      </BottomContainer>
    </DefensePageContainer>
  );
};

export default observer(DefensePage);
