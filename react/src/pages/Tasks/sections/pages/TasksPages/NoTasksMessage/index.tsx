import React from 'react';

import SmileIcon from '@/assets/SmileIcon';

import Text from '@/components/UI/Text';

import { NoTasksMessageContainer } from '@/pages/Tasks/sections/pages/TasksPages/NoTasksMessage/styled';

interface NoTasksMessageProps {
  page: string;
}

const NoTasksMessage = ({ page }: NoTasksMessageProps) => {
  return (
    <NoTasksMessageContainer>
      <SmileIcon />
      <Text fontSize={14} fontWeight={500}>
        New tasks from {page} are on the way!
      </Text>
      <Text fontSize={12} fontWeight={400}>
        Earn rewards for completing tasks with the arrival of new assignments
      </Text>
    </NoTasksMessageContainer>
  );
};

export default NoTasksMessage;
