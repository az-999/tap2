import styled, { css } from 'styled-components/macro';

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  min-width: 155px;
  min-height: 148px;
  border-radius: 10px;
  display: flex;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }
`;

export const MainWrapper = styled.div<{ $isWide: boolean }>`
  display: flex;
  flex-direction: ${({ $isWide }) => ($isWide ? 'row' : 'column')};
  align-items: center;
  width: 100%;

  ${({ $isWide }) =>
    $isWide &&
    css`
      img,
      & > div {
        justify-content: space-between;
        width: 50%;
      }

      img {
        object-fit: contain;
      }
    `}
`;

export const StyledBackground = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

export const StyledPoint = styled.img<{ $isWide: boolean }>`
  width: ${({ $isWide }) => ($isWide ? '161px' : '135px')};
  height: ${({ $isWide }) => ($isWide ? '116px' : '97px')};
  margin-top: ${({ $isWide }) => ($isWide ? '0' : '-55px')};
  z-index: 1;
`;

export const ContentWrapper = styled.div<{
  $isWide: boolean;
  $isActive: boolean;
}>`
  width: ${({ $isWide }) => ($isWide ? '50%' : '100%')};
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
  z-index: 1;

  ${({ $isActive }) =>
    $isActive
      ? css`
          margin-top: 18px;
        `
      : css`
          margin-top: 5px;
        `};

  ${({ $isWide }) =>
    $isWide &&
    css`
      margin-top: 0;
    `};
`;

export const TimeWrapper = styled.div<{
  $isActive?: boolean;
  $isWide: boolean;
}>`
  background-color: ${({ $isActive }) => ($isActive ? '#33CC66' : '#222325')};
  border-radius: 23px;
  padding: 2px 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  ${({ $isWide }) =>
    $isWide &&
    css`
      margin-top: 0;
    `};

  span {
    line-height: 14px;
    letter-spacing: 0.3px;

    ${({ $isActive }) =>
      !$isActive &&
      css`
        opacity: 0.4;
      `}
  }
`;

export const TitleWrapper = styled.div`
  max-width: 70%;
  text-align: center;
  z-index: 1;
`;

export const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  z-index: 1;
`;

export const StatusIconWrapper = styled.div<{ $isActive?: boolean }>`
  position: absolute;
  bottom: ${({ $isActive }) => ($isActive ? '-40px' : '-16px')};
`;
