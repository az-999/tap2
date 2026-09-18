import React from 'react';
import { useNavigate } from 'react-router-dom';

import Text from '@/components/UI/Text';

import leftImage from '@/pages/Ships/components/BuyShipBanner/assets/left-img.png';
import { ShipBannerContainer } from '@/pages/Ships/components/BuyShipBanner/styled';
import { ExtraButton } from '@/pages/Vouchers/Components/Voucher/styled';
import { AppPath, NftsPath } from '@/types/routes';

const BuyShipBanner = () => {
  const navigate = useNavigate();

  const handleShipClick = () => {
    navigate(`${AppPath.nfts}/${NftsPath.marketplace}`);
  };

  return (
    <ShipBannerContainer>
      <img src={leftImage} alt="" id="left-ship-image" />

      <div>
        <Text fontSize={16} fontWeight={700}>
          NFT Spaceship
        </Text>
      </div>

      <div>
        <ExtraButton
          $color="green"
          $isDisabled={false}
          $size="regular"
          onClick={handleShipClick}
        >
          Buy
        </ExtraButton>
      </div>
    </ShipBannerContainer>
  );
};

export default BuyShipBanner;
