import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Text from '@/components/UI/Text';

import { ActivityLinkContainer } from '@/pages/Main/components/ActivityLink/styled';
import { Banner } from '@/pages/Main/const';
import TaskIndicator from '@/pages/Tasks/sections/pages/TasksPages/TaskIndicator';
import rootStore from '@/store';

const ActivityLink = ({ title, image, link }: Banner) => {
  const navigate = useNavigate();

  const {
    tasksStore: { communityTasks, kolsTasks },
  } = rootStore;

  const kolsAvailable = kolsTasks?.length ?? 0;
  const communityAvailable = communityTasks?.length ?? 0;

  return (
    <ActivityLinkContainer onClick={() => navigate(link)}>
      {title === 'Tasks' && (
        <TaskIndicator count={kolsAvailable + communityAvailable} />
      )}

      <img src={image} alt="" />
      <div>
        <Text fontSize={12} fontWeight={500}>
          {title}
        </Text>
      </div>
    </ActivityLinkContainer>
  );
};

export default observer(ActivityLink);
