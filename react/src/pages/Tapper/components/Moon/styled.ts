import styled, { keyframes } from 'styled-components/macro';

const moveX = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(100vw + 100px));
  }
`;

const moveY = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-170px);
  }
  100% {
    transform: translateY(0);
  }
`;

const rotateImg = keyframes`
  0% {
    transform: rotate(20deg)
  }
  100% {
    transform: rotate(-10deg)
  }
`;

const activeMoon = keyframes`
  0% {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -120%);
    opacity: 0;
  }
`;

export const XAxis = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transition: all 1s;
`;
export const YAxis = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transition: all 1s;
`;
export const MoonImg = styled.img`
  width: 100%;
  height: 100%;
`;

export const MoonImgWrapper = styled.div<{
  isPending: boolean;
  isLoaded: boolean;
}>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  scale: ${({ isPending }) => (isPending ? 1.5 : 1)};
  opacity: ${({ isLoaded }) => (isLoaded ? 0 : 1)};
  transition: scale 2s;
`;

export const MoonWrapper = styled.div`
  --size: 100px;
  position: fixed;
  left: 0;
  top: calc(50vh - var(--size));
  width: var(--size);
  height: var(--size);
  transform: translateX(-100%);
  z-index: 999;

  &.moon-enter {
    transform: translateX(-100%);
  }

  &.moon-enter-active {
    ${XAxis}, ${YAxis} {
      animation: 7s ease-in-out alternate forwards;
    }

    ${XAxis} {
      animation-name: ${moveX};
    }

    ${YAxis} {
      animation-name: ${moveY};
    }

    ${MoonImg} {
      animation: ${rotateImg} 7s linear forwards;
    }
  }

  &.moon-enter-done {
    display: none;
    pointer-events: none;
  }

  &.moon-exit {
    display: none;
    pointer-events: none;
  }

  &.moon-exit-active {
    display: none;
    pointer-events: none;
  }
`;

export const Prize = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: transparent;
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 2px;
  animation: ${activeMoon} 2s ease-out forwards;

  svg {
    width: 24px;
  }
`;
