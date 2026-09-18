import { observer } from 'mobx-react-lite';
import React from 'react';
import 'react-lazy-load-image-component/src/effects/blur.css';

import TooltipPortal from '@/components/TooltipPortal/tooltipPortal';

import DailyPrizeTooltipItem from '@/pages/Tasks/sections/pages/DailyRewardsPage/components/DailyPrizeTooltip/components/DailyPrizeTooltipItem';
import { useGetTooltipData } from '@/pages/Tasks/sections/pages/DailyRewardsPage/components/DailyPrizeTooltip/hooks/useGetTooltipData';
import rootStore from '@/store';

const DailyPrizeTooltip = () => {
  const {
    tasksStore: { monthPrizeTooltips },
  } = rootStore;

  const { getTooltipData } = useGetTooltipData();

  return (
    <TooltipPortal>
      {monthPrizeTooltips.map((prize) => {
        const { imageSrc, title, subtitle } = getTooltipData(prize.id);

        return (
          <DailyPrizeTooltipItem
            title={title}
            imageSrc={imageSrc}
            subtitle={subtitle}
          />
        );
      })}
    </TooltipPortal>
  );
};

export default observer(DailyPrizeTooltip);
