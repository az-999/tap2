import React, { useCallback } from 'react';

import { PageType, TYPE } from '@/pages/BumpTicket';
import Dot from '@/pages/BumpTicket/assets/Dot';
import { ItemContainer } from '@/pages/BumpTicket/components/SmartContractVisualization/styled';

interface ItemProps {
  index: number;
  text: string;
}

const Item = ({ index, text }: ItemProps) => {
  const getActiveStatus = useCallback((type: PageType) => {
    switch (type) {
      case 'soldOut':
      case 'available':
        return 0;
      case 'taps':
        return 2;
      default:
        return 4;
    }
  }, []); // поставить в депсы TYPE

  return (
    <ItemContainer $isActive={index <= getActiveStatus(TYPE)}>
      {index <= getActiveStatus(TYPE) && <Dot />}
      {text}
    </ItemContainer>
  );
};

export default Item;
