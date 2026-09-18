import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Text from '@/components/UI/Text';

import ShipLevel from '@/pages/Nfts/components/MyNftItem/assets/ShipLevel';
import {
  ContentContainer,
  DefaultTitle,
  Moderation,
  MyNftItemContainer,
  Sale,
} from '@/pages/Nfts/components/MyNftItem/styled';
import { NftMarketplace } from '@/pages/Nfts/types';
import rootStore from '@/store';
import { AppPath, NftsPath } from '@/types/routes';

interface MyNftItemProps {
  nftData: NftMarketplace;
  onClick?: (nftData: NftMarketplace) => void;
}

const MyNftItem = ({ nftData, onClick }: MyNftItemProps) => {
  const navigate = useNavigate();

  const {
    nftsStore: { setActiveNft },
  } = rootStore;

  const { name, image, sale, collection, ship_level } = nftData;

  const handleNftClick = async () => {
    setActiveNft(nftData);

    onClick
      ? onClick(nftData)
      : sale?.is_sale
        ? navigate(`${AppPath.nfts}/${NftsPath.sell}`)
        : navigate(`${AppPath.nfts}/${NftsPath.forSell}`);
  };

  return (
    <MyNftItemContainer onClick={handleNftClick}>
      {ship_level && (
        <div id="ship-level-container">
          <ShipLevel />
          <span>{ship_level}</span>
        </div>
      )}

      <img src={image} alt="" />

      <ContentContainer>
        <Text fontSize={12} fontWeight={700}>
          {name}
        </Text>

        {/* {status === 'moderation' && (
          <Moderation>
            <Text fontSize={10} fontWeight={500}>
              On moderation
            </Text>
          </Moderation>
        )}*/}

        <>
          {sale?.is_sale && (
            <Sale>
              <Text fontSize={10} fontWeight={500}>
                On sale
              </Text>
            </Sale>
          )}

          {!sale?.is_sale && (
            <DefaultTitle>
              <Text fontSize={10} fontWeight={400}>
                Collection
              </Text>
              <Text fontSize={14} fontWeight={500}>
                {collection}
              </Text>
            </DefaultTitle>
          )}
        </>
      </ContentContainer>
    </MyNftItemContainer>
  );
};

export default observer(MyNftItem);
