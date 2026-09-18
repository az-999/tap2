import React, { useCallback } from 'react';

import {
  CountContainer,
  CraftItemContainer,
  ImageContainer,
  MainCraftItemWrapper,
  TextContainer,
} from '@/pages/Nfts/components/Lootbox/RewardsModal/components/RewardItem/styled';
import { MintedShipPart } from '@/pages/Nfts/types';
import Background from '@/pages/Ships/pages/ShipsCraftPage/components/CraftItem/assets/Background';
import BumpLogo from '@/pages/Ships/pages/ShipsCraftPage/components/CraftItem/assets/BumpLogo';

interface RewardItemProps {
  rewards: MintedShipPart[];
}

const RewardItem = ({ rewards }: RewardItemProps) => {
  const getData = useCallback(() => {
    const { name, image } = rewards[0];
    return {
      count: rewards.length,
      name,
      image,
    };
  }, [rewards]);

  return (
    <MainCraftItemWrapper>
      <CraftItemContainer $noCount={!getData().count}>
        <Background />

        <CountContainer $noCount={!getData().count}>
          {getData().count}
        </CountContainer>
        <ImageContainer>
          <img src={getData().image} alt="" />

          <div>
            <div id="bump-logo-container">
              <BumpLogo />
            </div>
          </div>
        </ImageContainer>

        <TextContainer>{getData().name}</TextContainer>
      </CraftItemContainer>
    </MainCraftItemWrapper>
  );
};

export default RewardItem;
