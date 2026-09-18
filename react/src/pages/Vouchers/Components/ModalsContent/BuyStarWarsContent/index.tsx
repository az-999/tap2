import { observer } from 'mobx-react-lite';
import React from 'react';

import CloseButton from '@/components/CloseButton';

import StarWarsBlock from '@/pages/Vouchers/Components/ModalsContent/BuyStarWarsContent/components/StarWarsBlock';
import { BuyStarWarsContentContainer } from '@/pages/Vouchers/Components/ModalsContent/BuyStarWarsContent/styled';
import rootStore from '@/store';

interface BuyStarWarsContentProps {
  onModalClose: () => void;
}

const BuyStarWarsContent = ({ onModalClose }: BuyStarWarsContentProps) => {
  const {
    shipsStore: { isPiracyActive, isDefenseActive },
  } = rootStore;

  return (
    <BuyStarWarsContentContainer
      $isFullHeight={!isPiracyActive && !isDefenseActive}
    >
      <CloseButton onClick={onModalClose} zIndex={2} />

      {!isPiracyActive && (
        <StarWarsBlock type="pirate" onModalClose={onModalClose} />
      )}
      {!isDefenseActive && (
        <StarWarsBlock type="defense" onModalClose={onModalClose} />
      )}
    </BuyStarWarsContentContainer>
  );
};

export default observer(BuyStarWarsContent);
