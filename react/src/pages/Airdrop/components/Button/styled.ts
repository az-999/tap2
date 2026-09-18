import styled from 'styled-components/macro';

import {
  ButtonSize,
  ButtonType,
} from '@/pages/Airdrop/components/Button/index';

export const StyledButton = styled.button<{
  $buttonType: ButtonType;
  $size: ButtonSize;
  $withShadow: boolean;
  $isFullWidth: boolean;
  $maxWidth?: string;
}>`
  background: ${({ $buttonType }) =>
    $buttonType === 'solid' ? '#3c6' : 'transparent'};
  box-shadow: ${({ $withShadow }) =>
    $withShadow ? '0 4px 19px 0 rgba(51, 204, 102, 0.4)' : 'none'};
  border: 1px solid #3c6;
  height: ${({ $size }) =>
    $size === 'regular' ? 50 : $size === 'tiny' ? 34 : 40}px;
  width: ${({ $isFullWidth }) => ($isFullWidth ? '100%' : 'fit-content')};
  max-width: ${({ $maxWidth }) => $maxWidth && $maxWidth};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 12px;
  font-family: 'SF Pro Display', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  -webkit-tap-highlight-color: transparent;

  &:disabled {
    opacity: 0.4;
  }
`;
