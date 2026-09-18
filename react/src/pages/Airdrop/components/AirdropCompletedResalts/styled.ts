import styled from 'styled-components/macro';

import { bottomBorder } from '@/pages/Airdrop/components/InformationBlock/styled';

export const AirdropCompletedResaltsContainer = styled.div`
  background: linear-gradient(
    90deg,
    #622eff 6.04%,
    #2eff73 47.33%,
    #2effee 77.69%
  );
  border-radius: 10px;
  display: flex;
  justify-content: center;
  z-index: 1;
  position: relative;
  width: 100%;
`;

export const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 1px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #141516;
  border-radius: 10px;
  gap: 24px;
  padding: 16px;
`;

export const CollCell = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 10px;
  ${bottomBorder()};

  & > div:first-child {
    display: flex;
    justify-content: space-between;

    div {
      display: flex;
      align-items: center;
      gap: 4px;

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;
