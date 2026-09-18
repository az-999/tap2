import React from 'react';

import Text from '@/components/UI/Text';

import logo from '@/pages/Main/assets/bump-logo.png';
import { NewsItemContainer } from '@/pages/Main/components/NewsItem/styled';
import { News } from '@/pages/Main/const';

const NewsItem = ({ title, subtitle, image }: News) => {
  return (
    <NewsItemContainer>
      <div>
        <img src={logo} alt="" />

        <div>
          <Text fontSize={14} fontWeight={600}>
            {title}
          </Text>
          <Text fontSize={8} fontWeight={400}>
            {subtitle}
          </Text>
        </div>
      </div>
      <img src={image} alt="" />
    </NewsItemContainer>
  );
};

export default NewsItem;
