import { observer } from 'mobx-react-lite';
import React from 'react';

import CloseButton from '@/components/CloseButton';
import TooltipPortal from '@/components/TooltipPortal/tooltipPortal';
import Text from '@/components/UI/Text';

import MyNftItem from '@/pages/Nfts/components/MyNftItem';
import { NftMarketplace } from '@/pages/Nfts/types';
import {
  ModalBackground,
  PartsShipList,
  SelectPartsShipTooltipContainer,
} from '@/pages/Ships/pages/ShipsCraftPage/components/CrossShipsModal/components/SelectPartsShipTooltip/styled';
import { SHIP_PARTS } from '@/pages/Ships/pages/ShipsCraftPage/components/CrossShipsModal/components/SelectShip/const';
import { PartShipKey } from '@/pages/Ships/types';
import rootStore from '@/store';

const SelectPartsShipTooltip = () => {
  const {
    shipsStore: {
      isSelectPartsShipTooltipVisible,
      setIsSelectPartsShipTooltipVisible,
      setIsCrossShipsModalActive,
      partShipNfts,
      shipsPartsToCombineShips,
      setShipsPartsToCombineShips,
      selectPartShipTooltipIndex,
    },
  } = rootStore;

  const onCloseButtonClick = () => {
    setIsSelectPartsShipTooltipVisible(false);
    setIsCrossShipsModalActive(true);
  };

  if (!partShipNfts) return null;

  const partsShip = Object.values(partShipNfts)
    .flat()
    .filter((shipPart) =>
      shipsPartsToCombineShips
        ? !shipsPartsToCombineShips.some(
            (selectedPart) => selectedPart.nft_address === shipPart.nft_address,
          )
        : shipPart,
    );

  const handleNftClick = (nftData: NftMarketplace) => {
    if (typeof selectPartShipTooltipIndex !== 'number') return;

    setShipsPartsToCombineShips({
      shipPart: nftData,
      index: selectPartShipTooltipIndex,
      image: SHIP_PARTS[nftData.name as PartShipKey],
    });
    onCloseButtonClick();
  };

  return (
    <TooltipPortal>
      <ModalBackground $isActive={isSelectPartsShipTooltipVisible}>
        <SelectPartsShipTooltipContainer
          $isActive={isSelectPartsShipTooltipVisible}
        >
          <CloseButton onClick={onCloseButtonClick} />

          <Text fontSize={20} fontWeight={700}>
            Select a part of the ship
          </Text>

          <PartsShipList>
            {partsShip.map((ship: NftMarketplace, index) => (
              <MyNftItem
                key={
                  `crafts-parts-${ship.nft_address}` ?? `my-nfts-craft-${index}`
                }
                nftData={ship}
                onClick={handleNftClick}
              />
            ))}
          </PartsShipList>
        </SelectPartsShipTooltipContainer>
      </ModalBackground>
    </TooltipPortal>
  );
};

export default observer(SelectPartsShipTooltip);
