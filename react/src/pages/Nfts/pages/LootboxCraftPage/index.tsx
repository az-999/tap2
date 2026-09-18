import { useTonAddress } from '@tonconnect/ui-react';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';

import LoadingIcon from '@/assets/LoadingIcon';

import Text from '@/components/UI/Text';

import MmproTokenIcon from '@/pages/Nfts/components/Lootbox/LootboxMonthlyField/assets/MmproTokenIcon';
import LootboxStakings from '@/pages/Nfts/components/Lootbox/LootboxStakings';
import LootboxTooltips from '@/pages/Nfts/components/Lootbox/LootboxTooltips';
import StakingModal from '@/pages/Nfts/components/Lootbox/Modals';
import RewardsModal from '@/pages/Nfts/components/Lootbox/RewardsModal';
import StakeButton from '@/pages/Nfts/components/Lootbox/StakeButton';
import StakeSelect from '@/pages/Nfts/components/Lootbox/StakeSelect';
import StakingLoaderTooltip from '@/pages/Nfts/components/Lootbox/StakingLoaderTooltip';
import StakingVideoLoaderTooltip from '@/pages/Nfts/components/Lootbox/StakingVideoLoaderTooltip';
import TitleSlider from '@/pages/Nfts/components/Lootbox/TitleSlider';
import InfoIcon from '@/pages/Nfts/pages/LootboxCraftPage/assets/InfoIcon';
import {
  BalanceContainer,
  BuyTokensContainer,
  LoadingContainer,
  LootboxCraftPageContainer,
  SelectStakePlanContainer,
  StakeSelectContainer,
  StakingButtonContainer,
} from '@/pages/Nfts/pages/LootboxCraftPage/styled';
import { STONFI_URL } from '@/pages/Vouchers/Components/Voucher';
import rootStore from '@/store';

const LootboxCraftPage = () => {
  const wallet = useTonAddress();

  const {
    stakingStore: {
      fetchLootboxes,
      fetchStakedLootboxes,
      addStakingModal,
      startCheckStakingStatus,
      startCheckClaimStakingStatus,
      startCheckRestakingStatus,
      startCheckUnstakingStatus,
      getUserTokenBalance,
      userTokensBalance,
      stakingValue,
      isButtonDisable,
    },
    isLoading,
  } = rootStore;

  useEffect(() => {
    Promise.all([fetchLootboxes(), fetchStakedLootboxes()]);

    startCheckStakingStatus({ walletAddress: wallet });
    startCheckClaimStakingStatus();
    startCheckRestakingStatus();
    startCheckUnstakingStatus();
  }, []);

  useEffect(() => {
    void getUserTokenBalance({ userWalletAddress: wallet });
  }, [wallet]);

  const handleStakeButtonClick = () => {
    addStakingModal(1);
  };

  const handleMmproTokenStonfiClick = () => {
    window.open(STONFI_URL, '_blank');
  };

  if (isLoading)
    return (
      <LoadingContainer>
        <LoadingIcon />
      </LoadingContainer>
    );

  return (
    <LootboxCraftPageContainer>
      <TitleSlider />

      <SelectStakePlanContainer>
        <Text fontSize={12} fontWeight={400}>
          Select the <span id="green-highlight">amount of MMPro Tokens</span>{' '}
          and the <span id="green-highlight">duration</span> for which you want
          to stake your tokens.
        </Text>

        <StakeSelectContainer>
          <StakeSelect type="value" />
          <StakeSelect type="duration" />
        </StakeSelectContainer>

        <BalanceContainer>
          <Text fontSize={12} fontWeight={500}>
            Your MMPro Tokens balance:
          </Text>
          <MmproTokenIcon />
          <Text fontSize={12} fontWeight={700}>
            {Number(userTokensBalance?.toFixed(0)).toLocaleString('ru-RU')}
          </Text>
        </BalanceContainer>

        <StakingButtonContainer>
          <StakeButton
            onClick={handleStakeButtonClick}
            /* disabled={
              !userTokensBalance ||
              userTokensBalance < stakingValue ||
              isButtonDisable
            }*/
            disabled={true}
          >
            Stake
          </StakeButton>
          <div>
            <InfoIcon />
            <Text fontSize={12} fontWeight={400}>
              Creation of new stakings is disabled
            </Text>
          </div>
        </StakingButtonContainer>

        <BuyTokensContainer>
          <div>
            <MmproTokenIcon />
            <Text fontSize={12} fontWeight={500}>
              Not enough MMPro Tokens?
            </Text>
          </div>

          <button onClick={handleMmproTokenStonfiClick}>Buy now!</button>
        </BuyTokensContainer>
      </SelectStakePlanContainer>

      <LootboxStakings />

      <StakingModal />
      <LootboxTooltips />
      <StakingLoaderTooltip />
      <StakingVideoLoaderTooltip />
      <RewardsModal />
    </LootboxCraftPageContainer>
  );
};

export default observer(LootboxCraftPage);
