import ReactOdometer from 'react-odometerjs';
import styled, { css, keyframes } from 'styled-components/macro';

const slideUp = keyframes`
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
`;

const heightUp = keyframes`
    0% {
        height: 100px;
    }
    100% {
        height: 74px;
    }
`;

export const BalanceTop = styled.div`
  display: flex;
  gap: 6px;
`;

export const TopContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 8px;
  align-items: end;
  justify-content: center;
`;

export const RewardTooltipContainer = styled.div<{
  $isActive: boolean;
  $width: number;
}>`
  position: fixed;
  transform: translateX(100%);
  top: 10px;
  right: 0;
  width: ${({ $width }) => `${$width}px`};
  height: 100px;
  margin: 0 10px;
  border-radius: 15px;
  background: #151718;
  box-shadow: 0 0 24px 0 #000;
  color: white;
  padding: 14px 20px;
  display: flex;
  align-items: start;
  z-index: 999;
  opacity: 0;
  transition:
    transform 0.5s ease-in-out,
    opacity 0.5s ease-in-out;
  animation: ${heightUp} 2100ms forwards;
  animation-delay: 1000ms;

  ${({ $isActive }) =>
    $isActive &&
    css`
      transform: translateX(0);
      opacity: 1;
    `}
`;

export const Balance = styled(ReactOdometer)`
  color: #fff;
  font-family: 'SF Pro Display', sans-serif;
  font-size: 14px;
  font-weight: 700;
  will-change: transform;
`;

export const BalanceBottom = styled.div`
  display: flex;
  gap: 6px;
  position: absolute;
  right: 20px;
  bottom: 14px;
  opacity: 1;
  transform: translateY(0);
  animation: ${slideUp} 2000ms forwards;
  animation-delay: 1000ms;

  span {
    color: #3c6;
  }

  span:nth-of-type(2) {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
