import React, { RefObject } from 'react';

import Text from '@/components/UI/Text';

import { SwiperRef } from '@/pages/Ships/pages/ShipsCraftPage/components/ShipsCraft';
import LeftArrow from '@/pages/Tasks/sections/pages/DailyRewardsPage/components/PrizePagination/assets/LeftArrow';
import RightArrow from '@/pages/Tasks/sections/pages/DailyRewardsPage/components/PrizePagination/assets/RightArrow';
import {
  PaginationButton,
  PaginationCount,
  PrizePaginationContainer,
} from '@/pages/Tasks/sections/pages/DailyRewardsPage/components/PrizePagination/styled';

interface PrizePaginationProps {
  activeSlideIndex: number;
  prizeSlidersLength: number;
  swiperElRef: RefObject<SwiperRef>;
}

const PrizePagination = ({
  activeSlideIndex,
  prizeSlidersLength,
  swiperElRef,
}: PrizePaginationProps) => {
  return (
    <PrizePaginationContainer>
      <PaginationButton
        $isDisabled={!activeSlideIndex}
        onClick={() => swiperElRef.current?.swiper.slidePrev()}
      >
        <LeftArrow />
      </PaginationButton>

      <PaginationCount>
        <Text fontSize={14} fontWeight={700}>
          {activeSlideIndex + 1}
        </Text>
        <Text fontSize={14} fontWeight={700}>
          /
        </Text>
        <Text fontSize={14} fontWeight={700}>
          {prizeSlidersLength}
        </Text>
      </PaginationCount>

      <PaginationButton
        $isDisabled={activeSlideIndex + 1 === prizeSlidersLength}
        onClick={() => swiperElRef.current?.swiper.slideNext()}
      >
        <RightArrow />
      </PaginationButton>
    </PrizePaginationContainer>
  );
};

export default PrizePagination;
