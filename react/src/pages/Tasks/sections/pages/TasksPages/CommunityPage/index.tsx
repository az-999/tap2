import { observer } from 'mobx-react-lite';
import React from 'react';

import TasksList from '@/pages/Tasks/sections/pages/TasksPages/TasksList';
import rootStore from '@/store';

const CommunityPage = () => {
  const {
    tasksStore: { communityTasks, communityArchiveTasks },
    isLoading,
  } = rootStore;

  return (
    <TasksList
      tasks={communityTasks}
      page="Community"
      archiveTasks={communityArchiveTasks}
      isLoading={isLoading}
    />
  );
};

export default observer(CommunityPage);
