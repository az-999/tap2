import { observer } from 'mobx-react-lite';
import React from 'react';

import CloseButton from '@/components/CloseButton';
import ShipPart from '@/components/ErrorCraftShipModal/components/ShipPart';
import {
  ErrorCraftShipModalContainer,
  ModalBackground,
  TitleContainer,
} from '@/components/ErrorCraftShipModal/styled';
import TooltipPortal from '@/components/TooltipPortal/tooltipPortal';
import Text from '@/components/UI/Text';

import rootStore from '@/store';

const ErrorCraftShipModal = () => {
  const {
    shipsStore: {
      isCraftShipGetgemsError,
      setIsCraftShipGetgemsError,
      craftShipGetgemsErrorBody,
    },
  } = rootStore;

  if (!craftShipGetgemsErrorBody) return null;

  return (
    <TooltipPortal>
      <ModalBackground $isActive={isCraftShipGetgemsError}>
        <ErrorCraftShipModalContainer $isActive={isCraftShipGetgemsError}>
          <CloseButton
            onClick={() => setIsCraftShipGetgemsError(false)}
            color="green"
          />

          <TitleContainer>
            <Text fontSize={16} fontWeight={600}>
              Remove these parts from sale on Getgems to proceed
            </Text>
          </TitleContainer>

          {craftShipGetgemsErrorBody.map((ship) => (
            <ShipPart
              image={
                ship.previews.find((i) => i.resolution === '100x100')?.url || ''
              }
              name={ship.metadata.name}
              link={ship.url_getgems}
            />
          ))}
        </ErrorCraftShipModalContainer>
      </ModalBackground>
    </TooltipPortal>
  );
};

export default observer(ErrorCraftShipModal);
