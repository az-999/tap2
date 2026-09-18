import {
  useHapticFeedback,
  useWebApp,
} from '@vkruglikov/react-telegram-web-app';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import { register } from 'swiper/element/bundle';

import { SwiperRef } from '@/pages/Ships/pages/ShipsCraftPage/components/ShipsCraft';
import CrownIcon from '@/pages/Tasks/sections/assets/partners/CrownIcon';
import {
  DailyMonthPrizeContainer,
  ExplodingContainer,
  SliderContainer,
} from '@/pages/Tasks/sections/pages/DailyRewardsPage/components/DailyMonthPrize/styled';
import DailyMonthPrizeItem from '@/pages/Tasks/sections/pages/DailyRewardsPage/components/DailyMonthPrizeItem';
import PrizePagination from '@/pages/Tasks/sections/pages/DailyRewardsPage/components/PrizePagination';
import Button from '@/pages/Tasks/sections/pages/TasksPages/Button';
import rootStore from '@/store';

const DailyMonthPrize = () => {
  const [isExploding, setIsExploding] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const [impactOccurred] = useHapticFeedback();
  const swiperElRef = useRef<SwiperRef>(null);
  const WebApp = useWebApp();

  const {
    tasksStore: {
      grantDay,
      setIsGrandPrizeVisible,
      postGrandPrizeReward,
      isGrandPrizeButtonDisable,
    },
    userStore: {
      userInfo: { day_grant_prize_possible },
    },
    isVibrateActive,
  } = rootStore;

  const arrayLength = grantDay ? Math.ceil(grantDay / 84) : 1;

  useEffect(() => {
    register();
  }, []);

  useEffect(() => {
    swiperElRef.current?.addEventListener('swiperslidechange', (e: any) => {
      setActiveSlideIndex(e.detail[0].activeIndex);
    });
  }, [grantDay]);

  const handleGrindPrizeButtonClick = async () => {
    const response = await postGrandPrizeReward();
    if (!response) return;

    setIsExploding(true);

    setTimeout(() => setIsGrandPrizeVisible(true), 900);

    if (isVibrateActive) {
      if (WebApp.initData) {
        impactOccurred('medium');
      }

      if (!WebApp.initData && 'vibrate' in window.navigator) {
        window.navigator.vibrate(30);
      }
    }

    setTimeout(setIsExploding, 3000);
  };

  return (
    <DailyMonthPrizeContainer>
      <SliderContainer>
        <swiper-container
          ref={swiperElRef}
          className="mySwiper"
          slides-per-view="1"
          grabCursor={true}
          loop={false}
          key={`swiper-daily-prize-${arrayLength}`}
        >
          {new Array(arrayLength).fill(0).map((_, i) => (
            <swiper-slide key={`swiper-daily-prize-${i}`}>
              {new Array(3).fill(0).map((_, index) => (
                <DailyMonthPrizeItem
                  key={`daily-month-prize-item-${index}`}
                  index={i * 3 + index + 1}
                />
              ))}
            </swiper-slide>
          ))}
        </swiper-container>

        {arrayLength > 1 && (
          <PrizePagination
            activeSlideIndex={activeSlideIndex}
            swiperElRef={swiperElRef}
            prizeSlidersLength={arrayLength}
          />
        )}
      </SliderContainer>

      <Button
        onClick={handleGrindPrizeButtonClick}
        disabled={!day_grant_prize_possible || isGrandPrizeButtonDisable}
      >
        <CrownIcon />
        {isExploding && (
          <ExplodingContainer>
            <ConfettiExplosion
              force={0.9}
              duration={2500}
              particleCount={300}
              zIndex={100}
            />
          </ExplodingContainer>
        )}
        <span>Claim Grand Prize</span>
      </Button>
    </DailyMonthPrizeContainer>
  );
};

export default observer(DailyMonthPrize);
