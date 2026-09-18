import { observer } from 'mobx-react-lite';
import React from 'react';

import { GrantRewardBoxContainer } from '@/components/GrantRewardBox/styled';

import boxImg from './assets/topImg.png';
import { useGetPathname } from '@/hooks/useGetPathname';
import rootStore from '@/store';

const GrantRewardBox = () => {
  const {
    userStore: { isGrantBoxVisible, addGrantRewardModalVisible },
  } = rootStore;

  const { isAnnouncementPage, isTutorialPage } = useGetPathname();

  if (isAnnouncementPage || isTutorialPage) return null;

  return (
    <GrantRewardBoxContainer
      $isVisible={isGrantBoxVisible}
      onClick={addGrantRewardModalVisible}
    >
      <img src={boxImg} alt="" />
    </GrantRewardBoxContainer>
  );
};

export default observer(GrantRewardBox);
