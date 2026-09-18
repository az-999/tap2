import { observer } from 'mobx-react-lite';
import React from 'react';

import Text from '@/components/UI/Text';

import InfoIcon from '@/pages/Nfts/components/Lootbox/Modals/assets/InfoIcon';
import ButtonsGroup from '@/pages/Nfts/components/Lootbox/Modals/components/ButtonsGroup';
import StakingItemsField from '@/pages/Nfts/components/Lootbox/Modals/components/StakingItemsField';
import {
  ModalContent,
  TitleContainer,
} from '@/pages/Nfts/components/Lootbox/Modals/styled';
import rootStore from '@/store';

interface StakingContentProps {
  onSubmit: () => void;
  onCancel: () => void;
}

const StakingContent = ({ onSubmit, onCancel }: StakingContentProps) => {
  const {
    stakingStore: { availableLootboxes },
  } = rootStore;

  if (!availableLootboxes) return null;

  return (
    <ModalContent>
      <TitleContainer>
        <InfoIcon />
        <Text fontSize={16} fontWeight={700}>
          Are you sure you want to start staking?
        </Text>
      </TitleContainer>

      <StakingItemsField />

      <ButtonsGroup
        title="Start Staking"
        onSubmit={onSubmit}
        onCancel={onCancel}
        fee="0.11"
      />
    </ModalContent>
  );
};

export default observer(StakingContent);
