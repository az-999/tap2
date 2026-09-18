import styled from 'styled-components/macro';

export const DailyMonthPrizeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;

  button {
    max-width: 320px;
  }
`;

export const SliderContainer = styled.div`
  width: 100%;
  max-width: 320px;

  swiper-container {
    flex-grow: 2;
    width: 100%;
    height: fit-content;
  }

  swiper-slide {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
`;

export const ExplodingContainer = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
