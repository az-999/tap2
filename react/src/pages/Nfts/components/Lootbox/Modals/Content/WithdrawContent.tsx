import React from 'react';

import Text from '@/components/UI/Text';

import InfoIcon from '@/pages/Nfts/components/Lootbox/Modals/assets/InfoIcon';
import ButtonsGroup from '@/pages/Nfts/components/Lootbox/Modals/components/ButtonsGroup';
import {
  ModalContent,
  TitleContainer,
} from '@/pages/Nfts/components/Lootbox/Modals/styled';

interface WithdrawContentProps {
  onSubmit: () => void;
  onCancel: () => void;
}

const WithdrawContent = ({ onSubmit, onCancel }: WithdrawContentProps) => {
  return (
    <ModalContent>
      <TitleContainer $type="wide">
        <InfoIcon />
        <Text fontSize={16} fontWeight={700}>
          Are you sure you want to unstake your MMPro Tokens from staking?
        </Text>
      </TitleContainer>

      <ButtonsGroup
        title="Unstake"
        onSubmit={onSubmit}
        onCancel={onCancel}
        fee="0.1"
      />
    </ModalContent>
  );
};

export default WithdrawContent;
