import { observer } from 'mobx-react-lite';
import React from 'react';

import TooltipPortal from '@/components/TooltipPortal/tooltipPortal';

import AttackTooltip from '@/pages/Ships/components/Tooltips/AttackTooltip';
import DefenseMarkExistTooltip from '@/pages/Ships/components/Tooltips/DefenseMarkExistTooltip';
import DefenseMarkExpiredTooltip from '@/pages/Ships/components/Tooltips/DefenseMarkExpiredTooltip';
import TutorialTooltip from '@/pages/Ships/components/Tooltips/TutorialTooltip';
import { PirateAndDefenseTooltipsBackground } from '@/pages/Ships/components/Tooltips/styled';
import rootStore from '@/store';

const PirateAndDefenseTooltips = () => {
  const {
    shipsStore: { pirateAndDefenseTooltips },
  } = rootStore;

  if (!pirateAndDefenseTooltips) return null;

  return (
    <TooltipPortal>
      <PirateAndDefenseTooltipsBackground
        $isActive={!!pirateAndDefenseTooltips.length}
      >
        <TutorialTooltip />
        <AttackTooltip />
        <DefenseMarkExistTooltip />
        <DefenseMarkExpiredTooltip />
      </PirateAndDefenseTooltipsBackground>
    </TooltipPortal>
  );
};

export default observer(PirateAndDefenseTooltips);
