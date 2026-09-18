import { observer } from 'mobx-react-lite';
import React from 'react';

import Text from '@/components/UI/Text';

import InfoIcon from '@/pages/Nfts/components/Lootbox/Modals/assets/InfoIcon';
import ButtonsGroup from '@/pages/Nfts/components/Lootbox/Modals/components/ButtonsGroup';
import {
  ModalContent,
  TitleContainer,
} from '@/pages/Nfts/components/Lootbox/Modals/styled';
import rootStore from '@/store';
import Utils from '@/utils';

interface WithdrawContentProps {
  onSubmit: () => void;
  onCancel: () => void;
}

const ClaimContent = ({ onSubmit, onCancel }: WithdrawContentProps) => {
  const {
    stakingStore: { availableLootboxes, activeLootbox },
  } = rootStore;

  if (!availableLootboxes || !activeLootbox) return null;
  const { activeLootboxId } = activeLootbox;

  return (
    <ModalContent>
      <TitleContainer $type="wide">
        <InfoIcon />
        <Text fontSize={16} fontWeight={700}>
          Claim your rewards by paying a small network fee!
        </Text>
      </TitleContainer>

      <ButtonsGroup
        title="Claim reward"
        onSubmit={onSubmit}
        onCancel={onCancel}
        fee={Utils.roundUpToTwoDecimalPlaces(
          availableLootboxes[activeLootboxId - 1].nft_count * 0.0125 +
            0.04 +
            0.05 +
            0.041,
        )}
      />
    </ModalContent>
  );
};

export default observer(ClaimContent);
