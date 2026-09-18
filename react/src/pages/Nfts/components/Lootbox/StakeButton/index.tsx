import React, { ReactNode } from 'react';

import { StakeButtonContainer } from '@/pages/Nfts/components/Lootbox/StakeButton/styled';

interface StakeButtonProps {
  type?: 'solid' | 'outlined';
  height?: number;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
  color?: 'primary' | 'green';
}

const StakeButton = ({
  type = 'solid',
  height = 50,
  disabled,
  onClick,
  children,
  color = 'primary',
}: StakeButtonProps) => {
  return (
    <StakeButtonContainer
      $type={type}
      $height={height}
      $color={color}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </StakeButtonContainer>
  );
};

export default StakeButton;
