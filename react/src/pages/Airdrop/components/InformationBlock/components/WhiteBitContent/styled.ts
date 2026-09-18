import styled from 'styled-components/macro';

import { bottomBorder } from '@/pages/Airdrop/components/InformationBlock/styled';

export const WhiteBitContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  a {
    color: #62acef;
    font-weight: 600;
    text-decoration: underline;
  }
`;

export const RowCell = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  gap: 8px;
  text-align: start;
  ${bottomBorder()}

  svg {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
  }
`;
