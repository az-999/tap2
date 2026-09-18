import { observer } from 'mobx-react-lite';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import Text from '@/components/UI/Text';

import {
  ExtraButton,
  ExtraContentContainer,
  ExtraVoucherContainer,
} from '@/pages/Vouchers/Components/Voucher/styled';
import { useGetVoucherImage } from '@/pages/Vouchers/hooks/useGetVoucherImage';
import { Voucher as VoucherType } from '@/pages/Vouchers/types';
import rootStore from '@/store';
import Utils from '@/utils';

interface OgPassProps {
  voucher: VoucherType;
  isDisabled: boolean;
  onBuyVoucherButtonClick: () => void;
}

const OgPass = ({
  voucher,
  isDisabled,
  onBuyVoucherButtonClick,
}: OgPassProps) => {
  const {
    userStore: { isWalletInvalid },
  } = rootStore;

  const { image, id } = voucher;
  const { getNftImage } = useGetVoucherImage();

  return (
    <ExtraVoucherContainer
      isDisabled={isDisabled}
      onClick={onBuyVoucherButtonClick}
    >
      <LazyLoadImage
        src={image ? `${Utils.getApiUrl()}${image}` : getNftImage(id)}
        alt=""
        height={160}
        width={160}
        effect="blur"
      />

      <ExtraContentContainer>
        <div>
          <Text fontSize={16} fontWeight={700}>
            BUMP OG PASS
          </Text>

          <div>
            <Text fontSize={12} fontWeight={400}>
              Your unique experience
            </Text>
            <Text fontSize={12} fontWeight={400}>
              with BUMP Pass NFTs
            </Text>
          </div>
        </div>

        <ExtraButton
          $color="pink"
          $isDisabled={isWalletInvalid}
          $size="regular"
        >
          Buy
        </ExtraButton>
      </ExtraContentContainer>
    </ExtraVoucherContainer>
  );
};

export default observer(OgPass);
