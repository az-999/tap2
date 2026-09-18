import { ReactNode } from 'react';
import { css } from 'styled-components/macro';

import UiButton from '@/components/UI/Button';

interface ModalButtonProps {
  onClick?: () => void;
  children: ReactNode;
  disabled?: boolean;
}

const ModalButton = (props: ModalButtonProps) => {
  const { onClick, children, disabled = false } = props;

  return (
    <UiButton
      onClick={onClick ? onClick : () => null}
      disabled={disabled}
      fragment={css`
        border: none;
        border-radius: 10px;
        min-height: 50px;
        background-color: #222325;
        box-shadow: none;
        padding: 0;
        ${disabled ? 'opacity: 0.5;' : 'opacity: 1;'}
      `}
    >
      {children}
    </UiButton>
  );
};

export default ModalButton;
