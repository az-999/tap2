import styled from 'styled-components/macro';

import bg from '@/pages/Ships/pages/BannersPage/assets/bannersBg.png';

export const BannersPageContainer = styled.div`
  width: calc(100% + 20px);
  height: calc(100% + 40px);
  margin-left: -10px;
  margin-bottom: -40px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 30px 20px 70px;
  background-position: center;
  background-size: cover;
  background-image: url(${bg});

  #green-highlight {
    color: #33cc66;
  }

  & > span:first-of-type {
    line-height: 1.5;
  }

  & > svg:first-of-type {
    margin: -16px 0 -40px;
  }
`;

export const BannersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  overflow-y: auto;
`;
