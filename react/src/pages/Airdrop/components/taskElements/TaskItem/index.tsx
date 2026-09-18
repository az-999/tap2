import React, { ReactNode } from 'react';

import { TaskItemContainer } from '@/pages/Airdrop/components/taskElements/TaskItem/styled';

interface TaskItemProps {
  type?: 'multiPart' | 'single';
  paddingRight?: string;
  children: ReactNode;
}

const TaskItem = ({
  type = 'single',
  paddingRight = '10vw',
  children,
}: TaskItemProps) => (
  <TaskItemContainer
    $isMultiPart={type === 'multiPart'}
    $paddingRight={paddingRight}
  >
    {children}
  </TaskItemContainer>
);

export default TaskItem;
