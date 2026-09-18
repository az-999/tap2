import React from 'react';

import { StyledButton } from '@/pages/Ships/pages/ShipsCraftPage/components/CraftItem/components/Button/styled';

interface ButtonProps {
  onClick: () => void;
}

const Button = ({ onClick }: ButtonProps) => (
  <StyledButton onClick={onClick}>Buy</StyledButton>
);

export default Button;
