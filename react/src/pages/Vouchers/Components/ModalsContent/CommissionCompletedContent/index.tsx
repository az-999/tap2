import React, { useState } from 'react';
import SecureLS from 'secure-ls';

import ReloadIcon from '@/components/ReloadIcon';
import Text from '@/components/UI/Text';

import CheckIcon from '@/pages/Nfts/assets/CheckIcon';
import CopyIcon from '@/pages/Nfts/assets/CopyIcon';
import ModalTitle from '@/pages/Vouchers/Components/ModalTitle';
import {
  Button,
  ButtonsContainer,
  CommissionCompletedContainer,
  Image,
} from '@/pages/Vouchers/Components/ModalsContent/BuyVoucherContent/styled';
import { CommissionCompletedContentContainer } from '@/pages/Vouchers/Components/ModalsContent/CommissionCompletedContent/styled';
import { useGetVoucherImage } from '@/pages/Vouchers/hooks/useGetVoucherImage';
import { ERROR_DURING_COPIED_NFT_HASH } from '@/services/constants/errorMessages';
import rootStore from '@/store';
import Utils from '@/utils';

const ls = new SecureLS();

interface CommissionCompletedContentProps {
  onClose: () => void;
}

const CommissionCompletedContent = ({
  onClose,
}: CommissionCompletedContentProps) => {
  const { getNftImage } = useGetVoucherImage();
  const [isCopied, setIsCopied] = useState(false);

  const {
    vouchersStore: { activeVoucher, isCommissionsPayButtonDisabled },
  } = rootStore;
  const hash = ls.get('secureCurrentTransactionHash');

  const handleButtonHashCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);

      setTimeout(() => setIsCopied(false), 1500);
    } catch (err) {
      console.error(ERROR_DURING_COPIED_NFT_HASH, err);
    }
  };

  if (!activeVoucher) {
    return null;
  }

  const { id, name, price, image } = activeVoucher;

  return (
    <CommissionCompletedContentContainer>
      <Text fontSize={16} fontWeight={700}>
        You are buying
      </Text>

      <Text fontSize={22} fontWeight={700}>
        {name}
      </Text>

      <Image
        src={image ? `${Utils.getApiUrl()}/${image}` : getNftImage(id)}
        alt=""
        rel="preload"
      />

      <ButtonsContainer>
        <ModalTitle />

        <CommissionCompletedContainer>
          <ReloadIcon />

          <div id="commission-completed-container">
            <Text fontSize={14} fontWeight={500}>
              Thank you! The NFT minting process
            </Text>
            <Text fontSize={14} fontWeight={500}>
              can take <strong>up to 15 minutes</strong>.{' '}
              {hash && (
                <Text fontSize={14} fontWeight={500}>
                  <a
                    href={`https://tonviewer.com/transaction/${hash}`}
                    target="_blank"
                  >
                    Hash
                  </a>
                </Text>
              )}
              <button
                onClick={() =>
                  handleButtonHashCopy(
                    `https://tonviewer.com/transaction/${hash}`,
                  )
                }
                disabled={isCopied}
              >
                {isCopied ? <CheckIcon /> : <CopyIcon />}
              </button>
            </Text>
          </div>
        </CommissionCompletedContainer>

        <Button onClick={onClose}>Okay</Button>
      </ButtonsContainer>
    </CommissionCompletedContentContainer>
  );
};

export default CommissionCompletedContent;
