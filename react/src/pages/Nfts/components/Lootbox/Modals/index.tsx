import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { observer } from 'mobx-react-lite';
import React from 'react';

import Modal from '@/components/Modal';

import ClaimContent from '@/pages/Nfts/components/Lootbox/Modals/Content/ClaimContent';
import ErrorContent from '@/pages/Nfts/components/Lootbox/Modals/Content/ErrorContent';
import RestakingContent from '@/pages/Nfts/components/Lootbox/Modals/Content/RestakingContent';
import StakingContent from '@/pages/Nfts/components/Lootbox/Modals/Content/StakingContent';
import WithdrawContent from '@/pages/Nfts/components/Lootbox/Modals/Content/WithdrawContent';
import rootStore from '@/store';

const StakingModal = () => {
  const address = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();

  const {
    stakingStore: {
      stakingModalsIndex,
      deleteStakingModal,
      stakeLootbox,
      restakeLootbox,
      claimStakeLootbox,
      withdrawLootbox,
      activeSlideIndex,
      activeLootbox,
    },
  } = rootStore;

  const handleStakeButtonClick = async () => {
    deleteStakingModal();
    await stakeLootbox({ address, id: activeSlideIndex + 1, tonConnectUI });
  };

  const handleClaimButtonClick = async () => {
    if (!activeLootbox) return;

    deleteStakingModal();
    await claimStakeLootbox({
      id: activeLootbox.activeStakingId,
      tonConnectUI,
    });
  };

  const handleRestakeButtonClick = async () => {
    if (!activeLootbox) return;

    deleteStakingModal();
    await restakeLootbox({
      id: activeLootbox.activeStakingId,
      tonConnectUI,
    });
  };

  const handleWithdrawButtonClick = async () => {
    if (!activeLootbox) return;

    deleteStakingModal();
    await withdrawLootbox({
      id: activeLootbox.activeStakingId,
      tonConnectUI,
    });
  };

  return (
    <Modal
      isActive={!!stakingModalsIndex}
      onClose={deleteStakingModal}
      withoutCloseButton={stakingModalsIndex === 5}
    >
      {stakingModalsIndex === 1 && (
        <StakingContent
          onSubmit={handleStakeButtonClick}
          onCancel={deleteStakingModal}
        />
      )}
      {stakingModalsIndex === 2 && (
        <RestakingContent
          onSubmit={handleRestakeButtonClick}
          onCancel={deleteStakingModal}
        />
      )}
      {stakingModalsIndex === 3 && (
        <WithdrawContent
          onSubmit={handleWithdrawButtonClick}
          onCancel={deleteStakingModal}
        />
      )}
      {stakingModalsIndex === 4 && (
        <ClaimContent
          onSubmit={handleClaimButtonClick}
          onCancel={deleteStakingModal}
        />
      )}
      {stakingModalsIndex === 5 && (
        <ErrorContent onClose={deleteStakingModal} />
      )}
    </Modal>
  );
};

export default observer(StakingModal);
