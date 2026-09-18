import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';

import LoadingIcon from '@/assets/LoadingIcon';
import SmileIcon from '@/assets/SmileIcon';

import Text from '@/components/UI/Text';

import CraftItem from '@/pages/Ships/pages/ShipsCraftPage/components/CraftItem';
import CrossShipsButton from '@/pages/Ships/pages/ShipsCraftPage/components/CrossShipsButton';
import EntireCraftedItem from '@/pages/Ships/pages/ShipsCraftPage/components/EntireCraftedItem';
import { TooltipRow } from '@/pages/Ships/pages/ShipsCraftPage/components/EntireCraftedItem/styled';
import { LOOTBOX_CRAFT } from '@/pages/Ships/pages/ShipsCraftPage/components/ShipsCraft/const';
import {
  Line,
  List,
  LoadingContainer,
  LootboxCraftContainer,
  NoPurchasedVouchersContainer,
} from '@/pages/Ships/pages/ShipsCraftPage/components/ShipsCraft/styled';
import ShipsSliderPagination from '@/pages/Ships/pages/ShipsCraftPage/components/ShipsSliderPagination';
import SubmitButton from '@/pages/Ships/pages/ShipsCraftPage/components/SubmitButton';
import { PartShipKey } from '@/pages/Ships/types';
import rootStore from '@/store';

type ReqKeys = 'nft1' | 'nft2' | 'nft3' | 'nft4' | 'nft5' | 'nft6';
export type SwiperRef = HTMLElement & {
  swiper: Swiper;
  initialize: () => void;
};

export const partShipKeys: PartShipKey[] = [
  'Cabin Module',
  'Right Wing Module',
  'Left Wing Module',
  'Engine Unit Module',
  'Ship Nose Module',
  'Tail Section Module',
];

const ShipsCraft = () => {
  const swiperElRef = useRef<SwiperRef>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const wallet = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();

  const {
    shipsStore: { partShipNfts, craftShip, shipNfts, upgradeShipLevel },
    userStore: {
      isWalletInvalid,
      setWalletInvalidModal,
      userInfo: {
        nft: { shipcombine, shiplevelup },
      },
    },
    isLoading,
    isShowInfoTooltip,
  } = rootStore;
  const isDisabled = Boolean(
    (!!partShipNfts && Object.keys(partShipNfts).length !== 6) ||
      (shipNfts && activeSlideIndex !== shipNfts.length - 1 && shiplevelup < 1),
  );

  useEffect(() => {
    register();
  }, []);

  useEffect(() => {
    swiperElRef.current?.addEventListener('swiperslidechange', (e: any) => {
      setActiveSlideIndex(e.detail[0].activeIndex);
    });
  }, [shipNfts]);

  const handleCraftShipButtonSubmit = async () => {
    if (!partShipNfts) return;

    if (isWalletInvalid) {
      setWalletInvalidModal(true);
    } else {
      const shipParts = partShipKeys.reduce(
        (acc, item, index) => {
          acc[`nft${index + 1}` as ReqKeys] = partShipNfts[item][0].nft_address;
          return acc;
        },
        {} as Record<ReqKeys, string>,
      );

      /** todo убрал пока проверку на соженную nft */
      /* const isCheckNftOwnerWithError = await fetchTonApiShipPartInfo({
        nft_address: shipParts['nft1'],
      });

      if (isCheckNftOwnerWithError) return;*/

      if (shipNfts && activeSlideIndex === shipNfts.length - 1) {
        craftShip({ shipParts, tonConnectUI }).catch((err) =>
          console.error(err),
        );
        return;
      }

      const activeShip = shipNfts?.[activeSlideIndex];

      if (
        activeShip &&
        'nft_address' in activeShip &&
        'ship_level' in activeShip
      ) {
        upgradeShipLevel({
          shipParts: {
            ...shipParts,
            nft7: activeShip.nft_address,
            shipLevel: Number(activeShip.ship_level) + 1,
          },
          tonConnectUI,
          type: 'upgrade',
        }).catch((err) => console.error(err));
      }
    }
  };

  return wallet ? (
    isLoading ? (
      <LoadingContainer>
        <LoadingIcon />
      </LoadingContainer>
    ) : (
      <>
        <LootboxCraftContainer>
          <swiper-container
            ref={swiperElRef}
            className="mySwiper"
            slides-per-view="1"
            grabCursor={true}
            space-between={30}
            loop={false}
            key={`swiper-craft-${shipNfts?.length}`}
          >
            {shipNfts &&
              shipNfts?.map((shipItem, index) => (
                <swiper-slide key={`${index}-ship-craft`}>
                  <EntireCraftedItem
                    itemData={shipItem}
                    isDisabled={!('ship_level' in shipItem)}
                  />
                </swiper-slide>
              ))}
          </swiper-container>

          {shipNfts && shipNfts.length > 1 && (
            <>
              <ShipsSliderPagination
                swiperElRef={swiperElRef}
                activeSlideIndex={activeSlideIndex}
              />

              {shipNfts.length > 2 && shipcombine > 0 && <CrossShipsButton />}

              <Line />
            </>
          )}

          <List>
            {LOOTBOX_CRAFT.list.map((item) => (
              <CraftItem {...item} key={`craft-item-${item.name}`} />
            ))}
          </List>

          <SubmitButton
            title={
              shipNfts && activeSlideIndex === shipNfts.length - 1
                ? 'Combine the parts of a spaceship'
                : 'Upgrade your spaceship'
            }
            isDisabled={isDisabled}
            isWalletInvalid={isWalletInvalid}
            onClick={handleCraftShipButtonSubmit}
          />
        </LootboxCraftContainer>

        <Tooltip
          id="info-cross-space-ship-tooltip"
          place="bottom"
          isOpen={isShowInfoTooltip}
          style={{ width: '70%' }}
        >
          <TooltipRow>
            Use 2 NFT spaceships and 5 parts to create a new ship with their
            total levels and +1 bonus to level
          </TooltipRow>
        </Tooltip>
      </>
    )
  ) : (
    <NoPurchasedVouchersContainer>
      <SmileIcon />
      <Text fontSize={18} fontWeight={500}>
        You need to connect your wallet
      </Text>
    </NoPurchasedVouchersContainer>
  );
};

export default observer(ShipsCraft);
