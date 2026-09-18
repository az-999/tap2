import React from 'react';

import Text from '@/components/UI/Text';

import {
  ActivityContainer,
  ActivityList,
  BannersList,
  LargeBannersList,
} from '@/pages/Main/components/Activity/styled';
import ActivityBannerItem from '@/pages/Main/components/ActivityBannerItem';
import ActivityLink from '@/pages/Main/components/ActivityLink';
import { PAGE_DATA } from '@/pages/Main/const';

const Activity = () => (
  <ActivityContainer>
    <Text fontSize={12} fontWeight={500}>
      Activity
    </Text>

    <ActivityList>
      <LargeBannersList>
        {PAGE_DATA.activity.largeBanners.map(({ id, ...data }) => (
          <ActivityBannerItem key={id} {...data} />
        ))}
      </LargeBannersList>

      <BannersList>
        {PAGE_DATA.activity.regularBanners.map(({ id, ...data }) => (
          <ActivityLink key={id} {...data} />
        ))}
      </BannersList>
    </ActivityList>
  </ActivityContainer>
);

export default Activity;
