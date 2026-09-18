import styled, { css } from 'styled-components/macro';

export const TooltipContainer = styled.div<{
  $isActive: boolean;
}>`
  position: fixed;
  opacity: 0;
  transform: translateY(-110%);
  display: flex;
  top: 10px;
  width: calc(100% - 20px);
  border-radius: 10px;
  background: #2e3032;
  box-shadow: 0 0 24px 0 #000;
  color: white;
  padding: 18px 20px;
  margin: 0 10px;
  gap: 10px;
  justify-content: space-between;
  transition: all 0.2s ease-in-out;
  z-index: 1000;

  ${({ $isActive }) =>
    $isActive &&
    css`
      transform: translateY(0);
      opacity: 1;
    `}

  & > div {
    display: flex;
    gap: 14px;
    padding-right: 26px;
  }
`;
