import styled, { css } from 'styled-components/macro';

export const LootboxCraftContainer = styled.div`
  border-radius: 12px;
  background: #2a2d2f;
  padding: 8px;
  margin-top: 10px;
  width: 100%;

  swiper-container {
    flex-grow: 2;
    z-index: 0;
    border-radius: 24px;
    width: 100%;
    height: fit-content;
  }

  swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 24px;
    font-size: 18px;
    text-align: center;
  }
`;

export const List = styled.div`
  display: flex;
  gap: 4px 8px;
  width: 100%;
  flex-wrap: wrap;
  padding: 6px 0;
`;

export const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

export const PaginationContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-top: 6px;
`;

export const PaginationButton = styled.button<{
  $isDisabled: boolean;
  $isPrev: boolean;
}>`
  border-radius: 7px;
  width: 34px;
  height: 76px;
  background: #3c6;
  border: none;
  outline: none;
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;

  &:focus {
    outline: none;
  }

  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      background: #444748;
    `}

  ${({ $isDisabled, $isPrev }) => {
    if ($isDisabled && !$isPrev) {
      return css`
        svg {
          transform: rotate(180deg);
        }
      `;
    }
    if (!$isDisabled && $isPrev) {
      return css`
        svg {
          transform: rotate(180deg);
        }
      `;
    }
  }}
`;

export const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  gap: 3px;
  justify-content: center;

  & > span:first-child {
    opacity: 0.4;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    width: 100%;

    @media screen and (max-width: 340px) {
      span {
        font-size: 12px;
      }
    }
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background: transparent;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const PaginationBulletsContainer = styled.div`
  div {
    display: flex;
    gap: 4px;
    margin-top: 4px;
    border-radius: 7px;
    background: #ffffff1f;
    padding: 4px 10px;
    width: fit-content;
    min-width: 27px;
    height: 27px;

    span:not(:first-of-type) {
      opacity: 0.5;
    }
  }
`;

export const NoPurchasedVouchersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70%;
  height: 100%;
  gap: 6px;
  flex-grow: 1;

  span {
    text-align: center;

    &:last-of-type {
      opacity: 0.8;
    }
  }
`;

export const Line = styled.div`
  width: calc(100% + 16px);
  position: relative;
  margin: 6px 0 8px -8px;

  &:before {
    position: absolute;
    border-bottom: 1px solid #ffffff1a;
    width: 100%;
    content: '';
  }
`;
