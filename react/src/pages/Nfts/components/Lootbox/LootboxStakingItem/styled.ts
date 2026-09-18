import styled, { css, keyframes } from 'styled-components/macro';

const rotateIcon = keyframes`
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg)
  }
`;

const opacityTransition = keyframes`
    0% {
        background: rgba(56, 244, 241, 0.4);
    }
    50% {
        background: rgba(56, 244, 241, 0.2);
    }
    100% {
        background: rgba(56, 244, 241, 0.4);
    }
`;

export const LootboxStakingItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 77vw;
  padding: 20px 20px 12px;
  position: relative;

  @media screen and (max-width: 340px) {
    padding: 12px 18px 14px;
  }

  #staking-box-container-icon {
    position: absolute;
    top: -28px;
    left: 0;
    width: 100vw;
    height: auto;
    object-fit: contain;
  }
`;

export const TopContentContainer = styled.div`
  position: relative;
  padding: 4.5vw 4.5vw 2.2vw;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-grow: 2;
  gap: 12px;

  @media screen and (max-width: 380px) {
    gap: 8px;
    padding: 3.8vw 3.8vw 1.8vw;
  }

  @media screen and (max-width: 350px) {
    padding: 3.3vw 3.3vw 1.6vw;
  }
`;

export const TopTitleContainer = styled.div`
  display: flex;
  gap: 24px;
  width: 100%;
  align-items: center;
  justify-content: center;
  position: relative;

  @media screen and (max-width: 380px) {
    gap: 16px;
  }

  @media screen and (max-width: 340px) {
    gap: 12px;
  }
`;

export const Border = styled.div`
  margin-left: -16px;
  margin-top: -10px;
  border-bottom: solid 1px #ffffff1a;
  width: calc(100% + 32px);
  height: 2px;

  @media screen and (max-width: 360px) {
    margin-top: -6px;
  }

  @media screen and (max-width: 340px) {
    margin-top: -2px;
    margin-left: -12px;
    width: calc(100% + 24px);
  }
`;

export const PreloaderContainer = styled.div`
  width: 26%;
  position: relative;
  flex-shrink: 0;

  #staking-preloader {
    animation: ${() => css`
      ${rotateIcon} ${Math.random() * 5 + 18}s linear infinite
    `};
    -webkit-animation: ${() => css`
      ${rotateIcon} ${Math.random() * 5 + 18}s linear infinite
    `};
    will-change: transform;
    aspect-ratio: 1;
    width: 100%;
    height: 100%;
  }

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    aspect-ratio: 1;
    width: 66%;
    height: auto;
    object-fit: contain;
  }

  @media screen and (max-width: 400px) {
    width: 24%;
  }

  @media screen and (max-width: 360px) {
    width: 22%;
  }
`;

export const TopTitleInnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media screen and (max-width: 340px) {
    gap: 4px;
  }

  & > div:nth-of-type(1) {
    display: flex;
    gap: 6px;

    div {
      display: flex;
      gap: 4px;

      #apy-container {
        display: flex;
        position: relative;
        justify-content: center;
        align-items: center;
        margin: 0 3px;

        svg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          object-fit: contain;
        }

        span {
          position: relative;
          z-index: 1;
        }
      }
    }
  }

  & > div:nth-of-type(2) {
    display: flex;
    gap: 16px;
    width: 100%;

    div {
      display: flex;
      flex-direction: column;

      & > span:first-child {
        opacity: 0.8;
        line-height: 150.5%;
      }

      div {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 3px;
      }
    }

    @media screen and (max-width: 340px) {
      gap: 8px;
    }
  }
`;

export const MonthlyRewardContainer = styled.div`
  width: 100%;
  gap: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  & > div:first-of-type {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;

    span:last-child {
      color: #38f4f1;
    }
  }

  & > div:last-of-type {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 3px;

      span {
        text-align: center;
      }
    }
  }
`;

export const MonthlyRewardProgressBarContainer = styled.ul`
  width: 100%;
  display: flex;
  gap: 2px;
  list-style: none;
`;

export const MonthlyRewardProgress = styled.li<{
  $isActive: boolean;
  $isOnProgress: boolean;
  $isCompleted: boolean;
}>`
  flex-grow: 1;
  height: 8px;
  border-radius: 3px;
  border: ${({ $isActive }) =>
    $isActive ? '1px solid #38f4f1' : 'transparent'};
  background: ${({ $isCompleted }) => ($isCompleted ? '#38f4f1' : '#38F4F166')};
  box-shadow: ${({ $isActive, $isCompleted }) =>
    $isActive && !$isCompleted ? '0 0 6px 0 #38f4f1d6' : 'none'};

  @media screen and (max-width: 340px) {
    height: 6px;
  }

  ${({ $isOnProgress }) =>
    $isOnProgress &&
    css`
      animation: ${opacityTransition} 2s linear infinite;
    `}
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;

  @media screen and (max-width: 340px) {
    button {
      height: 32px;
    }
  }
`;

export const BottomContainer = styled.div`
  position: relative;
  width: 98%;
  margin: 0 1%;
  overflow: hidden;
  padding: 8px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;

  & > div:not(:first-child) {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: space-evenly;
    gap: 6px;
    min-height: 14px;
  }

  @media screen and (max-width: 428px) {
    margin: 0;
    width: 100%;
  }

  @media screen and (max-width: 380px) {
    padding: 6px 12px 12px;
  }

  @media screen and (max-width: 360px) {
    margin: 0 -1%;
    width: 102%;
  }

  @media screen and (max-width: 360px) {
    margin: 0 -0.5%;
    width: 101%;
  }
`;

export const ProgressBar = styled.div<{ $value: number }>`
  height: 5px;
  width: calc(100% + 32px);
  margin-left: -16px;
  background-color: #38f4f11a;
  position: relative;

  &::before {
    position: absolute;
    background-color: #38f4f1;
    width: ${({ $value }) => $value}%;
    height: 100%;
    content: '';
  }
`;

export const TimerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  & > span:first-child {
    opacity: 0.5;
  }
`;
