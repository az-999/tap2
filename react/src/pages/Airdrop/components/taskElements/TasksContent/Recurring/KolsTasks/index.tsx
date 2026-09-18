import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Text from '@/components/UI/Text';

import Button from '@/pages/Airdrop/components/Button';
import TaskBottomText from '@/pages/Airdrop/components/taskElements/TaskBottomText';
import TaskContentWrapper from '@/pages/Airdrop/components/taskElements/TaskContentWrapper';
import TaskItem from '@/pages/Airdrop/components/taskElements/TaskItem';
import {
  Break,
  ButtonsContainer,
  RegularTasksContainer,
} from '@/pages/Airdrop/components/taskElements/TasksContent/styled';
import { TASK_LIST_REGULAR } from '@/pages/Airdrop/const';
import { useShowAirdropTaskModal } from '@/pages/Airdrop/hooks/useShowAirdropTaskModal';
import { Task4 } from '@/pages/Airdrop/types';
import rootStore from '@/store';
import { AppPath, TasksPath } from '@/types/routes';

const KolsTasks = () => {
  const navigate = useNavigate();
  const { type, title, basedReward: reward } = TASK_LIST_REGULAR[0];

  const {
    airdropStore: {
      isAirdropTasksAvailable,
      airdropRegularTasks,
      checkKolsTask,
    },
    isLoading,
  } = rootStore;

  const { showModal } = useShowAirdropTaskModal();

  const taskData = airdropRegularTasks?.[4] as Task4;
  const tasksCount = taskData?.count ?? 0;
  const totalEarned = taskData?.task4_total_earned ?? 0;

  const claimReward = async () => {
    const grant = await checkKolsTask();

    grant
      ? await showModal({ type, title, reward: grant })
      : await showModal({ type: 'error', title });
  };

  return (
    <RegularTasksContainer>
      <TaskContentWrapper type={type}>
        <TaskItem>
          <Text fontSize={12} fontWeight={600}>
            Complete a task
          </Text>
        </TaskItem>
      </TaskContentWrapper>

      <ButtonsContainer>
        <Button
          title="Go to KOLs"
          size="tiny"
          buttonType="outlined"
          isFullWidth={false}
          withShadow={false}
          onClick={() => navigate(`${AppPath.tasks}/${TasksPath.kols}`)}
        />
        <Button
          title="Claim Reward"
          size="tiny"
          isFullWidth={false}
          disabled={isLoading || !isAirdropTasksAvailable || !tasksCount}
          onClick={claimReward}
        />
      </ButtonsContainer>

      <TaskBottomText title="Based Reward" value={reward} />
      <Break />
      <TaskBottomText title="Total earned" value={totalEarned} />
    </RegularTasksContainer>
  );
};

export default observer(KolsTasks);
