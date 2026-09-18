import React from 'react';

import Text from '@/components/UI/Text';

import StakeIcon from '@/pages/Announcement/assets/StakeIcon';
import bg from '@/pages/Announcement/assets/staking.png';
import { BOTTOM_DATA } from '@/pages/Announcement/components/Staking/const';
import {
  BottomContainer,
  ContentContainer,
  ContentWrapperContainer,
  NavItem,
  Slide,
  StakeButton,
  StyledImage,
} from '@/pages/Announcement/components/Staking/styled';
import { AppPath, LootboxPath, NftsPath } from '@/types/routes';

const Staking = () => {
  return (
    <Slide>
      <StyledImage src={bg} alt="" />
      <ContentContainer>
        <div>
          <ContentWrapperContainer>
            <Text fontSize={24} fontWeight={700}>
              <span id="extra-highlights">Staking</span> Has Begun!
            </Text>
          </ContentWrapperContainer>
          <ContentWrapperContainer>
            <Text fontSize={12} fontWeight={500}>
              <span id="blue-highlights">Stake MMPro Tokens</span> and earn
              monthly rewards in tokens and{' '}
              <span id="blue-highlights">NFT ship parts</span> for 1 to 6 months
            </Text>
          </ContentWrapperContainer>

          <StakeButton
            to={`${AppPath.nfts}/${NftsPath.lootbox}/${LootboxPath.craft}`}
          >
            <StakeIcon />
            <span>Start Staking</span>
          </StakeButton>
        </div>

        <BottomContainer>
          {BOTTOM_DATA.map(({ id, title, icon, isActive }) => (
            <NavItem key={id} $isActive={isActive}>
              <span>{icon}</span>
              {title}
            </NavItem>
          ))}
        </BottomContainer>
      </ContentContainer>
    </Slide>
  );
};

export default Staking;
