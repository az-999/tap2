import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';

import CloseButton from '@/components/CloseButton';
import Text from '@/components/UI/Text';

import { ANNOUNCEMENT_DATA } from '@/pages/Announcement/const';
import {
  AnnouncementContainer,
  AnnouncementItem,
  MainCardContainer,
  PaginationContainer,
  PaginationItem,
  TextWrapper,
} from '@/pages/Announcement/styled';
import MmproIcon from '@/pages/Tutorial/assets/MmproIcon';
import PaginationTab from '@/pages/Tutorial/assets/PaginationTab';
import PaginationTabActive from '@/pages/Tutorial/assets/PaginationTabActive';
import { RootPath } from '@/types/routes';

type SwiperRef = HTMLElement & { swiper: Swiper; initialize: () => void };

const Announcement = () => {
  const navigate = useNavigate();
  const swiperElRef = useRef<SwiperRef>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const handleClose = () => {
    navigate(RootPath.base);
  };

  useEffect(() => {
    register();
  }, []);

  useEffect(() => {
    swiperElRef.current?.addEventListener('swiperslidechange', (e: any) => {
      setActiveSlideIndex(e.detail[0].activeIndex);
    });
  }, []);

  useEffect(() => {
    if (activeSlideIndex === ANNOUNCEMENT_DATA.length - 1) {
      handleClose();
    }
  }, [activeSlideIndex]);

  return (
    <AnnouncementContainer>
      <swiper-container
        ref={swiperElRef}
        className="mySwiper"
        slides-per-view="1"
        grabCursor={true}
        space-between={30}
        loop={false}
      >
        {ANNOUNCEMENT_DATA.map((slideItem, index) => (
          <swiper-slide key={`${index}-${slideItem.title}`}>
            <AnnouncementItem>
              {index === ANNOUNCEMENT_DATA.length - 2 && (
                <CloseButton
                  onClick={handleClose}
                  right={12}
                  top={12}
                  zIndex={4}
                />
              )}

              <MainCardContainer $index={index}>
                {slideItem.content}
              </MainCardContainer>
            </AnnouncementItem>
          </swiper-slide>
        ))}
      </swiper-container>

      {activeSlideIndex !== ANNOUNCEMENT_DATA.length - 1 && (
        <PaginationContainer>
          {ANNOUNCEMENT_DATA.slice(0, -1).map((item, index) => {
            const isActive = item.id === activeSlideIndex + 1;

            return (
              <PaginationItem $isActive={isActive} key={`pagination-${index}`}>
                {isActive ? <PaginationTabActive /> : <PaginationTab />}
              </PaginationItem>
            );
          })}
        </PaginationContainer>
      )}

      <TextWrapper>
        <div>
          <MmproIcon />
          <a href="https://marketmaking.pro" target="_blank" rel="noreferrer">
            <Text fontSize={14} fontWeight={400}>
              marketmaking.pro
            </Text>
          </a>
        </div>
      </TextWrapper>
    </AnnouncementContainer>
  );
};

export default Announcement;
