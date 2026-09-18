import styled from 'styled-components/macro';

export const ProgressWrap = styled.div`
  position: absolute;
  width: calc(95.5%);
  height: calc(95.5%);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;

  &.fade-enter {
    opacity: 0;
  }

  &.fade-enter-active {
    opacity: 1;
    transition: all 1s;
  }

  &.fade-exit {
    opacity: 1;
  }

  &.fade-exit-active {
    opacity: 0;
    transition: all 1s;
  }
`;

export const Circle = styled.circle`
  transition: all .3s linear;
  scale: 0.98;
  stroke: var(--progressColor);
`;

export const Svg = styled.svg`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 2;
  transform: rotate(90deg) scale(-1, 1);
`;
