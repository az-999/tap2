import React, { ButtonHTMLAttributes, ReactNode } from 'react';

import { StyledButton } from '@/pages/Airdrop/components/Button/styled';

export type ButtonType = 'solid' | 'outlined';
export type ButtonSize = 'regular' | 'small' | 'tiny';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  size?: ButtonSize;
  buttonType?: ButtonType;
  withShadow?: boolean;
  isFullWidth?: boolean;
  maxWidth?: string;
  icon?: ReactNode;
}
const Button = ({
  title,
  icon,
  buttonType = 'solid',
  size = 'small',
  withShadow = true,
  isFullWidth = true,
  maxWidth,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      $buttonType={buttonType}
      $size={size}
      $withShadow={withShadow}
      $isFullWidth={isFullWidth}
      $maxWidth={maxWidth}
      {...props}
    >
      {icon}
      {title}
    </StyledButton>
  );
};

export default Button;
