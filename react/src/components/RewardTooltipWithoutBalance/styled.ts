import styled, { css } from 'styled-components/macro';

export const RewardTooltipContainer = styled.div<{
  $isActive: boolean;
  $width: number;
}>`
  position: fixed;
  transform: translateX(100%);
  top: 100px;
  right: 0;
  width: ${({ $width }) => `${$width}px`};
  margin: 0 10px;
  border-radius: 15px;
  background: #151718;
  box-shadow: 0 0 24px 0 #000;
  color: white;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 999;
  opacity: 0;
  transition:
    transform 0.5s ease-in-out,
    opacity 0.5s ease-in-out;

  ${({ $isActive }) =>
    $isActive &&
    css`
      transform: translateX(0);
      opacity: 1;
    `}

  span {
    flex-shrink: 0;
  }
`;
