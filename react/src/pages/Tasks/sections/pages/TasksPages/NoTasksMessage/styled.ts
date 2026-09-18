import styled from 'styled-components/macro';

export const NoTasksMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 64vw;
  height: 100%;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  gap: 6px;

  span {
    text-align: center;
  }

  span:first-of-type {
    padding-top: 4px;
  }
`;
