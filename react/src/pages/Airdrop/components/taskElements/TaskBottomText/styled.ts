import styled from 'styled-components/macro';

export const TaskRewardContainer = styled.div<{ $marginTop: number }>`
  display: flex;
  gap: 4px;
  align-items: center;
  margin-top: ${({ $marginTop }) => $marginTop}px;

  svg:last-of-type {
    width: 24px;
    height: 24px;
  }

  span:first-of-type {
    margin-right: 4px;
  }

  span:last-of-type {
    max-width: 35vw;
    overflow: hidden;
    text-overflow: ellipsis;
    text-wrap: nowrap;

    @media screen and (max-width: 340px) {
      max-width: 30vw;
    }
  }
`;
