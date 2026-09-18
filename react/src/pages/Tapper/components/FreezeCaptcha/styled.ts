import styled from 'styled-components/macro';
import { DirectionType } from "./index";

export const Container = styled.div<{ size: number }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 200;

  &:before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    width: ${(props) => `${props.size}px`};
    height: 100%;
    border-radius: 100px;
    background: rgba(217, 217, 217, 0.1);
  }

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: ${(props) => `${props.size}px`};
    width: 100%;
    border-radius: 100px;
    background: rgba(217, 217, 217, 0.1);
  }

  &.fade-enter {
    opacity: 0;
  }

  &.fade-enter-active {
    opacity: 1;
    transition: all 0.5s;
  }

  &.fade-exit {
    opacity: 1;
  }

  &.fade-exit-active {
    opacity: 0;
    transition: all 0.5s;
  }
`;

export const PlusContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5rem;
`;

export const Circle = styled.div<{ x: number; y: number, size: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
  background-color: rgba(51, 204, 102, 1);
  border-radius: 50%;
  position: absolute;
  transform: translate(${(props) => props.x}px, ${(props) => props.y}px);
  z-index: 10;

  svg {
    width: 40%;
    height: auto;
  }
`;

export const EndCircle = styled.div<{ direction: DirectionType, size: number }>`
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
  left: ${(props) => {
    switch (props.direction) {
      case "left":
        return '0';
      case "right":
        return '100%';
      case "up":
        return '50%';
      case "down":
        return '50%';
      default:
        return '0';
    }
  }};
  top: ${(props) => {
    switch (props.direction) {
      case "left":
        return '50%';
      case "right":
        return '50%';
      case "up":
        return '0';
      case "down":
        return '100%';
      default:
        return '0';
    }
  }};
  transform: ${(props) => {
    switch (props.direction) {
      case "left":
        return 'translate(0, -50%)';
      case "right":
        return 'translate(-100%, -50%)';
      case "up":
        return 'translate(-50%, 0)';
      case "down":
        return 'translate(-50%, -100%)';
      default:
        return '0';
    }
  }};
  border-radius: 50%;
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.64);
  background: #72b87e;
  z-index: 5;
`;

export const Direction = styled.div<{ size: number, direction: DirectionType }>`
  position: absolute;
  left: ${(props) => {
    switch (props.direction) {
      case "left":
        return '0';
      case "right":
        return '100%';
      case "up":
        return '50%';
      case "down":
        return '50%';
      default:
        return '0';
    }
  }};
  top: ${(props) => {
    switch (props.direction) {
      case "left":
        return '50%';
      case "right":
        return '50%';
      case "up":
        return '0';
      case "down":
        return '100%';
      default:
        return '0';
    }
  }};
  transform: ${(props) => {
    switch (props.direction) {
      case "left":
        return 'translate(0, -50%)';
      case "right":
        return 'translate(-100%, -50%)';
      case "up":
        return 'translate(-50%, 0)';
      case "down":
        return 'translate(-50%, -100%)';
      default:
        return '0';
    }
  }};
  width: ${(props) => {
    switch (props.direction) {
      case "left":
        return `calc(50% + ${props.size / 2}px)`;
      case "right":
        return `calc(50% + ${props.size / 2}px)`;
      case "up":
        return `${props.size}px`;
      case "down":
        return `${props.size}px`;
      default:
        return '0';
    }
  }};
  height: ${(props) => {
    switch (props.direction) {
      case "left":
        return `${props.size}px`;
      case "right":
        return `${props.size}px`;
      case "up":
        return `calc(50% + ${props.size / 2}px)`;
      case "down":
        return `calc(50% + ${props.size / 2}px)`;
      default:
        return '0';
    }
  }};
  background: rgba(13, 150, 58, 1);
  border-radius: 100px;
`;