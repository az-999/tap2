import styled from 'styled-components/macro';

export const LootboxPageContainer = styled.div`
  flex-grow: 2;
  display: flex;
  flex-direction: column;

  & > button {
    z-index: 10;
  }
`;
