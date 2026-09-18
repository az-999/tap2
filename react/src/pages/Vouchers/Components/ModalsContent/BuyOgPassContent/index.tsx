import { useTonConnectModal, useTonWallet } from '@tonconnect/ui-react';
import { observer } from 'mobx-react-lite';
import React from 'react';

import CloseButton from '@/components/CloseButton';
import Text from '@/components/UI/Text';
import WalletIcon from '@/components/WalletPageButton/assets/WalletIcon';

import TonIcon from '@/pages/Vouchers/Components/ModalsContent/BuyOgPassContent/assets/TonIcon';
import bgSrc from '@/pages/Vouchers/Components/ModalsContent/BuyOgPassContent/assets/bg.png';
import nftSrc from '@/pages/Vouchers/Components/ModalsContent/BuyOgPassContent/assets/nftImageSrc.png';
import { OG_PASS_GIFTS_DATA } from '@/pages/Vouchers/Components/ModalsContent/BuyOgPassContent/const';
import {
  BuyOgPassContentContainer,
  ContentContainer,
  ImageContainer,
  PriceContainer,
  SubtitleContainer,
  TitleContainer,
} from '@/pages/Vouchers/Components/ModalsContent/BuyOgPassContent/styled';
import Gifts from '@/pages/Vouchers/Components/ModalsContent/Gifts';
import { ExtraButton } from '@/pages/Vouchers/Components/Voucher/styled';
import rootStore from '@/store';

interface BuyOgPassContentProps {
  onModalClose: () => void;
  onClick: () => void;
}

const BuyOgPassContent = ({ onModalClose, onClick }: BuyOgPassContentProps) => {
  const wallet = useTonWallet();
  const { open } = useTonConnectModal();

  const {
    userStore: { isWalletInvalid },
    vouchersStore: { activeVoucher, isBuyingVoucherButtonDisabled },
  } = rootStore;

  if (!activeVoucher || !activeVoucher?.comission) return null;

  const price = (activeVoucher.comission / 10 ** 9).toFixed(1);

  const handleConnectWalletClick = () => {
    open();
    onModalClose();
  };

  return (
    <BuyOgPassContentContainer>
      <CloseButton onClick={onModalClose} zIndex={2} />

      <ImageContainer>
        <img id="og-pass-background" src={bgSrc} alt="" />
        <img id="og-pass-nft-image" src={nftSrc} alt="" />
      </ImageContainer>

      <ContentContainer>
        <TitleContainer>
          <Text fontSize={20} fontWeight={700}>
            BUMP OG PASS
          </Text>

          <PriceContainer>
            <Text fontSize={14} fontWeight={500}>
              Price
            </Text>
            <TonIcon />
            <Text fontSize={20} fontWeight={600}>
              {price}
            </Text>
          </PriceContainer>

          <SubtitleContainer>
            <Text fontSize={12} fontWeight={400}>
              Gives access to unique gifts, a special user
            </Text>
            <Text fontSize={12} fontWeight={400}>
              experience and increased token drop
            </Text>
          </SubtitleContainer>
        </TitleContainer>

        <Gifts gifts={OG_PASS_GIFTS_DATA} />

        {wallet ? (
          <ExtraButton
            $color="pink"
            $isDisabled={isWalletInvalid}
            $isFullWidth={true}
            $size="big"
            onClick={onClick}
            disabled={isBuyingVoucherButtonDisabled}
          >
            Buy BUMP OG PASS
          </ExtraButton>
        ) : (
          <ExtraButton
            $color="pink"
            $isDisabled={false}
            $isFullWidth={true}
            $size="big"
            onClick={handleConnectWalletClick}
          >
            <span>
              <WalletIcon fill="#fff" />
            </span>
            Connect a wallet
          </ExtraButton>
        )}
      </ContentContainer>
    </BuyOgPassContentContainer>
  );
};

export default observer(BuyOgPassContent);
