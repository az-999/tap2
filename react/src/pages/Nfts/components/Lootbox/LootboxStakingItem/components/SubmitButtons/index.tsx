import { observer } from 'mobx-react-lite';
import React from 'react';

import { ButtonsContainer } from '@/pages/Nfts/components/Lootbox/LootboxStakingItem/styled';
import StakeButton from '@/pages/Nfts/components/Lootbox/StakeButton';
import { ActiveLootbox } from '@/pages/Nfts/types';
import rootStore from '@/store';

interface SubmitButtonsProps {
  isStakingCompleted: boolean;
  claims: number;
  nextClaim: number;
  maxClaims: number;
  activeLootbox: ActiveLootbox;
}

const SubmitButtons = ({
  isStakingCompleted,
  claims,
  nextClaim,
  maxClaims,
  activeLootbox,
}: SubmitButtonsProps) => {
  const {
    stakingStore: { addStakingModal, setActiveLootbox, isButtonDisable, isOldStake },
    timeNow,
  } = rootStore;

  const handeRestakeButtonClick = () => {
    setActiveLootbox(activeLootbox);
    addStakingModal(2);
  };

  const handeUnstakeButtonClick = () => {
    setActiveLootbox(activeLootbox);
    addStakingModal(3);
  };

  const handeClaimButtonClick = () => {
    setActiveLootbox(activeLootbox);
    addStakingModal(4);
  };

  return (
    <ButtonsContainer>
      {isStakingCompleted ? (
        <>
          <StakeButton
            onClick={handeRestakeButtonClick}
            height={40}
            disabled={isButtonDisable || isOldStake(activeLootbox.activeStakingId)}
          >
            Restake
          </StakeButton>
          <StakeButton
            onClick={handeUnstakeButtonClick}
            height={40}
            type="outlined"
            disabled={isButtonDisable || isOldStake(activeLootbox.activeStakingId)}
          >
            Unstake
          </StakeButton>
        </>
      ) : (
        <StakeButton
          disabled={
            timeNow <= nextClaim || claims >= maxClaims || isButtonDisable || isOldStake(activeLootbox.activeStakingId)
          }
          onClick={handeClaimButtonClick}
          height={40}
        >
          Claim Reward
        </StakeButton>
      )}
    </ButtonsContainer>
  );
};

export default observer(SubmitButtons);
