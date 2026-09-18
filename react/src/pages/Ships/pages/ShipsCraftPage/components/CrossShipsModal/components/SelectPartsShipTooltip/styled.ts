import styled, { css } from 'styled-components/macro';

export const ModalBackground = styled.div<{
  $isActive: boolean;
}>`
  position: fixed;
  width: 100%;
  height: 100%;
  opacity: 0;
  visibility: hidden;
  background: #000000b3;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  transition: all 0.2s ease-in-out;
  top: 0;
  left: 0;
  z-index: 1000;

  ${({ $isActive }) =>
    $isActive &&
    css`
      visibility: visible;
      opacity: 1;
    `}
`;

export const SelectPartsShipTooltipContainer = styled.div<{
  $isActive: boolean;
}>`
  position: fixed;
  opacity: 0;
  display: flex;
  flex-direction: column;
  top: 50%;
  transform: translateY(-110%);
  width: calc(100% - 20px);
  max-height: 95vh;
  border-radius: 10px;
  background: #2a2e30;
  box-shadow: 0 0 24px 0 #000;
  color: white;
  margin: 0 10px;
  gap: 16px;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  z-index: 1000;
  padding: 28px 12px 12px;
  align-items: center;

  ${({ $isActive }) =>
    $isActive &&
    css`
      transform: translateY(-50%);
      opacity: 1;
    `}
`;

export const PartsShipList = styled.div`
  justify-content: start;
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 15px 20px;
  align-items: start;
  overflow-y: auto;

  @media screen and (max-width: 340px) {
    justify-content: center;
  }

  @media screen and (max-width: 380px) {
    gap: 10px 12px;
  }
`;
