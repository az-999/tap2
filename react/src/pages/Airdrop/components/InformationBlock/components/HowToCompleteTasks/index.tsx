import React from 'react';

import Text from '@/components/UI/Text';

const HowToCompleteTasks = () => {
  return (
    <Text fontSize={12} fontWeight={400}>
      Complete <span id="strong">tasks in sequence.</span> To unlock the{' '}
      <span id="green-strong">next task, you must finish the current one</span>{' '}
      that's in progress.
    </Text>
  );
};

export default HowToCompleteTasks;
