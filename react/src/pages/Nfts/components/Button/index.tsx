import { observer } from 'mobx-react-lite';
import React, { ReactNode, useCallback } from 'react';

import { ButtonContainer } from '@/pages/Nfts/components/Button/styled';
import rootStore from '@/store';

type ButtonColor = 'grey' | 'green' | 'blue';
interface ButtonProps {
  children: ReactNode;
  color?: ButtonColor;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({
  children,
  color = 'green',
  onClick,
  disabled = false,
}: ButtonProps) => {
  const {
    userStore: { isWalletInvalid },
  } = rootStore;

  const getColor = useCallback(
    (color: ButtonColor) => {
      switch (color) {
        case 'green':
          return '#33CC66';
        case 'grey':
          return '#3B4046';
        case 'blue':
          return '#45AEF5';
      }
    },
    [color],
  );

  return (
    <ButtonContainer
      $color={getColor(color)}
      $isDisabled={disabled || isWalletInvalid}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </ButtonContainer>
  );
};

export default observer(Button);
