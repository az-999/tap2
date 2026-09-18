import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import BackButton from '@/components/BackButton';
import Text from '@/components/UI/Text';

import MmproRedIcon from '@/pages/Ships/pages/PiratePage/assets/MmproRedIcon';
import leftBorderLargeIcon from '@/pages/Ships/pages/PiratePage/assets/main-left-border-large.png';
import rightBorderLargeIcon from '@/pages/Ships/pages/PiratePage/assets/main-right-border-large.png';
import shipImage from '@/pages/Ships/pages/PiratePage/assets/ship-img.png';
import pirateImage from '@/pages/Ships/pages/PiratePage/assets/top-logo.png';
import Button from '@/pages/Ships/pages/PiratePage/components/Button';
import {
  BackgroundContainer,
  InnerContainer,
} from '@/pages/Ships/pages/PiratePage/components/NoConditions/styled';
import rootStore from '@/store';
import { AppPath, NftsPath, ShipsPath } from '@/types/routes';

const NoConditions = () => {
  const navigate = useNavigate();

  const {
    shipsStore: { shipNfts, isPiracyActive },
  } = rootStore;

  const isShipExist = !!(shipNfts && shipNfts.length > 1);

  return (
    <BackgroundContainer>
      <BackButton
        navigatePath={`${AppPath.ships}/${ShipsPath.modeSelection}`}
      />

      <InnerContainer $isMarkExist={isPiracyActive} $isShipExist={isShipExist}>
        <img src={leftBorderLargeIcon} alt="" id="left-border-large" />
        <img src={rightBorderLargeIcon} alt="" id="right-border-large" />

        <div id="inner-top-container">
          <MmproRedIcon />
          <div>
            <Text fontSize={16} fontWeight={700}>
              Star
            </Text>
            <Text fontSize={16} fontWeight={700}>
              Wars
            </Text>
          </div>
        </div>

        <div id="inner-images-container">
          <img src={pirateImage} alt="" id="inner-mark-image" />
          <img src={shipImage} alt="" id="inner-ship-image" />
        </div>

        <div id="inner-text-container">
          <Text fontSize={11} fontWeight={700}>
            To start, you need to buy{' '}
          </Text>

          {!isShipExist && !isPiracyActive && (
            <>
              <Text fontSize={11} fontWeight={700}>
                one <span id="red-highlight">NFT Spaceship</span> and a{' '}
              </Text>{' '}
              <Text fontSize={11} fontWeight={700}>
                <span id="red-highlight">Pirate Mark</span>
              </Text>
            </>
          )}

          {!isShipExist && isPiracyActive && (
            <Text fontSize={11} fontWeight={700}>
              <span id="red-highlight">NFT Spaceship</span>
            </Text>
          )}

          {isShipExist && !isPiracyActive && (
            <Text fontSize={11} fontWeight={700}>
              <span id="red-highlight">Pirate Mark</span>
            </Text>
          )}
        </div>

        <div id="inner-buttons-container">
          {!isPiracyActive && (
            <Button
              title="Buy a Pirate Mark"
              onClick={() => navigate(`${AppPath.nfts}/${NftsPath.bumpStore}`)}
            />
          )}

          {!isShipExist && (
            <>
              <Button
                title="Buy a NFT Spaceship"
                onClick={() =>
                  navigate(`${AppPath.nfts}/${NftsPath.marketplace}`)
                }
              />
              <Button
                title="Craft NFT Spaceship"
                onClick={() =>
                  navigate(`${AppPath.ships}/${ShipsPath.shipCraft}`)
                }
                isBoldWeight={true}
              />
            </>
          )}
        </div>
      </InnerContainer>
    </BackgroundContainer>
  );
};

export default observer(NoConditions);
