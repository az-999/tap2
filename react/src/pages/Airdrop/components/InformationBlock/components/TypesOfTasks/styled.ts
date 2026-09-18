import styled from 'styled-components/macro';

import { bottomBorder } from '@/pages/Airdrop/components/InformationBlock/styled';

export const TypesOfTasksContainer = styled.div<{
  $isSmallSize: boolean;
}>`
  display: flex;
  flex-direction: column;
  gap: ${({ $isSmallSize }) => ($isSmallSize ? '18px' : '20px')};
`;

export const CollCell = styled.div<{
  $isSmallSize?: boolean;
}>`
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: start;
  gap: ${({ $isSmallSize }) => ($isSmallSize ? '8px' : '10px')};
  ${bottomBorder()};

  span {
    line-height: 17px;
  }
`;

export const TitleContainer = styled.div<{ $bg: string }>`
  display: flex;
  gap: 6px;
  align-items: center;

  span:first-child {
    border-radius: 6px;
    background-color: ${({ $bg }) => $bg};
    width: 22px;
    height: 22px;
  }
`;
