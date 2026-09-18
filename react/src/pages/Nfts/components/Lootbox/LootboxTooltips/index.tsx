import { observer } from 'mobx-react-lite';
import React from 'react';

import TooltipPortal from '@/components/TooltipPortal/tooltipPortal';

import RestakingTooltip from '@/pages/Nfts/components/Lootbox/LootboxTooltips/Tooltips/RestakingTooltip';
import StakingTooltip from '@/pages/Nfts/components/Lootbox/LootboxTooltips/Tooltips/StakingTooltip';
import WithdrawTooltip from '@/pages/Nfts/components/Lootbox/LootboxTooltips/Tooltips/WithdrawTooltip';
import { LootboxTooltipsBackground } from '@/pages/Nfts/components/Lootbox/LootboxTooltips/styled';
import rootStore from '@/store';

const LootboxTooltips = () => {
  const {
    stakingStore: { stakingTooltips },
  } = rootStore;

  return (
    <TooltipPortal>
      <LootboxTooltipsBackground $isActive={!!stakingTooltips.length}>
        <StakingTooltip />
        <RestakingTooltip />
        <WithdrawTooltip />
      </LootboxTooltipsBackground>
    </TooltipPortal>
  );
};

export default observer(LootboxTooltips);
