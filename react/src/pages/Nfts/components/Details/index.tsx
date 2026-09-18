import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Text from '@/components/UI/Text';

import ArrowIcon from '@/pages/Nfts/assets/ArrowIcon';
import ContentItemField from '@/pages/Nfts/components/Details/components/ContentItemField';
import ContentItemWithClipboardField from '@/pages/Nfts/components/Details/components/ContentItemWithClipboardField';
import {
  ContentContainer,
  DetailsContainer,
  TitleContainer,
} from '@/pages/Nfts/components/Details/styled';
import {
  ERROR_DURING_COPIED_NFT_CONTRACT_ADDRESS,
  ERROR_DURING_COPIED_NFT_TOKEN_ID,
} from '@/services/constants/errorMessages';
import rootStore from '@/store';
import Utils from '@/utils';

const initialState = {
  isContractCopied: false,
  isTokenIdCopied: false,
};

const Details = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [{ isContractCopied, isTokenIdCopied }, setIsCopied] =
    useState(initialState);

  const {
    nftsStore: { activeNft, fetchTonApiNftInfo, tonApiNftInfo },
  } = rootStore;

  /** TODO удалить после теста!!! */
  // useEffect(() => {
  //   if (!activeNft) return;

  // const { nft_address } = activeNft;
  // fetchTonApiNftInfo({ nft_address, pathname });
  // }, [activeNft?.nft_address]);

  if (!activeNft) return null;
  const { owner, sale_address, nft_address, name, collection_name } = activeNft;

  const handleButtonContractCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied({ ...initialState, isContractCopied: true });

      setTimeout(() => setIsCopied(initialState), 1500);
    } catch (err) {
      console.error(ERROR_DURING_COPIED_NFT_CONTRACT_ADDRESS, err);
    }
  };

  const handleButtonTokenIdCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied({ ...initialState, isTokenIdCopied: true });

      setTimeout(() => setIsCopied(initialState), 1500);
    } catch (err) {
      console.error(ERROR_DURING_COPIED_NFT_TOKEN_ID, err);
    }
  };

  return (
    <DetailsContainer>
      <TitleContainer $isOpen={isOpen}>
        <Text fontSize={14} fontWeight={600}>
          Details
        </Text>

        <button onClick={() => setIsOpen(!isOpen)}>
          <ArrowIcon />
        </button>
      </TitleContainer>

      <ContentContainer $isOpen={isOpen}>
        <ContentItemField
          title="Owner"
          value={Utils.getShortOwnerAddress(owner)}
        />
        <ContentItemField
          title="Collection"
          value={tonApiNftInfo?.collection.name ?? collection_name ?? ''}
        />

        {sale_address && (
          <ContentItemWithClipboardField
            title="Contract address"
            value={Utils.getShortNftAddress(sale_address)}
            onClick={() => handleButtonContractCopy(sale_address)}
            isCopied={isContractCopied}
            isDisabled={isContractCopied || isTokenIdCopied}
          />
        )}

        <ContentItemWithClipboardField
          title="Token ID"
          value={Utils.getShortNftAddress(nft_address)}
          onClick={() => handleButtonTokenIdCopy(nft_address)}
          isCopied={isTokenIdCopied}
          isDisabled={isContractCopied || isTokenIdCopied}
        />

        <ContentItemField
          title="Metadata"
          value={tonApiNftInfo?.metadata.name ?? name ?? ''}
        />
      </ContentContainer>
    </DetailsContainer>
  );
};

export default observer(Details);
