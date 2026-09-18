import { observer } from 'mobx-react-lite';
import React from 'react';

import Tooltip from '@/components/Tooltip';
import TooltipPortal from '@/components/TooltipPortal/tooltipPortal';

import rootStore from '@/store';

const ErrorTooltips = () => {
  const { errorTooltips, deleteErrorTooltip } = rootStore;

  return (
    <TooltipPortal>
      {errorTooltips.map((tooltip, index) => (
        <Tooltip
          key={tooltip.id}
          message={tooltip.message}
          index={index}
          removeTooltip={() => deleteErrorTooltip(tooltip.id)}
          type={tooltip.type}
        />
      ))}
    </TooltipPortal>
  );
};

export default observer(ErrorTooltips);
