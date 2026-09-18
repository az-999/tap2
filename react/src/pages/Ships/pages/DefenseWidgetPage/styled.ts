import styled from 'styled-components/macro';

import bg from '@/pages/Ships/pages/DefenseWidgetPage/assets/bg-blue.png';

export const DefenseWidgetPageContainer = styled.div`
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
    color: #33cc66;
    text-transform: uppercase;
  }
`;

export const ShipContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  #ship-icon {
    width: auto;
    max-height: 75vw;
    object-fit: contain;
  }

  #left-border,
  #right-border {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: auto;
    max-height: 101vw;
    object-fit: contain;
  }

  #left-border {
    left: 0;
  }

  #right-border {
    right: 0;
  }
`;

export const BalanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  div:first-child {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;

    svg {
      width: 22px;
      height: 22px;
    }
  }

  div:nth-child(2) {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;

    svg {
      width: 25px;
      height: 25px;
    }
  }
`;
