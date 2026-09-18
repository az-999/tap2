import styled from 'styled-components/macro';

export const ByTonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  span:first-child {
    opacity: 0.5;
  }

  div {
    display: flex;
    gap: 4px;
  }
`;
