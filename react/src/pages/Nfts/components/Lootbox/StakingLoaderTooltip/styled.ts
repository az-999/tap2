import styled, { css, keyframes } from 'styled-components/macro';

const rotateIcon = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0deg)
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg)
  }
`;

export const StyledBackground = styled.div<{
  $isActive: boolean;
}>`
  position: fixed;
  width: 100%;
  height: 100%;
  opacity: 0;
  visibility: hidden;
  background: rgba(0, 0, 0, 0.95);
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

  #mmpro-icon {
    margin-top: 6px;
    width: 18px;
    height: 36px;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 10vw;
`;

export const PreloaderContainer = styled.div`
  padding: 8vw;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  #preloader-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    animation: ${rotateIcon} 12s linear infinite;
    width: calc(100% - 16vw);
    height: auto;
    object-fit: contain;
  }

  img {
    width: 65%;
    height: auto;
    object-fit: contain;
  }
`;

export const ProcessingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  margin-top: 32px;

  span {
    text-align: center;
  }

  span:last-child {
    opacity: 0.8;
  }
`;
