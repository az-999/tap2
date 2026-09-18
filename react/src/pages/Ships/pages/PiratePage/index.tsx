import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';

import BackButton from '@/components/BackButton';
import Text from '@/components/UI/Text';

import ButtonWithBorder from '@/pages/Ships/components/ButtonWithBorder';
import SkullIcon from '@/pages/Ships/pages/PiratePage/assets/SkullIcon';
import runway from '@/pages/Ships/pages/PiratePage/assets/main-img.png';
import leftBorderIcon from '@/pages/Ships/pages/PiratePage/assets/main-left-border.png';
import rightBorderIcon from '@/pages/Ships/pages/PiratePage/assets/main-right-border.png';
import shipImage from '@/pages/Ships/pages/PiratePage/assets/ship-img.png';
import pirateImage from '@/pages/Ships/pages/PiratePage/assets/top-logo.png';
import BalanceField from '@/pages/Ships/pages/PiratePage/components/BalanceField';
import MissionTimer from '@/pages/Ships/pages/PiratePage/components/MissionTimer';
import NoConditions from '@/pages/Ships/pages/PiratePage/components/NoConditions';
import {
  BottomContainer,
  PiratePageContainer,
  ShipContainer,
  TopContainer,
} from '@/pages/Ships/pages/PiratePage/styled';
import rootStore from '@/store';
import { AppPath, ShipsPath } from '@/types/routes';

const PiratePage = () => {
  const [isStartMissionButtonClick, setIsStartMissionButtonClick] =
    useState(false);

  const {
    shipsStore: {
      isPiracyMissionActive,
      shipNfts,
      isPiracyActive,
      startPirateMission,
      finishPirateMission,
      piracyMissionStatus,
      piracyMissionActiveTime,
      updatePirateValues,
    },
  } = rootStore;

  const isShipExist = !!(shipNfts && shipNfts.length > 1);

  const handleStartMissionButtonClick = async () => {
    setIsStartMissionButtonClick(true);
    await startPirateMission();
  };

  useEffect(() => {
    if (piracyMissionStatus === 'inProgress' && !piracyMissionActiveTime) {
      updatePirateValues();
      setIsStartMissionButtonClick(false);
    }
  }, [piracyMissionStatus, piracyMissionActiveTime]);

  return (
    <>
      {(!isShipExist || !isPiracyActive) && <NoConditions />}

      <PiratePageContainer>
        <BackButton
          navigatePath={`${AppPath.ships}/${ShipsPath.modeSelection}`}
        />

        <TopContainer>
          <img src={pirateImage} alt="" />
          <Text fontSize={12} fontWeight={800}>
            Pirate mode
          </Text>
        </TopContainer>

        <ShipContainer $isStartMissionButtonClick={isStartMissionButtonClick}>
          <div>
            <img src={runway} alt="" id="runway-image" />
            {piracyMissionStatus !== 'inProgress' && (
              <img src={shipImage} alt="" id="ship-on-runway-image" />
            )}
          </div>

          <img src={leftBorderIcon} alt="" id="left-border" />
          <img src={rightBorderIcon} alt="" id="right-border" />
        </ShipContainer>

        <BottomContainer>
          <div>
            <BalanceField type="points" />
            {isPiracyMissionActive ? (
              <MissionTimer />
            ) : (
              <ButtonWithBorder
                icon={<SkullIcon />}
                title="Send on a piracy mission"
                color="red"
                onClick={handleStartMissionButtonClick}
                size="primary"
                disabled={
                  piracyMissionStatus !== 'await' || isStartMissionButtonClick
                }
              />
            )}
          </div>

          <div>
            <BalanceField type="reward" />
            <ButtonWithBorder
              title="Claim"
              color="red"
              onClick={finishPirateMission}
              size="primary"
              withUpperCase={false}
              disabled={piracyMissionStatus !== 'finished'}
            />
          </div>
        </BottomContainer>
      </PiratePageContainer>
    </>
  );
};

export default observer(PiratePage);
