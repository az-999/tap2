import styled, { css } from 'styled-components/macro';

import bg from '@/pages/Ships/pages/PiratePage/assets/bg-red.png';

export const PiratePageContainer = styled.div`
  width: calc(100% + 20px);
  height: calc(100% + 80px);
  margin-left: -10px;
  margin-bottom: -80px;
  background-image: url(${bg});
  background-position: center;
  background-size: cover;
  flex-grow: 1;
  padding: 28px 0 128px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;

  @media screen and (max-width: 360px) {
    padding-bottom: 98px;
  }
`;

export const TopContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;

  img {
    width: auto;
    height: 90px;
    object-fit: contain;
  }

  span {
    color: #f95317;
    text-transform: uppercase;
  }
`;

export const ShipContainer = styled.div<{
  $isStartMissionButtonClick: boolean;
}>`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    position: relative;
    height: 100%;
    overflow: hidden;

    #runway-image {
      width: auto;
      max-height: 92vw;
      object-fit: contain;
    }

    #ship-on-runway-image {
      position: absolute;
      top: 6vw;
      left: 50%;
      transform: translateX(-50%);
      transition: transform 1.4s ease-in;
      width: 38vw;
      height: auto;
      object-fit: contain;

      ${({ $isStartMissionButtonClick }) =>
        $isStartMissionButtonClick &&
        css`
          transform: translate(-50%, 200%);
        `}
    }
  }

  #left-border,
  #right-border {
    position: absolute;
    top: 48%;
    transform: translateY(-60%);
    width: auto;
    max-height: 86vw;
    object-fit: contain;
  }

  #left-border {
    left: 0;
  }

  #right-border {
    right: 0;
  }

  &:before {
    position: absolute;
    bottom: 0;
    transform: translateY(5%);
    z-index: 2;
    filter: blur(3.7px);
    background: linear-gradient(
      3deg,
      #010203 70.88%,
      rgba(1, 2, 3, 0.33) 97.99%
    );
    width: 56vw;
    height: 27vw;
    content: '';
  }
`;

export const BottomContainer = styled.div`
  display: flex;
  gap: 18px;
  width: 100%;
  padding: 0 30px;
  justify-content: center;
  z-index: 2;

  & > div {
    display: flex;
    flex-grow: 0;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    max-width: calc(100% / 2 - 9px);
  }
`;
