import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import InfoTooltip from '@/components/InfoTooltip';

import { useGetMode } from '@/hooks/useGetMode';
import { useGetPathname } from '@/hooks/useGetPathname';
import NavigationButton from '@/pages/Nfts/components/NavigationButton';
import { NAV_DATA_WITH_KOLS } from '@/pages/Tasks/const';
import TaskIndicator from '@/pages/Tasks/sections/pages/TasksPages/TaskIndicator';
import {
  ButtonWrapper,
  ButtonsContainer,
  StyledBoosters,
  SubTitle,
  Title,
} from '@/pages/Tasks/styled';
import rootStore from '@/store';

const Tasks = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { isCommunityPage, isKolsPage } = useGetPathname();
  const { isProdMode, isStageMode } = useGetMode();

  const {
    tasksStore: {
      taskClaim,
      tasks,
      kolsTasks,
      communityTasks,
      deleteAllTasks,
      isShowTooltip,
      getTasks,
    },
    isLoading,
  } = rootStore;

  const formattedTasksClaim = Number(taskClaim).toLocaleString('ru-RU') || 0;
  const tasksAvailable =
    tasks?.filter((task) => task.status === 'possible' && !!task.is_active)
      ?.length ?? 0;
  const kolsAvailable = kolsTasks?.length ?? 0;
  const communityAvailable = communityTasks?.length ?? 0;

  useEffect(() => {
    void getTasks();
  }, []);

  return isCommunityPage || isKolsPage ? (
    <StyledBoosters $isLoading={isLoading}>
      <Title
        onClick={
          isProdMode || isStageMode ? () => null : () => deleteAllTasks()
        }
      >
        {tasksAvailable} tasks available
      </Title>
      <SubTitle>
        We’ll reward you immediately with points after completion each task
      </SubTitle>

      <InfoTooltip
        isShowTooltip={isShowTooltip}
        tooltipId="tasks-claim-modal"
        width="calc(100% - 20px)"
      >
        {taskClaim && (
          <>
            You Got{' '}
            <span style={{ fontWeight: 600 }}>+{formattedTasksClaim}</span>{' '}
            MMPro Points
          </>
        )}
      </InfoTooltip>

      <ButtonsContainer>
        {NAV_DATA_WITH_KOLS.map((navigateItem, index) => (
          <ButtonWrapper key={`tasks-nav-buttons-${index}`}>
            {navigateItem.type === 'with-indicator' && (
              <>
                {kolsAvailable > 0 && navigateItem.title === 'KOLs' && (
                  <TaskIndicator count={kolsAvailable} />
                )}

                {communityAvailable > 0 &&
                  navigateItem.title === 'Community' && (
                    <TaskIndicator count={communityAvailable} />
                  )}
              </>
            )}
            <NavigationButton
              key={`navigateTasksPageItem-${index}`}
              onClick={() => navigate(navigateItem.navigatePath)}
              isActive={pathname === navigateItem.navigatePath}
              size="medium"
            >
              {navigateItem.title}
            </NavigationButton>
          </ButtonWrapper>
        ))}
      </ButtonsContainer>

      <Outlet />
    </StyledBoosters>
  ) : (
    <Outlet />
  );
};

export default observer(Tasks);
