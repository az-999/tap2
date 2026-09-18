import styled, { css } from 'styled-components/macro';

export const VoucherContainer = styled.div<{
  isDisabled: boolean;
  $type: 'forPurchase' | 'purchased';
}>`
  display: flex;
  flex-direction: column;
  background-color: #141516;
  border-radius: 8px;
  min-height: ${({ $type }) => ($type === 'forPurchase' ? '274px' : '282px')};
  width: calc((100% / 2) - 10px);

  &:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 340px) {
    width: 180px;
  }

  @media screen and (min-width: 341px) and (max-width: 380px) {
    width: calc((100% / 2) - 6px);
  }

  /* filter: ${(p) => (p.isDisabled ? '0.5' : '1')}; */
  /* filter: grayscale(${(p) => (p.isDisabled ? '100%' : '0%')}); */
`;

export const NftImage = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  background-image: radial-gradient(#1a3322, #1b1d1f);
  min-height: 150px;
  height: fit-content;
  border-radius: 8px 8px 0 0;

  img {
    border-radius: 8px 8px 0 0;
    width: 100%;
    object-fit: contain;
  }
`;

export const ItemContainer = styled.div<{ $type: 'forPurchase' | 'purchased' }>`
  display: flex;
  flex-direction: column;
  padding: 12px 10px 12px;
  gap: ${({ $type }) => ($type === 'forPurchase' ? '4px' : '14px')};
  height: 100%;
  justify-content: space-between;
  flex-grow: 1;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    text-wrap: nowrap;
  }
`;

export const CurrencyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;

  span {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const BuyButton = styled.div<{ $isDisabled: boolean }>`
  height: 40px;
  border-radius: 8px;
  background: #3c6;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 6px;
  -webkit-tap-highlight-color: transparent;

  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      opacity: 0.6;
    `}
`;

export const CurrencyItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  svg:first-of-type {
    //width: 32px; // todo!!!
    width: 18px;
    height: 18px;
  }
`;

export const PurchasedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  button {
    border-radius: 13px;
    width: 100%;
  }
`;

export const CongratulationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-evenly;
  align-items: center;
  gap: 4px;
  flex-grow: 1;
`;

export const CongratulationImage = styled.img`
  width: 20px;
  height: 20px;
`;

export const CongratulationTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;
  align-items: center;

  span {
    text-align: center;
  }

  span:last-child {
    opacity: 0.8;
  }
`;

export const SoldOutWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export const ExtraVoucherContainer = styled.div<{ isDisabled: boolean }>`
  display: flex;
  width: 100%;
  border-radius: 8px;
  background-color: #18181a;
  height: 160px;

  img {
    border-radius: 8px 0 0 8px;
    aspect-ratio: 1;
    width: auto;
    height: 100%;
    object-fit: cover;
  }

  @media screen and (max-width: 340px) {
    height: 176px;
  }
`;

export const ExtraContentContainer = styled.div<{ $withPadding?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px;

  span {
    text-align: center;
  }

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    width: 100%;

    & > span:first-child {
      max-width: ${({ $withPadding }) => ($withPadding ? '120px' : 'auto')};
    }

    div {
      display: flex;
      flex-direction: column;

      span {
        opacity: 0.8;
      }
    }
  }
`;

export const ExtraButton = styled.button<{
  $color: 'pink' | 'red' | 'green' | 'blue' | 'azur';
  $isDisabled: boolean;
  $isFullWidth?: boolean;
  $size: 'regular' | 'big';
}>`
  width: 100%;
  max-width: ${({ $isFullWidth }) => ($isFullWidth ? '100%' : '140px')};
  height: ${({ $size }) => ($size === 'regular' ? '40px' : '50px')};
  border-radius: 10px;
  border: none;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-family: 'SF Pro Display', sans-serif;
  font-size: 12px;
  font-weight: 600;
  line-height: 120%;
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;

  background-color: ${({ $color }) => {
    switch ($color) {
      case 'pink':
        return '#E100FF';
      case 'red':
        return '#F95317';
      case 'green':
        return '#33CC66';
      case 'blue':
        return '#45AEF5';
      case 'azur':
        return '#49DFDD';
    }
  }};

  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      opacity: 0.6;
    `}

  span svg {
    width: 20px;
    height: 20px;
  }
`;

export const MmproCoinTitle = styled.div`
  display: flex;
  gap: 4px;
  flex-direction: row !important;
  align-items: center;
  justify-content: center;

  div {
    display: flex;
    flex-direction: row !important;

    span {
      opacity: 1 !important;

      &:last-of-type {
        color: #2de76b;
      }
    }
  }
`;
