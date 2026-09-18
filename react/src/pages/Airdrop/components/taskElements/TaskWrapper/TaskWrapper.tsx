import {
  useHapticFeedback,
  useWebApp,
} from '@vkruglikov/react-telegram-web-app';
import { observer } from 'mobx-react-lite';
import React, { ReactNode, useState } from 'react';
import { css } from 'styled-components/macro';
import { useDebouncedCallback } from 'use-debounce';

import Text from '@/components/UI/Text';

import CompleteBarIcon from '@/pages/Airdrop/assets/CompleteBarIcon';
import NotCompletedBarIcon from '@/pages/Airdrop/assets/NotCompletedBarIcon';
import TaskBottomText from '@/pages/Airdrop/components/taskElements/TaskBottomText';
import ArrowIcon from '@/pages/Airdrop/components/taskElements/TaskWrapper/assets/ArrowIcon';
import TopBlock from '@/pages/Airdrop/components/taskElements/TaskWrapper/assets/TopBlock';
import {
  Bar,
  ContentContainer,
  Cover,
  ExpandButtonContainer,
  Line,
  MainContainer,
  MainContentContainer,
  ProgressContainer,
  TaskWrapperContainer,
  TitleContainer,
  TopLayer,
  TopLayerContainer,
} from '@/pages/Airdrop/components/taskElements/TaskWrapper/styled';
import {
  TASKS_DATA,
  TASKS_LIST_SPECIAL,
  TASK_COVER,
  TASK_LIST_REGULAR,
} from '@/pages/Airdrop/const';
import { useShowAirdropTaskModal } from '@/pages/Airdrop/hooks/useShowAirdropTaskModal';
import { RewardAmount, TaskType } from '@/pages/Airdrop/types';
import rootStore from '@/store';

interface TaskWrapperProps {
  type: TaskType;
  title: string;
  content: ReactNode;
  basedReward: RewardAmount;
  index: number;
  isWithProgress?: boolean;
}

const TaskWrapper = ({
  type,
  title,
  content,
  basedReward,
  index,
  isWithProgress,
}: TaskWrapperProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isClosed, setIsClosed] = useState(false);
  const WebApp = useWebApp();
  const [impactOccurred] = useHapticFeedback();
  const { showModal } = useShowAirdropTaskModal();

  const {
    airdropStore: { tasksCompletedStatus, taskProgressBarCompletedStatus },
    isVibrateActive,
  } = rootStore;

  const isFirstIndex = index === TASKS_LIST_SPECIAL.length + 1;
  const isLastIndex =
    index === TASK_LIST_REGULAR.length + TASKS_LIST_SPECIAL.length;

  const isTaskCompleted =
    type !== 'recurring' ? !!tasksCompletedStatus?.[index] : false;

  const lastCompletedTaskIndex = Object.values(
    taskProgressBarCompletedStatus ?? {},
  ).indexOf(false);

  const closedTaskIndex =
    (lastCompletedTaskIndex === -1
      ? TASK_LIST_REGULAR.length + TASKS_LIST_SPECIAL.length
      : lastCompletedTaskIndex) + 1;

  const isAllTasksCompleted =
    closedTaskIndex - 1 ===
    TASK_LIST_REGULAR.length + TASKS_LIST_SPECIAL.length;

  const isBarWithoutBg = isAllTasksCompleted ? false : index >= closedTaskIndex;

  const debouncedClose = useDebouncedCallback(
    () => setIsClosed((prev) => !prev),
    400,
  );

  const toggleClick = () => {
    setIsOpen((prev) => !prev);
    isClosed ? setIsClosed(false) : debouncedClose();
  };

  const handleCoverClick = async () => {
    if (isVibrateActive) {
      if (WebApp.initData) {
        impactOccurred('medium');
      }

      if (!WebApp.initData && 'vibrate' in window.navigator) {
        window.navigator.vibrate(30);
      }
    }

    await showModal({
      type: 'lock',
      title:
        TASK_LIST_REGULAR[closedTaskIndex - TASKS_LIST_SPECIAL.length - 1]
          .title,
    });
  };

  return (
    <TaskWrapperContainer $isWithProgress={!!isWithProgress}>
      {index > closedTaskIndex ? (
        <div onClick={handleCoverClick}>
          <Cover src={TASK_COVER[basedReward]} alt="" />
        </div>
      ) : (
        <MainContainer>
          <TitleContainer $bg={TASKS_DATA[type].color}>
            <span />
            <Text fontSize={11} fontWeight={400}>
              {TASKS_DATA[type].title}
            </Text>
          </TitleContainer>

          <TopLayerContainer>
            <TopBlock />
            <TopLayer $bg={TASKS_DATA[type].color} />
          </TopLayerContainer>

          <ContentContainer>
            <Text fontSize={16} fontWeight={500}>
              {title}
            </Text>

            {isTaskCompleted ? (
              <TaskBottomText value={basedReward} isCompleted marginTop={12} />
            ) : (
              <>
                <MainContentContainer $isOpen={isOpen}>
                  {!isClosed && content}
                </MainContentContainer>

                {type === 'special' && (
                  <ExpandButtonContainer $isOpen={isOpen}>
                    <div />
                    <button onClick={toggleClick}>
                      <ArrowIcon />
                    </button>
                    <div />
                  </ExpandButtonContainer>
                )}
              </>
            )}
          </ContentContainer>
        </MainContainer>
      )}

      {isWithProgress && index && (
        <ProgressContainer>
          <Bar
            $isWithBg={!isFirstIndex}
            $isWithOpacity={
              isAllTasksCompleted ? false : closedTaskIndex === index
            }
            $isWithoutBg={isBarWithoutBg}
          >
            {index < closedTaskIndex ? (
              <CompleteBarIcon />
            ) : (
              <NotCompletedBarIcon />
            )}
          </Bar>

          <Bar
            $isWithBg={!isLastIndex}
            $isWithOpacity={
              isAllTasksCompleted ? false : closedTaskIndex - 1 === index
            }
            $isWithoutBg={isBarWithoutBg}
          >
            <Line $isWithoutBg={index > closedTaskIndex} />

            <Text
              fontSize={12}
              fontWeight={600}
              styledFragment={css`
                color: ${isBarWithoutBg ? 'rgba(255,255,255,0.4)' : '#2eff73'};
              `}
            >
              {index - TASKS_LIST_SPECIAL.length}
            </Text>
          </Bar>
        </ProgressContainer>
      )}
    </TaskWrapperContainer>
  );
};

export default observer(TaskWrapper);
