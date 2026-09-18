import { observer } from 'mobx-react-lite';
import React from 'react';
import { css } from 'styled-components/macro';

import Text from '@/components/UI/Text';

import Error from '../../Assets/Error';
import SuccessIcon from '../../Assets/SuccessIcon';
import { InsufficientFundsContainer, TitleWrapper } from './styled';
import rootStore from '@/store';

interface InsufficientFundsProps {
  isError: boolean;
}

const InsufficientFunds = ({ isError }: InsufficientFundsProps) => {
  const {
    vouchersStore: {
      isTransactionInProgress,
      modalContent: { isNoMoneyMessageActive, isCaptchaIncorrect },
      isSuccessVoucherModalActive,
    },
  } = rootStore;

  return (
    <InsufficientFundsContainer>
      <Text fontSize={16} fontWeight={700}>
        Buy NFT
      </Text>

      <TitleWrapper>
        {isError && (
          <>
            <Error />
            <Text fontSize={14} fontWeight={600}>
              Something went wrong, please try again!
            </Text>
          </>
        )}

        {isNoMoneyMessageActive && (
          <>
            <Error />
            <Text fontSize={14} fontWeight={600}>
              Insufficient funds for purchase
            </Text>
          </>
        )}

        {isCaptchaIncorrect && (
          <>
            <Error />
            <Text fontSize={14} fontWeight={600}>
              You have not passed the captcha check
            </Text>
          </>
        )}

        {isTransactionInProgress && (
          <>
            <Error />
            <Text fontSize={14} fontWeight={600}>
              You already have a blocked amount in the transaction. Maximum
              blocking period 30 minutes
            </Text>
          </>
        )}

        {isSuccessVoucherModalActive && (
          <>
            <SuccessIcon />
            <Text
              fontSize={14}
              fontWeight={600}
              styledFragment={css`
                text-align: center;
              `}
            >
              Congratulations on your successful purchase of the voucher!
            </Text>
          </>
        )}
      </TitleWrapper>
    </InsufficientFundsContainer>
  );
};

export default observer(InsufficientFunds);
