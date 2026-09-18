import React from 'react';

import Text from '@/components/UI/Text';

import coinLeft from '@/pages/Announcement/assets/coins-1.png';
import coinRight from '@/pages/Announcement/assets/coins-2.png';
import topImageSec from '@/pages/Announcement/assets/ship-parts-bg-2.png';
import topImage from '@/pages/Announcement/assets/ship-parts-bg.png';
import {
  BottomContainer,
  ContentContainer,
  ContentWrapperContainer,
  Image,
  Slide,
} from '@/pages/Announcement/components/EarnWithShip/styled';

interface EarnWithShipProps {
  index: 0 | 1;
}

const EarnWithShip = ({ index }: EarnWithShipProps) => {
  return (
    <Slide>
      <Image src={index ? topImageSec : topImage} alt="" />
      <ContentContainer>
        <img src={coinLeft} alt="" id="coins-images-left" />
        <img src={coinRight} alt="" id="coins-images-right" />

        <div>
          <ContentWrapperContainer>
            <Text fontSize={24} fontWeight={700}>
              {index ? 'Earn with Your NFT ' : 'Earn Faster with NFT'}
            </Text>
            <Text fontSize={24} fontWeight={700}>
              <span id="extra-highlights">
                {index ? 'Spaceship!' : 'Ship Parts!'}
              </span>
            </Text>
          </ContentWrapperContainer>

          <ContentWrapperContainer id="content-wrapper-container">
            <Text fontSize={16} fontWeight={700}>
              {index
                ? 'Build your first ship and sell it on the'
                : 'Exchange points for NFT ship parts'}
            </Text>

            {index ? (
              <Text fontSize={16} fontWeight={700}>
                <span id="extra-highlights">marketplace</span> for{' '}
                <span id="ton-field">TON!</span>
              </Text>
            ) : (
              <Text fontSize={16} fontWeight={700}>
                and <span id="extra-highlights">sell them </span>for{' '}
                <span id="ton-field">TON!</span>
              </Text>
            )}
          </ContentWrapperContainer>
        </div>

        <BottomContainer>
          {index ? (
            <Text fontSize={12} fontWeight={600}>
              On average, players collect enough points to buy a ship in
            </Text>
          ) : (
            <Text fontSize={12} fontWeight={600}>
              Players usually{' '}
              <span id="green-highlights">earn enough points</span> to buy a
              ship part in
            </Text>
          )}

          <button>{index ? '30 days' : '7 days'}</button>
        </BottomContainer>
      </ContentContainer>
    </Slide>
  );
};

export default EarnWithShip;
