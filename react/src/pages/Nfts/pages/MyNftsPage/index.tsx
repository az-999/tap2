import { useTonAddress } from '@tonconnect/ui-react';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';

import LoadingIcon from '@/assets/LoadingIcon';
import SmileIcon from '@/assets/SmileIcon';

import Text from '@/components/UI/Text';

import MyNftItem from '@/pages/Nfts/components/MyNftItem';
import {
  LoadingContainer,
  MyNftsWrapper,
  NoNftsContainer,
} from '@/pages/Nfts/pages/MyNftsPage/styled';
import rootStore from '@/store';

const MyNftsPage = () => {
  const wallet = useTonAddress();

  const {
    nftsStore: { fetchAllExistingNfts, existingNfts },
    isLoading,
  } = rootStore;

  useEffect(() => {
    if (!wallet) return;

    fetchAllExistingNfts({ account_id: wallet }).catch((e) => console.error(e));
  }, [wallet]);

  const nftsRule = !!existingNfts && existingNfts.length > 0 && wallet;

  return isLoading ? (
    <LoadingContainer>
      <LoadingIcon />
    </LoadingContainer>
  ) : (
    <MyNftsWrapper $noNfts={!nftsRule}>
      {wallet ? (
        nftsRule ? (
          existingNfts?.map((nftItem, index) => (
            <MyNftItem
              key={nftItem.id ?? `my-nfts-${index}`}
              nftData={nftItem}
            />
          ))
        ) : (
          <NoNftsContainer>
            <SmileIcon />
            <Text fontSize={16} fontWeight={500}>
              You don't have NFTs
            </Text>
            <Text fontSize={14} fontWeight={400}>
              First, you need to purchase NFTs so that they appear here
            </Text>
          </NoNftsContainer>
        )
      ) : (
        <NoNftsContainer>
          <SmileIcon />
          <Text fontSize={18} fontWeight={500}>
            You need to connect your wallet
          </Text>
        </NoNftsContainer>
      )}
    </MyNftsWrapper>
  );
};

export default observer(MyNftsPage);
