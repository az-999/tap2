import React, { ReactNode } from 'react';

import Text from '@/components/UI/Text';

import { FooterItemContainer } from '@/pages/Airdrop/components/AirdropCard/styled';

interface FooterItem {
  title: string;
  value: number;
  icon: ReactNode;
}

const FooterItem = ({ title, value, icon }: FooterItem) => {
  return (
    <FooterItemContainer>
      <Text fontSize={12} fontWeight={500}>
        {title}
      </Text>

      <div>
        {icon}
        <Text fontSize={19} fontWeight={700}>
          {value.toLocaleString('ru-RU')}
        </Text>
      </div>
    </FooterItemContainer>
  );
};

export default FooterItem;
