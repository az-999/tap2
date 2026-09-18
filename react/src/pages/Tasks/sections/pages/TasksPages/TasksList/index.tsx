import {
  useHapticFeedback,
  useWebApp,
} from '@vkruglikov/react-telegram-web-app';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
import SecureLS from 'secure-ls';
import { useDebouncedCallback } from 'use-debounce';

import LoadingIcon from '@/assets/LoadingIcon';

import Modal from '@/components/Modal';
import Text from '@/components/UI/Text';

import nprogressInstance from '@/nprogressInstance';
import CloseArrowIcon from '@/pages/Tasks/sections/assets/partners/CloseArrowIcon';
import ModalContent from '@/pages/Tasks/sections/pages/TasksPages/ModalContent';
import NoTasksMessage from '@/pages/Tasks/sections/pages/TasksPages/NoTasksMessage';
import TaskCard from '@/pages/Tasks/sections/pages/TasksPages/TaskCard';
import {
  ArchiveButton,
  IconWrapper,
  LoadingContainer,
  TasksContainer,
} from '@/pages/Tasks/styled';
import { Task } from '@/pages/Tasks/types';
import rootStore from '@/store';

interface TasksListProps {
  tasks: Task[] | null;
  page: string;
  archiveTasks?: Task[];
  isLoading?: boolean;
}

const ls = new SecureLS();

const TasksList = ({
  tasks,
  archiveTasks,
  isLoading,
  page,
}: TasksListProps) => {
  const [impactOccurred] = useHapticFeedback();
  const WebApp = useWebApp();

  const scrollRef = useRef<HTMLDivElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isNoTasksMessageVisible, setIsNoTasksMessageVisible] = useState(false);
  const [isArchiveTasksVisible, setIsArchiveTasksVisible] = useState(false);

  const noMessageRule =
    (!tasks || (tasks && tasks.length === 0)) && !isArchiveTasksVisible;
  const debouncedSetNoTasksMessage = useDebouncedCallback((state: boolean) => {
    setIsNoTasksMessageVisible(state);
  }, 150);

  const {
    tasksStore: {
      checkTask,
      clearConfettiExploding,
      updateCurrentTask,
      checkWatchAddTask,
      setIsMonetagTaskWatched,
    },
    isVibrateActive,
  } = rootStore;

  useEffect(() => {
    if (isArchiveTasksVisible) {
      const timer = setTimeout(
        () =>
          scrollRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          }),
        100,
      );

      return () => clearTimeout(timer);
    }
  }, [isArchiveTasksVisible]);

  /** задержка показа сообщения об отсутствии активных тасок */
  useEffect(() => {
    noMessageRule
      ? debouncedSetNoTasksMessage(true)
      : setIsNoTasksMessageVisible(false);
  }, [tasks, isArchiveTasksVisible]);

  /** проверяем, что у нас есть переход с модалки extra task
   * и если да, то сразу открываем модалку проверки таски*/
  useEffect(() => {
    /*todo поменять на нужный id*/
    if (!ls.get(`isExtraTask${458}InProgress`) || !tasks) return;

    const task = tasks?.find((task) => task.id === 458);

    if (task) {
      setIsModalOpen(true);
      setActiveTask(task);
    }
  }, [tasks]);

  const handleTaskCheckClick = async (task: Task) => {
    nprogressInstance.start();

    const isSuccess =
      task.design_id === 11
        ? await checkWatchAddTask()
        : await checkTask(task.id);

    if (isSuccess && isVibrateActive) {
      if (WebApp.initData) {
        impactOccurred('medium'); // вибрация
      }

      if (!WebApp.initData && 'vibrate' in window.navigator) {
        window.navigator.vibrate(30);
      }
    }

    setIsMonetagTaskWatched(false);
    ls.remove(`isExtraTask${458}InProgress`);
    nprogressInstance.done();
  };

  const handleOpenModal = (task: Task) => {
    setIsModalOpen(true);
    clearConfettiExploding();
    setActiveTask(task);
  };

  return (
    <>
      <>
        {isLoading && (
          <LoadingContainer>
            <LoadingIcon />
          </LoadingContainer>
        )}

        {!isLoading && (
          <>
            {tasks && tasks.length > 0 && (
              <TasksContainer $isVisible>
                {tasks?.map((task, index) => (
                  <TaskCard
                    key={`actual-task-${task.id}-${index}`}
                    task={task}
                    isActive={task.status !== 'possible'}
                    onOpenModal={handleOpenModal}
                    activeTask={activeTask?.id}
                  />
                ))}
              </TasksContainer>
            )}

            {archiveTasks && archiveTasks.length > 0 && (
              <>
                <ArchiveButton
                  onClick={() => setIsArchiveTasksVisible((prev) => !prev)}
                >
                  <Text fontSize={15} fontWeight={400}>
                    Archive Task
                  </Text>
                  <IconWrapper $isVisible={isArchiveTasksVisible}>
                    <CloseArrowIcon />
                  </IconWrapper>
                </ArchiveButton>

                <TasksContainer $isVisible={isArchiveTasksVisible}>
                  <div ref={scrollRef} />

                  {archiveTasks?.map((task, index) => (
                    <TaskCard
                      key={`archive-task-${task.id}-${index}`}
                      task={task}
                      isActive={task.status !== 'possible'}
                      onOpenModal={handleOpenModal}
                    />
                  ))}
                </TasksContainer>
              </>
            )}

            {isNoTasksMessageVisible && <NoTasksMessage page={page} />}
          </>
        )}
      </>

      {activeTask && (
        <Modal
          isActive={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            updateCurrentTask(null);
            ls.remove(`isExtraTask${458}InProgress`);
          }}
        >
          <ModalContent
            task={activeTask}
            onClick={async () => {
              await handleTaskCheckClick(activeTask);
              setIsModalOpen(false);
            }}
            setIsModalOpen={setIsModalOpen}
          />
        </Modal>
      )}
    </>
  );
};

export default observer(TasksList);
