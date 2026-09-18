import React from 'react';
import { useNavigate } from 'react-router-dom';

import Text from '@/components/UI/Text';

import { ActivityBannerItemContainer } from '@/pages/Main/components/ActivityBannerItem/styled';
import { LargeBanner } from '@/pages/Main/const';

const ActivityBannerItem = ({ title, subTitle, image, link }: LargeBanner) => {
  const navigate = useNavigate();

  return (
    <ActivityBannerItemContainer onClick={() => navigate(link)}>
      <div>
        <Text fontSize={12} fontWeight={600}>
          {title}
        </Text>
        <Text fontSize={10} fontWeight={400}>
          {subTitle}
        </Text>
      </div>
      <img src={image} alt="" />
    </ActivityBannerItemContainer>
  );
};

export default ActivityBannerItem;
