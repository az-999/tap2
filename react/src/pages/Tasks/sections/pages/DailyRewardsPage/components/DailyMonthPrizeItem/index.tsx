import { observer } from 'mobx-react-lite';
import React from 'react';

import Text from '@/components/UI/Text';

import noPrize from '@/pages/Tasks/sections/assets/dailyRewards/noPrize.png';
import { useGetImage } from '@/pages/Tasks/sections/pages/DailyRewardsPage/components/DailyMonthPrizeItem/hooks/useGetImage';
import { DailyMonthPrizeItemContainer } from '@/pages/Tasks/sections/pages/DailyRewardsPage/components/DailyMonthPrizeItem/styled';
import rootState from '@/store';

interface DailyMonthPrizeItemProps {
  index: number;
}

const DailyMonthPrizeItem = ({ index }: DailyMonthPrizeItemProps) => {
  const { getImage } = useGetImage();
  const step = index * 28;

  const {
    tasksStore: { grantDay, addMonthPrizeModalVisible },
  } = rootState;

  const isPrizeExist = Boolean(grantDay && grantDay >= step);

  return (
    <DailyMonthPrizeItemContainer $isPrizeExist={isPrizeExist}>
      {isPrizeExist ? (
        <img
          src={getImage(index)}
          alt=""
          onClick={() =>
            addMonthPrizeModalVisible({ withButton: false, id: index })
          }
        />
      ) : (
        <img src={noPrize} alt="" />
      )}
      <Text fontSize={12} fontWeight={600}>
        {step} days
      </Text>
    </DailyMonthPrizeItemContainer>
  );
};

export default observer(DailyMonthPrizeItem);
