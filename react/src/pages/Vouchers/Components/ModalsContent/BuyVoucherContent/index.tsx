import { useTonConnectModal, useTonWallet } from '@tonconnect/ui-react';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { css } from 'styled-components/macro';

import UiButton from '@/components/UI/Button';
import Text from '@/components/UI/Text';
import WalletIcon from '@/components/WalletPageButton/assets/WalletIcon';

import ModalTitle from '@/pages/Vouchers/Components/ModalTitle';
import BuyMmproCoinContent from '@/pages/Vouchers/Components/ModalsContent/BuyMmproCoinContent';
import BuyOgPassContent from '@/pages/Vouchers/Components/ModalsContent/BuyOgPassContent';
import BuyStarWarsContent from '@/pages/Vouchers/Components/ModalsContent/BuyStarWarsContent';
import {
  ButtonsContainer,
  BuyNftContainer,
  Image,
} from '@/pages/Vouchers/Components/ModalsContent/BuyVoucherContent/styled';
import { useGetVoucherImage } from '@/pages/Vouchers/hooks/useGetVoucherImage';
import { WalletButtonWrapper } from '@/pages/Vouchers/styled';
import rootStore from '@/store';
import Utils from '@/utils';

interface BuyVoucherContentProps {
  onBuyByPoints: () => void;
  isDisabled: boolean;
  onModalClose: () => void;
}

const BuyVoucherContent = ({
  onBuyByPoints,
  isDisabled,
  onModalClose,
}: BuyVoucherContentProps) => {
  const { getNftImage } = useGetVoucherImage();
  const wallet = useTonWallet();
  const { open } = useTonConnectModal();

  const {
    vouchersStore: { activeVoucher },
  } = rootStore;

  if (!activeVoucher) {
    return null;
  }

  const { id, name, image, nft_id } = activeVoucher;

  const handleConnectWalletClick = () => {
    open();
    onModalClose();
  };

  if (name === 'MMPro Token')
    return <BuyMmproCoinContent onModalClose={onModalClose} />;

  if (name === 'Star Wars')
    return <BuyStarWarsContent onModalClose={onModalClose} />;

  if (nft_id === 7)
    return (
      <BuyOgPassContent onModalClose={onModalClose} onClick={onBuyByPoints} />
    );

  return (
    <BuyNftContainer>
      <Text fontSize={16} fontWeight={700}>
        {wallet ? 'You are buying' : 'Buy NFT'}
      </Text>

      <Text fontSize={22} fontWeight={700}>
        {name}
      </Text>

      <Image
        src={image ? `${Utils.getApiUrl()}/${image}` : getNftImage(id)}
        alt=""
        rel="preload"
      />

      {wallet ? (
        <ButtonsContainer>
          <ModalTitle />

          <UiButton
            onClick={onBuyByPoints}
            disabled={isDisabled}
            fragment={css`
              &:disabled {
                opacity: 0.7;
                box-shadow: none;
                border: none;
                background-color: #3c6;
              }
            `}
          >
            <WalletButtonWrapper>
              <Text fontSize={14} fontWeight={500}>
                Buy
              </Text>
            </WalletButtonWrapper>
          </UiButton>
        </ButtonsContainer>
      ) : (
        <ButtonsContainer id="connect-wallet-btn">
          <UiButton onClick={handleConnectWalletClick}>
            <span>
              <WalletIcon fill="#fff" />
            </span>
            Connect a wallet
          </UiButton>
        </ButtonsContainer>
      )}
    </BuyNftContainer>
  );
};

export default observer(BuyVoucherContent);
