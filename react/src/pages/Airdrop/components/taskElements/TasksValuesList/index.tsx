import { observer } from 'mobx-react-lite';
import React from 'react';

import TasksValuesItem from '@/pages/Airdrop/components/taskElements/TasksValuesList/components/TasksValuesItem';
import { TasksValuesListContainer } from '@/pages/Airdrop/components/taskElements/TasksValuesList/styled';
import { SEASON_TASKS_DATA } from '@/pages/Airdrop/const';
import rootStore from '@/store';

const TasksValuesList = () => {
  const {
    airdropStore: { airdropPointsBalance, myRankPosition, taskTokenRank },
  } = rootStore;

  const values: Record<number, number> = {
    0: airdropPointsBalance,
    1: myRankPosition,
    2: taskTokenRank,
  };

  return (
    <TasksValuesListContainer>
      {SEASON_TASKS_DATA.map((content, index) => (
        <TasksValuesItem
          value={values[index]}
          {...content}
          key={`tasks-values-item-${index}`}
        />
      ))}
    </TasksValuesListContainer>
  );
};

export default observer(TasksValuesList);
