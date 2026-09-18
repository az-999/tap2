import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Text from '@/components/UI/Text';

import NavigationButton from '@/pages/Nfts/components/NavigationButton';
import MmproCoin from '@/pages/Vouchers/Assets/MmproCoin';
import SoldOutIcon from '@/pages/Vouchers/Assets/SoldOutIcon';
import congratulationIcon from '@/pages/Vouchers/Assets/congratulationIcon.png';
import OgPass from '@/pages/Vouchers/Components/Voucher/components/OgPass';
import ShipBanner from '@/pages/Vouchers/Components/Voucher/components/ShipBanner';
import {
  BuyButton,
  CongratulationImage,
  CongratulationTextWrapper,
  CongratulationWrapper,
  CurrencyContainer,
  CurrencyItem,
  ItemContainer,
  NftImage,
  PurchasedContainer,
  SoldOutWrapper,
  TitleContainer,
  VoucherContainer,
} from '@/pages/Vouchers/Components/Voucher/styled';
import { useGetVoucherImage } from '@/pages/Vouchers/hooks/useGetVoucherImage';
import { VoucherItem, Voucher as VoucherType } from '@/pages/Vouchers/types';
import rootStore from '@/store';
import { AppPath, LootboxPath, NftsPath } from '@/types/routes';
import Utils from '@/utils';

interface VoucherProps {
  type: 'forPurchase' | 'purchased';
  voucher: VoucherType;
  isDisabled?: boolean;
  onBuyVoucherClick?: (args: VoucherItem) => void;
  onActivationClick?: (id: number) => void;
  onSellNftClick?: (id: number) => void;
}

export const STONFI_URL =
  'https://app.ston.fi/swap?chartVisible=false&ft=TON&tt=EQDrqXZfdR-MqwAYImYkR0YHPDazMiI5-oUzaLxvuH4vM_J7';

const Voucher = ({
  type,
  voucher,
  isDisabled = false,
  onBuyVoucherClick,
  onSellNftClick,
  onActivationClick,
}: VoucherProps) => {
  const { id, name, price, image, comission, nft_id } = voucher;
  const { getNftImage } = useGetVoucherImage();
  const WebApp = useWebApp();
  const navigate = useNavigate();

  const {
    vouchersStore: { existingVouchers, vouchers },
    userStore: {
      isWalletInvalid,
      setWalletInvalidModal,
      userInfo: {
        nft: { spaceshipparts },
      },
    },
  } = rootStore;

  const isVoucherPurchased = existingVouchers.some(
    (voucher) => voucher.id === id,
  );
  const isVoucherSoldOut = vouchers?.some(
    (voucher) => voucher.id === id && voucher.is_soldout,
  );

  const onBuyVoucherButtonClick = () => {
    if (isVoucherPurchased || isVoucherSoldOut) {
      return;
    }

    if (isWalletInvalid) {
      setWalletInvalidModal(true);
    } else {
      onBuyVoucherClick &&
        onBuyVoucherClick({ id, name, price, image, comission, nft_id });
    }
  };

  const handleLootboxButtonClick = () => {
    if (isWalletInvalid) return;
    navigate(`${AppPath.nfts}/${NftsPath.lootbox}/${LootboxPath.craft}`);
  };

  const handleMmproTokenStonfiClick = () => {
    window.open(STONFI_URL, '_blank');
  };

  const onShellNftButtonClick = () => {
    onSellNftClick && onSellNftClick(id);
  };

  const onActivationButtonClick = () => {
    onActivationClick && onActivationClick(id);
  };

  if (name === 'Lootbox')
    return (
      <ShipBanner
        image={image!}
        title="Staking DriveCore"
        buttonTitle="Buy"
        isDisabled={isDisabled}
        onButtonClick={handleLootboxButtonClick}
        subtitleFirst="Stake your MMPro Tokens"
        subtitleSec="and earn valuable"
        subtitleThird="rewards every month!"
        buttonColor="azur"
      />
    );

  if (name === 'MMPro Token')
    return (
      <ShipBanner
        image={image!}
        title="MMPro Token - buy now!"
        buttonTitle="Buy on Ston.fi"
        isDisabled={isDisabled}
        onButtonClick={handleMmproTokenStonfiClick}
        subtitleFirst="Soon: Staking with >50% "
        subtitleSec="APY + NFT Starship parts"
        buttonColor="blue"
      />
    );

  if (name === 'Star Wars')
    return (
      <ShipBanner
        image={image!}
        buttonTitle="Buy"
        isDisabled={isDisabled}
        onButtonClick={onBuyVoucherButtonClick}
      />
    );

  if (nft_id === 7)
    return (
      <OgPass
        voucher={voucher}
        isDisabled={isDisabled}
        onBuyVoucherButtonClick={onBuyVoucherButtonClick}
      />
    );

  if (spaceshipparts < 0) return null;

  return (
    <VoucherContainer
      $type={type}
      isDisabled={isDisabled}
      onClick={onBuyVoucherButtonClick}
    >
      <NftImage>
        <img
          src={image ? `${Utils.getApiUrl()}${image}` : getNftImage(id)}
          alt=""
          rel="preload"
        />
      </NftImage>
      <ItemContainer $type={type}>
        <TitleContainer>
          <Text fontSize={12} fontWeight={700}>
            {name}
          </Text>
        </TitleContainer>

        {'is_soldout' in voucher && (
          <>
            {type === 'forPurchase' &&
              !isVoucherPurchased &&
              !voucher.is_soldout && (
                <CurrencyContainer>
                  <Text
                    fontSize={10}
                    fontWeight={500}
                    color="rgba(255,255,255,0.5)"
                  >
                    Price
                  </Text>
                  <CurrencyItem>
                    <MmproCoin />
                    <Text fontSize={14} fontWeight={600}>
                      {Utils.formatNumber(price)}
                    </Text>
                  </CurrencyItem>

                  <BuyButton $isDisabled={isWalletInvalid}>Buy</BuyButton>
                  {/** todo пока убрали цену в тонах*/
                  /* <CurrencyItem>
                    <TonCoin />
                    <Text fontSize={14} fontWeight={600}>
                      100
                    </Text>
                  </CurrencyItem>*/}
                </CurrencyContainer>
              )}

            {type === 'forPurchase' &&
              isVoucherPurchased &&
              !voucher.is_soldout && (
                <CongratulationWrapper>
                  <CongratulationImage
                    src={congratulationIcon}
                    alt=""
                    rel="preload"
                  />
                  <CongratulationTextWrapper>
                    <Text fontSize={12} fontWeight={700}>
                      Congratulations!
                    </Text>
                    <Text fontSize={10} fontWeight={500}>
                      Take a look at vouchers of other tiers
                    </Text>
                  </CongratulationTextWrapper>
                </CongratulationWrapper>
              )}

            {type === 'forPurchase' && voucher.is_soldout && (
              <SoldOutWrapper>
                <SoldOutIcon />
              </SoldOutWrapper>
            )}
          </>
        )}

        {type === 'purchased' && (
          <PurchasedContainer>
            <NavigationButton
              onClick={onActivationButtonClick}
              isActive
              size="medium"
            >
              Activation
            </NavigationButton>
            <NavigationButton
              onClick={onShellNftButtonClick}
              isActive
              size="medium"
              color="grey"
            >
              Sell NFT
            </NavigationButton>
          </PurchasedContainer>
        )}
      </ItemContainer>
    </VoucherContainer>
  );
};

export default observer(Voucher);
