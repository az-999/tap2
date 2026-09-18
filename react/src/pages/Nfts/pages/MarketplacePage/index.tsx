import { useTonAddress } from '@tonconnect/ui-react';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDebouncedCallback } from 'use-debounce';

import LoadingIcon from '@/assets/LoadingIcon';
import SmileIcon from '@/assets/SmileIcon';

import Text from '@/components/UI/Text';
import UnavailablePage from '@/components/UnavailablePage';

import { useGetMode } from '@/hooks/useGetMode';
import AlphabetDownIcon from '@/pages/Nfts/assets/AlphabetDownIcon';
import AlphabetUpIcon from '@/pages/Nfts/assets/AlphabetUpIcon';
import GridIcon from '@/pages/Nfts/assets/GridIcon';
import ListIcon from '@/pages/Nfts/assets/ListIcon';
import PriceDownIcon from '@/pages/Nfts/assets/PriceDownIcon';
import PriceUpIcon from '@/pages/Nfts/assets/PriceUpIcon';
import SearchIcon from '@/pages/Nfts/assets/SearchIcon';
import MarketplaceNftItem from '@/pages/Nfts/components/MarketplaceNftItem';
import {
  Input,
  Label,
  LoadingContainer,
  MarketplacePageContainer,
  NftsWrapper,
  NoContentContainer,
  NoNftsContainer,
  StyledButtonWithIcon,
  TopButtonsContainer,
  ViewSelectContainer,
} from '@/pages/Nfts/pages/MarketplacePage/styled';
import rootStore from '@/store';

const MarketplacePage = () => {
  const wallet = useTonAddress();
  const { isProdMode } = useGetMode();

  const {
    nftsStore: {
      isGridViewActive,
      setIsGridViewActive,
      nftsOnMarketplace,
      nextNftsOnMarketplaceId,
      fetchAllNftsOnMarketplace,
      resetAllNftsOnMarketplace,
      fetchNftsCollections,
      isNftsOnMarketplaceSortedByNameTitleFromUp,
      isNftsOnMarketplaceSortedByPriceFromUp,
      sortAllNftsOnMarketplaceByPrice,
      sortAllNftsOnMarketplaceByNameTitle,
      startCheckNftSaleStatus,
      startCheckNftCancelSaleStatus,
      startCheckNftBuyingStatus,
      sortRule,
      searchValue,
    },
    userStore: {
      userInfo: {
        nft: { market },
      },
    },
    isLoading,
  } = rootStore;

  const [inputValue, setInputValue] = useState<string | null>(null);
  const debouncedSearchRequest = useDebouncedCallback(async () => {
    await fetchAllNftsOnMarketplace({
      searchValue: inputValue,
      sortRule,
    });
  }, 1000);

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    fetchAllNftsOnMarketplace({}).catch((err) => console.error(err));
    fetchNftsCollections().catch((err) => console.error(err));

    return () => resetAllNftsOnMarketplace();
  }, []);

  /** делаем запрос если что-то заполнено в строке поиска */
  useEffect(() => {
    debouncedSearchRequest();
  }, [inputValue]);

  /** запрашиваем еще нфт если сработал скролл (пагинация) */
  useEffect(() => {
    if (!inView || nextNftsOnMarketplaceId === -1 || nftsOnMarketplace === null)
      return;

    fetchAllNftsOnMarketplace({ sortRule }).catch((err) => console.error(err));
  }, [inView]);

  /** проверяем, дождались мы выставления нфт на продажу, снятия нфт с продажи,
   * если нет, то продолжаем */
  useEffect(() => {
    if (wallet) {
      startCheckNftSaleStatus();
      startCheckNftCancelSaleStatus();
      startCheckNftBuyingStatus();
    }
  }, [wallet]);

  const nftsRule = !!nftsOnMarketplace && nftsOnMarketplace.length > 0;

  if (market < 1) return <UnavailablePage type="marketplace" />;

  return (
    <MarketplacePageContainer>
      <TopButtonsContainer>
        <ViewSelectContainer>
          <StyledButtonWithIcon
            $isActive={isGridViewActive}
            onClick={() => setIsGridViewActive(true)}
          >
            <GridIcon />
          </StyledButtonWithIcon>
          <StyledButtonWithIcon
            $isActive={!isGridViewActive}
            onClick={() => setIsGridViewActive(false)}
          >
            <ListIcon />
          </StyledButtonWithIcon>
        </ViewSelectContainer>

        <Label>
          <SearchIcon />
          <Input
            type="text"
            placeholder="Search"
            value={inputValue ?? ''}
            onChange={(evt) => setInputValue(evt.target.value)}
          />
        </Label>

        <ViewSelectContainer>
          <StyledButtonWithIcon
            $noOpacity={isNftsOnMarketplaceSortedByNameTitleFromUp !== null}
            onClick={sortAllNftsOnMarketplaceByNameTitle}
          >
            {isNftsOnMarketplaceSortedByNameTitleFromUp !== null ? (
              isNftsOnMarketplaceSortedByNameTitleFromUp ? (
                <AlphabetDownIcon />
              ) : (
                <AlphabetUpIcon />
              )
            ) : (
              <AlphabetDownIcon />
            )}
          </StyledButtonWithIcon>
          <StyledButtonWithIcon
            $noOpacity={isNftsOnMarketplaceSortedByPriceFromUp !== null}
            onClick={sortAllNftsOnMarketplaceByPrice}
          >
            {isNftsOnMarketplaceSortedByPriceFromUp !== null ? (
              isNftsOnMarketplaceSortedByPriceFromUp ? (
                <PriceDownIcon />
              ) : (
                <PriceUpIcon />
              )
            ) : (
              <PriceDownIcon />
            )}
          </StyledButtonWithIcon>
        </ViewSelectContainer>
      </TopButtonsContainer>

      {isLoading ? (
        <LoadingContainer>
          <LoadingIcon />
        </LoadingContainer>
      ) : (
        <>
          <NftsWrapper $noNfts={!nftsRule}>
            {nftsRule ? (
              nftsOnMarketplace.map((nftItem, index) => (
                <MarketplaceNftItem
                  key={`${nftItem.id}-${index}`}
                  nftData={nftItem}
                />
              ))
            ) : (
              <NoNftsContainer>
                <SmileIcon />
                <Text fontSize={18} fontWeight={500}>
                  There is no NFTs for sale in the store yet
                </Text>
              </NoNftsContainer>
            )}
          </NftsWrapper>
          <div ref={ref} />
        </>
      )}
    </MarketplacePageContainer>
  );
};

export default observer(MarketplacePage);
