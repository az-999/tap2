import React, { ReactNode } from 'react';

import Text from '@/components/UI/Text';

import {
  BalanceItemContainer,
  IconContainer,
  ValueContainer,
} from '@/pages/Main/components/BalanceItem/styled';

export type Balance = {};

interface BalanceItemProps {
  value: number;
  title: string;
  icon: ReactNode;
  secIcon?: ReactNode;
  isFullWidth?: boolean;
}

const BalanceItem = ({
  value,
  title,
  icon,
  secIcon,
  isFullWidth = false,
}: BalanceItemProps) => {
  return (
    <BalanceItemContainer $isFullWidth={isFullWidth}>
      <IconContainer>
        {icon}
        {secIcon}
      </IconContainer>

      <ValueContainer $isFullWidth={isFullWidth}>
        <Text fontSize={14} fontWeight={700}>
          {value?.toLocaleString('ru-RU')}
        </Text>
        <Text fontSize={10} fontWeight={600}>
          {title}
        </Text>
      </ValueContainer>
    </BalanceItemContainer>
  );
};

export default BalanceItem;
