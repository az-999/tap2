import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Text from '@/components/UI/Text';

import starWarsImage from '@/pages/Nfts/assets/starWarsImg.png';
import BuyShipBanner from '@/pages/Ships/components/BuyShipBanner';
import ShipIcon from '@/pages/Ships/pages/BannersPage/assets/ShipIcon';
import shipPartsImg from '@/pages/Ships/pages/BannersPage/assets/shipPartsImg.png';
import {
  BannersList,
  BannersPageContainer,
} from '@/pages/Ships/pages/BannersPage/styled';
import ShipBanner from '@/pages/Vouchers/Components/Voucher/components/ShipBanner';
import { AppPath, ShipsPath } from '@/types/routes';

const BannersPage = () => {
  const navigate = useNavigate();

  const onModeSelectPageClick = () => {
    navigate(`${AppPath.ships}/${ShipsPath.modeSelection}`);
  };

  const onShipCraftPageClick = () => {
    navigate(`${AppPath.ships}/${ShipsPath.shipCraft}`);
  };

  return (
    <BannersPageContainer>
      <ShipIcon />
      <Text fontSize={22} fontWeight={700}>
        Ship <span id="green-highlight">Control</span> Room
      </Text>

      <BannersList>
        <ShipBanner
          image={starWarsImage}
          buttonTitle="Play"
          isDisabled={false}
          onButtonClick={onModeSelectPageClick}
        />
        <BuyShipBanner />
        <ShipBanner
          image={shipPartsImg}
          buttonTitle="Craft"
          title="Craft Spaceship"
          subtitleFirst="Collect NFT Spaceships"
          subtitleSec="from their NFT parts"
          isDisabled={false}
          onButtonClick={onShipCraftPageClick}
        />
      </BannersList>
    </BannersPageContainer>
  );
};

export default observer(BannersPage);
