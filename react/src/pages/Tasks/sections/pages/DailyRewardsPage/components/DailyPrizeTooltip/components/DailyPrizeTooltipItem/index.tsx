import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import CloseButton from '@/components/CloseButton';
import Text from '@/components/UI/Text';

import {
  DailyPrizeBackground,
  DailyPrizeTooltipContainer,
} from '@/pages/Tasks/sections/pages/DailyRewardsPage/components/DailyPrizeTooltip/components/DailyPrizeTooltipItem/styled';
import rootStore from '@/store';

interface DailyPrizeTooltipItemProps {
  imageSrc: string;
  title: string;
  subtitle: string;
}

const DailyPrizeTooltipItem = ({
  imageSrc,
  title,
  subtitle,
}: DailyPrizeTooltipItemProps) => {
  const [isActive, setIsActive] = useState(false);

  const {
    tasksStore: { deleteMonthPrizeModalVisible },
  } = rootStore;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsActive(false);
    setTimeout(() => deleteMonthPrizeModalVisible({ withButton: false }), 500);
  };

  return (
    <DailyPrizeBackground $isActive={isActive}>
      <DailyPrizeTooltipContainer $isActive={isActive}>
        <CloseButton onClick={handleClose} zIndex={1} />
        <LazyLoadImage src={imageSrc} alt="" effect="blur" />

        <div>
          <Text fontSize={14} fontWeight={600}>
            {title}
          </Text>
          <Text fontSize={12} fontWeight={400}>
            {subtitle}
          </Text>
        </div>
      </DailyPrizeTooltipContainer>
    </DailyPrizeBackground>
  );
};

export default observer(DailyPrizeTooltipItem);
