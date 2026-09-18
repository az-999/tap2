import styled, { css } from 'styled-components/macro';

import bg from '@/pages/Ships/components/Tooltips/DefenseMarkExpiredTooltip/assets/bg.png';

export const DefenseMarkExpiredTooltipContainer = styled.div<{
  $isActive: boolean;
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
  background-image: url(${bg});
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
  gap: 10px;

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

  & > div:nth-of-type(2) {
    margin-top: -2px;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;

  span:nth-of-type(1):not(#red-highlight) {
    padding: 0 16px;
    line-height: 121%;
    text-align: center;
  }

  span:nth-of-type(2) {
    opacity: 0.9;
    padding: 0 38px;
    text-align: center;
  }

  #red-highlight {
    color: #f95317;
  }
`;

export const ExpiredContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 8px;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
  }

  span {
    text-align: center;
  }
`;

export const DefenseLevelContainer = styled.div`
  display: flex;
  gap: 14px;

  & > div:last-of-type span:last-of-type {
    color: #3c6;
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 14px;
  display: flex;
  gap: 10px;

  button {
    flex: 0 1 auto;
  }

  button:first-of-type {
    box-shadow: 0 4px 19px 0 rgba(249, 83, 23, 0.36);
  }

  button:last-of-type {
    box-shadow: 0 4px 19px 0 rgba(46, 255, 115, 0.36);
  }
`;
