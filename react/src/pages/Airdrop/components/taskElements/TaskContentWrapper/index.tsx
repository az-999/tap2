import React, { ReactNode } from 'react';

import { TaskContentWrapperContainer } from '@/pages/Airdrop/components/taskElements/TaskContentWrapper/styled';
import { TASKS_DATA } from '@/pages/Airdrop/const';
import { TaskType } from '@/pages/Airdrop/types';

interface TaskContentWrapperProps {
  type: TaskType;
  children: ReactNode;
}

const TaskContentWrapper = ({ type, children }: TaskContentWrapperProps) => (
  <TaskContentWrapperContainer $color={TASKS_DATA[type].color}>
    {children}
  </TaskContentWrapperContainer>
);

export default TaskContentWrapper;
