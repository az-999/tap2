import styled, { css, keyframes } from 'styled-components/macro';

export const NewVersionTooltipContainer = styled.div<{
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
  flex-direction: column;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  z-index: 1000;

  ${({ $isActive }) =>
    $isActive &&
    css`
      transform: translateY(0);
      opacity: 1;
    `}
`;

export const LogContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const LogList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const FooterText = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
