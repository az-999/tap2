import styled, { css } from 'styled-components/macro';

import firstBg from '@/pages/Vouchers/Components/ModalsContent/BuyMmproCoinContent/assets/sale-item-1.png';
import secBg from '@/pages/Vouchers/Components/ModalsContent/BuyMmproCoinContent/assets/sale-item-2.png';
import thirdBg from '@/pages/Vouchers/Components/ModalsContent/BuyMmproCoinContent/assets/sale-item-3.png';

export const SaleItemContainer = styled.li<{ $index: number }>`
  padding: 30px 8px 10px;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid #222325;

  ${({ $index }) => {
    switch ($index) {
      case 0:
        return css`
          background-image: url(${firstBg});
        `;
      case 1:
        return css`
          background-image: url(${secBg});
        `;
      case 2:
        return css`
          background-image: url(${thirdBg});
        `;
    }
  }}

  & > div:first-child {
    display: flex;
    align-items: center;
    gap: 6px;

    div {
      display: flex;
      flex-direction: column;
    }
  }

  #amount-value span:first-child {
    @media screen and (max-width: 370px) {
      font-size: 22px;
    }

    @media screen and (max-width: 340px) {
      font-size: 20px;
    }
  }
`;
