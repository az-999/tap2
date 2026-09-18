import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import IllustrationTopLayout from '@/assets/decorations/IllustrationTopLayout.png';

import BackButton from '@/components/BackButton';
import Text from '@/components/UI/Text';

import InfoIcon from '@/pages/Airdrop/assets/InfoIcon';
import SeasonIcon from '@/pages/Airdrop/assets/SeasonIcon';
import Button from '@/pages/Airdrop/components/Button';
import InformationBlock from '@/pages/Airdrop/components/InformationBlock';
import Title from '@/pages/Airdrop/components/InformationBlock/components/Title';
import TypesOfTasks from '@/pages/Airdrop/components/InformationBlock/components/TypesOfTasks';
import TaskWrapper from '@/pages/Airdrop/components/taskElements/TaskWrapper/TaskWrapper';
import TasksValuesList from '@/pages/Airdrop/components/taskElements/TasksValuesList';
import { TASKS_LIST_SPECIAL, TASK_LIST_REGULAR } from '@/pages/Airdrop/const';
import {
  ButtonsContainer,
  SeasonTasksPageContainer,
  TaskTitle,
  TasksListContainer,
  TitleContainer,
} from '@/pages/Airdrop/pages/SeasonTasks/styled';
import { IllustrationTop } from '@/pages/Airdrop/styled';
import { defaultSweetAlertOptions } from '@/pages/Airdrop/sweetAlertOptions';
import { AirdropPath, AppPath } from '@/types/routes';

const SeasonTasksPage = () => {
  const navigate = useNavigate();

  const handleRatingButtonClick = () =>
    navigate(`${AppPath.airdrop}/${AirdropPath.airdropRating}`);

  const handleHowItWorkButtonClick = () =>
    navigate(`${AppPath.airdrop}/${AirdropPath.howItWork}`);

  const handleInfoButtonClick = async () => {
    await withReactContent(Swal).fire({
      ...defaultSweetAlertOptions,
      html: (
        <InformationBlock
          content={<TypesOfTasks size="small" />}
          size="small"
        />
      ),
    });
  };

  return (
    <SeasonTasksPageContainer>
      <IllustrationTop src={IllustrationTopLayout} rel="preload" />
      <BackButton delta={-1} />

      <TitleContainer>
        <SeasonIcon />
        <Text fontSize={24} fontWeight={700}>
          Season Tasks
        </Text>
        <div>
          <Text fontSize={12} fontWeight={400}>
            Complete tasks and advance your season
          </Text>
          <Text fontSize={12} fontWeight={400}>
            progress by earning points
          </Text>
        </div>
      </TitleContainer>

      <TasksValuesList />

      <ButtonsContainer>
        <Button title="Rating" onClick={handleRatingButtonClick} />
        <Button
          title="How does it work?"
          buttonType="outlined"
          withShadow={false}
          onClick={handleHowItWorkButtonClick}
        />
      </ButtonsContainer>

      <TasksListContainer>
        <TaskTitle>
          <div>
            <Text fontSize={12} fontWeight={400}>
              Task Types
            </Text>
            <button onClick={handleInfoButtonClick}>
              <InfoIcon />
            </button>
          </div>

          <div>
            <Title type="special" />
            <Title type="oneTime" />
            <Title type="recurring" />
          </div>
        </TaskTitle>

        {TASKS_LIST_SPECIAL.map(({ id, ...content }, i) => (
          <TaskWrapper key={id} {...content} index={i + 1} />
        ))}

        <div>
          {TASK_LIST_REGULAR.map(({ id, ...content }, i) => (
            <TaskWrapper
              key={id}
              {...content}
              isWithProgress
              index={i + 1 + TASKS_LIST_SPECIAL.length}
            />
          ))}
        </div>
      </TasksListContainer>
    </SeasonTasksPageContainer>
  );
};

export default SeasonTasksPage;
