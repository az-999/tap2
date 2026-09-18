import React from 'react';

import Text from '@/components/UI/Text';

import {
  ImageContainer,
  LootboxSliderItemContainer,
  TitleWrapper,
} from '@/pages/Nfts/components/Lootbox/LootBoxSliderContent/styled';
import boxBg from '@/pages/Nfts/pages/LootboxCraftPage/assets/box-bg.png';

interface LootBoxSliderContentProps {
  img: string;
  title: string;
}

const LootBoxSliderContent = ({ img, title }: LootBoxSliderContentProps) => {
  return (
    <LootboxSliderItemContainer>
      <ImageContainer>
        <img src={boxBg} alt="" id="lootbox-background" />
        <img src={img} alt="" />
      </ImageContainer>

      <TitleWrapper>
        <Text fontSize={16} fontWeight={600}>
          {title}
        </Text>
      </TitleWrapper>
    </LootboxSliderItemContainer>
  );
};

export default LootBoxSliderContent;
