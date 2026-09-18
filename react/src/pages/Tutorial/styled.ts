import styled, { css } from 'styled-components/macro';

export const TutorialContainer = styled.div`
  z-index: 2;
  padding: 20px 10px 25px 10px;
  width: calc(100vw - 20px);
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 13px;

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
    border-radius: 24px;
    font-size: 18px;
    text-align: center;
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

export const TutorialItem = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  position: relative;

  img:not(#moon-bg):not(#icon-image) {
    flex-grow: 1;
    border-radius: 24px;
    width: 100%;
    height: 100%;
    max-height: calc(100% - 48px);
    object-fit: cover;
    object-position: center;
  }
`;

export const ImagesContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 13px;
  height: 100%;
  z-index: 5;

  img {
    height: 100%;
    max-height: 100% !important;
  }
`;

export const ImagesItemContainer = styled.div`
  height: calc((100% - 26px) / 3);
  position: relative;

  #vouchers-image {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    margin-top: 14px;
    padding: 12px;
    max-height: 100px;
    object-fit: contain !important;
    object-position: top !important;
  }
`;

export const ImageTextContainer = styled.div`
  z-index: 6;
  border-radius: 15px;
  background: #fff;
  width: 100%;
  max-width: 180px;
  position: absolute;
  height: 30px;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const UpTitleContainer = styled.div`
  position: absolute;
  top: 26px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3px;
  align-items: center;
  padding: 0 15px;
`;

export const IconContainer = styled.div`
  padding: 0 30px;
  height: fit-content;

  img {
    width: 100%;
    min-width: 220px;
    height: auto;
    max-height: 120px;
    object-fit: contain;
  }
`;

export const TextWrapper = styled.div`
  width: fit-content;
  height: auto;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 22px;
  z-index: 5;

  span {
    text-align: center;
  }

  & > div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

export const MainCardContainer = styled.div`
  border-radius: 24px;
  background: linear-gradient(180deg, #1a1e20 16.47%, #3c6 69.73%);
  padding: 24px;
  height: 100%;
  max-height: calc(100% - 48px);
`;

export const Moon = styled.img`
  position: absolute;
  bottom: 48px;
  max-height: 60%;
  width: 100%;
  left: 0;
  border-radius: 24px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  gap: 5px;
  border-radius: 10px;
  background: #3c6;
  box-shadow: 0 4px 29px 0 rgba(51, 204, 102, 0.35);
  margin-top: 10px;
`;

export const CardTitle = styled.div<{ $position: 'top' | 'bottom' }>`
  width: 120px;
  height: 58px;
  position: absolute;
  z-index: 6;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  background: rgba(0, 0, 0, 0.09);
  backdrop-filter: blur(3.5px);
  -webkit-backdrop-filter: blur(3.5px);

  ${({ $position }) =>
    $position === 'top' &&
    css`
      top: 0;
      border-radius: 0 0 10px 10px;
    `}

  ${({ $position }) =>
    $position === 'bottom' &&
    css`
      bottom: 0;
      border-radius: 10px 10px 0 0;
    `}
    
    svg {
    width: 45px;
    height: 25px;
  }
`;

export const PaginationContainer = styled.div`
  position: absolute;
  bottom: 34px;
  right: 0;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
`;

export const PaginationItem = styled.div<{ $isActive: boolean }>`
  opacity: ${({ $isActive }) => ($isActive ? 0.8 : 0.2)};
`;

export const PrevButton = styled.button`
  position: absolute;
  height: 100%;
  width: 50%;
  border: none;
  background-color: transparent;
  left: 0;
  z-index: 100;
`;

export const NextButton = styled.button`
  position: absolute;
  height: 100%;
  width: 50%;
  border: none;
  background-color: transparent;
  right: 0;
  z-index: 100;
`;
