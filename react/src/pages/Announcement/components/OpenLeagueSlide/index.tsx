import React from 'react';

import Text from '@/components/UI/Text';

import BumpIcon from '@/pages/Announcement/assets/BumpIcon';
import TonIcon from '@/pages/Announcement/assets/TonIcon';
import leagueSlide from '@/pages/Announcement/assets/leagueSlide.png';
import {
  BottomBlock,
  Slide,
  TitleContainer,
  TopBlock,
} from '@/pages/Announcement/components/OpenLeagueSlide/styled';

const OpenLeagueSlide = () => {
  return (
    <Slide>
      <TopBlock>
        <TitleContainer>
          <Text fontSize={32} fontWeight={700}>
            The{' '}
            <span>
              <TonIcon />
            </span>{' '}
            Open League!
          </Text>

          <BumpIcon />
        </TitleContainer>
        <img src={leagueSlide} alt="" />
      </TopBlock>

      <BottomBlock>
        <Text fontSize={25} fontWeight={700}>
          BUMP is participating in The Open League!
        </Text>
        <Text fontSize={12} fontWeight={500}>
          Join the league activities and earn valuable rewards
        </Text>
      </BottomBlock>
    </Slide>
  );
};

export default OpenLeagueSlide;
