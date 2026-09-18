import React from 'react';

import Text from '@/components/UI/Text';

import { IndicatorWrapper } from '@/pages/Tasks/sections/pages/TasksPages/TaskIndicator/styled';

interface TaskIndicatorProps {
  count: number;
}

const TaskIndicator = ({ count }: TaskIndicatorProps) => {
  return (
    <IndicatorWrapper>
      <Text fontSize={10} fontWeight={700}>
        {count}
      </Text>
    </IndicatorWrapper>
  );
};

export default TaskIndicator;
