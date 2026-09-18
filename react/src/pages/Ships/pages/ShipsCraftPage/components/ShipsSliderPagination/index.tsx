import React, { RefObject, useState } from 'react';

import Text from '@/components/UI/Text';

import useCurrentWidth from '@/hooks/useCurrentWidth';
import CheckIcon from '@/pages/Nfts/assets/CheckIcon';
import CopyIcon from '@/pages/Nfts/assets/CopyIcon';
import { NftMarketplace } from '@/pages/Nfts/types';
import { SwiperRef } from '@/pages/Ships/pages/ShipsCraftPage/components/ShipsCraft';
import ArrowDisableIcon from '@/pages/Ships/pages/ShipsCraftPage/components/ShipsCraft/assets/ArrowDisableIcon';
import ArrowIcon from '@/pages/Ships/pages/ShipsCraftPage/components/ShipsCraft/assets/ArrowIcon';
import {
  AddressContainer,
  PaginationBulletsContainer,
  PaginationButton,
  PaginationContainer,
} from '@/pages/Ships/pages/ShipsCraftPage/components/ShipsCraft/styled';
import { ERROR_DURING_COPIED_NFT_CONTRACT_ADDRESS } from '@/services/constants/errorMessages';
import rootStore from '@/store';
import Utils from '@/utils';

interface ShipsSliderPaginationProps {
  activeSlideIndex: number;
  swiperElRef: RefObject<SwiperRef>;
}

const ShipsSliderPagination = ({
  activeSlideIndex,
  swiperElRef,
}: ShipsSliderPaginationProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const {
    shipsStore: { shipNfts },
  } = rootStore;

  const { screenWidth } = useCurrentWidth();

  const handleAddressCopyClick = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);

      setTimeout(() => setIsCopied(false), 1500);
    } catch (err) {
      console.error(ERROR_DURING_COPIED_NFT_CONTRACT_ADDRESS, err);
    }
  };

  if (!shipNfts) return null;

  return (
    <PaginationContainer>
      <PaginationButton
        $isDisabled={activeSlideIndex === 0}
        $isPrev={true}
        onClick={() => swiperElRef.current?.swiper.slidePrev()}
      >
        {activeSlideIndex === 0 ? <ArrowDisableIcon /> : <ArrowIcon />}
      </PaginationButton>

      <AddressContainer>
        {shipNfts?.[activeSlideIndex] &&
        'nft_address' in shipNfts[activeSlideIndex] ? (
          <>
            <Text fontSize={14} fontWeight={400}>
              Spaceship Address
            </Text>

            <div>
              <Text fontSize={14} fontWeight={500}>
                {screenWidth > 390
                  ? Utils.getShortNftAddress(
                      (shipNfts[activeSlideIndex] as NftMarketplace)
                        .nft_address,
                    )
                  : Utils.getShortCraftShipNftAddress(
                      (shipNfts[activeSlideIndex] as NftMarketplace)
                        .nft_address,
                    )}
              </Text>

              <button
                onClick={() =>
                  handleAddressCopyClick(
                    (shipNfts[activeSlideIndex] as NftMarketplace).nft_address,
                  )
                }
                disabled={isCopied}
              >
                {isCopied ? <CheckIcon /> : <CopyIcon />}
              </button>
            </div>

            <PaginationBulletsContainer>
              <div>
                <Text fontSize={14} fontWeight={700}>
                  {activeSlideIndex + 1}
                </Text>
                <Text fontSize={14} fontWeight={700}>
                  /
                </Text>
                <Text fontSize={14} fontWeight={700}>
                  {shipNfts.length - 1}
                </Text>
              </div>
            </PaginationBulletsContainer>
          </>
        ) : (
          <Text fontSize={14} fontWeight={500}>
            Create a new spaceship
          </Text>
        )}
      </AddressContainer>

      <PaginationButton
        $isDisabled={activeSlideIndex === shipNfts.length - 1}
        $isPrev={false}
        onClick={() => swiperElRef.current?.swiper.slideNext()}
      >
        {activeSlideIndex === shipNfts.length - 1 ? (
          <ArrowDisableIcon />
        ) : (
          <ArrowIcon />
        )}
      </PaginationButton>
    </PaginationContainer>
  );
};

export default ShipsSliderPagination;
