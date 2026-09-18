import styled, { css } from 'styled-components/macro';

export const AnnouncementContainer = styled.div`
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

export const AnnouncementItem = styled.div`
  width: 100%;
  height: 100%;
  max-height: 100%;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
`;

export const MainCardContainer = styled.div<{ $index?: number }>`
  border-radius: 24px;
  //background: rgba(0, 0, 0, 0.6);
  height: 100%;
  max-height: calc(100% - 48px);
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: hidden;
  position: relative;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  & > div {
    z-index: 2;
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

export const Title = styled.h5`
  text-align: center;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px;
  opacity: 0.8;
  color: #fff;
`;

export const SubTitle = styled.h5`
  color: #fff;
  text-align: center;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
`;

export const StyledImg = styled.img`
  position: absolute;
  bottom: 0;
  object-fit: cover;
  width: 100%;
  object-position: bottom;
`;
