import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import SecureLS from 'secure-ls';

import Text from '@/components/UI/Text';

import LinkIcon from '@/pages/Airdrop/assets/LinkIcon';
import Button from '@/pages/Airdrop/components/Button';
import TaskBottomText from '@/pages/Airdrop/components/taskElements/TaskBottomText';
import TaskContentWrapper from '@/pages/Airdrop/components/taskElements/TaskContentWrapper';
import TaskItem from '@/pages/Airdrop/components/taskElements/TaskItem';
import {
  ButtonsContainer,
  RegularTasksContainer,
} from '@/pages/Airdrop/components/taskElements/TasksContent/styled';
import {
  ONE_TIME_SUBSCRIBE_TASKS,
  TASK_LIST_REGULAR,
} from '@/pages/Airdrop/const';
import { useShowAirdropTaskModal } from '@/pages/Airdrop/hooks/useShowAirdropTaskModal';
import { Task5 } from '@/pages/Airdrop/types';
import rootStore from '@/store';

interface OneTimeTaskProps {
  index: number;
}

const ls = new SecureLS();

const OneTimeTaskWithLink = ({ index }: OneTimeTaskProps) => {
  const WebApp = useWebApp();
  const [isTaskOpened, setIsTaskOpened] = useState(false);
  const { showModal } = useShowAirdropTaskModal();

  const { type, title, basedReward: reward } = TASK_LIST_REGULAR[index - 4];
  const { subtitle, link, id, taskId } = ONE_TIME_SUBSCRIBE_TASKS[index];

  const {
    airdropStore: {
      airdropRegularTasks,
      tasksCompletedStatus,
      isAirdropTasksAvailable,
      checkSubscribeTask,
    },
    isLoading,
  } = rootStore;

  useEffect(() => {
    const isTaskOpened =
      ls.get(`isTask${taskId}Exist`) ||
      (airdropRegularTasks?.[index] as Task5)?.status === 1;
    setIsTaskOpened(isTaskOpened);
  }, []);

  const isCompleted =
    (tasksCompletedStatus && tasksCompletedStatus[index]) ?? false;

  const handleOpenClick = () => {
    if (!isTaskOpened) {
      ls.set(`isTask${taskId}Exist`, taskId);
      setIsTaskOpened(true);
    }

    WebApp.initData
      ? WebApp.openLink(link)
      : window.open(link as string, '_blank');
  };

  const handleCheckCompletedClick = async () => {
    const response = await checkSubscribeTask({ id: id as number });

    response
      ? await showModal({
          type,
          title,
          reward: response.grant,
          pointsReward: response.grant_point,
        })
      : await showModal({ type: 'error', title });
  };

  return (
    <RegularTasksContainer>
      {!isCompleted && (
        <>
          <TaskContentWrapper type={type}>
            <TaskItem>
              <Text fontSize={12} fontWeight={500}>
                {subtitle}
              </Text>
            </TaskItem>
          </TaskContentWrapper>

          <ButtonsContainer>
            <Button
              title="Link"
              icon={<LinkIcon />}
              buttonType="outlined"
              size="tiny"
              maxWidth="120px"
              withShadow={false}
              onClick={handleOpenClick}
            />
            <Button
              title="Check completed"
              size="tiny"
              maxWidth="120px"
              disabled={isLoading || !isAirdropTasksAvailable || !isTaskOpened}
              onClick={handleCheckCompletedClick}
            />
          </ButtonsContainer>
        </>
      )}

      <TaskBottomText value={reward} isCompleted={isCompleted} />
    </RegularTasksContainer>
  );
};

export default observer(OneTimeTaskWithLink);
