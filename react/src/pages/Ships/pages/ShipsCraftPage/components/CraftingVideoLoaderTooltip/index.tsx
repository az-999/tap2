import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';

import TooltipPortal from '@/components/TooltipPortal/tooltipPortal';
import Text from '@/components/UI/Text';

import ProcessingIcon from '@/pages/Nfts/components/ProcessingContent/assets/ProcessingIcon';
import {
  ProcessingContainer,
  StyledBackground,
  VideoContainer,
} from '@/pages/Ships/pages/ShipsCraftPage/components/CraftingVideoLoaderTooltip/styled';
import rootStore from '@/store';

const CraftingVideoLoaderTooltip = () => {
  const {
    shipsStore: { isCraftShipLoading },
  } = rootStore;

  const firstVideoRef = useRef<HTMLVideoElement>(null);
  const secondVideoRef = useRef<HTMLVideoElement>(null);

  /** todo выключил второе видео (не стартует первое видео вл второй и
   * следующи открытия компонента) */
  /*useEffect(() => {
    const firstVideo = firstVideoRef.current;
    const secondVideo = secondVideoRef.current;

    // Запускаем первый видеофайл
    firstVideo?.play();

    // Когда первый видеофайл завершится
    const handleFirstVideoEnd = () => {
      if (firstVideo && secondVideo) {
        // Скрываем первый видеофайл и показываем второй
        firstVideo.style.display = 'none';
        secondVideo.style.display = 'block';

        // Запускаем второй видеофайл в бесконечном цикле
        secondVideo.play();
        secondVideo.loop = true;
      }
    };

    firstVideo?.addEventListener('ended', handleFirstVideoEnd);

    // Очищаем обработчик события при размонтировании компонента
    return () => {
      firstVideo?.removeEventListener('ended', handleFirstVideoEnd);
    };
  }, []);*/
  return (
    <TooltipPortal>
      <StyledBackground $isActive={isCraftShipLoading}>
        <VideoContainer $isActive={isCraftShipLoading}>
          {isCraftShipLoading && (
            <video
              loop={true}
              autoPlay={true}
              muted={true}
              preload="auto"
              ref={firstVideoRef}
            >
              <source
                src={`${window.location.origin}/img/640_space_lightns.mp4`}
                type="video/mp4"
              />
            </video>
          )}

          {/* <video
            loop
            autoPlay
            muted
            preload="auto"
            ref={secondVideoRef}
            style={{ display: 'none' }}
          >
            <source
              src={`${window.location.origin}/img/space-sec.mp4`}
              type="video/mp4"
            />
          </video>*/}

          <ProcessingContainer>
            <ProcessingIcon />

            <div>
              <Text fontSize={16} fontWeight={500}>
                Awaiting server response
              </Text>

              <div>
                <Text fontSize={12} fontWeight={400}>
                  Once the confirmation is complete, you will
                </Text>
                <Text fontSize={12} fontWeight={400}>
                  receive the NFT to your wallet address
                </Text>
              </div>
            </div>
          </ProcessingContainer>
        </VideoContainer>
      </StyledBackground>
    </TooltipPortal>
  );
};

export default observer(CraftingVideoLoaderTooltip);
