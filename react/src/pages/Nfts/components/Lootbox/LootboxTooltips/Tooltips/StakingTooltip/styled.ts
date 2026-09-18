import styled, { css, keyframes } from 'styled-components/macro';

const rotateIcon = keyframes`
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg)
  }
`;

export const StakingTooltipContainer = styled.div<{
  $isActive: boolean;
}>`
  position: fixed;
  opacity: 0;
  transform: translate(-50%, -120%);
  display: flex;
  top: 20px;
  left: 50%;
  width: calc(100% - 10px);
  max-width: 410px;
  color: white;
  transition: all 0.3s ease-in-out;
  z-index: 1000;
  box-sizing: border-box;
  max-height: 95vh;
  overflow-y: scroll;
  padding: 14vw 10vw;

  ${({ $isActive }) =>
    $isActive &&
    css`
      top: 50%;
      transform: translate(-50%, -50%);
      opacity: 1;
    `}

  #staking-bg-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: auto;
    object-fit: contain;
  }

  @media screen and (max-width: 360px) {
    width: 100%;
  }

  @media screen and (max-width: 330px) {
    padding: 12vw 10vw;
  }
`;

export const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px 16px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  z-index: 1;

  span {
    color: #fff;
    text-align: center;
  }
`;

export const TextContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
`;

export const PreloaderContainer = styled.div`
  width: 30vw;
  height: 30vw;
  position: relative;
  flex-shrink: 0;

  #staking-preloader-tooltip {
    animation: ${() => css`
      ${rotateIcon} 13s linear infinite
    `};
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    aspect-ratio: 1;
    width: 60%;
    height: auto;
    object-fit: contain;
  }

  @media screen and (max-width: 400px) {
    width: 26vw;
    height: 26vw;
  }

  @media screen and (max-width: 360px) {
    width: 20vw;
    height: 20vw;
  }
`;
