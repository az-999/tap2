import { useTonConnectUI } from '@tonconnect/ui-react';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';

import CloseIcon from '@/components/CloseButton/Assets/CloseIcon';
import Text from '@/components/UI/Text';

import SelectShip from '@/pages/Ships/pages/ShipsCraftPage/components/CrossShipsModal/components/SelectShip';
import NoShipLevelIcon from '@/pages/Ships/pages/ShipsCraftPage/components/CrossShipsModal/components/SelectShip/assets/NoShipLevelIcon';
import ShipLevelIcon from '@/pages/Ships/pages/ShipsCraftPage/components/CrossShipsModal/components/SelectShip/assets/ShipLevelIcon';
import noDetailImage from '@/pages/Ships/pages/ShipsCraftPage/components/CrossShipsModal/components/SelectShip/assets/no-detail.png';
import { ShipLevel } from '@/pages/Ships/pages/ShipsCraftPage/components/CrossShipsModal/components/SelectShip/styled';
import {
  ButtonInfo,
  ContentPart,
  CrossShipsModalContainer,
  Level,
  PartImage,
  PlusContainer,
  RequiredPart,
  ResultPart,
  SelectShipsContainer,
  SubmitButton,
  Title,
  TitlePart,
} from '@/pages/Ships/pages/ShipsCraftPage/components/CrossShipsModal/styled';
import Info from '@/pages/Ships/pages/ShipsCraftPage/components/EntireCraftedItem/assets/Info';
import { TooltipRow } from '@/pages/Ships/pages/ShipsCraftPage/components/EntireCraftedItem/styled';
import rootStore from '@/store';

type ReqKeys = 'nft1' | 'nft2' | 'nft3' | 'nft4' | 'nft5';

const CrossShipsModal = () => {
  const {
    shipsStore: {
      firstSelectedShip,
      secondSelectedShip,
      upgradeShipLevel,
      setIsCrossShipsModalActive,
      isCraftShipRequestLoading,
      shipsPartsToCombineShips,
      setIsSelectPartsShipTooltipVisible,
      setSelectPartShipTooltipIndex,
      deleteShipsPartItemToCombineShips,
    },
    userStore: { isWalletInvalid, setWalletInvalidModal },
  } = rootStore;
  const [tonConnectUI] = useTonConnectUI();
  const [isShowTooltip, setIsShowTooltip] = useState(false);
  const [isShowRequiredPartsTooltip, setIsShowRequiredPartsTooltip] =
    useState(false);

  const crossingShipsLevel =
    firstSelectedShip?.ship_level && secondSelectedShip?.ship_level
      ? +firstSelectedShip.ship_level + +secondSelectedShip.ship_level + 1
      : 1;

  const submitDisableRule =
    !firstSelectedShip ||
    !secondSelectedShip ||
    !shipsPartsToCombineShips ||
    (shipsPartsToCombineShips && shipsPartsToCombineShips.length < 5) ||
    isCraftShipRequestLoading;

  const partShips = shipsPartsToCombineShips?.reduce(
    (acc, ship, index) => {
      if (shipsPartsToCombineShips && shipsPartsToCombineShips.length < 5)
        return acc;

      acc[`nft${index + 1}` as ReqKeys] = ship.nft_address;
      return acc;
    },
    {} as Record<ReqKeys, string>,
  );

  const handleCombineClick = async () => {
    if (
      (partShips && Object.keys(partShips).length < 5) ||
      !partShips ||
      !firstSelectedShip ||
      !secondSelectedShip
    )
      return;

    if (isWalletInvalid) {
      setWalletInvalidModal(true);
    } else {
      upgradeShipLevel({
        shipParts: {
          ...partShips,
          nft6: firstSelectedShip.nft_address,
          nft7: secondSelectedShip.nft_address,
          shipLevel:
            +firstSelectedShip.ship_level! +
            +secondSelectedShip.ship_level! +
            1,
        },
        tonConnectUI,
        type: 'merge',
      }).catch((err) => console.error(err));
      setIsCrossShipsModalActive(false);
    }
  };

  const handleSelectPartShipClick = (index: number) => {
    setIsCrossShipsModalActive(false);
    setIsSelectPartsShipTooltipVisible(true);
    setSelectPartShipTooltipIndex(index);
  };

  const handleResetSelectedShip = (index: number) => {
    deleteShipsPartItemToCombineShips(index);
  };

  const showRequiredPartsTooltip = () => {
    setIsShowRequiredPartsTooltip(true);

    let time = 3;
    const timer = setInterval(() => {
      time--;
      if (time === 0) {
        setIsShowRequiredPartsTooltip(false);

        clearInterval(timer);
      }
    }, 1000);
  };

  const showResultTooltip = () => {
    setIsShowTooltip(true);

    let time = 3;
    const timer = setInterval(() => {
      time--;
      if (time === 0) {
        setIsShowTooltip(false);

        clearInterval(timer);
      }
    }, 1000);
  };

  return (
    <CrossShipsModalContainer>
      <TitlePart>
        <Title>
          <Text fontSize={20} fontWeight={700}>
            Ship merging
          </Text>

          <span>
            <Text fontSize={12} fontWeight={400}>
              Use 2 NFT spaceships and 5 parts to create a new
            </Text>
            <Text fontSize={12} fontWeight={400}>
              ship with their total levels and +1 bonus to level
            </Text>
          </span>
        </Title>

        <SelectShipsContainer>
          <SelectShip index={0} />
          <PlusContainer>
            <Text fontSize={16} fontWeight={600}>
              +
            </Text>
          </PlusContainer>
          <SelectShip index={1} />
        </SelectShipsContainer>
      </TitlePart>

      <ContentPart>
        <RequiredPart>
          <div>
            <Text fontSize={16} fontWeight={600}>
              Required parts
            </Text>
            <button
              id="required-ship-parts-modal-tooltip-button"
              data-tooltip-id="required-ship-parts-modal-tooltip"
              onClick={showRequiredPartsTooltip}
            >
              <Info />
            </button>
          </div>

          <ul>
            {new Array(5).fill(null).map((_, index) => {
              const existingShipPart =
                shipsPartsToCombineShips &&
                shipsPartsToCombineShips.find(
                  (savingShipPart) => savingShipPart.detailIndex === index,
                );

              return existingShipPart ? (
                <PartImage>
                  <button onClick={() => handleResetSelectedShip(index)}>
                    <CloseIcon />
                  </button>
                  <img
                    src={existingShipPart.detailImage}
                    alt=""
                    key={`selected-craft-part-${index}`}
                  />
                </PartImage>
              ) : (
                <PartImage onClick={() => handleSelectPartShipClick(index)}>
                  <img
                    key={`selected-craft-part-${index}`}
                    src={noDetailImage}
                    alt=""
                  />
                </PartImage>
              );
            })}
          </ul>
        </RequiredPart>

        <ResultPart>
          <Text fontSize={16} fontWeight={600}>
            Result after merging
          </Text>
          <Level $isShipSelected={!!(firstSelectedShip && secondSelectedShip)}>
            <Text fontSize={12} fontWeight={500}>
              New level
            </Text>

            <ShipLevel
              $isShipSelected={!!(firstSelectedShip && secondSelectedShip)}
            >
              {firstSelectedShip && secondSelectedShip ? (
                <ShipLevelIcon />
              ) : (
                <NoShipLevelIcon />
              )}
              <Text fontSize={13} fontWeight={700}>
                {crossingShipsLevel}
              </Text>

              <ButtonInfo
                onClick={showResultTooltip}
                data-tooltip-id="info-cross-space-ship-modal-tooltip"
              >
                <Info />
              </ButtonInfo>
            </ShipLevel>
          </Level>

          <SubmitButton
            $isDisabled={submitDisableRule || isWalletInvalid}
            disabled={submitDisableRule}
            onClick={handleCombineClick}
          >
            Merge ships
          </SubmitButton>
        </ResultPart>
      </ContentPart>

      <Tooltip
        id="info-cross-space-ship-modal-tooltip"
        place="bottom"
        isOpen={isShowTooltip}
        style={{ width: '70%' }}
      >
        <TooltipRow>
          The result is a new ship NFT with a level of the sum of 2 taken NFTs +
          1 level
        </TooltipRow>
      </Tooltip>
      <Tooltip
        id="required-ship-parts-modal-tooltip"
        place="bottom"
        isOpen={isShowRequiredPartsTooltip}
        style={{ width: '70%' }}
      >
        <TooltipRow>
          To ship merging in addition to the two selected ships, you need 5 of
          any ship parts
        </TooltipRow>
      </Tooltip>
    </CrossShipsModalContainer>
  );
};

export default observer(CrossShipsModal);
