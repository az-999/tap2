import { observer } from 'mobx-react-lite';
import React from 'react';
import { css } from 'styled-components/macro';

import UiButton from '@/components/UI/Button';
import Text from '@/components/UI/Text';

import ModalTitle from '@/pages/Vouchers/Components/ModalTitle';
import {
  ButtonsContainer,
  Image,
} from '@/pages/Vouchers/Components/ModalsContent/BuyVoucherContent/styled';
import { PayCommissionContentContainer } from '@/pages/Vouchers/Components/ModalsContent/PayCommissionContent/styled';
import { useGetVoucherImage } from '@/pages/Vouchers/hooks/useGetVoucherImage';
import { WalletButtonWrapper } from '@/pages/Vouchers/styled';
import rootStore from '@/store';
import Utils from '@/utils';

interface PayCommissionContentProps {
  onPayCommission: () => void;
  onBuyToken: (price: number) => void;
}

const PayCommissionContent = ({
  onPayCommission,
  onBuyToken,
}: PayCommissionContentProps) => {
  const { getNftImage } = useGetVoucherImage();

  const {
    vouchersStore: {
      activeVoucher,
      isCommissionsPayButtonDisabled,
      mmproTokenMarketPrice,
    },
  } = rootStore;

  if (!activeVoucher) {
    return null;
  }

  const { id, name, price, image, nft_id } = activeVoucher;

  const isMmproToken = name.includes('MMPro Token');
  const buttonTitle =
    nft_id === 7
      ? 'Buy BUMP OG PASS'
      : isMmproToken
        ? 'Buy MMPro Token'
        : 'Pay a commission';

  const imageSrc = image
    ? isMmproToken
      ? image
      : `${Utils.getApiUrl()}/${image}`
    : getNftImage(id);

  return (
    <PayCommissionContentContainer>
      <Text fontSize={16} fontWeight={700}>
        You are buying
      </Text>

      {name.includes('MMPro Token') ? (
        <Text fontSize={22} fontWeight={700}>
          <span id="green-highlight">
            {(mmproTokenMarketPrice * price).toFixed(2)}
          </span>{' '}
          {name}
        </Text>
      ) : (
        <Text fontSize={22} fontWeight={700}>
          {name}
        </Text>
      )}

      <Image src={imageSrc} alt="" rel="preload" />

      <ButtonsContainer>
        <ModalTitle />

        <UiButton
          onClick={isMmproToken ? () => onBuyToken(price) : onPayCommission}
          disabled={isCommissionsPayButtonDisabled}
          fragment={css`
            background-color: #45aef5;
            box-shadow: none;
            &:disabled {
              opacity: 0.7;
              box-shadow: none;
              border: none;
              background-color: #45aef5b3;
            }
          `}
        >
          <WalletButtonWrapper>
            <Text fontSize={14} fontWeight={500}>
              {buttonTitle}
            </Text>
          </WalletButtonWrapper>
        </UiButton>
      </ButtonsContainer>
    </PayCommissionContentContainer>
  );
};

export default observer(PayCommissionContent);
