import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import Text from '@/components/UI/Text';

import SoonIcon from '@/pages/Airdrop/assets/SoonIcon';
import {
  AirdropCardContainer,
  ImageWrapper,
  SoonContainer,
  TitleContainer,
  TopContent,
} from '@/pages/Airdrop/components/AirdropCard/styled';

interface AirdropCardProps {
  title: string;
  subtitle: string;
  img: string;
  navigatePath: string;
  icon: ReactNode;
  footer: ReactNode;
  isAvailable: boolean;
  index: number;
  isMinView?: boolean;
}

const AirdropCard = ({
  title,
  subtitle,
  img,
  navigatePath,
  icon,
  footer,
  index,
  isAvailable,
  isMinView = false,
}: AirdropCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (!isAvailable || isMinView) return;
    navigate(navigatePath);
  };

  return (
    <AirdropCardContainer
      $isAvailable={isMinView || isAvailable}
      onClick={handleCardClick}
    >
      <TopContent $isMinView={isMinView}>
        <TitleContainer $isMinView={isMinView}>
          <div>
            {icon}
            <Text fontSize={isMinView ? 14 : 18} fontWeight={700}>
              {title}
            </Text>
          </div>
          <Text fontSize={isMinView ? 9 : 12} fontWeight={400}>
            {subtitle}
          </Text>
        </TitleContainer>

        <ImageWrapper $cardIndex={index} $isAvailable={isAvailable}>
          <img src={img} alt="" />
        </ImageWrapper>
      </TopContent>

      {!isMinView && (
        <>
          {isAvailable && footer}

          {!isAvailable && (
            <SoonContainer>
              <SoonIcon />
              <Text fontSize={12} fontWeight={700}>
                Soon
              </Text>
            </SoonContainer>
          )}
        </>
      )}
    </AirdropCardContainer>
  );
};

export default AirdropCard;
