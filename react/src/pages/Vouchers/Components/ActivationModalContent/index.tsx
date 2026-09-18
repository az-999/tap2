import React from 'react';

import Text from '@/components/UI/Text';

import MMproIcon from '@/pages/Vouchers/Components/ActivationModalContent/assets/MMproIcon';
import firstImg from '@/pages/Vouchers/Components/ActivationModalContent/assets/firstImg.png';
import phoneImg from '@/pages/Vouchers/Components/ActivationModalContent/assets/phoneImg.png';
import secImg from '@/pages/Vouchers/Components/ActivationModalContent/assets/secImg.png';
import {
  ActivationModalContentWrapper,
  ImgWrapper,
  TitleWrapper,
} from '@/pages/Vouchers/Components/ActivationModalContent/styled';
import ModalButton from '@/pages/Vouchers/Components/ModalButton';

const ActivationModalContent = () => {
  return (
    <ActivationModalContentWrapper>
      <MMproIcon />
      <TitleWrapper>
        <Text fontSize={16} fontWeight={700}>
          NFT Voucher Activation on RWA Store
        </Text>
        <Text fontSize={12} fontWeight={600}>
          You can activate a discount voucher on the RWA Store platform when
          purchasing RWA NFTs with Pre-IPO company assets
        </Text>
      </TitleWrapper>

      <ImgWrapper>
        <img src={firstImg} alt="" id="firstImg" rel="preload" />
        <img src={secImg} alt="" id="secImg" rel="preload" />
        <img src={phoneImg} alt="" id="phoneImg" rel="preload" />
      </ImgWrapper>

      <ModalButton onClick={() => console.log('Go to RWA Store')}>
        Go to RWA Store
      </ModalButton>
    </ActivationModalContentWrapper>
  );
};

export default ActivationModalContent;
