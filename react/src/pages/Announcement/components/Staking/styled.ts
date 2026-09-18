import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components/macro';

import bg from '@/pages/Announcement/assets/staking-bottom.png';

export const Slide = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  border-radius: 24px;
  position: relative;
  font-family: 'SF Pro Display', sans-serif;
`;

export const StyledImage = styled.img`
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
    padding: 18px 20px 14px;
  }
`;

export const ContentWrapperContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 100%;
  max-width: 252px;

  #extra-highlights {
    color: #1cd4d2;
  }

  #blue-highlights {
    color: #1cd4d2;
    font-weight: 700;
  }
`;

export const StakeButton = styled(Link)`
  height: 46px;
  width: 100%;
  border-radius: 10px;
  background: #1cd4d2;
  box-shadow: 0 4px 29px 0 rgba(28, 212, 210, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  border: none;
  -webkit-tap-highlight-color: transparent;
`;

export const BottomContainer = styled.ul`
  display: flex;
  border-radius: 0 0 24px 24px;
  padding: 12px 20px;
  width: 100%;
  gap: 16px;
  background: #15151591;
  backdrop-filter: blur(22.5px);
  list-style: none;

  @media screen and (max-width: 380px) {
    gap: 12px;
  }

  @media screen and (max-width: 340px) {
    gap: 6px;
  }
`;

export const NavItem = styled.li<{ $isActive: boolean }>`
  height: 55px;
  width: 100%;
  border-radius: 8px;
  background: #22232599;
  backdrop-filter: blur(3.8px);
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
  justify-content: center;
  padding: 9px;
  color: #fff;
  font-size: 10px;
  font-weight: 500;

  ${({ $isActive }) =>
    $isActive &&
    css`
      border: 1px solid #1cd4d2;
      box-shadow: 0 0 13px 0 #1cd4d2;
    `}

  span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
