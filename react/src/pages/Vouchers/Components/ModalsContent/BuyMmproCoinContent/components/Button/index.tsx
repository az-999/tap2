import React from 'react';

import Text from '@/components/UI/Text';

import TonIcon from '@/pages/Vouchers/Components/ModalsContent/BuyMmproCoinContent/assets/TonIcon';
import { ButtonContainer } from '@/pages/Vouchers/Components/ModalsContent/BuyMmproCoinContent/components/Button/styled';

interface ButtonProps {
  value: number;
  onClick: (price: number) => void;
}

const Button = ({ value, onClick }: ButtonProps) => {
  return (
    <ButtonContainer onClick={() => onClick(value)}>
      <Text fontSize={12} fontWeight={600}>
        Buy for
      </Text>
      <TonIcon />
      <Text fontSize={16} fontWeight={600}>
        {value}
      </Text>
    </ButtonContainer>
  );
};

export default Button;
