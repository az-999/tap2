import styled, { css } from 'styled-components/macro';

export const MarketplaceNftItemContainer = styled.div<{
  $isGridActive: boolean;
}>`
  width: ${({ $isGridActive }) =>
    $isGridActive ? 'calc((100% / 2) - 10px)' : '100%'};
  height: ${({ $isGridActive }) => ($isGridActive ? 'fit-content' : '95px')};
  border-radius: 8px;
  background: #141516;
  display: flex;
  align-items: center;
  position: relative;

  ${({ $isGridActive }) =>
    $isGridActive
      ? css`
          flex-direction: column;

          img {
            border-radius: 10px 10px 0 0;
            background: radial-gradient(
              50% 50% at 50% 50%,
              #1a3322 0%,
              #1b1d1f 100%
            );
            width: 100%;
            height: auto;
            object-fit: contain;
          }
        `
      : css`
          flex-direction: row;

          img {
            border-radius: 10px 0 0 10px;
            background: radial-gradient(
              50% 50% at 50% 50%,
              #1a3322 0%,
              #1b1d1f 100%
            );
            width: 95px;
            height: 100%;
            object-fit: contain;
          }
        `};

  @media screen and (max-width: 340px) {
    ${({ $isGridActive }) =>
      $isGridActive &&
      css`
        width: 180px;
      `}
  }

  @media screen and (min-width: 341px) and (max-width: 380px) {
    width: ${({ $isGridActive }) =>
      $isGridActive ? 'calc((100% / 2) - 6px)' : '100%'};
  }

  #ship-level-container {
    display: flex;
    position: absolute;
    top: ${({ $isGridActive }) => ($isGridActive ? '6px' : '3px')};
    right: ${({ $isGridActive }) => ($isGridActive ? '6px' : '0')};
    left: ${({ $isGridActive }) => ($isGridActive ? '' : '64px')};
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 25px;

    span {
      z-index: 2;
      padding-top: 1px;
      color: #fff;
      font-style: normal;
      font-weight: 700;
      font-size: 12px;
      line-height: 150.5%;
      font-family: 'SF Pro Display', sans-serif;
      text-align: center;
    }

    svg {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
`;

export const ContentContainer = styled.div<{ $isGridActive: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;

  ${({ $isGridActive }) =>
    $isGridActive
      ? css`
          padding: 13px 10px 18px;
          gap: 5px;
        `
      : css`
          overflow: hidden;
          padding: 15px;
          gap: 7px;
        `}

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    text-wrap: nowrap;
  }
`;

export const InfoContainer = styled.div<{ $isGridActive: boolean }>`
  display: flex;

  ${({ $isGridActive }) =>
    $isGridActive
      ? css`
          flex-direction: column;
          gap: 6px;
        `
      : css`
          flex-direction: row;
          gap: 24px;
        `}
`;

export const InfoItemContainer = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
  justify-content: space-between;

  span {
    opacity: 0.5;
  }

  & > div {
    display: flex;
    align-items: center;
    gap: 5px;
    height: 24px;

    span {
      opacity: 1;
    }
  }
`;
