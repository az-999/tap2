import styled from 'styled-components/macro';

import bg from '@/pages/Airdrop/assets/dark-bg.png';

export const AirdropRatingPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 24px;
  background-image: url(${bg});
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  align-items: center;
  padding: 0 20px 120px;

  @media screen and (max-width: 360px) {
    padding-bottom: 90px;
  }

  & > button:first-of-type {
    z-index: 3;
  }
`;

export const TitleContainer = styled.div`
  max-width: 282px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;

  span {
    text-align: center;
  }

  #strong {
    font-weight: 700;
  }

  #green-strong {
    color: #2eff73;
    font-weight: 600;
  }
`;

export const RatingList = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 7px;
  width: 100%;
  height: 100%;
  list-style: none;
`;
