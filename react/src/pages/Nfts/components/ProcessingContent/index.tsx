import { observer } from 'mobx-react-lite';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import MmproCoinIcon from '@/components/RewardTooltip/assets/MmproCoinIcon';
import Text from '@/components/UI/Text';

import EmptyIcon from '@/pages/Nfts/components/ProcessingContent/assets/EmptyIcon';
import ErrorIcon from '@/pages/Nfts/components/ProcessingContent/assets/ErrorIcon';
import ProcessingIcon from '@/pages/Nfts/components/ProcessingContent/assets/ProcessingIcon';
import SuccessIcon from '@/pages/Nfts/components/ProcessingContent/assets/SuccessIcon';
import {
  Button,
  ContentContainer,
  ContentItem,
  ProcessingContentContainer,
  Row,
} from '@/pages/Nfts/components/ProcessingContent/styled';
import { initialVouchersPageModalContentState } from '@/pages/Vouchers/store';
import rootStore from '@/store';
import { AppPath, NftsPath } from '@/types/routes';

const ProcessingContent = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const {
    nftsStore: {
      transactionStatus,
      paymentStatus,
      setIsModalOpen,
      resetStatuses,
    },
    vouchersStore: { activeVoucher, setModalContentActive, mmproTokenInfo },
  } = rootStore;

  const isButtonDisabled =
    (transactionStatus === 'pending' ||
      transactionStatus === 'processing' ||
      paymentStatus === 'pending' ||
      paymentStatus === 'processing') &&
    transactionStatus !== 'rejected' &&
    paymentStatus !== 'rejected';
  const isMmproTokenBuying = Boolean(
    activeVoucher && activeVoucher.name.includes('MMPro Token'),
  );
  const tokenAmount =
    mmproTokenInfo && 'amount_last_order' in mmproTokenInfo
      ? mmproTokenInfo.amount_last_order
      : 0;

  const handleButtonClick = () => {
    setIsModalOpen(false);
    resetStatuses();

    if (isMmproTokenBuying)
      setModalContentActive({
        ...initialVouchersPageModalContentState,
        isBuyVoucherActive: true,
      });
    if (pathname.endsWith('nfts/bump-store')) return;

    setTimeout(() => navigate(`${AppPath.nfts}/${NftsPath.marketplace}`), 200);
  };

  return (
    <ProcessingContentContainer>
      <Text fontSize={22} fontWeight={700}>
        Almost ready
      </Text>

      <ContentContainer>
        <Row>
          {transactionStatus === 'fulfilled' && <SuccessIcon />}
          {transactionStatus === 'rejected' && <ErrorIcon />}
          {transactionStatus === 'processing' && <ProcessingIcon />}
          {transactionStatus === 'pending' && <EmptyIcon />}
          <ContentItem>
            <Text fontSize={16} fontWeight={500}>
              Transaction
            </Text>
            <Text fontSize={12} fontWeight={400}>
              Go to the Tonkeeper app and confirm the transaction
            </Text>
          </ContentItem>
        </Row>

        <Row>
          {paymentStatus === 'fulfilled' && <SuccessIcon />}
          {paymentStatus === 'rejected' && <ErrorIcon />}
          {paymentStatus === 'processing' && <ProcessingIcon />}
          {paymentStatus === 'pending' && <EmptyIcon />}
          <ContentItem>
            <Text fontSize={16} fontWeight={500}>
              Checking Payment
            </Text>
            <Text fontSize={12} fontWeight={400}>
              We are checking your payment. It may take some time
            </Text>
          </ContentItem>
        </Row>

        {!isButtonDisabled && isMmproTokenBuying && !!tokenAmount && (
          <Row>
            <MmproCoinIcon />
            <Text fontSize={16} fontWeight={500}>
              You have received{' '}
              <strong>
                <span id="green-highlight">{tokenAmount.toFixed(2)}</span> MMPro
                Tokens
              </strong>
            </Text>
          </Row>
        )}
      </ContentContainer>

      <Button
        $type="ok"
        disabled={isButtonDisabled}
        onClick={handleButtonClick}
      >
        Okay
      </Button>
    </ProcessingContentContainer>
  );
};

export default observer(ProcessingContent);
