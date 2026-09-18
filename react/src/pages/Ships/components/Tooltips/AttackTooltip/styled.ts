import styled, { css } from 'styled-components/macro';

import firstBg from '@/pages/Ships/components/Tooltips/AttackTooltip/assets/attack-bg-1.png';
import secondBg from '@/pages/Ships/components/Tooltips/AttackTooltip/assets/attack-bg-2.png';
import thirdBg from '@/pages/Ships/components/Tooltips/AttackTooltip/assets/attack-bg-3.png';
import forthBg from '@/pages/Ships/components/Tooltips/AttackTooltip/assets/attack-bg-4.png';

export const AttackTooltipContainer = styled.div<{
  $isActive: boolean;
  $index: number;
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
  border: 1px solid #f95317;
  box-shadow: 0 0 24px 0 #000;
  color: white;
  transition: all 0.3s ease-in-out;
  z-index: 1000;
  box-sizing: border-box;
  background-image: ${({ $index }) => {
    switch ($index) {
      case 1:
        return `url(${firstBg})`;
      case 2:
        return `url(${secondBg})`;
      case 3:
        return `url(${thirdBg})`;
      case 4:
        return `url(${forthBg})`;
    }
  }};
  background-size: cover;
  background-position: center;
  height: 534px;
  max-height: 95vh;
  overflow-y: scroll;

  ${({ $isActive }) =>
    $isActive &&
    css`
      top: 50%;
      transform: translate(-50%, -50%);
      opacity: 1;
    `}
`;

export const InnerContainer = styled.div`
  min-height: max-content;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  padding: 10px;
  gap: 16px;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    border-radius: 16px;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 47.03%,
      rgba(9, 8, 11, 0.79) 66.01%
    );
    width: 100%;
    height: 100%;
    content: '';
  }
`;

export const ContentContainer = styled.div<{ $index: number }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  span:nth-of-type(1):not(#red-highlight) {
    padding: ${({ $index }) => {
      switch ($index) {
        case 1:
        case 4:
          return `0 34px`;
        case 2:
        case 3:
          return `0 10px`;
      }
    }};
    line-height: 121%;
    text-align: center;
  }

  span:nth-of-type(2) {
    opacity: 0.9;
    padding: ${({ $index }) => {
      switch ($index) {
        case 1:
        case 2:
        case 3:
          return `0 14px`;
        case 4:
          return `0 18px`;
      }
    }};
    text-align: center;
  }

  #red-highlight {
    color: #f95317;
  }
`;

export const StolenContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 6px;

  button {
    box-shadow: 0 4px 19px 0 rgba(249, 83, 23, 0.36);
  }
`;
