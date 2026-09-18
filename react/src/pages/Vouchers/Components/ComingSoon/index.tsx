import { observer } from 'mobx-react-lite';
import React from 'react';

import Text from '@/components/UI/Text';

import bgImage from '@/pages/Vouchers/Assets/vouchersBg.png';
import mainImage from '@/pages/Vouchers/Assets/vouchersGroup.png';
import {
  BottomBlock,
  ComingSoonContainer,
  ImagesContainer,
  MainImage,
  MiddleContainer,
  StyledBg,
  TitleContainer,
  UpperContainer,
} from '@/pages/Vouchers/Components/ComingSoon/styled';
import rootStore from '@/store';
import Utils from '@/utils';

const DATA = [
  'Purchase fee: 0.08 TON',
  'Limit of 1 voucher of each Tier per person',
  'Recommended amount for participation: 0.6 TON (for purchasing each Tier + network contingency)',
];

const ComingSoon = () => {
  const { timeNow } = rootStore;

  const salesDate = new Date('2024-07-18T16:00:00Z');
  const millisecondsSalesDate = salesDate.getTime();
  const secondsSinceSalesDate = Math.floor(millisecondsSalesDate / 1000);

  return (
    <ComingSoonContainer>
      <UpperContainer>
        <Text fontSize={22} fontWeight={700}>
          Prepare your MMPro Points for NFT Voucher sales
        </Text>

        <MiddleContainer>
          <ImagesContainer>
            <StyledBg src={bgImage} alt="" />
            <MainImage src={mainImage} alt="" />
          </ImagesContainer>

          <TitleContainer>
            <Text fontSize={28} fontWeight={700}>
              Hurry. The sale is already starting
            </Text>
          </TitleContainer>
        </MiddleContainer>
      </UpperContainer>

      <BottomBlock id="bottom-block">
        <h5>
          To participate in the sale, you need to connect your wallet via Ton
          Connect (TonKeeper or Ton Wallet)
        </h5>

        <ul>
          {DATA.map((item, index) => (
            <li key={`${index}-coming-soon`}>{item}</li>
          ))}
        </ul>
      </BottomBlock>
    </ComingSoonContainer>
  );
};

export default observer(ComingSoon);
