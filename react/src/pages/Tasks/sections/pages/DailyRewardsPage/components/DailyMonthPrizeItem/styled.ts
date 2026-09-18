import styled, { css } from 'styled-components/macro';

export const DailyMonthPrizeItemContainer = styled.div<{
  $isPrizeExist: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  width: calc((100% / 3) - (20px / 3));

  img {
    width: 100%;
    object-fit: contain;
    pointer-events: auto;
  }

  ${({ $isPrizeExist }) =>
    !$isPrizeExist &&
    css`
      span {
        opacity: 0.4;
      }
    `}
`;
