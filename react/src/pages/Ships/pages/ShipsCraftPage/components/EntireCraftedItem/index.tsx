import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';

import { NftMarketplace } from '@/pages/Nfts/types';
import Background from '@/pages/Ships/pages/ShipsCraftPage/components/EntireCraftedItem/assets/Background';
import BumpLogo from '@/pages/Ships/pages/ShipsCraftPage/components/EntireCraftedItem/assets/BumpLogo';
import CountBackground from '@/pages/Ships/pages/ShipsCraftPage/components/EntireCraftedItem/assets/CountBackground';
import Info from '@/pages/Ships/pages/ShipsCraftPage/components/EntireCraftedItem/assets/Info';
import {
  ButtonInfo,
  CountContainer,
  EntireCraftedItemContainer,
  ImageContainer,
  TextContainer,
  TooltipRow,
} from '@/pages/Ships/pages/ShipsCraftPage/components/EntireCraftedItem/styled';

interface EntireCraftedItemProps {
  itemData:
    | {
        name: string;
        image: string;
      }
    | NftMarketplace;
  isDisabled: boolean;
  shipLevel?: number;
}

const EntireCraftedItem = ({
  itemData,
  isDisabled,
  shipLevel,
}: EntireCraftedItemProps) => {
  const [isShowInfoTooltip, setIsShowInfoTooltip] = useState(false);

  const showWinTooltip = () => {
    setIsShowInfoTooltip(true);

    let time = 3;
    const timer = setInterval(() => {
      time--;
      if (time === 0) {
        setIsShowInfoTooltip(false);

        clearInterval(timer);
      }
    }, 1000);
  };

  const { image, name } = itemData;
  const toolpipId = `lootbox-craft-info-tooltip-${'nft_address' in itemData ? itemData.nft_address : 'initial'}`;

  const level = shipLevel
    ? shipLevel
    : 'ship_level' in itemData
      ? itemData.ship_level
      : '1';

  return (
    <>
      <EntireCraftedItemContainer $disabled={isDisabled}>
        <Background />
        <ButtonInfo onClick={showWinTooltip} data-tooltip-id={toolpipId}>
          <Info />
        </ButtonInfo>

        <CountContainer>
          <CountBackground />
          <span>{level}</span>
        </CountContainer>

        <ImageContainer>
          <img src={image} alt="" />

          <div>
            <BumpLogo />
          </div>
        </ImageContainer>

        <TextContainer>{`Voyager-MMP-R${level}0`}</TextContainer>
      </EntireCraftedItemContainer>
      <Tooltip
        id={toolpipId}
        place="bottom"
        isOpen={isShowInfoTooltip}
        style={{ width: '70%' }}
      >
        <TooltipRow>
          Collect 6 ship parts, combine them, and get your NFT spaceship. To
          upgrade your NFT spaceship to a new level, simply combine 6 more
          parts.
        </TooltipRow>
      </Tooltip>
    </>
  );
};

export default observer(EntireCraftedItem);
