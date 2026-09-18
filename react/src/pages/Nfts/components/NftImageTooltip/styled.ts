import styled, { css } from 'styled-components/macro';

export const NftImageBackground = styled.div<{
  $isActive: boolean;
}>`
  position: fixed;
  width: 100%;
  height: 100%;
  opacity: 0;
  visibility: hidden;
  background: rgba(26, 28, 30, 0.4);
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

export const NftImageContainer = styled.div<{
  $isActive: boolean;
}>`
  position: fixed;
  opacity: 0;
  transform: translate(-50%, -120%);
  display: flex;
  top: 20px;
  left: 50%;
  width: calc(100% - 40px);
  max-width: 320px;
  border-radius: 16px;
  background: #151718;
  box-shadow: 0 0 24px 0 #000;
  color: white;
  margin: 0 10px;
  gap: 6px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  z-index: 1000;
  border: 1px solid #3b4046;
  height: 440px;

  ${({ $isActive }) =>
    $isActive &&
    css`
      top: 50%;
      transform: translate(-50%, -50%);
      opacity: 1;
    `}

  img {
    border-radius: 6px;
    width: 90%;
    height: auto;
    object-fit: contain;
  }
`;
