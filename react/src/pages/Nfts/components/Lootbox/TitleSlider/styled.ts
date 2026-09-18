import styled, { css, keyframes } from 'styled-components/macro';

export const TitleSliderContainer = styled.div`
  width: 100vw;
  position: relative;

  swiper-container {
    flex-grow: 2;
    border-radius: 24px;
    width: 100%;
    height: 100%;
  }

  swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  swiper-container::part(pagination) {
    text-align: end;
  }

  swiper-container::part(bullet-active) {
    margin: 0 2px;
    border-radius: 4px;
    background-color: #ffffff;
    width: 20px;
    height: 5px;
  }

  swiper-container::part(bullet) {
    margin: 0 2px;
    border-radius: 4px;
    background-color: #d9d9d9;
    height: 5px;
  }
`;

export const PrevButton = styled.button<{ $isPrevPressed: boolean }>`
  position: absolute;
  height: 34px;
  width: 34px;
  border: none;
  background-color: transparent;
  left: 20px;
  top: 43%;
  transform: translateY(-50%);
  z-index: 9;
  transition: scale linear 120ms;

  ${({ $isPrevPressed }) =>
    $isPrevPressed &&
    css`
      transform: scale(0.93) translateY(-50%);
    `}
`;

export const NextButton = styled.button<{ $isNextPressed: boolean }>`
  position: absolute;
  height: 34px;
  width: 34px;
  border: none;
  background-color: transparent;
  right: 20px;
  top: 43%;
  transform: translateY(-50%);
  z-index: 9;

  ${({ $isNextPressed }) =>
    $isNextPressed &&
    css`
      transform: scale(0.93) translateY(-50%);
    `}
`;

export const MainCardContainer = styled.div`
  width: 100%;
  height: fit-content;
`;

export const PaginationContainer = styled.div`
  position: absolute;
  bottom: -10px;
  right: 50%;
  transform: translateX(50%);
  display: flex;
  gap: 4px;
`;

export const PaginationItem = styled.div<{ $isActive: boolean }>`
  opacity: ${({ $isActive }) => ($isActive ? 0.8 : 0.2)};
`;
