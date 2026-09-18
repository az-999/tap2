import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import BoostBtnZipper from '@/pages/Tapper/Assets/BoostBtnZipper';
import VibrateIcon from '@/pages/Tapper/Assets/VibrateIcon';
import {
  BoostBtn,
  BoostBtnLabel,
  ButtonsContainer,
  VibrateButton,
} from '@/pages/Tapper/components/MainPageBottomButtons/styled';
import rootStore from '@/store';
import { AppPath } from '@/types/routes';

const MainPageBottomButtons = () => {
  const navigate = useNavigate();

  const { isVibrateActive, toggleVibrateActive } = rootStore;

  return (
    <ButtonsContainer>
      <BoostBtn onClick={() => navigate(AppPath.boosters)}>
        <BoostBtnLabel>
          <BoostBtnZipper />
          Buy Boost
        </BoostBtnLabel>
      </BoostBtn>

      <VibrateButton
        $isActive={isVibrateActive}
        onClick={() => toggleVibrateActive(!isVibrateActive)}
      >
        <VibrateIcon />
      </VibrateButton>
    </ButtonsContainer>
  );
};

export default observer(MainPageBottomButtons);
