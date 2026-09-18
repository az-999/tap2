import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';

import CloseButton from '@/components/CloseButton';
import Text from '@/components/UI/Text';

import MmproCoinIcon from '@/pages/Vouchers/Components/ModalsContent/BuyMmproCoinContent/assets/MmproCoinIcon';
import coinsImage from '@/pages/Vouchers/Components/ModalsContent/BuyMmproCoinContent/assets/coins.png';
import bg from '@/pages/Vouchers/Components/ModalsContent/BuyMmproCoinContent/assets/top-bg.png';
import SaleItem from '@/pages/Vouchers/Components/ModalsContent/BuyMmproCoinContent/components/SaleItem';
import { SALE_ITEMS_CARD_TOP } from '@/pages/Vouchers/Components/ModalsContent/BuyMmproCoinContent/const';
import {
  BuyMmproCoinContentContainer,
  ContentContainer,
  ImageContainer,
  SaleItemsContainer,
  WithdrawContainer,
  WithdrawItem,
} from '@/pages/Vouchers/Components/ModalsContent/BuyMmproCoinContent/styled';
import { ExtraButton } from '@/pages/Vouchers/Components/Voucher/styled';
import { initialVouchersPageModalContentState } from '@/pages/Vouchers/store';
import rootStore from '@/store';

interface BuyMmproCoinContentProps {
  onModalClose: () => void;
}

const BuyMmproCoinContent = ({ onModalClose }: BuyMmproCoinContentProps) => {
  const {
    vouchersStore: {
      mmproTokenAmount,
      mmproTokenMarketPrice,
      setModalContentActive,
      setActiveVoucher,
      activeVoucher,
      getMmproTokenInfo,
    },
  } = rootStore;

  useEffect(() => {
    getMmproTokenInfo();
  }, []);

  const handleBuyButtonClick = async (price: number) => {
    getMmproTokenInfo();

    setActiveVoucher({
      ...activeVoucher,
      id: (30 * 10 ** 6 + 1) * price,
      name: 'MMPro Token',
      price,
    });

    setModalContentActive({
      ...initialVouchersPageModalContentState,
      isCommissionActive: true,
    });
  };

  return (
    <BuyMmproCoinContentContainer>
      <CloseButton onClick={onModalClose} zIndex={2} />

      <ImageContainer>
        <img src={bg} alt="" id="mmpro-coin-background" />
        <img src={coinsImage} alt="" id="mmpro-coin-image" />
      </ImageContainer>

      <ContentContainer>
        <Text fontSize={24} fontWeight={700}>
          MMPro Token Presale on the TON Network — buy now!
        </Text>

        <Text fontSize={12} fontWeight={400}>
          <span id="soon-text">Soon: </span> Staking with{' '}
          <span id="subtitle-green-highlight">
            &lt; 50% APY + NFT Starship parts
          </span>
        </Text>

        <WithdrawContainer>
          <WithdrawItem>
            <Text fontSize={15} fontWeight={700}>
              Withdraw your MMPro Tokens when the{' '}
              <span id="green-highlight">listing on Ston.fi goes live</span>
            </Text>
          </WithdrawItem>
          <WithdrawItem>
            <div>
              <Text fontSize={14} fontWeight={400}>
                MMPro Tokens purchased
              </Text>

              <div>
                <Text fontSize={16} fontWeight={700}>
                  {mmproTokenAmount}
                </Text>
                <MmproCoinIcon />
              </div>
            </div>
            <ExtraButton
              $color="green"
              $isDisabled={true}
              $size="big"
              $isFullWidth={true}
              onClick={() => null}
            >
              Withdraw MMPro Tokens
            </ExtraButton>
          </WithdrawItem>
        </WithdrawContainer>

        <SaleItemsContainer>
          <div>
            {SALE_ITEMS_CARD_TOP.map(({ price }, index) => (
              <SaleItem
                key={`sale-item-${price}-${index}`}
                price={price}
                value={(mmproTokenMarketPrice * price).toFixed(2)}
                index={index}
                onClick={handleBuyButtonClick}
              />
            ))}
          </div>
          <SaleItem
            index={2}
            price={50}
            value={(mmproTokenMarketPrice * 50).toFixed(2)}
            onClick={handleBuyButtonClick}
          />
        </SaleItemsContainer>
      </ContentContainer>
    </BuyMmproCoinContentContainer>
  );
};

export default observer(BuyMmproCoinContent);
