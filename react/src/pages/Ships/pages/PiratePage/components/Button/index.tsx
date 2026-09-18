import React from 'react';

import { StyledButton } from '@/pages/Ships/pages/PiratePage/components/Button/styled';

interface ButtonProps {
  title: string;
  onClick: () => void;
  isBoldWeight?: boolean;
}

const Button = ({ title, onClick, isBoldWeight }: ButtonProps) => {
  return (
    <StyledButton onClick={onClick} $isBoldWeight={!!isBoldWeight}>
      {title}
    </StyledButton>
  );
};

export default Button;
