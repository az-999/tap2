import styled from 'styled-components/macro';

export const BalanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const BalanceList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px 10px;

  & > li:first-of-type {
    grid-column: span 3;
  }
`;
