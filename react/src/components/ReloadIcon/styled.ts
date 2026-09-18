import styled, { keyframes } from 'styled-components/macro';

const rotateIcon = keyframes`
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg)
  }
`;

export const ReloadIconContainer = styled.div`
  position: relative;
  width: 36px;
  height: 36px;
  flex-shrink: 0;

  svg:not(#inner-loader-icon) {
    animation: ${rotateIcon} 4s linear infinite;
    -webkit-animation: ${rotateIcon} 4s linear infinite;
    width: 100%;
    height: 100%;
  }
`;

export const Inner = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
