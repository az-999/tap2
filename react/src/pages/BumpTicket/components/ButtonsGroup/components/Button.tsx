import React, { ReactNode } from 'react';

import { PageType } from '@/pages/BumpTicket';
import { ButtonContainer } from '@/pages/BumpTicket/components/ButtonsGroup/styled';

interface ButtonProps {
  children: ReactNode;
  type: PageType | 'invite' | 'friend';
  onClick: () => void;
  disabled?: boolean;
}

const Button = ({ children, onClick, disabled = false, type }: ButtonProps) => {
  return (
    <ButtonContainer
      onClick={onClick}
      disabled={type === 'taps' || type === 'soldOut'}
      $type={type}
    >
      {children}
    </ButtonContainer>
  );
};

export default Button;
