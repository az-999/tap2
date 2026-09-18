import styled from 'styled-components/macro';

import { bottomBorder } from '@/pages/Airdrop/components/InformationBlock/styled';

export const HowItWorkContentContainer = styled.div.attrs<
  { $isSmallSize: boolean },
  {
    $gap: string;
    $iconSize: string;
  }
>(({ $isSmallSize }) => ({
  $gap: $isSmallSize ? '18px' : '20px',
  $iconSize: $isSmallSize ? '28px' : '32px',
}))<{
  $isSmallSize: boolean;
}>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap};

  svg {
    flex-shrink: 0;
    width: ${({ $iconSize }) => $iconSize};
    height: ${({ $iconSize }) => $iconSize};
  }

  span {
    line-height: 17px;
    text-align: start;
  }
`;

export const RowCell = styled.div<{
  $isSmallSize?: boolean;
}>`
  display: flex;
  position: relative;
  align-items: center;
  gap: ${({ $isSmallSize }) => ($isSmallSize ? '8px' : '10px')};
  ${({ $isSmallSize }) => bottomBorder($isSmallSize)};
`;
