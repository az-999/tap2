import { observer } from 'mobx-react-lite';
import React from 'react';

import CloseButton from '@/components/CloseButton';
import TooltipPortal from '@/components/TooltipPortal/tooltipPortal';
import Text from '@/components/UI/Text';

import MyNftItem from '@/pages/Nfts/components/MyNftItem';
import { NftMarketplace } from '@/pages/Nfts/types';
import {
  ModalBackground,
  SelectShipsTooltipContainer,
  ShipsList,
} from '@/pages/Ships/pages/ShipsCraftPage/components/CrossShipsModal/components/SelectShipsTooltip/styled';
import rootStore from '@/store';

const SelectShipsTooltip = () => {
  const {
    shipsStore: {
      isSelectShipsTooltipVisible,
      setIsSelectShipsTooltipVisible,
      setIsCrossShipsModalActive,
      shipNfts,
      selectShipTooltipIndex,
      setCraftShip,
      firstSelectedShip,
      secondSelectedShip,
    },
  } = rootStore;

  const onCloseButtonClick = () => {
    setIsSelectShipsTooltipVisible(false);
    setIsCrossShipsModalActive(true);
  };

  if (!shipNfts || shipNfts.length < 2) return null;
  const existingShips: NftMarketplace[] = shipNfts.filter(
    (ship): ship is NftMarketplace => 'ship_level' in ship && !!ship.ship_level,
  );

  const handleNftClick = (nftData: NftMarketplace) => {
    if (!nftData.ship_level || selectShipTooltipIndex === null) return;

    setCraftShip(
      selectShipTooltipIndex === 0
        ? { fistShip: nftData }
        : { secondShip: nftData },
    );
    onCloseButtonClick();
  };

  return (
    <TooltipPortal>
      <ModalBackground $isActive={isSelectShipsTooltipVisible}>
        <SelectShipsTooltipContainer $isActive={isSelectShipsTooltipVisible}>
          <CloseButton onClick={onCloseButtonClick} />

          <Text fontSize={20} fontWeight={700}>
            Choose a ship
          </Text>

          <ShipsList>
            {existingShips
              .filter(
                (ship) =>
                  ship.nft_address !== firstSelectedShip?.nft_address &&
                  ship.nft_address !== secondSelectedShip?.nft_address,
              )
              ?.map((ship: NftMarketplace, index) => (
                <MyNftItem
                  key={ship.id ?? `my-nfts-${index}`}
                  nftData={ship}
                  onClick={handleNftClick}
                />
              ))}
          </ShipsList>
        </SelectShipsTooltipContainer>
      </ModalBackground>
    </TooltipPortal>
  );
};

export default observer(SelectShipsTooltip);
