import { observer } from 'mobx-react-lite';
import React from 'react';

import Modal from '@/components/Modal';

import RewardsModalContent from '@/pages/Nfts/components/Lootbox/RewardsModal/components/ModalContent';
import rootStore from '@/store';

const RewardsModal = () => {
  const {
    stakingStore: { stakingRewards },
  } = rootStore;

  return (
    <Modal
      isActive={!!stakingRewards}
      onClose={() => null}
      withoutCloseButton={true}
      withoutHeader={true}
    >
      <RewardsModalContent />
    </Modal>
  );
};

export default observer(RewardsModal);
