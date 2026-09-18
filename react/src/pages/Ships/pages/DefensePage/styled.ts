import styled from 'styled-components/macro';

import activeDefenseBg from '@/pages/Ships/pages/DefensePage/assets/bg-green.png';
import inactiveDefenseBg from '@/pages/Ships/pages/DefensePage/assets/bg-red.png';

export const DefensePageContainer = styled.div<{ $isDefenseActive: boolean }>`
  width: calc(100% + 20px);
  height: calc(100% + 80px);
  margin-left: -10px;
  margin-bottom: -80px;
  flex-grow: 1;
  background-image: ${({ $isDefenseActive }) =>
    `url(${$isDefenseActive ? activeDefenseBg : inactiveDefenseBg})`};
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-top: 28px;

  a {
    position: absolute;
    top: 60px;
    left: 10px;
    background-color: darkred;
  }

  & > button:first-of-type {
    z-index: 10;
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
    color: #33cc66;
    text-transform: uppercase;
  }
`;

export const BottomContainer = styled.div`
  width: 100%;
  padding: 55px 16px 128px;
  flex-direction: column;
  display: flex;
  align-items: center;
  gap: 14px;
  background: linear-gradient(
    180deg,
    rgba(3, 3, 1, 0) 0%,
    rgba(0, 0, 0, 0.41) 11.64%,
    #000 100%
  );

  @media screen and (max-width: 360px) {
    padding-bottom: 98px;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`;

export const BalancesContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 6px;
`;
