import styled, { keyframes } from 'styled-components/macro';

import Mmpro from '@/assets/static/mmpro';
import TapImg from '@/assets/static/farm-button/TapImage';
import RadialProgress from '../RadialProgress';
import OutsideCircle from "../../../../assets/static/farm-button/OutsideCircle";

const rotateRight = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const rotateLeft = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
`;

const floating = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-200px);
    opacity: 0;
  }
`;

export const Wrapper = styled.div`
  position: relative;
  align-self: center;
  margin: auto 0;
  height: 280px;
  max-height: 100%;
  min-height: 150px;
  min-width: 150px;
  aspect-ratio: 1 / 1;
`;

export const Circle = styled.div<{
	isInProgress?: boolean;
	tapShadowCount?: number;
}>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  width: 100%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  z-index: 10;

  &:before {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    border: 1px solid #31363d;
    border-radius: 50%;
    background: ${({ isInProgress }) => !isInProgress ? 'rgba(19,22,26,0.5)' : 'var(--progressColor)'};
    opacity: ${({ isInProgress }) => !isInProgress ? 1 : 0.3};
    transition: all .5s ease-out;
    width: calc(100% - 7%);
    height: calc(100% - 7%);
    content: '';
  }

  &:after {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: ${({ isInProgress }) => (!isInProgress ? 0 : 1)};
    z-index: 2;
    transition: opacity 1s ease-out,
    box-shadow ease-out 0.5s;
    box-shadow: ${({ tapShadowCount }) =>
            `0 0 ${tapShadowCount}px 0 var(--progressColor)`};
    border: 2px solid var(--progressColor);
    border-radius: 50%;
    background: transparent;
    width: calc(100% - 7%);
    height: calc(100% - 7%);
    content: '';
  }
`;

export const OutsideCircleImage = styled(OutsideCircle)`
  position: absolute;
  height: 100%;
  max-width: 100%;
  fill: var(--progressColor);
  transition: all 0.3s;
  animation: ${rotateRight} 300s linear infinite;
`;

export const DottedContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 93%;
  height: 93%;
  z-index: 5;

  svg {
    width: 100%;
    height: 100%;
    fill: var(--progressColor);
    transition: all 0.3s;
    animation: ${rotateLeft} 300s linear infinite;
  }
`;

export const Progress = styled(RadialProgress)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) rotate(-90deg);
  z-index: 3;
  transition: all 0.5s;
`;

export const ScaleWrap = styled.div`
  position: relative;
  z-index: 100;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div<{
	isInProgress?: boolean;
}>`
  position: relative;
  width: calc(100% - ${({ isInProgress }) => (isInProgress ? '14%' : '18%')});
  height: calc(100% - ${({ isInProgress }) => (isInProgress ? '14%' : '18%')});
  border-radius: 50%;
  background: #262e3b;
  border: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 10;
  transition: all 0.3s;
`;

export const ContentWrapper = styled.div<{
	isInProgress?: boolean;
}>`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s;
`;

export const Logo = styled(Mmpro)`
  height: 94px;
  flex-shrink: 0;
  transition: all 0.3s;

  @media screen and (max-height: 570px) {
    height: 50px;
  }
`;

export const StartText = styled.div`
  font-size: 15px;
  line-height: 18px;
  white-space: nowrap;

  @media screen and (max-height: 570px) {
    font-size: 12px;
  }
`;

export const FloatingItem = styled.div<{
	left: number;
	top: number;
}>`
  --size: 40px;
  position: absolute;
  left: ${({ left }) => `${left}px` || 0};
  top: ${({ top }) => `${top}px` || 0};
  width: var(--size);
  height: var(--size);
  margin-left: calc((-1 * var(--size) / 2));
  margin-top: calc((-1 * var(--size) / 2));
  border-radius: 50%;
  color: #000;
  z-index: 10;
  animation: ${floating} 1s ease-out forwards;
  pointer-events: none;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const BoostNumber = styled.div`
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  padding-left: 2px;
  color: #fff;
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
`;

export const Await = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &.fade-enter {
    opacity: 0;
  }

  &.fade-enter-active {
    opacity: 1;
    transition: all .2s;
  }

  &.fade-exit {
    opacity: 1;
  }

  &.fade-exit-active {
    opacity: 0;
    transition: all .2s;
  }
`;

export const Spaceship = styled.img`
  max-width: 180px;
  width: 100%;
`;

export const Tap = styled(TapImg)<{
	isInProgress?: boolean;
}>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;

  @media screen and (max-height: 570px) {
    height: 25vh;
  }
`;

export const InProgress = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &.fade-enter {
    ${Spaceship} {
      opacity: 0;
      transform: scale(0.8);
    }

    ${Tap} {
      opacity: 0;
    }
  }

  &.fade-enter-active, &.fade-exit {
    ${Spaceship} {
      opacity: 1;
      transform: scale(1.1);
      transition: all .8s ease;
    }

    ${Tap} {
      opacity: 1;
      transition: all .8s ease;
    }
  }

  &.fade-enter-done {
    ${Spaceship} {
      transform: scale(1);
      transition: all .8s ease;
    }

    ${Tap} {
      opacity: 1;
    }
  }

  &.fade-exit-active {
    ${Spaceship} {
      opacity: 0;
      transform: scale(0.8);
      transition: all .8s ease-out;
    }

    ${Tap} {
      opacity: 0;
      transition: all .8s ease;
    }
  }
`;
