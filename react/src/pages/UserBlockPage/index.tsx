import { observer } from 'mobx-react-lite';
import React from 'react';

import IllustrationTopLayout from '@/assets/decorations/IllustrationTopLayout.png';

import Text from '@/components/UI/Text';

import BumpIcon from '@/pages/MultiWalletPage/assets/BumpIcon';
import InfoIcon from '@/pages/UserBlockPage/assets/InfoIcon';
import mainImage from '@/pages/UserBlockPage/assets/image.png';
import {
  IllustrationTop,
  LogoContainer,
  TitleContainer,
  UserBlockPageContainer,
} from '@/pages/UserBlockPage/styled';
import rootStore from '@/store';

const UserBlockPage = () => {
  const {
    userStore: { isRoadmapShowed },
  } = rootStore;

  if (!isRoadmapShowed) return null;

  return (
    <UserBlockPageContainer>
      <IllustrationTop
        src={IllustrationTopLayout}
        rel="preload"
        data-tooltip-id="tasks-claim-modal"
      />

      <TitleContainer>
        <InfoIcon />
        <Text fontSize={16} fontWeight={600}>
          User is blocked
        </Text>
        <div>
          <Text fontSize={12} fontWeight={400}>
            He got thrown into open space! Now he’s trying
          </Text>
          <Text fontSize={12} fontWeight={400}>
            to find his way back through the galaxy
          </Text>
        </div>
      </TitleContainer>

      <img src={mainImage} alt="" rel="preload" />

      <LogoContainer>
        <div>
          <Text fontSize={8} fontWeight={500}>
            Beta
          </Text>
        </div>
        <BumpIcon />
      </LogoContainer>
    </UserBlockPageContainer>
  );
};

export default observer(UserBlockPage);
