import styled from 'styled-components/macro';

export const BalanceBumpTokenContainer = styled.div`
  max-width: 90vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 5px;

  & > span:first-child {
    text-align: center;
  }

  div {
    display: flex;
    align-items: center;
    gap: 6px;

    span {
      flex: 1 0 auto;
      max-width: 75vw;
      overflow: hidden;
      text-overflow: ellipsis;
      text-wrap: nowrap;
    }
  }

  @media screen and (max-width: 340px) {
    & > span:last-of-type {
      font-size: 22px;
    }
  }
`;
