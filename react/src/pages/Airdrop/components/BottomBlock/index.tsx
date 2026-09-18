import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import Text from '@/components/UI/Text';

import AirdropIcon from '@/pages/Airdrop/assets/AirdropIcon';
import ArrowIcon from '@/pages/Airdrop/assets/ArrowIcon';
import BumpTokenIcon from '@/pages/Airdrop/assets/BumpTokenIcon';
import InfoIcon from '@/pages/Airdrop/assets/InfoIcon';
import UserIcon from '@/pages/Airdrop/assets/UserIcon';
import leftImage from '@/pages/Airdrop/assets/left-image.png';
import rightImage from '@/pages/Airdrop/assets/right-image.png';
import AirdropCard from '@/pages/Airdrop/components/AirdropCard';
import {
  AirdropCardsList,
  AirdropInfoContainer,
  BottomBlockContainer,
  LeftImage,
  RightImage,
  TitleContainer,
} from '@/pages/Airdrop/components/BottomBlock/styled';
import InformationBlock from '@/pages/Airdrop/components/InformationBlock';
import HowItWorkContent from '@/pages/Airdrop/components/InformationBlock/components/HowItWorkContent';
import { AIRDROP_MAIN_PAGE_CONST } from '@/pages/Airdrop/const';
import { defaultSweetAlertOptions } from '@/pages/Airdrop/sweetAlertOptions';

const BottomBlock = () => {
  const handleInfoButtonClick = async () => {
    await withReactContent(Swal).fire({
      ...defaultSweetAlertOptions,
      html: (
        <InformationBlock
          content={<HowItWorkContent size="small" />}
          size="small"
        />
      ),
    });
  };

  return (
    <BottomBlockContainer>
      <RightImage src={rightImage} alt="" />
      <LeftImage src={leftImage} alt="" />

      <TitleContainer>
        <Text fontSize={20} fontWeight={600}>
          Airdrop Action
        </Text>
        <Text fontSize={12} fontWeight={400}>
          Airdrop activities are here! Take part and make the most of them!
        </Text>

        <AirdropInfoContainer>
          <AirdropIcon />
          <ArrowIcon />
          <UserIcon />
          <ArrowIcon />
          <BumpTokenIcon />

          <button onClick={handleInfoButtonClick}>
            <InfoIcon />
          </button>
        </AirdropInfoContainer>
      </TitleContainer>

      <AirdropCardsList>
        {AIRDROP_MAIN_PAGE_CONST.map((content, index) => (
          <AirdropCard
            key={`AirdropCard-${index}`}
            index={index}
            {...content}
          />
        ))}
      </AirdropCardsList>
    </BottomBlockContainer>
  );
};

export default BottomBlock;
