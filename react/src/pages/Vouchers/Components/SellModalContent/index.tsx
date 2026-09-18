import React from 'react';

import Text from '@/components/UI/Text';

import GetgemsIcon from '@/pages/Vouchers/Assets/GetgemsIcon';
import sellImg from '@/pages/Vouchers/Assets/sellImg.png';
import ModalButton from '@/pages/Vouchers/Components/ModalButton';
import {
  ImgWrapper,
  SellModalContentWrapper,
  TitleWrapper,
} from '@/pages/Vouchers/Components/SellModalContent/styled';

const SellModalContent = () => {
  return (
    <SellModalContentWrapper>
      <GetgemsIcon />
      <TitleWrapper>
        <Text fontSize={16} fontWeight={700}>
          Selling RWA NFTs on Getgems
        </Text>
        <Text fontSize={12} fontWeight={600}>
          You can earn on sales of your RWA NFT on the Getgems marketplace
        </Text>
      </TitleWrapper>

      <ImgWrapper>
        <img src={sellImg} alt="" rel="preload" />
      </ImgWrapper>

      <ModalButton onClick={() => console.log('Go to RWA Marketplace')}>
        Go to Marketplace
      </ModalButton>
    </SellModalContentWrapper>
  );
};

export default SellModalContent;
