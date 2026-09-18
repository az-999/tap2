import styled, { css } from 'styled-components/macro';

export const MyNftsWrapper = styled.div<{ $noNfts: boolean }>`
  justify-content: start;
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 15px 20px;
  align-items: start;

  @media screen and (max-width: 340px) {
    justify-content: center;
  }

  @media screen and (max-width: 380px) {
    gap: 10px 12px;
  }

  ${({ $noNfts }) =>
    $noNfts &&
    css`
      flex-grow: 1;
      align-items: center;
      justify-content: center;
    `}
`;

export const NoNftsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 100%;
  gap: 6px;

  span {
    text-align: center;

    &:last-of-type {
      opacity: 0.8;
    }
  }
`;

export const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;
