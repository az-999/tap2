import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import React from 'react';

import Text from '@/components/UI/Text';

import topImage from '@/pages/Airdrop/assets/main-page-logo.png';
import BalanceBumpToken from '@/pages/Airdrop/components/BalanceBumpToken';
import Button from '@/pages/Airdrop/components/Button';
import RatingTimer from '@/pages/Airdrop/components/RatingTimer';
import {
  AboutContainer,
  ContentContainer,
  TopBlockContainer,
  TopLogo,
} from '@/pages/Airdrop/components/TopBlock/styled';

const BUMP_SPACE_LINK = 'https://bumpspace.io';

const TopBlock = () => {
  const WebApp = useWebApp();

  return (
    <TopBlockContainer>
      <TopLogo src={topImage} alt="" />

      <ContentContainer>
        <Text fontSize={20} fontWeight={600}>
          Bump Token
        </Text>
        <BalanceBumpToken />
        <RatingTimer />
        <AboutContainer>
          <Text fontSize={12} fontWeight={400}>
            Learn more about the tokenomics of BUMP and its key features!
          </Text>
          <Button
            onClick={() =>
              WebApp.initData
                ? WebApp.openLink(BUMP_SPACE_LINK)
                : window.open(BUMP_SPACE_LINK, '_blank')
            }
            title="About Bump Token"
          />
        </AboutContainer>
      </ContentContainer>
    </TopBlockContainer>
  );
};

export default TopBlock;
