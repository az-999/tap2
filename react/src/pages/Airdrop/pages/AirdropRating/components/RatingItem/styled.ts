import styled, { css } from 'styled-components/macro';

export const RatingItemContainer = styled.li<{ $isActive: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 10px;
  min-height: 32px;
  padding: ${({ $isActive }) => ($isActive ? '9px 10px 10px' : '6px 0')};
  border-radius: 8px;
  background-color: ${({ $isActive }) =>
    $isActive ? '#33CC66' : 'transparent'};
`;

export const TitleWrapper = styled.div<{ $index: number | string | null }>`
  display: flex;
  align-items: center;
  gap: 5px;
  position: relative;

  svg {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(-40%, -25%);
  }

  span:first-of-type {
    z-index: 1;
    min-width: 32px;
    text-align: center;
  }

  ${({ $index }) =>
    $index === 1
      ? css`
          svg {
            transform: translate(7%, -47%);
          }
        `
      : css`
          svg {
            transform: translate(4%, -50%);
          }
        `}
`;

export const DataWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;

  svg {
    width: 20px;
    height: 20px;
  }
`;
