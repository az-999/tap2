import React, { ReactNode } from 'react';

import { ButtonContainer } from '@/pages/Tasks/sections/pages/TasksPages/Button/styled';

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

const Button = ({ children, onClick, disabled }: ButtonProps) => {
  return (
    <ButtonContainer onClick={onClick} disabled={disabled}>
      {children}
    </ButtonContainer>
  );
};

export default Button;
