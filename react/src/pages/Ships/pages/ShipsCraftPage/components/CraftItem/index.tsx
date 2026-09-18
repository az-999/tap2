import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Background from '@/pages/Ships/pages/ShipsCraftPage/components/CraftItem/assets/Background';
import BumpLogo from '@/pages/Ships/pages/ShipsCraftPage/components/CraftItem/assets/BumpLogo';
import Button from '@/pages/Ships/pages/ShipsCraftPage/components/CraftItem/components/Button';
import {
  CountContainer,
  CraftItemContainer,
  ImageContainer,
  MainCraftItemWrapper,
  TextContainer,
} from '@/pages/Ships/pages/ShipsCraftPage/components/CraftItem/styled';
import { PartShipKey } from '@/pages/Ships/types';
import rootStore from '@/store';
import { AppPath, NftsPath } from '@/types/routes';

interface CraftItemProps {
  name: string;
  image: string;
  count: number;
}

const CraftItem = ({ name, image, count }: CraftItemProps) => {
  const navigate = useNavigate();

  const {
    shipsStore: { partShipNfts },
  } = rootStore;

  const getData = useCallback(() => {
    const shipData = partShipNfts?.[name as PartShipKey];

    if (shipData && shipData.length > 0) {
      const { name, image } = shipData[0];
      return {
        count: shipData.length,
        name,
        image,
      };
    }

    return { count, name, image };
  }, [partShipNfts, name, count, image]);

  return (
    <MainCraftItemWrapper>
      <CraftItemContainer $noCount={!getData().count}>
        <Background />

        <CountContainer $noCount={!getData().count}>
          {getData().count}
        </CountContainer>
        <ImageContainer>
          <img src={getData().image} alt="" />

          <div>
            <div id="bump-logo-container">
              <BumpLogo />
            </div>
          </div>
        </ImageContainer>

        <TextContainer>{getData().name}</TextContainer>
      </CraftItemContainer>

      {!getData().count && (
        <Button
          onClick={() => navigate(`${AppPath.nfts}/${NftsPath.marketplace}`)}
        />
      )}
    </MainCraftItemWrapper>
  );
};

export default observer(CraftItem);
