import React, { useEffect, useRef, useState } from 'react';
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';

import ActiveTab from '@/pages/Main/assets/ActiveTab';
import InactiveTab from '@/pages/Main/assets/InactiveTab';
import {
  NewsContainer,
  PaginationContainer,
} from '@/pages/Main/components/News/styled';
import NewsItem from '@/pages/Main/components/NewsItem';
import { PAGE_DATA } from '@/pages/Main/const';

type SwiperRef = HTMLElement & { swiper: Swiper; initialize: () => void };

const News = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const swiperElRef = useRef<SwiperRef>(null);

  useEffect(() => {
    register();
  }, []);

  useEffect(() => {
    swiperElRef.current?.addEventListener('swiperslidechange', (e: any) => {
      setActiveSlideIndex(e.detail[0].activeIndex);
    });
  }, []);

  return (
    <NewsContainer>
      <swiper-container
        ref={swiperElRef}
        slides-per-view="1"
        grabCursor={true}
        space-between={20}
        loop={false}
        autoplay={true}
      >
        {PAGE_DATA.news.map(({ id, ...data }) => (
          <swiper-slide key={id}>
            <NewsItem {...data} />
          </swiper-slide>
        ))}
      </swiper-container>

      <PaginationContainer>
        {PAGE_DATA.news.map((_, i) => {
          const isActive = i === activeSlideIndex;
          return isActive ? (
            <ActiveTab key={`news-tab-${i}`} />
          ) : (
            <InactiveTab key={`news-tab-${i}`} />
          );
        })}
      </PaginationContainer>
    </NewsContainer>
  );
};

export default News;
