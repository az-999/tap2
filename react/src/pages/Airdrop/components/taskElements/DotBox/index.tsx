import React from 'react';

import Text from '@/components/UI/Text';

import DotIcon from '@/pages/Airdrop/assets/DotIcon';
import { DotBoxContainer } from '@/pages/Airdrop/components/taskElements/DotBox/styled';

interface DotBoxProps {
  title: string;
  value?: number;
}

const DotBox = ({ title, value }: DotBoxProps) => (
  <DotBoxContainer>
    <DotIcon />
    <Text fontSize={12} fontWeight={600}>
      {title}
    </Text>

    <Text fontSize={14} fontWeight={700}>
      {!!value && value}
    </Text>
  </DotBoxContainer>
);

export default DotBox;
