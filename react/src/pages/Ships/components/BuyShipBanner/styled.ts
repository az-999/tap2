import styled from 'styled-components/macro';

import bg from '@/pages/Ships/components/BuyShipBanner/assets/bg.png';

export const ShipBannerContainer = styled.div`
  display: flex;
  width: 100%;
  border-radius: 8px;
  background-image: url(${bg});
  background-position: center;
  background-size: cover;
  height: 80px;
  position: relative;
  align-items: center;
  justify-content: center;

  #left-ship-image {
    position: absolute;
    top: 0;
    width: auto;
    height: 100%;
    object-fit: contain;
  }

  #left-ship-image {
    left: 0;
    border-radius: 8px 0 0 8px;
  }

  span,
  button {
    z-index: 2;
  }

  button {
    flex-grow: 1;
    width: auto;
  }

  div:first-of-type {
    display: flex;
    flex-grow: 1;
    justify-content: end;
  }

  div:last-of-type {
    display: flex;
    justify-content: center;
    padding: 0 16px;
    width: calc(100% - 160px);
  }
`;
