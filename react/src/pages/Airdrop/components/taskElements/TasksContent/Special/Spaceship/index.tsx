import { observer } from 'mobx-react-lite';
import React from 'react';

import Text from '@/components/UI/Text';

import Button from '@/pages/Airdrop/components/Button';
import TaskBottomText from '@/pages/Airdrop/components/taskElements/TaskBottomText';
import TaskContentWrapper from '@/pages/Airdrop/components/taskElements/TaskContentWrapper';
import TaskItem from '@/pages/Airdrop/components/taskElements/TaskItem';
import {
  ButtonsContainer,
  SpaceshipContainer,
} from '@/pages/Airdrop/components/taskElements/TasksContent/Special/Spaceship/styled';
import { TASKS_LIST_SPECIAL } from '@/pages/Airdrop/const';
import { useShowAirdropTaskModal } from '@/pages/Airdrop/hooks/useShowAirdropTaskModal';
import rootStore from '@/store';

const Spaceship = () => {
  const { showModal } = useShowAirdropTaskModal();
  const { type, title, basedReward: reward } = TASKS_LIST_SPECIAL[2];

  const {
    airdropStore: { isAirdropTasksAvailable, checkShipTask },
    isLoading,
  } = rootStore;

  const checkTask = async () => {
    const grant = await checkShipTask();

    grant
      ? await showModal({ type, title, reward: grant })
      : await showModal({ type: 'error', title });
  };

  return (
    <SpaceshipContainer>
      <TaskContentWrapper type={type}>
        <TaskItem>
          <Text fontSize={12} fontWeight={400}>
            The creation process begins from the moment of participation in the
            "Airdrop Season" event
          </Text>
        </TaskItem>
      </TaskContentWrapper>

      <ButtonsContainer>
        <Button
          title="Check completed"
          size="tiny"
          isFullWidth={false}
          disabled={isLoading || !isAirdropTasksAvailable}
          onClick={checkTask}
        />
      </ButtonsContainer>

      <TaskBottomText value={reward} />
    </SpaceshipContainer>
  );
};

export default observer(Spaceship);
