import styled, { css } from 'styled-components/macro';

export const ChargeLevelContainer = styled.div<{ $noDefenseLevel: boolean }>`
  display: flex;
  gap: 4px;
  align-items: center;

  ${({ $noDefenseLevel }) =>
    $noDefenseLevel &&
    css`
      svg path {
        fill: #f95317;
      }
    `}
`;

export const ChargeList = styled.ul`
  display: flex;
  gap: 1px;
  list-style: none;
`;

export const ChargeItem = styled.li<{ $isActive: boolean }>`
  border-radius: 1px;
  background-color: ${({ $isActive }) => ($isActive ? '#33CC66' : '#F9531733')};
  width: 3px;
  height: 10px;
`;
