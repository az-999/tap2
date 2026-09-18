import React from 'react';
import SecureLS from 'secure-ls';

import MmproCoin from '@/pages/Vouchers/Assets/MmproCoin';
import SuccessWithWhiteIcon from '@/pages/Vouchers/Assets/SuccessWithWhiteIcon';
import TonCoin from '@/pages/Vouchers/Assets/TonCoin';
import {
  MMproContainer,
  Price,
  Title,
  TitleContainer,
  TonContainer,
} from '@/pages/Vouchers/Components/ModalTitle/styled';
import rootStore from '@/store';

const ls = new SecureLS();

const ModalTitle = () => {
  const {
    vouchersStore: {
      activeVoucher,
      isCaptchaCompleted,
      isCommissionCompleted,
      modalContent: { isCommissionActive },
    },
  } = rootStore;

  if (!activeVoucher) {
    return null;
  }

  const { comission, price, id, nft_id, name } = activeVoucher;

  const pointsDisableRules: boolean =
    (ls.get('secureCurrentVoucherIdBuying') &&
      id === ls.get('secureCurrentVoucherIdBuying')) ||
    (isCommissionActive && isCaptchaCompleted) ||
    isCommissionCompleted;

  const commissionDisableRules: boolean =
    (ls.get('secureCurrentVoucherIdBuying') &&
      id === ls.get('secureCurrentVoucherIdBuying')) ||
    isCommissionCompleted;

  const isMmproTokenToken = name.includes('MMPro Token');
  const isPriceFieldExist = nft_id !== 7 && !isMmproTokenToken;

  return (
    <TitleContainer $isPriceFieldExist={isPriceFieldExist}>
      <Price>
        {isPriceFieldExist && (
          <>
            <p>Price in points</p>
            <MMproContainer>
              <Title $disabled={pointsDisableRules}>
                <MmproCoin />
                <span>{`${price.toLocaleString('ru-RU') || 0}`}</span>
              </Title>

              {pointsDisableRules && (
                <span id="success-icon">
                  <SuccessWithWhiteIcon />
                </span>
              )}
            </MMproContainer>
          </>
        )}
      </Price>

      <Price>
        {isPriceFieldExist && <p>Commission</p>}

        <TonContainer>
          <Title $disabled={commissionDisableRules}>
            <TonCoin />
            <span>
              {isMmproTokenToken
                ? price
                : `${comission ? (comission / 10 ** 9).toFixed(1) : 0.08}`}
            </span>
          </Title>

          {commissionDisableRules && (
            <span id="success-icon">
              <SuccessWithWhiteIcon />
            </span>
          )}
        </TonContainer>
      </Price>
    </TitleContainer>
  );
};

export default ModalTitle;
