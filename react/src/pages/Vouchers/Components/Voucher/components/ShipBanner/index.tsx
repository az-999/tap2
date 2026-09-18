import { observer } from 'mobx-react-lite';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import Text from '@/components/UI/Text';

import {
  ExtraButton,
  ExtraContentContainer,
  ExtraVoucherContainer,
} from '@/pages/Vouchers/Components/Voucher/styled';
import rootStore from '@/store';

interface ShipBannerProps {
  image: string;
  title?: string;
  subtitleFirst?: string;
  subtitleSec?: string;
  subtitleThird?: string;
  buttonTitle: string;
  isDisabled: boolean;
  onButtonClick: () => void;
  buttonColor?: 'pink' | 'red' | 'green' | 'blue' | 'azur';
}

const ShipBanner = ({
  image,
  title = 'Star Wars',
  subtitleFirst = 'Become a pirate or defend',
  subtitleSec = 'yourself from them!',
  subtitleThird = '',
  buttonTitle,
  isDisabled,
  onButtonClick,
  buttonColor = 'green',
}: ShipBannerProps) => {
  const {
    userStore: { isWalletInvalid },
  } = rootStore;

  return (
    <ExtraVoucherContainer isDisabled={isDisabled} onClick={onButtonClick}>
      <LazyLoadImage
        src={image}
        alt=""
        height={160}
        width={160}
        effect="blur"
      />

      <ExtraContentContainer $withPadding={!subtitleThird}>
        <div>
          <Text fontSize={16} fontWeight={700}>
            {title}
          </Text>

          <div>
            <Text fontSize={12} fontWeight={400}>
              {subtitleFirst}
            </Text>
            <Text fontSize={12} fontWeight={400}>
              {subtitleSec}
            </Text>
            <Text fontSize={12} fontWeight={400}>
              {subtitleThird}
            </Text>
          </div>
        </div>

        <ExtraButton
          $color={buttonColor}
          $isDisabled={isWalletInvalid}
          $size="regular"
        >
          {buttonTitle}
        </ExtraButton>
      </ExtraContentContainer>
    </ExtraVoucherContainer>
  );
};

export default observer(ShipBanner);
