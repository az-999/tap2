import React from 'react';

import Text from '@/components/UI/Text';

import LeftBottomAngle from '@/pages/Announcement/assets/LeftBottomAngle';
import LeftTopAngle from '@/pages/Announcement/assets/LeftTopAngle';
import RightBottomAngle from '@/pages/Announcement/assets/RightBottomAngle';
import RightTopAngle from '@/pages/Announcement/assets/RightTopAngle';
import topImage from '@/pages/Announcement/assets/earn-1.png';
import bottomImage from '@/pages/Announcement/assets/earn-2.png';
import bg from '@/pages/Announcement/assets/earn-points-bg.png';
import {
  ContentContainer,
  Slide,
  StyledImage,
} from '@/pages/Announcement/components/EarnPoints/styled';

const EarnPoints = () => {
  return (
    <Slide>
      <StyledImage src={bg} alt="" />

      <ContentContainer>
        <div>
          <LeftTopAngle />
          <RightTopAngle />

          <Text fontSize={17} fontWeight={500}>
            Easy
          </Text>
          <Text fontSize={30} fontWeight={700}>
            Earn Points
          </Text>
        </div>

        <img src={topImage} alt="" id="top-earn-image" />
      </ContentContainer>

      <ContentContainer>
        <div>
          <LeftBottomAngle />
          <RightBottomAngle />

          <Text fontSize={17} fontWeight={500}>
            Easy
          </Text>
          <Text fontSize={30} fontWeight={700}>
            Earn TON
          </Text>
        </div>

        <img src={bottomImage} alt="" id="bottom-earn-image" />
      </ContentContainer>
    </Slide>
  );
};

export default EarnPoints;
