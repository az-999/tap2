import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { StyledButton } from '@/pages/Ships/pages/DefensePage/componets/Button/styled';
import rootStore from '@/store';
import { AppPath, NftsPath } from '@/types/routes';

const Button = () => {
  const navigate = useNavigate();

  const {
    shipsStore: { isDefenseActive },
  } = rootStore;

  const handleBuyDefenseButtonClick = () => {
    if (isDefenseActive) return;
    navigate(`${AppPath.nfts}/${NftsPath.bumpStore}`);
  };

  return (
    <StyledButton
      $isDefenseActive={isDefenseActive}
      onClick={handleBuyDefenseButtonClick}
    >
      {isDefenseActive ? 'Active Defense' : 'Buy defense'}
    </StyledButton>
  );
};

export default observer(Button);
