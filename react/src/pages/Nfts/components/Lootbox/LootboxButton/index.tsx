import React from 'react';

import { LootboxButtonContainer } from '@/pages/Nfts/components/Lootbox/LootboxButton/styled';

interface LootboxButtonProps {
  title: string;
  disabled: boolean;
  withMargin?: boolean;
}

const LootboxButton = ({
  title,
  disabled,
  withMargin = true,
}: LootboxButtonProps) => {
  return (
    <LootboxButtonContainer disabled={disabled} $withMargin={withMargin}>
      {title}
    </LootboxButtonContainer>
  );
};

export default LootboxButton;
