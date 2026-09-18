import styled, { css } from 'styled-components/macro';

export const DailyPrizeBackground = styled.div<{
  $isActive: boolean;
}>`
  position: fixed;
  width: 100%;
  height: 100%;
  opacity: 0;
  visibility: hidden;
  background: rgba(26, 28, 30, 0.4);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  transition: all 0.2s ease-in-out;
  top: 0;
  left: 0;

  ${({ $isActive }) =>
    $isActive &&
    css`
      visibility: visible;
      opacity: 1;
    `}
`;

export const DailyPrizeTooltipContainer = styled.div<{
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
  background: #151718;
  box-shadow: 0 0 24px 0 #000;
  color: white;
  gap: 6px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease-in-out;
  z-index: 1000;
  border: 1px solid #3b4046;
  height: 530px;
  box-sizing: border-box;

  ${({ $isActive }) =>
    $isActive &&
    css`
      top: 50%;
      transform: translate(-50%, -50%);
      opacity: 1;
    `}

  img {
    border-radius: 16px 16px 0 0;
    width: 100%;
    height: 320px;
    object-fit: cover;
    object-position: center;
  }

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    height: 100%;

    div:not(#prize-amount):not(#prize-button-wrapper) {
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: 14px 16px 0;

      span {
        text-align: center;

        span {
          color: #3c6;
        }
      }
    }

    #prize-amount {
      display: flex;
      gap: 6px;

      svg {
        transform: scale(2.5);
        margin-top: 2px;
        width: 24px;
        height: 24px;
      }
    }

    #prize-button-wrapper {
      padding: 10px 10px 0;
      width: 100%;
    }
  }
`;
