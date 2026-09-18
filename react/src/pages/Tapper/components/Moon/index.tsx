import React, { useCallback, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import Utils from '../../../../utils';
import BalanceIcon from '../../Assets/BalanceIcon';
import {
  MoonImg,
  MoonImgWrapper,
  MoonWrapper,
  Prize,
  XAxis,
  YAxis,
} from './styled';
import rootStore from '@/store';

const Moon = () => {
  const {
    tapperStore: { isStartMoon, isActiveMoon, onActiveMoon, moonWin },
  } = rootStore;

  const [isPending, setIsPending] = useState(false);

  const xAxisRef = useRef<HTMLDivElement>(null);
  const yAxisRef = useRef<HTMLDivElement>(null);

  const stopAnimation = useCallback((element: HTMLElement) => {
    const computedStyle = window.getComputedStyle(element);
    const matrix = new DOMMatrix(computedStyle.transform);
    element.style.animationPlayState = 'paused';
    element.style.transform = `translateX(${matrix.m41}px) translateY(${matrix.m42}px)`;
    setIsPending(true);
  }, []);

  const handleTouchStart = useCallback(async () => {
    if (xAxisRef.current && yAxisRef.current && !isPending) {
      stopAnimation(xAxisRef.current);
      stopAnimation(yAxisRef.current);
      await onActiveMoon();
    }
  }, [isPending, onActiveMoon, stopAnimation]);

  return (
    <>
      <CSSTransition
        in={isStartMoon}
        timeout={7000}
        classNames="moon"
        unmountOnExit
      >
        <MoonWrapper>
          <XAxis ref={xAxisRef}>
            <YAxis ref={yAxisRef}>
              <MoonImgWrapper
                isPending={isPending}
                isLoaded={isActiveMoon}
                onTouchStart={handleTouchStart}
              >
                <MoonImg src={'/img/moon.png'} alt={''} rel="preload" />
              </MoonImgWrapper>

              {isActiveMoon && (
                <Prize>
                  <BalanceIcon /> +{Utils.formatNumber(moonWin)}
                </Prize>
              )}
            </YAxis>
          </XAxis>
        </MoonWrapper>
      </CSSTransition>
    </>
  );
};

export default Moon;
