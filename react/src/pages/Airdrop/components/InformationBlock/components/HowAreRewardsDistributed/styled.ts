import styled from 'styled-components/macro';

import { bottomBorder } from '@/pages/Airdrop/components/InformationBlock/styled';

export const HowAreRewardsDistributedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;

  svg {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`;

export const CollCell = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 10px;
  ${bottomBorder()};
`;
