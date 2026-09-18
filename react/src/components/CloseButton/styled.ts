import styled, { css } from 'styled-components/macro';

export const CloseButtonContainer = styled.button<{
  $top: number;
  $right: number;
  $zIndex?: number;
}>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background-color: #222325;
  border: none;
  top: ${({ $top }) => `${$top}px`};
  right: ${({ $right }) => `${$right}px`};
  -webkit-tap-highlight-color: transparent;

  &:focus {
    outline: none;
  }

  &:hover {
    cursor: pointer;
  }

  ${({ $zIndex }) =>
    $zIndex &&
    css`
      z-index: ${$zIndex};
    `}
`;
