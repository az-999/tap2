import styled, { css, keyframes } from 'styled-components/macro';

const rotateIcon = keyframes`
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg)
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
`;

export const VideoContainer = styled.div<{
  $isActive: boolean;
}>`
  position: fixed;
  opacity: 0;
  transform: translate(-50%, -120%);
  display: flex;
  flex-direction: column;
  gap: 15px;
  top: 20px;
  left: 50%;
  width: 75vw;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  z-index: 1000;
  padding-top: 30px;

  ${({ $isActive }) =>
    $isActive &&
    css`
      top: 50%;
      transform: translate(-50%, -50%);
      opacity: 1;
    `}

  video {
    border-radius: 12px;
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`;

export const ProcessingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;

  svg {
    animation: ${rotateIcon} 3s linear infinite;
    -webkit-animation: ${rotateIcon} 3s linear infinite;
    min-width: 34px;
    min-height: 34px;
  }

  & > div {
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: center;

    div {
      display: flex;
      flex-direction: column;
      opacity: 0.5;
      text-align: center;
    }
  }
`;
