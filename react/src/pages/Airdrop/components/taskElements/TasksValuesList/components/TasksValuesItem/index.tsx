import React, { ReactNode } from 'react';

import Text from '@/components/UI/Text';

import { TasksValuesItemContainer } from '@/pages/Airdrop/components/taskElements/TasksValuesList/components/TasksValuesItem/styled';

interface TasksValuesItemProps {
  title: string;
  value: number;
  icon: ReactNode;
}

const TasksValuesItem = ({ title, value, icon }: TasksValuesItemProps) => {
  return (
    <TasksValuesItemContainer>
      {icon}
      <Text fontSize={12} fontWeight={500}>
        {title}
      </Text>
      <Text fontSize={22} fontWeight={700}>
        {value.toLocaleString('ru-RU')}
      </Text>
    </TasksValuesItemContainer>
  );
};

export default TasksValuesItem;
