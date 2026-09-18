import React from 'react';

import Text from '@/components/UI/Text';

import InfoIcon from '@/pages/Nfts/components/Lootbox/Modals/assets/InfoIcon';
import ButtonsGroup from '@/pages/Nfts/components/Lootbox/Modals/components/ButtonsGroup';
import {
  ModalContent,
  TitleContainer,
} from '@/pages/Nfts/components/Lootbox/Modals/styled';

interface RestakingContentProps {
  onSubmit: () => void;
  onCancel: () => void;
}

const RestakingContent = ({ onSubmit, onCancel }: RestakingContentProps) => {
  return (
    <ModalContent>
      <TitleContainer>
        <InfoIcon />
        <Text fontSize={16} fontWeight={700}>
          Are you sure you want to start restaking?
        </Text>
      </TitleContainer>

      <ButtonsGroup
        title="Restaking"
        onSubmit={onSubmit}
        onCancel={onCancel}
        fee="0.05"
      />
    </ModalContent>
  );
};

export default RestakingContent;
