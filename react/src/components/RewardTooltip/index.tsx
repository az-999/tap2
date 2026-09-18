import { observer } from 'mobx-react-lite';
import React from 'react';

import RewardTooltipItem from '@/components/RewardTooltip/components/RewardTooltipItem';

import VoucherTooltipPortal from '@/pages/Vouchers/Components/VoucherTooltipPortal';
import rootStore from '@/store';

const RewardTooltip = () => {
  const {
    userStore: { rewardTooltip, deleteRewardTooltip },
  } = rootStore;

  return (
    <VoucherTooltipPortal>
      {rewardTooltip.map((reward, index) => (
        <RewardTooltipItem
          {...reward}
          key={`reward_${index}`}
          removeTooltip={deleteRewardTooltip}
        />
      ))}
    </VoucherTooltipPortal>
  );
};

export default observer(RewardTooltip);
