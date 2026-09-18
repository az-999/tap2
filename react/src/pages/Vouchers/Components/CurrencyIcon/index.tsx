import React from 'react';

import Text from '@/components/UI/Text';

import Mmpro from '../../Assets/Mmpro';
import TonCoin from '../../Assets/TonCoin';
import { CurrencyIconContainer, IconWrapper } from './styled';

interface CurrencyIconProps {
  title: string;
  color?: 'white' | 'green';
  onClick?: () => void;
}

const CurrencyIcon = ({
  title,
  color = 'white',
  onClick,
}: CurrencyIconProps) => {
  return (
    <CurrencyIconContainer $color={color} onClick={onClick}>
      <IconWrapper>{title === 'Tokens' ? <TonCoin /> : <Mmpro />}</IconWrapper>
      <Text
        fontSize={12}
        fontWeight={600}
        color={color === 'white' ? '#33CC66' : '#FFFFFF'}
      >
        {title}
      </Text>
    </CurrencyIconContainer>
  );
};

export default CurrencyIcon;
