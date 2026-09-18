import React, { ReactNode } from 'react';

import {
  InnerContainer,
  StyledButton,
} from '@/pages/Ships/components/ButtonWithBorder/styled';

interface ButtonWithBorderProps {
  title: string;
  color: 'red' | 'green';
  onClick: () => void;
  icon?: ReactNode;
  withUpperCase?: boolean;
  size?: 'primary' | 'big';
  disabled?: boolean;
}

const ButtonWithBorder = ({
  icon,
  title,
  color,
  onClick,
  size = 'big',
  withUpperCase = true,
  disabled = false,
}: ButtonWithBorderProps) => {
  return (
    <StyledButton $color={color} onClick={onClick} disabled={disabled}>
      <InnerContainer
        $color={color}
        $size={size}
        $withUpperCase={withUpperCase}
      >
        {icon}
        <span>{title}</span>
      </InnerContainer>
    </StyledButton>
  );
};

export default ButtonWithBorder;
