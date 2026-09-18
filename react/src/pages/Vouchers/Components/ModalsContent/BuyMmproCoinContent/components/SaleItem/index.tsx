import React from 'react';

import Text from '@/components/UI/Text';

import MmproCoinIcon from '@/pages/Vouchers/Components/ModalsContent/BuyMmproCoinContent/assets/MmproCoinIcon';
import Button from '@/pages/Vouchers/Components/ModalsContent/BuyMmproCoinContent/components/Button';
import { SaleItemContainer } from '@/pages/Vouchers/Components/ModalsContent/BuyMmproCoinContent/components/SaleItem/styled';

interface SaleItemProps {
  index: number;
  value: string;
  price: number;
  onClick: (price: number) => void;
}

const SaleItem = ({ index, value, price, onClick }: SaleItemProps) => {
  return (
    <SaleItemContainer $index={index}>
      <div>
        <MmproCoinIcon />
        <div id="amount-value">
          <Text fontSize={26} fontWeight={700}>
            {value}
          </Text>
          <Text fontSize={12} fontWeight={700}>
            MMPro Token
          </Text>
        </div>
      </div>
      <Button value={price} onClick={onClick} />
    </SaleItemContainer>
  );
};

export default SaleItem;
