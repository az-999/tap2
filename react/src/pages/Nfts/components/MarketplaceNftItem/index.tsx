import { useTonAddress, useTonWallet } from '@tonconnect/ui-react';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Text from '@/components/UI/Text';

import TonCoinIcon from '@/pages/Nfts/assets/TonCoinIcon';
import WalletIcon from '@/pages/Nfts/assets/WalletIcon';
import {
  ContentContainer,
  InfoContainer,
  InfoItemContainer,
  MarketplaceNftItemContainer,
} from '@/pages/Nfts/components/MarketplaceNftItem/styled';
import ShipLevel from '@/pages/Nfts/components/MyNftItem/assets/ShipLevel';
import { NftItem, NftMarketplace } from '@/pages/Nfts/types';
import rootStore from '@/store';
import { AppPath, NftsPath } from '@/types/routes';
import Utils from '@/utils';

interface MarketplaceNftItemProps {
  nftData: NftMarketplace;
}

const MarketplaceNftItem = ({ nftData }: MarketplaceNftItemProps) => {
  const navigate = useNavigate();
  const wallet = useTonAddress();

  const {
    nftsStore: {
      isGridViewActive,
      setActiveNft,
      fetchTonApiNftInfo,
      tonApiNftInfo,
    },
  } = rootStore;

  const { name, image, sale_price: price, owner, ship_level } = nftData;

  const handleNftClick = async () => {
    setActiveNft({
      ...nftData,
      collection_name: tonApiNftInfo?.collection.name ?? '',
      collection_address: tonApiNftInfo?.collection.address ?? '',
    });

    const isOwnerErrorExist = await fetchTonApiNftInfo({
      nft_address: nftData.nft_address,
    });

    if (isOwnerErrorExist) return;

    wallet === owner
      ? navigate(`${AppPath.nfts}/${NftsPath.sell}`)
      : navigate(`${AppPath.nfts}/${NftsPath.shop}`);
    // navigate('/nfts/for-sell'); // TODO
  };

  return (
    <MarketplaceNftItemContainer
      $isGridActive={isGridViewActive}
      onClick={handleNftClick}
    >
      {ship_level && (
        <div id="ship-level-container">
          <ShipLevel />
          <span>{ship_level}</span>
        </div>
      )}
      <img src={image} alt="" />

      <ContentContainer $isGridActive={isGridViewActive}>
        <Text fontSize={12} fontWeight={700}>
          {name}
        </Text>

        <InfoContainer $isGridActive={isGridViewActive}>
          <InfoItemContainer>
            <Text fontSize={10} fontWeight={500}>
              Price
            </Text>

            <div>
              <TonCoinIcon />
              <Text fontSize={14} fontWeight={600}>
                {price}
              </Text>
            </div>
          </InfoItemContainer>

          <InfoItemContainer>
            <Text fontSize={10} fontWeight={500}>
              Owner
            </Text>

            <div>
              <WalletIcon
                fill={owner === wallet ? '#33CC66' : '#fff'}
                opacity={owner === wallet ? 1 : 0.2}
              />
              <Text fontSize={14} fontWeight={600}>
                {Utils.getShortOwnerAddress(owner)}
              </Text>
            </div>
          </InfoItemContainer>
        </InfoContainer>
      </ContentContainer>
    </MarketplaceNftItemContainer>
  );
};

export default observer(MarketplaceNftItem);
