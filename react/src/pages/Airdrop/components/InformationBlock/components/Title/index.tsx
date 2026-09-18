import React from 'react';

import Text from '@/components/UI/Text';

import { AirdropTaskAlertType } from '@/pages/Airdrop/components/AirdropTaskAlert';
import { TitleContainer } from '@/pages/Airdrop/components/InformationBlock/components/TypesOfTasks/styled';
import { TASKS_DATA } from '@/pages/Airdrop/const';

interface TitleProps {
  type?: AirdropTaskAlertType;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  title?: string;
}

const Title = ({
  type = 'special',
  fontSize = 10,
  fontWeight = 400,
  color,
  title,
}: TitleProps) => {
  if (type === 'error' || type === 'lock') return null;
  return (
    <TitleContainer $bg={color ?? TASKS_DATA[type].color}>
      <span />
      <Text fontSize={fontSize} fontWeight={fontWeight}>
        {title ?? TASKS_DATA[type].title}
      </Text>
    </TitleContainer>
  );
};

export default Title;
