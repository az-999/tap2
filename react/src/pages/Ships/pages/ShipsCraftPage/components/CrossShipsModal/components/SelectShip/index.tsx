import { observer } from 'mobx-react-lite';
import React from 'react';

import CloseIcon from '@/components/CloseButton/Assets/CloseIcon';
import Text from '@/components/UI/Text';

import { NftMarketplace } from '@/pages/Nfts/types';
import NoShipLevelIcon from '@/pages/Ships/pages/ShipsCraftPage/components/CrossShipsModal/components/SelectShip/assets/NoShipLevelIcon';
import ShipLevelIcon from '@/pages/Ships/pages/ShipsCraftPage/components/CrossShipsModal/components/SelectShip/assets/ShipLevelIcon';
import selectImage from '@/pages/Ships/pages/ShipsCraftPage/components/CrossShipsModal/components/SelectShip/assets/select-ship-image.png';
import {
  Image,
  SelectShipContainer,
  SelectedContainer,
  ShipLevel,
  TitleContainer,
} from '@/pages/Ships/pages/ShipsCraftPage/components/CrossShipsModal/components/SelectShip/styled';
import rootStore from '@/store';
import Utils from '@/utils';

interface SelectShipProps {
  index: number;
}

const SelectShip = ({ index }: SelectShipProps) => {
  const {
    shipsStore: {
      firstSelectedShip,
      secondSelectedShip,
      setIsSelectShipsTooltipVisible,
      setIsCrossShipsModalActive,
      setSelectShipTooltipIndex,
      setCraftShip,
    },
  } = rootStore;

  const selectedShip: NftMarketplace | null =
    index === 0 ? firstSelectedShip : secondSelectedShip;

  const handleSelectShipClick = () => {
    setIsCrossShipsModalActive(false);
    setIsSelectShipsTooltipVisible(true);
    setSelectShipTooltipIndex(index);
  };

  const handleResetSelectedShip = () => {
    setCraftShip(index === 0 ? { fistShip: null } : { secondShip: null });
  };

  return (
    <SelectShipContainer>
      {selectedShip ? (
        <SelectedContainer>
          <button onClick={handleResetSelectedShip}>
            <CloseIcon />
          </button>
          <Image src={selectedShip.image} alt="" />

          <TitleContainer>
            <ShipLevel $isShipSelected={true}>
              <ShipLevelIcon />
              <Text fontSize={13} fontWeight={700}>
                {selectedShip.ship_level}
              </Text>
            </ShipLevel>

            <Text fontSize={10} fontWeight={400}>
              Spaceship Address
            </Text>
            <Text fontSize={10} fontWeight={500}>
              {Utils.getShortCraftShipNftAddress(selectedShip.nft_address)}
            </Text>
          </TitleContainer>
        </SelectedContainer>
      ) : (
        <SelectedContainer onClick={handleSelectShipClick}>
          <Image src={selectImage} alt="" rel="preload" />

          <TitleContainer>
            <ShipLevel $isShipSelected={false}>
              <NoShipLevelIcon />
              <Text fontSize={13} fontWeight={700}>
                1
              </Text>
            </ShipLevel>

            <Text fontSize={10} fontWeight={400}>
              Spaceship Address
            </Text>
            <Text fontSize={10} fontWeight={500}>
              Choose NFT
            </Text>
          </TitleContainer>
        </SelectedContainer>
      )}
    </SelectShipContainer>
  );
};

export default observer(SelectShip);
