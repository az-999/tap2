import React, { ReactNode } from 'react';

import Text from '@/components/UI/Text';

import AirdropIcon from '@/pages/Airdrop/assets/AirdropIcon';
import CompletedIcon from '@/pages/Airdrop/assets/CompletedIcon';
import { TaskRewardContainer } from '@/pages/Airdrop/components/taskElements/TaskBottomText/styled';

interface TaskRewardProps {
  title?: string;
  value: number;
  isCompleted?: boolean;
  marginTop?: number;
  icon?: ReactNode;
  currency?: string;
}

const TaskBottomText = ({
  title = 'Reward',
  value,
  isCompleted = false,
  marginTop = 0,
  icon,
  currency = 'AP',
}: TaskRewardProps) => (
  <TaskRewardContainer $marginTop={marginTop}>
    {isCompleted && <CompletedIcon />}

    <Text fontSize={12} fontWeight={600}>
      {title}
    </Text>
    {icon ?? <AirdropIcon />}
    <Text fontSize={14} fontWeight={700}>
      {value.toLocaleString('ru-RU')} {currency}
    </Text>
  </TaskRewardContainer>
);

export default TaskBottomText;
