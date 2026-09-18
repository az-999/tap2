import React, { useCallback } from 'react';

import Text from '@/components/UI/Text';
import InfoIcon from '@/components/UnavailablePage/assets/InfoIcon';
import bumpStoreImage from '@/components/UnavailablePage/assets/image(1).png';
import gameImage from '@/components/UnavailablePage/assets/image(2).png';
import marketImage from '@/components/UnavailablePage/assets/image.png';
import { UnavailablePageContainer } from '@/components/UnavailablePage/styled';

interface UnavailablePageProps {
  type: 'marketplace' | 'bumpStore' | 'game' | 'staking';
}

const UnavailablePage = ({ type }: UnavailablePageProps) => {
  const getPageData = useCallback(() => {
    switch (type) {
      case 'marketplace':
        return {
          title: 'The marketplace is not working yet',
          subtitle: "We'll fix it a little and turn it on again",
          image: marketImage,
        };
      case 'bumpStore':
        return {
          title: 'Collections are currently unavailable',
          subtitle: 'A little later everything will come back',
          image: bumpStoreImage,
        };
      case 'game':
        return {
          title: 'Prevention in assembly hangars',
          subtitle: 'Check back later',
          image: gameImage,
        };
      case 'staking':
        return {
          title: 'Prevention in assembly hangars',
          subtitle: 'Check back later',
          image: gameImage,
        };
    }
  }, [type]);

  const { title, subtitle, image } = getPageData();

  return (
    <UnavailablePageContainer>
      <InfoIcon />

      <Text fontSize={16} fontWeight={600}>
        {title}
      </Text>
      <Text fontSize={12} fontWeight={400}>
        {subtitle}
      </Text>

      <img src={image} alt="" rel="preload" />
    </UnavailablePageContainer>
  );
};

export default UnavailablePage;
