import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Text from '@/components/UI/Text';

import MmproIcon from '@/pages/Airdrop/assets/MmproIcon';
import Button from '@/pages/Airdrop/components/Button';
import TaskBottomText from '@/pages/Airdrop/components/taskElements/TaskBottomText';
import TaskContentWrapper from '@/pages/Airdrop/components/taskElements/TaskContentWrapper';
import TaskItem from '@/pages/Airdrop/components/taskElements/TaskItem';
import {
  Break,
  ButtonsContainer,
  DottedList,
  RegularTasksContainer,
} from '@/pages/Airdrop/components/taskElements/TasksContent/styled';
import { COMMON_TASKS, TASK_LIST_REGULAR } from '@/pages/Airdrop/const';
import { useShowAirdropTaskModal } from '@/pages/Airdrop/hooks/useShowAirdropTaskModal';
import { RegRecurringTask, Task11 } from '@/pages/Airdrop/types';
import rootStore from '@/store';

interface CustomTaskProps {
  index: number;
}

const CommonTask = ({ index }: CustomTaskProps) => {
  const navigate = useNavigate();
  const { showModal } = useShowAirdropTaskModal();

  const { type, title, basedReward } = TASK_LIST_REGULAR[index - 4];
  const { subtitle, button, reward } = COMMON_TASKS[index];

  const {
    userStore: { mmproPointsBalance },
    airdropStore: {
      airdropRegularTasks,
      isAirdropTasksAvailable,
      checkCommonTask,
    },
    isLoading,
  } = rootStore;

  const accumulatedValue =
    (airdropRegularTasks?.[11] as Task11)?.accamulated ?? 0;
  const isShipPartsExist =
    (airdropRegularTasks?.[12] as RegRecurringTask)?.is_exist ?? false;
  const isFriendsExist =
    (airdropRegularTasks?.[13] as RegRecurringTask)?.is_exist ?? false;
  const isOgPassExist =
    (airdropRegularTasks?.[15] as RegRecurringTask)?.is_exist ?? false;
  const isMintedShipExist =
    (airdropRegularTasks?.[16] as RegRecurringTask)?.is_exist ?? false;

  const totalEarned =
    (airdropRegularTasks?.[index] as Task11 | RegRecurringTask)?.total_earned ??
    0;

  const isDisabled =
    (index === 11 &&
      (totalEarned
        ? accumulatedValue < 50_000_000
        : mmproPointsBalance < 500_000_000)) ||
    (index === 12 && !isShipPartsExist) ||
    (index === 13 && !isFriendsExist) ||
    (index === 15 && !isOgPassExist) ||
    (index === 16 && !isMintedShipExist) ||
    isLoading ||
    !isAirdropTasksAvailable;

  const handleButtonClick = () => {
    if (!button?.link) return;
    navigate(button?.link as string);
  };

  const handleCheckCompletedClick = async () => {
    const response = await checkCommonTask({ index });

    response && response.grant
      ? await showModal({
          type,
          title,
          reward: response.grant,
        })
      : await showModal({ type: 'error', title });
  };

  return (
    <RegularTasksContainer>
      <TaskContentWrapper type={type}>
        <TaskItem paddingRight={[11, 17].includes(index) ? '10px' : '10vw'}>
          <Text fontSize={12} fontWeight={500}>
            {subtitle}
          </Text>
        </TaskItem>

        {index === 11 && (
          <DottedList>
            <li>
              <Text fontSize={12} fontWeight={400}>
                <span>Initial reward: </span>Your total balance ÷ 500,000,000.
              </Text>
            </li>
            <li>
              <Text fontSize={12} fontWeight={400}>
                <span>Next rewards: </span>For every 50,000,000 points farmed.
              </Text>
            </li>
          </DottedList>
        )}
      </TaskContentWrapper>

      {index === 11 && (
        <TaskBottomText
          title="Accumulated"
          value={accumulatedValue}
          icon={<MmproIcon />}
          currency=""
        />
      )}

      <ButtonsContainer>
        <Button
          title="Claim Reward"
          size="tiny"
          maxWidth="120px"
          disabled={isDisabled}
          onClick={handleCheckCompletedClick}
        />

        {button && (
          <Button
            title={button.title}
            buttonType="outlined"
            size="tiny"
            maxWidth="120px"
            withShadow={false}
            onClick={handleButtonClick}
          />
        )}
      </ButtonsContainer>

      {!!(type === 'recurring' && reward) && (
        <>
          <TaskBottomText title={reward} value={basedReward} />
          <Break />
          <TaskBottomText title="Total earned" value={totalEarned} />
        </>
      )}
      {type === 'oneTime' && <TaskBottomText value={basedReward} />}
    </RegularTasksContainer>
  );
};

export default observer(CommonTask);
