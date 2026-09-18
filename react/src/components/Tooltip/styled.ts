import styled, { css } from 'styled-components/macro';

export const TooltipContainer = styled.div<{
  $index: number;
  $isActive: boolean;
}>`
  position: fixed;
  transform: translateX(100%);
  top: ${({ $index }) => `${10 + $index * 80}px`};
  width: calc(100% - 20px);
  height: 70px;
  margin: 0 10px;
  border-radius: 10px;
  background: #2e3032;
  box-shadow: 0 0 24px 0 #000;
  color: white;
  padding: 10px;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  z-index: 1000;
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
`;
