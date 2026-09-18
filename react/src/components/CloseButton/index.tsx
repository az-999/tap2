import React from 'react';

import CloseIcon from './Assets/CloseIcon';
import CloseIconGreen from './Assets/CloseIconGreen';
import { CloseButtonContainer } from './styled';

interface CloseButtonProps {
  onClick: () => void;
  color?: 'grey' | 'green';
  top?: number;
  right?: number;
  zIndex?: number;
}

const CloseButton = ({
  onClick,
  color = 'grey',
  top = 10,
  right = 10,
  zIndex,
}: CloseButtonProps) => {
  return (
    <CloseButtonContainer
      onClick={onClick}
      $top={top}
      $right={right}
      $zIndex={zIndex}
    >
      {color === 'grey' && <CloseIcon />}
      {color === 'green' && <CloseIconGreen />}
    </CloseButtonContainer>
  );
};

export default CloseButton;
