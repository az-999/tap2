import { observer } from 'mobx-react-lite';
import React, { ReactNode } from 'react';
import { Tooltip } from 'react-tooltip';

import ResolvedCheckmark from './assets/ResolvedCheckmark';
import { TextItem, TooltipRow } from './styled';

interface InfoTooltipProps {
  isShowTooltip: boolean;
  tooltipId: string;
  width?: string;
  children: ReactNode;
}

const InfoTooltip = ({
  isShowTooltip,
  tooltipId,
  width = '100%',
  children,
}: InfoTooltipProps) => {
  return (
    <Tooltip
      id={tooltipId}
      place="bottom"
      isOpen={isShowTooltip}
      style={{
        width,
        zIndex: 20,
        backgroundColor: '#20252C',
        padding: 16,
        borderRadius: 10,
      }}
    >
      <TooltipRow>
        <ResolvedCheckmark />
        <TextItem>{children}</TextItem>
      </TooltipRow>
    </Tooltip>
  );
};

export default observer(InfoTooltip);
