import {
  useHapticFeedback,
  useWebApp,
} from '@vkruglikov/react-telegram-web-app';
import { observer } from 'mobx-react-lite';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { CSSTransition } from 'react-transition-group';
import { useDebouncedCallback } from 'use-debounce';

import Dotted from '@/assets/static/farm-button/Dotted';
import spaceship from '@/assets/static/farm-button/spaceship.webp';

import {
  Await,
  BoostNumber,
  Circle,
  Content,
  ContentWrapper,
  DottedContainer,
  FloatingItem,
  InProgress,
  Logo,
  OutsideCircleImage,
  Progress,
  ScaleWrap,
  Spaceship,
  StartText,
  Tap,
  Wrapper,
} from './styled';
import useFarmingStatus from '@/hooks/useFarmingStatus';
import MmProCoin from '@/pages/Tapper/Assets/MmProCoin';
import ClaimReward from '@/pages/Tapper/components/ClaimReward';
import FreezeCaptcha from '@/pages/Tapper/components/FreezeCaptcha';
import { useProgressColor } from '@/pages/Tapper/progressColor';
import rootStore from '@/store';

const NewFarmButton = () => {
  const {
    userStore: { userInfo },
    tapperStore: {
      runFarming,
      stopFarm,
      tap,
      energy,
      isFreezeMode,
      farmLimit,
      tapCount,
      tapShadowCount,
      tapShadowBoost,
      resetTapShadow,
    },
    isVibrateActive,
    isLoading,
  } = rootStore;

  const [disabled, setDisabled] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [impactOccurred] = useHapticFeedback();
  const WebApp = useWebApp();

  const floatingItemsRef = useRef<
    { id: number; x: number; y: number; isMmProCoin: boolean; boost: number }[]
  >([]);
  const isToggleCoinRef = useRef(true);
  const circleRef = useRef<HTMLDivElement>(null);
  const boost = useMemo(
    () =>
      (userInfo.info?.boost && Number(userInfo.info.boost.replace('x', ''))) ||
      1,
    [userInfo.info?.boost],
  );

  const { isAwait, isInProgress, isFinished, status } = useFarmingStatus();

  useEffect(() => {
    const animationDelay = () =>
      setTimeout(() => {
        setDisabled(false);
      }, 1000);

    if (isFinished && isTouched) {
      setDisabled(true);
      animationDelay();
    }

    if (isAwait && !isTouched) {
      setDisabled(false);
    }

    return () => clearTimeout(animationDelay());
  }, [isAwait, isFinished, isTouched, status]);

  const color = useProgressColor();

  useEffect(() => {
    if (isAwait || isFinished) {
      document.documentElement.style.setProperty(
        '--progressColor',
        'rgba(46, 255, 115, 1)',
      );
    }

    if (isInProgress) {
      document.documentElement.style.setProperty('--progressColor', color);
    }
  }, [color, isAwait, isFinished, isInProgress]);

  const isTouchInsideCircle = (touch: React.Touch): boolean => {
    if (!circleRef.current) return false;

    const rect = circleRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const radius = rect.width / 2;

    const distance = Math.sqrt(
      (touch.clientX - centerX) ** 2 + (touch.clientY - centerY) ** 2,
    );

    return distance <= radius;
  };

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!isFreezeMode) {
        for (let i = 0; i < e.touches.length; i++) {
          const touch = e.touches[i];

          if (
            isTouchInsideCircle(touch) &&
            !isLoading &&
            !disabled &&
            circleRef.current
          ) {
            circleRef.current.style.transform = 'scale(0.98)';

            if (isVibrateActive) {
              if (WebApp.initData) {
                impactOccurred('medium');
              }

              if (!WebApp.initData && 'vibrate' in window.navigator) {
                window.navigator.vibrate(30);
              }
            }
          }
        }
      }
    },
    [disabled, impactOccurred, isFreezeMode, isLoading, isVibrateActive],
  );

  const debounceResetTapShadow = useDebouncedCallback(() => {
    resetTapShadow();
  }, 900);

  useEffect(() => {
    if (isFreezeMode) {
      resetTapShadow();
    }
  }, [isFreezeMode, resetTapShadow]);

  const handleTouchEnd = useCallback(
    async (e: React.TouchEvent<HTMLDivElement>) => {
      setIsTouched(true);

      if (circleRef.current) {
        circleRef.current.style.transform = 'scale(1)';
      }
      for (let i = 0; i < e.changedTouches.length; i++) {
        const touch = isFreezeMode ? e.changedTouches[0] : e.changedTouches[i];

        if (isTouchInsideCircle(touch) && !isLoading && !disabled) {
          switch (status) {
            case 'await':
              return await runFarming();
            case 'inProgress':
              const newFloatingItem = {
                id: Date.now(),
                x: touch.clientX,
                y: touch.clientY,
                isMmProCoin: isToggleCoinRef.current,
                boost:
                  boost * tapShadowBoost > 1 ? boost * tapShadowBoost : boost,
              };
              if (floatingItemsRef.current.length <= 20) {
                floatingItemsRef.current.push(newFloatingItem);
              }

              setTimeout(() => {
                floatingItemsRef.current = floatingItemsRef.current.filter(
                  (item) => item.id !== newFloatingItem.id,
                );
              }, 1000);

              isToggleCoinRef.current = !isToggleCoinRef.current;
              debounceResetTapShadow();
              return tap();
            case 'finished':
              return await stopFarm();
            default:
              return undefined;
          }
        }
      }
    },
    [
      boost,
      debounceResetTapShadow,
      disabled,
      isFreezeMode,
      isLoading,
      runFarming,
      status,
      stopFarm,
      tap,
      tapShadowBoost,
    ],
  );

  return (
    <>
      <Wrapper>
        <OutsideCircleImage />
        <DottedContainer>
          <Dotted />
        </DottedContainer>
        <Circle
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          isInProgress={isInProgress}
          tapShadowCount={tapShadowCount}
        >
          <CSSTransition
            in={isInProgress}
            classNames="fade"
            timeout={800}
            unmountOnExit
          >
            <Progress energy={energy} />
          </CSSTransition>
          <ScaleWrap ref={circleRef}>
            <Content isInProgress={isInProgress}>
              <ContentWrapper isInProgress={isInProgress}>
                {/*isAwait*/}
                <CSSTransition
                  in={isAwait}
                  classNames="fade"
                  timeout={1000}
                  unmountOnExit
                >
                  <Await>
                    <Logo />
                    <StartText>Start Farming</StartText>
                  </Await>
                </CSSTransition>
                {/*isAwait*/}

                {/*isInProgress*/}
                <CSSTransition
                  in={isInProgress && !isFreezeMode}
                  classNames="fade"
                  timeout={800}
                  unmountOnExit
                >
                  <InProgress>
                    <Spaceship src={spaceship} />
                    <Tap />
                  </InProgress>
                </CSSTransition>
                {/*isInProgress*/}

                {/*isFinished*/}
                <CSSTransition
                  in={isFinished}
                  classNames="fade"
                  timeout={1000}
                  unmountOnExit
                >
                  <ClaimReward
                    userInfo={userInfo}
                    farmLimit={farmLimit}
                    tapCount={tapCount}
                  />
                </CSSTransition>
                {/*isFinished*/}

                {/*isFreezeMode*/}
                <CSSTransition
                  in={isInProgress && isFreezeMode}
                  classNames="fade"
                  timeout={1000}
                  unmountOnExit
                >
                  <FreezeCaptcha />
                </CSSTransition>
                {/*isFreezeMode*/}
              </ContentWrapper>
            </Content>
          </ScaleWrap>
        </Circle>
      </Wrapper>

      {isInProgress &&
        !disabled &&
        !!floatingItemsRef.current?.length &&
        floatingItemsRef.current.map(({ id, x, y, isMmProCoin, boost }) => (
          <FloatingItem key={id} left={x} top={y}>
            {isMmProCoin ? <MmProCoin /> : <MmProCoin />}
            {!!boost && <BoostNumber>+{boost}</BoostNumber>}
          </FloatingItem>
        ))}
    </>
  );
};

export default observer(NewFarmButton);
