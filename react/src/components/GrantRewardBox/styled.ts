import styled, { css } from 'styled-components/macro';

export const GrantRewardBoxContainer = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  transform: translateX(-110%);
  width: 200px;
  z-index: 1000;

  ${({ $isVisible }) =>
    $isVisible &&
    css`
      transform: translateY(0);
      opacity: 1;
    `}

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
  }
`;
