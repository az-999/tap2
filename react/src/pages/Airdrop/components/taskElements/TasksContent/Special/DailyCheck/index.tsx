import { observer } from 'mobx-react-lite';
import React from 'react';

import Text from '@/components/UI/Text';

import Button from '@/pages/Airdrop/components/Button';
import DotBox from '@/pages/Airdrop/components/taskElements/DotBox';
import TaskBottomText from '@/pages/Airdrop/components/taskElements/TaskBottomText';
import TaskContentWrapper from '@/pages/Airdrop/components/taskElements/TaskContentWrapper';
import TaskItem from '@/pages/Airdrop/components/taskElements/TaskItem';
import Timer from '@/pages/Airdrop/components/taskElements/TasksContent/Special/DailyCheck/components /Timer';
import {
  DailyCheckContainer,
  DailyCount,
  RewardsList,
  SubmitButtonContainer,
} from '@/pages/Airdrop/components/taskElements/TasksContent/Special/DailyCheck/styled';
import { Break } from '@/pages/Airdrop/components/taskElements/TasksContent/styled';
import { TASKS_LIST_SPECIAL } from '@/pages/Airdrop/const';
import { useShowAirdropTaskModal } from '@/pages/Airdrop/hooks/useShowAirdropTaskModal';
import { Task2 } from '@/pages/Airdrop/types';
import rootStore from '@/store';

const DailyCheck = () => {
  const { type, title, basedReward: reward } = TASKS_LIST_SPECIAL[1];

  const {
    airdropStore: {
      isAirdropTasksAvailable,
      airdropSpecialTasks,
      claimDailyTask,
      dailyTaskTime,
    },
    isLoading,
  } = rootStore;

  const { showModal } = useShowAirdropTaskModal();

  const taskData = airdropSpecialTasks?.[2] as Task2;
  const day = taskData?.day ?? 0;
  const totalEarned = taskData?.total_earned ?? 0;

  const claimReward = async () => {
    const grant = await claimDailyTask();

    grant
      ? await showModal({ type, title, reward: grant })
      : await showModal({ type: 'error', title });
  };

  return (
    <DailyCheckContainer>
      <TaskContentWrapper type={type}>
        <TaskItem paddingRight="12vw">
          <Text fontSize={12} fontWeight={400}>
            Open the Season Tasks menu and press the button to log your visit
            and claim your reward!{' '}
            <span id="strong">Complete 10, 20, or 30 visits during</span> the
            season to unlock extra rewards!
          </Text>
        </TaskItem>
      </TaskContentWrapper>

      <RewardsList>
        <Text fontSize={12} fontWeight={600}>
          Extra rewards:
        </Text>
        {new Array(3).fill(null).map((_, i) => (
          <DotBox
            key={`daily-reward-${i}`}
            title={`${i + 1}0 visits: +${i + 1}0`}
          />
        ))}
        <DailyCount>
          <Text fontSize={12} fontWeight={600}>
            Visits
          </Text>
          <Text fontSize={13} fontWeight={700}>
            <span style={{ color: '#2EFF73' }}>{day}</span> / 30
          </Text>
        </DailyCount>
      </RewardsList>

      <SubmitButtonContainer>
        <Button
          title="Check in Visit"
          size="tiny"
          isFullWidth={false}
          disabled={isLoading || !isAirdropTasksAvailable || !!dailyTaskTime}
          onClick={claimReward}
        />
        <Timer />
      </SubmitButtonContainer>

      <TaskBottomText value={reward} />
      <Break />
      <TaskBottomText title="Total earned" value={totalEarned} />
    </DailyCheckContainer>
  );
};

export default observer(DailyCheck);
