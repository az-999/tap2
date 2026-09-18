import React from 'react';

import { ChangeLogItemContainer } from '@/components/NewVersionTooltip/components/ChangeLogItem/styled';

interface ChangeLogItemProps {
  index: number;
  changeItem: string;
}

const ChangeLogItem = ({ index, changeItem }: ChangeLogItemProps) => {
  return (
    <ChangeLogItemContainer key={`newVersionItem-${index}`}>
      <div dangerouslySetInnerHTML={{ __html: `• ${changeItem}` }}></div>
    </ChangeLogItemContainer>
  );
};

export default ChangeLogItem;
