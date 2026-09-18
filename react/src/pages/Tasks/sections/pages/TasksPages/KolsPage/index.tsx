import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';

import TasksList from '../TasksList';
import rootStore from '@/store';

const KolsPage = () => {
  const {
    tasksStore: { kolsTasks, kolsArchiveTasks },
    isLoading,
  } = rootStore;

  return (
    <TasksList
      tasks={kolsTasks}
      page="KOLs"
      archiveTasks={kolsArchiveTasks}
      isLoading={isLoading}
    />
  );
};

export default observer(KolsPage);
