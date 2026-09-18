import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';

import Text from '@/components/UI/Text';

import ArrowDownIcon from '@/pages/Nfts/assets/ArrowDownIcon';
import ArrowIcon from '@/pages/Nfts/assets/ArrowIcon';
import ArrowLeftIcon from '@/pages/Nfts/assets/ArrowLeftIcon';
import ShoppingCartIcon from '@/pages/Nfts/assets/ShoppingCartIcon';
import TonCoinIcon from '@/pages/Nfts/assets/TonCoinIcon';
import WalletIcon from '@/pages/Nfts/assets/WalletIcon';
import WarningIcon from '@/pages/Nfts/assets/WarningIcon';
import {
  ContentContainer,
  ContentRow,
  HistoryContainer,
  HistoryItemContainer,
  NoHistoryContainer,
  Row,
  TitleContainer,
} from '@/pages/Nfts/components/History/styled';
import rootStore from '@/store';
import Utils from '@/utils';

const History = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    nftsStore: { activeNft, nftHistory, fetchHistoryOfNftOnMarketplace },
  } = rootStore;

  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(
      () =>
        scrollRef.current?.scrollIntoView({
          behavior: 'smooth',
        }),
      200,
    );

    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (!activeNft) return;

    const { nft_address } = activeNft;
    fetchHistoryOfNftOnMarketplace({ nft_address });
  }, [activeNft?.nft_address]);

  if (!activeNft) return null;

  return (
    <HistoryContainer>
      <TitleContainer $isOpen={isOpen}>
        <Text fontSize={14} fontWeight={600}>
          History
        </Text>

        <button onClick={() => setIsOpen(!isOpen)}>
          <ArrowIcon />
        </button>
      </TitleContainer>

      <ContentContainer $isOpen={isOpen}>
        {nftHistory && nftHistory.items.length > 0 ? (
          <HistoryItemContainer>
            <Row>
              <div>
                <Text fontSize={14} fontWeight={500}>
                  Type
                </Text>
              </div>

              <div>
                <Text fontSize={14} fontWeight={500}>
                  Price
                </Text>
              </div>

              <div>
                <Text fontSize={14} fontWeight={500}>
                  Time
                </Text>
              </div>

              <div>
                <Text fontSize={14} fontWeight={500}>
                  From
                </Text>
              </div>

              <div>
                <Text fontSize={14} fontWeight={500}>
                  To
                </Text>
              </div>
            </Row>

            {nftHistory?.items.map(
              (
                { action, price, created_at, to_address, from_address },
                index,
              ) => {
                const timeArr = Utils.getFormattedDate(created_at).split(', ');

                return (
                  <ContentRow
                    key={`nft-history-${action}-${created_at}-${index}`}
                  >
                    <div>
                      {action === 0 && <ArrowDownIcon />}
                      {action === 1 && <ShoppingCartIcon />}
                      {action === 2 && <ArrowLeftIcon />}
                      {action === 3 && <WarningIcon />}
                      <Text fontSize={14} fontWeight={400}>
                        {action === 0 && 'Put up for sale'}
                        {action === 1 && 'Sell'}
                        {action === 2 && 'Withdrawn from sale'}
                        {action === 3 && 'Price change'}
                      </Text>
                    </div>

                    <div>
                      <TonCoinIcon />
                      <Text fontSize={14} fontWeight={600}>
                        {price} TON
                      </Text>
                    </div>

                    <div>
                      <Text fontSize={14} fontWeight={400}>
                        {timeArr?.[0]},{' '}
                        <span style={{ color: '#646668' }}>{timeArr?.[1]}</span>
                      </Text>
                    </div>

                    <div>
                      <WalletIcon />
                      <Text fontSize={14} fontWeight={400}>
                        {Utils.getShortOwnerAddress(from_address)}
                      </Text>
                    </div>

                    <div>
                      <WalletIcon />
                      <Text fontSize={14} fontWeight={400}>
                        {Utils.getShortOwnerAddress(to_address)}
                      </Text>
                    </div>
                  </ContentRow>
                );
              },
            )}
          </HistoryItemContainer>
        ) : (
          <NoHistoryContainer>
            There is no history of operations
          </NoHistoryContainer>
        )}
      </ContentContainer>

      <div ref={scrollRef} />
    </HistoryContainer>
  );
};

export default observer(History);
