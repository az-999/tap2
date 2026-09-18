import styled from 'styled-components/macro';

import bg from '@/pages/Announcement/assets/collect-ships-bottom.png';

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
  padding: 0 10px;

  &:nth-of-type(2) {
    padding: 0 22px;
  }

  #extra-highlights {
    color: #2eff73;
  }

  #green-highlights {
    color: #2eff73;
    font-weight: 700;
  }
`;

export const GradientBlock = styled.div`
  width: 100%;
  min-height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 6px;
  background: conic-gradient(from 180deg, #38f4f1, #e069e6, #784ce0);
  padding: 1px;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background-color: #111112;
    padding: 6px;
    width: 100%;
    height: 100%;
  }
`;

export const BottomContainer = styled.div`
  border-radius: 0 0 24px 24px;
  display: flex;
  padding: 20px 6px 12px 6px;
  width: 100%;
  gap: 16px;
`;

export const Button = styled.div`
  height: 54px;
  padding: 12px;
  border-radius: 10px;
  background: linear-gradient(
    87deg,
    #3c6 -0.52%,
    #35d86b 22.93%,
    #1ebc8d 48.96%,
    #9b33cc 100.56%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: 'SF Pro Display', sans-serif;
  font-size: 13px;
  font-weight: 600;
  gap: 14px;
  flex-grow: 1;
  position: relative;

  &:has(span) {
    padding-left: 106px;
  }

  span {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    align-items: center;
    border-radius: 10px 0 0 10px;
    background: rgba(255, 255, 255, 0.15);
    padding: 6px;
    height: 100%;
  }
`;
