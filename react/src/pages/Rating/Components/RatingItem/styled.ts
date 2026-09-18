import styled, { css } from 'styled-components/macro';

export const RatingItemContainer = styled.div<{ $isActive: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 10px;
  min-height: 32px;
  padding: ${({ $isActive }) => ($isActive ? '6px 10px 6px 0' : '6px 0')};
  border-radius: 8px;
  background-color: ${({ $isActive }) =>
    $isActive ? '#232426' : 'transparent'};
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
`;
