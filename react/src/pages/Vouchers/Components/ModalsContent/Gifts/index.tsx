import React, { ReactNode } from 'react';

import Text from '@/components/UI/Text';

import {
  GiftItem,
  GiftsContainer,
} from '@/pages/Vouchers/Components/ModalsContent/Gifts/styled';

export type Gift = {
  icon: ReactNode;
  title: string;
};

interface GiftsProps {
  gifts: Gift[];
}

const Gifts = ({ gifts }: GiftsProps) => {
  return (
    <GiftsContainer>
      {gifts.map(({ icon, title }, index) => (
        <GiftItem key={`gift-${title}-${index}`}>
          {icon}
          <Text fontSize={12} fontWeight={600}>
            {title}
          </Text>
        </GiftItem>
      ))}
    </GiftsContainer>
  );
};

export default Gifts;
