import React from 'react';
import { To, useNavigate } from 'react-router-dom';

import BackButtonArrow from '@/assets/static/BackButtonArrow';

import { StyledBackButton } from './styled';

interface BackButtonProps {
  navigatePath?: To;
  delta?: number;
}

const BackButton = ({ navigatePath = '', delta }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (!navigatePath && !delta) return;

    delta ? navigate(delta) : navigate(navigatePath);
  };

  return (
    <StyledBackButton onClick={handleNavigate}>
      <BackButtonArrow />
    </StyledBackButton>
  );
};

export default BackButton;
