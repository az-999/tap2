import React from 'react';

import Text from '@/components/UI/Text';

import AirdropIcon from '@/pages/Airdrop/assets/AirdropIcon';
import BumpTokenIcon from '@/pages/Airdrop/assets/BumpTokenIcon';
import DayIcon from '@/pages/Airdrop/assets/DayIcon';
import UserIcon from '@/pages/Airdrop/assets/UserIcon';
import {
  HowItWorkContentContainer,
  RowCell,
} from '@/pages/Airdrop/components/InformationBlock/components/HowItWorkContent/styled';
import { SwalStyles } from '@/pages/Airdrop/components/InformationBlock/styled';

interface HowItWorkContentProps {
  size?: 'small' | 'regular';
}

const HowItWorkContent = ({ size = 'regular' }: HowItWorkContentProps) => {
  const isSmallSize = size === 'small';

  return (
    <HowItWorkContentContainer $isSmallSize={isSmallSize}>
      <SwalStyles />

      <RowCell $isSmallSize={isSmallSize}>
        <AirdropIcon />
        <Text fontSize={12} fontWeight={400}>
          <span id="strong">Complete seasonal tasks</span> and earn{' '}
          <span id="green-strong">Airdrop Points.</span> The more Airdrop Points
          you have, the higher your season rating.
        </Text>
      </RowCell>
      <RowCell $isSmallSize={isSmallSize}>
        <UserIcon />
        <Text fontSize={12} fontWeight={400}>
          Take the <span id="green-strong">leading position in the rating</span>{' '}
          and <span id="green-strong">get more BUMP Tokens.</span>
        </Text>
      </RowCell>
      <RowCell $isSmallSize={isSmallSize}>
        <BumpTokenIcon />
        <Text fontSize={12} fontWeight={400}>
          Season results and <span id="green-strong">BUMP Token accruals</span>{' '}
          are carried <span id="green-strong">out monthly.</span>
        </Text>
      </RowCell>
      <RowCell $isSmallSize={isSmallSize}>
        <DayIcon />
        <Text fontSize={12} fontWeight={400}>
          At the end of each <span id="green-strong">airdrop day</span>, AP is
          calculated, and your <span id="green-strong">ranking updates</span>,
          affecting your <span id="green-strong">BUMP Tokens</span> for the
          season.
        </Text>
      </RowCell>
    </HowItWorkContentContainer>
  );
};

export default HowItWorkContent;
