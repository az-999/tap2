import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';
import { useDebouncedCallback } from 'use-debounce';

import Text from '@/components/UI/Text';

import ByTonContent from '@/pages/Nfts/components/ByTonContent';
import GeneratorContent from '@/pages/Nfts/components/GeneratorContent';
import LootBoxSliderContent from '@/pages/Nfts/components/Lootbox/LootBoxSliderContent';
import LootboxMonthlyField from '@/pages/Nfts/components/Lootbox/LootboxMonthlyField';
import PaginationTab from '@/pages/Nfts/components/Lootbox/TitleSlider/assets/PaginationTab';
import PaginationTabActive from '@/pages/Nfts/components/Lootbox/TitleSlider/assets/PaginationTabActive';
import {
  MainCardContainer,
  NextButton,
  PaginationContainer,
  PaginationItem,
  PrevButton,
  TitleSliderContainer,
} from '@/pages/Nfts/components/Lootbox/TitleSlider/styled';
import LeftArrow from '@/pages/Nfts/pages/LootboxCraftPage/assets/LeftArrow';
import RightArrow from '@/pages/Nfts/pages/LootboxCraftPage/assets/RightArrow';
import { SLIDER_DATA } from '@/pages/Nfts/pages/LootboxCraftPage/const';
import { TitleWrapper } from '@/pages/Nfts/pages/LootboxCraftPage/styled';
import rootStore from '@/store';

type SwiperRef = HTMLElement & { swiper: Swiper; initialize: () => void };
type ButtonState = {
  isPrevPressed: boolean;
  isNextPressed: boolean;
};

const TitleSlider = () => {
  const {
    stakingStore: { activeSlideIndex, setActiveSlideIndex, availableLootboxes },
  } = rootStore;

  const swiperElRef = useRef<SwiperRef>(null);
  const [{ isPrevPressed, isNextPressed }, setIsButtonPressed] =
    useState<ButtonState>({
      isPrevPressed: false,
      isNextPressed: false,
    });
  const debouncedSetButtonPressed = useDebouncedCallback(
    (state: Partial<ButtonState>) => {
      setIsButtonPressed((prev) => ({ ...prev, ...state }));
    },
    100,
  );

  useEffect(() => {
    register();
  }, []);

  useEffect(() => {
    if (!swiperElRef) return;

    swiperElRef.current?.addEventListener('swiperslidechange', (e: any) => {
      setActiveSlideIndex(e.detail[0].realIndex);
    });
  }, [swiperElRef, availableLootboxes]);

  useEffect(() => {
    if (!swiperElRef) return;

    swiperElRef.current?.swiper.slideToLoop(activeSlideIndex);
  }, [activeSlideIndex, swiperElRef, availableLootboxes]);

  const handlePrevButtonClick = () => {
    if (!swiperElRef) return;

    swiperElRef.current?.swiper.slidePrev();
    setIsButtonPressed((prev) => ({ ...prev, isPrevPressed: true }));
    debouncedSetButtonPressed({ isPrevPressed: false });
  };

  const handleNextButtonClick = () => {
    swiperElRef.current?.swiper.slideNext();
    setIsButtonPressed((prev) => ({ ...prev, isNextPressed: true }));
    debouncedSetButtonPressed({ isNextPressed: false });
  };

  if (!availableLootboxes) return null;

  return (
    <>
      <TitleSliderContainer>
        <TitleWrapper>
          <Text fontSize={24} fontWeight={700}>
            BUMP Lootbox
          </Text>

          <Text
            fontSize={12}
            fontWeight={400}
            color={'rgba(255, 255, 255, .8)'}
          >
            Receive, points, or unique NFTs!
          </Text>
        </TitleWrapper>

        <PrevButton
          onClick={handlePrevButtonClick}
          $isPrevPressed={isPrevPressed}
        >
          <LeftArrow />
        </PrevButton>
        <NextButton
          onClick={handleNextButtonClick}
          $isNextPressed={isNextPressed}
        >
          <RightArrow />
        </NextButton>

        <swiper-container
          ref={swiperElRef}
          className="lootbox-title-swiper"
          slides-per-view="1"
          grabCursor={false}
          space-between={0}
          loop={true}
        >
          {availableLootboxes.map((slideItem, index) => (
            <swiper-slide key={`${index}-${slideItem.id}`}>
              <MainCardContainer>
                <LootBoxSliderContent
                  img={SLIDER_DATA[slideItem.id - 1].image}
                  title={slideItem.name}
                />
              </MainCardContainer>
            </swiper-slide>
          ))}
        </swiper-container>

        <LootboxMonthlyField
          tokenValue={availableLootboxes[activeSlideIndex].reward}
          nftValue={availableLootboxes[activeSlideIndex].nft_count}
          apyValue={availableLootboxes[activeSlideIndex].apy}
        />

        <PaginationContainer>
          {availableLootboxes.map((item, index) => {
            const isActive = item.id === activeSlideIndex + 1;

            return (
              <PaginationItem $isActive={isActive} key={`pagination-${index}`}>
                {isActive ? <PaginationTabActive /> : <PaginationTab />}
              </PaginationItem>
            );
          })}
        </PaginationContainer>
      </TitleSliderContainer>

      {/*{activeSlideIndex === 0 && <ByTonContent />}
      {activeSlideIndex === 1 && <GeneratorContent />}*/}
    </>
  );
};

export default observer(TitleSlider);
