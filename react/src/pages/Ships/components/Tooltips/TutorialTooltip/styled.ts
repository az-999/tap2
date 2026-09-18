import styled, { css } from 'styled-components/macro';

import bg from '@/pages/Ships/components/Tooltips/TutorialTooltip/assets/bg.png';

export const TutorialTooltipContainer = styled.div<{
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
  border: 1px solid #2eff73;
  box-shadow: 0 0 24px 0 #000;
  color: white;
  transition: all 0.3s ease-in-out;
  z-index: 1000;
  box-sizing: border-box;
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
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

export const InnerWrapper = styled.div`
  height: max-content;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  gap: 18px;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    border-radius: 16px;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 9%,
      rgba(2, 2, 2, 0.49) 17.5%,
      rgba(4, 3, 5, 0.41) 35.67%,
      rgba(5, 5, 7, 0.09) 44.47%,
      rgba(7, 6, 9, 0) 63.39%,
      rgba(9, 8, 11, 0.79) 80.44%
    );
    width: 100%;
    height: 100%;
    content: '';
  }
`;

export const TitleContainer = styled.div`
  padding: 50px 10px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;

  span {
    text-align: center;

    &:first-of-type {
      padding: 0 10px;
      line-height: 121%;
    }

    &:last-of-type {
      opacity: 0.9;
    }
  }
`;

export const BalanceContainer = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;

  svg {
    width: 28px;
    height: 28px;
  }
`;

export const MarksContainer = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: center;
  padding-top: 4px;
`;

export const TextContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 220px;

  span {
    text-align: center;
    text-transform: uppercase;
  }

  #green-highlight {
    color: #2eff73;
  }

  #red-highlight {
    color: #f95317;
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  margin-top: -10px;

  button {
    box-shadow: 0 4px 19px 0 rgba(46, 255, 115, 0.36);
  }
`;
