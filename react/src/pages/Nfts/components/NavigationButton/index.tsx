import React from 'react';
import { css } from 'styled-components/macro';

import UiButton from '@/components/UI/Button';
import Text from '@/components/UI/Text';

interface ButtonProps {
  onClick: () => void;
  isActive: boolean;
  children: string;
  disabled?: boolean;
  size?: 'big' | 'medium';
  color?: 'green' | 'grey';
}

const NavigationButton = (props: ButtonProps) => {
  const {
    onClick,
    isActive,
    children,
    disabled = false,
    size = 'big',
    color = 'green',
  } = props;

  return (
    <UiButton
      onClick={onClick}
      disabled={disabled}
      fragment={css`
        width: fit-content;
        padding: 12px 16px;
        ${!isActive
          ? 'background: #222325; border: none; box-shadow: none; opacity: 0.5;'
          : ''}
        ${size === 'medium'
          ? 'border-radius: 10px; padding: 11px 16px; min-height: 40px;'
          : ''} 
      ${color === 'grey' ? 'background-color: #222325; box-shadow: none;' : ''}
      `}
    >
      <Text fontSize={14} fontWeight={600}>
        {children}
      </Text>
    </UiButton>
  );
};

export default NavigationButton;
