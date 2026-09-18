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

export const ErrorCraftShipModalContainer = styled.div<{
  $isActive: boolean;
}>`
  position: fixed;
  opacity: 0;
  display: flex;
  top: 50%;
  transform: translateY(-110%);
  width: calc(100% - 20px);
  border-radius: 10px;
  background: #2e3032;
  box-shadow: 0 0 24px 0 #000;
  color: white;
  margin: 0 10px;
  gap: 16px;
  flex-direction: column;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  padding: 18px 20px;
  z-index: 1000;

  ${({ $isActive }) =>
    $isActive &&
    css`
      transform: translateY(-50%);
      opacity: 1;
    `}
`;

export const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  padding-right: 40px;
`;
