import { observer } from 'mobx-react-lite';
import React from 'react';

import Text from '@/components/UI/Text';

import { useGetUserInitData } from '@/hooks/useGetUserInitData';
import mockAvatar from '@/pages/Main/assets/mock-avatar.png';
import Activity from '@/pages/Main/components/Activity';
import Balance from '@/pages/Main/components/Balance';
import News from '@/pages/Main/components/News';
import {
  MainPageContainer,
  MainPageWrapper,
  Profile,
} from '@/pages/Main/styled';
import rootStore from '@/store';

const Main = () => {
  const {
    userStore: { userInitData },
  } = rootStore;

  const { isUserDataExist, isAvatarExist, photo_url, id, username } =
    useGetUserInitData(userInitData);

  return (
    <MainPageWrapper>
      <MainPageContainer>
        <Profile $isVisible={isUserDataExist}>
          <img src={isAvatarExist ? photo_url : mockAvatar} alt="" />

          <div>
            <Text fontSize={10} fontWeight={500}>
              Welcome back
            </Text>
            <Text fontSize={12} fontWeight={600}>
              {username ? `@${username}` : `id: ${id}`}
            </Text>
          </div>
        </Profile>

        <Balance />
        <Activity />
        <News />
      </MainPageContainer>
    </MainPageWrapper>
  );
};

export default observer(Main);
