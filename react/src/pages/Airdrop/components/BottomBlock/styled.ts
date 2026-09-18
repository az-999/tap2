import styled from 'styled-components/macro';

import bottomBg from '@/pages/Airdrop/assets/bottom-background.png';

export const BottomBlockContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
  background-color: #2e30314c;
  position: relative;
  background-image: url(${bottomBg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  flex-grow: 1;
  padding: 28px 10px 120px;

  @media screen and (max-width: 360px) {
    padding-bottom: 90px;
  }
`;

export const RightImage = styled.img`
  position: absolute;
  top: -26px;
  right: 0;
  width: 28vw;
  height: auto;
  object-fit: contain;
`;

export const LeftImage = styled.img`
  position: absolute;
  top: -36px;
  left: 0;
  width: 28vw;
  height: auto;
  object-fit: contain;
`;

export const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  max-width: 150px;

  span {
    text-align: center;
  }

  span:nth-of-type(2) {
    opacity: 0.7;
  }
`;

export const AirdropInfoContainer = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
  margin-top: 4px;
  position: relative;

  svg:nth-of-type(2n + 1) {
    width: 30px;
    height: 30px;
  }

  button {
    position: absolute;
    top: -10px;
    right: -10px;
    border: none;
    background-color: transparent;

    svg {
      width: 14px !important;
      height: 14px !important;
    }
  }
`;

export const AirdropCardsList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: none;
`;
