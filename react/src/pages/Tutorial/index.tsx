import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SecureLS from 'secure-ls';
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';

import Text from '@/components/UI/Text/index';

import FriendInvite from '@/pages/Friends/Assets/FriendInvite';
import Arrow from '@/pages/Tutorial/assets/Arrow';
import MmproIcon from '@/pages/Tutorial/assets/MmproIcon';
import PaginationTab from '@/pages/Tutorial/assets/PaginationTab';
import PaginationTabActive from '@/pages/Tutorial/assets/PaginationTabActive';
import PointsIcon from '@/pages/Tutorial/assets/PointsIcon';
import moon from '@/pages/Tutorial/assets/moon-bg.png';
import iconImage from '@/pages/Tutorial/assets/tutorial-icon.png';
import vouchers from '@/pages/Tutorial/assets/vouchers.png';
import { tutorialData } from '@/pages/Tutorial/data';
import {
  ButtonWrapper,
  CardTitle,
  IconContainer,
  ImageTextContainer,
  ImagesContainer,
  ImagesItemContainer,
  MainCardContainer,
  Moon,
  NextButton,
  PaginationContainer,
  PaginationItem,
  PrevButton,
  TextWrapper,
  TutorialContainer,
  TutorialItem,
  UpTitleContainer,
} from '@/pages/Tutorial/styled';
import { RootPath } from '@/types/routes';

type SwiperRef = HTMLElement & { swiper: Swiper; initialize: () => void };
const ls = new SecureLS();

const Tutorial = () => {
  const navigate = useNavigate();
  const swiperElRef = useRef<SwiperRef>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const handleClose = () => {
    ls.set('isShowedTutorialPageBefore', 'true');

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
    if (activeSlideIndex === tutorialData.length - 1) {
      handleClose();
    }
  }, [activeSlideIndex]);

  return (
    <TutorialContainer>
      <swiper-container
        ref={swiperElRef}
        className="mySwiper"
        slides-per-view="1"
        grabCursor={true}
        space-between={30}
        loop={false}
      >
        {tutorialData.map((slideItem, index) => (
          <swiper-slide key={`${index}-${slideItem.title}`}>
            <TutorialItem>
              <PrevButton
                onClick={() => swiperElRef.current?.swiper.slidePrev()}
              />
              <NextButton
                onClick={() => swiperElRef.current?.swiper.slideNext()}
              />

              {index === 0 && slideItem?.imageArrSrc && (
                <MainCardContainer>
                  <Moon src={moon} alt="" id="moon-bg" rel="preload" />

                  <ImagesContainer>
                    <ImagesItemContainer>
                      <img
                        src={slideItem.imageArrSrc[0]}
                        alt=""
                        rel="preload"
                      />
                      <CardTitle id="card-title" $position="top">
                        <PointsIcon />
                        <Text fontSize={16} fontWeight={700}>
                          Points
                        </Text>
                      </CardTitle>
                      <ImageTextContainer>
                        <Arrow />
                        <Text fontSize={10} fontWeight={700} color="#000000">
                          Earn points and receive NFTs
                        </Text>
                      </ImageTextContainer>
                    </ImagesItemContainer>

                    <ImagesItemContainer>
                      <img
                        src={slideItem.imageArrSrc[1]}
                        alt=""
                        rel="preload"
                      />
                      <img
                        src={vouchers}
                        alt=""
                        id="vouchers-image"
                        rel="preload"
                      />
                      <CardTitle id="card-title" $position="bottom">
                        <Text fontSize={16} fontWeight={700}>
                          RWA NFT
                        </Text>
                      </CardTitle>
                      <ImageTextContainer>
                        <Arrow />
                        <Text fontSize={10} fontWeight={700} color="#000000">
                          Sell NFTs and earn Real money
                        </Text>
                      </ImageTextContainer>
                    </ImagesItemContainer>

                    <ImagesItemContainer>
                      <img
                        src={slideItem.imageArrSrc[2]}
                        alt=""
                        rel="preload"
                      />
                      <CardTitle id="card-title" $position="bottom">
                        <Text fontSize={16} fontWeight={700}>
                          Real Money
                        </Text>
                      </CardTitle>
                    </ImagesItemContainer>
                  </ImagesContainer>
                </MainCardContainer>
              )}

              <UpTitleContainer>
                {index !== 0 && (
                  <>
                    <Text fontSize={17} fontWeight={500}>
                      {slideItem.title}
                    </Text>

                    <Text fontSize={index === 1 ? 30 : 23} fontWeight={700}>
                      {slideItem.subtitle}
                    </Text>
                  </>
                )}

                {index === 1 && (
                  <IconContainer>
                    <img src={iconImage} alt="" id="icon-image" rel="preload" />
                  </IconContainer>
                )}

                {index === 2 && (
                  <ButtonWrapper>
                    <FriendInvite />
                    <Text fontSize={12} fontWeight={500}>
                      Invite Friends
                    </Text>
                  </ButtonWrapper>
                )}
              </UpTitleContainer>
              {index !== 0 && slideItem.imageSrc && (
                <img src={slideItem.imageSrc} alt="" rel="preload" />
              )}
            </TutorialItem>
          </swiper-slide>
        ))}
      </swiper-container>

      {activeSlideIndex !== tutorialData.length - 1 && (
        <PaginationContainer>
          {tutorialData.slice(0, -1).map((item, index) => {
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
    </TutorialContainer>
  );
};

export default Tutorial;
