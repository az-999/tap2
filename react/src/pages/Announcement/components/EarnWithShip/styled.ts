import styled from 'styled-components/macro';

import bg from '@/pages/Announcement/assets/ship-parts-bottom.png';

export const Slide = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  border-radius: 24px;
  position: relative;
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
`;

export const ContentContainer = styled.div`
  width: 100%;
  flex-grow: 1;
  background-image: url(${bg});
  background-size: cover;
  background-position: top;
  margin-top: -4px;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  #coins-images-left,
  #coins-images-right {
    position: absolute;
    bottom: 0;
    width: 23vw;
    height: auto;
    object-fit: contain;
  }

  #coins-images-left {
    left: 0;
  }

  #coins-images-right {
    right: 0;
  }

  span {
    z-index: 2;
  }

  #extra-highlights {
    color: #2eff73;
  }

  #ton-field {
    border-radius: 6px;
    background-color: #62acef;
    padding: 4px;
    color: #fff;
  }

  & > div:first-of-type {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 14px;
    padding: 16px 6px;
  }
`;

export const ContentWrapperContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 100%;
`;

export const BottomContainer = styled.div`
  border-radius: 0 0 24px 24px;
  background: rgba(21, 21, 21, 0.57);
  backdrop-filter: blur(22.5px);
  display: flex;
  padding: 20px 26px;
  width: 100%;
  gap: 16px;

  span {
    text-align: start;
  }

  #green-highlights {
    color: #2eff73;
  }

  button {
    border: none;
    border-radius: 6px;
    background: #3c6;
    width: 90px;
    min-width: 90px;
    height: 36px;
    color: #fff;
    font-weight: 600;
    font-size: 16px;
    font-family: 'SF Pro Display', sans-serif;
  }
`;
