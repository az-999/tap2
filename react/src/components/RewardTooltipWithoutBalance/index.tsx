import { observer } from 'mobx-react-lite';
import React from 'react';

import RewardTooltipItem from '@/components/RewardTooltipWithoutBalance/components/RewardTooltipItem';

import VoucherTooltipPortal from '@/pages/Vouchers/Components/VoucherTooltipPortal';
import rootStore from '@/store';

const RewardTooltipWithoutBalance = () => {
  const {
    userStore: {
      rewardTooltipWithoutBalance,
      deleteRewardWithoutBalanceTooltip,
    },
  } = rootStore;

  return (
    <VoucherTooltipPortal>
      {rewardTooltipWithoutBalance.map((reward, index) => (
        <RewardTooltipItem
          {...reward}
          key={`reward_${index}`}
          removeTooltip={deleteRewardWithoutBalanceTooltip}
        />
      ))}
    </VoucherTooltipPortal>
  );
};

export default observer(RewardTooltipWithoutBalance);
