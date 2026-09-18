import { observer } from 'mobx-react-lite';
import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import SecureLS from 'secure-ls';

import CornerLeftImg from '@/assets/decorations/CornerLeft.png';
import CornerRightImg from '@/assets/decorations/CornerRight.png';

import InfoTooltip from '@/components/InfoTooltip';

import ArrowBoost from './Assets/ArrowBoost';
import ClaimTimer from './components/ClaimTimer/ClaimTimer';
import useFarmingStatus from '@/hooks/useFarmingStatus';
import { useGetMode } from '@/hooks/useGetMode';
import BalanceIcon from '@/pages/Tapper/Assets/BalanceIcon';
import Flashing from '@/pages/Tapper/Assets/Flashing';
import GainBoost from '@/pages/Tapper/Assets/GainBoost';
import GainFarm from '@/pages/Tapper/Assets/GainFarm';
import GainTap from '@/pages/Tapper/Assets/GainTap';
import BoostTimer from '@/pages/Tapper/components/BoostTimer';
import Moon from '@/pages/Tapper/components/Moon';
import NewFarmButton from '@/pages/Tapper/components/NewFarmButton';
import {
  Balance,
  BalanceRow,
  BalanceTitle,
  BalanceValue,
  BoostTimerLabel,
  BoostTimerWrap,
  CornerLeft,
  CornerRight,
  FreezeMode,
  Gain,
  GainCol,
  GainHeader,
  GainLabel,
  GainValue,
  InfoWrap,
  Page,
  StyledInfoTooltip,
  SupBoost,
  TooltipContent,
  TooltipRow,
} from '@/pages/Tapper/styled';
import rootStore from '@/store';
import { AppPath } from '@/types/routes';
import Utils from '@/utils';

const ls = new SecureLS();

const Tapper = () => {
  const navigate = useNavigate();
  const FARMING_PERIOD = process.env.REACT_APP_FARMING_PERIOD
    ? Number(process.env.REACT_APP_FARMING_PERIOD)
    : 0;

  const {
    userStore: { userInfo, isGrantBoxVisible, mmproPointsBalance },
    tapperStore: {
      tapCount,
      farmLimit,
      time,
      cleanFarm,
      addDebugCountTaps,
      isFreezeMode,
    },
    boostersStore: { boosterTime },
    isShowWinTooltip,
    isShowInfoTooltip,
    showWinTooltip,
  } = rootStore;

  const { isProdMode, isStageMode } = useGetMode();
  const cleanFarmFormatted = Number(cleanFarm).toLocaleString('ru-RU') || 0;

  const { isAwait, isInProgress, isFinished } = useFarmingStatus();

  const boost = useMemo(() => {
    return (
      (userInfo.info?.boost && Number(userInfo.info.boost.replace('x', ''))) ||
      1
    );
  }, [userInfo.info.boost]);

  const calcFarmCount = useMemo(() => {
    if (isAwait) return 0;
    if (isInProgress) {
      const secondValue = farmLimit / FARMING_PERIOD;
      const result = Math.floor(secondValue * time);
      return result <= 0 ? 0 : result;
    }
    if (isFinished) return farmLimit;

    return 0;
  }, [FARMING_PERIOD, farmLimit, isAwait, isFinished, isInProgress, time]);

  const formatedTapCounter = useMemo(() => {
    return Utils.formatNumber(tapCount);
  }, [tapCount]);

  const tapCounter = useMemo(() => {
    return tapCount || Number(ls.get('tapCountSecure'));
  }, [tapCount]);

  const gains = [
    {
      label: 'Autofarm',
      icon: <GainFarm />,
      value: !isAwait ? Utils.formatNumber(calcFarmCount) : 0,
      isIcons: false,
    },
    {
      label: 'Taps',
      icon: <GainTap />,
      value: !isAwait ? formatedTapCounter : 0,
      isIcons: false,
    },
    {
      label: 'All',
      icon: <GainBoost />,
      value: !isAwait
        ? Utils.formatNumber((calcFarmCount + Number(tapCounter)) * boost || 0)
        : 0,
      isIcons: true,
    },
  ];

  const handleOpenShowInfo = useCallback(
    (isAllCol: boolean) => {
      if (isAllCol) {
        showWinTooltip(true);
      }
    },
    [showWinTooltip],
  );

  return (
    <Page>
      {!isGrantBoxVisible && <CornerLeft src={CornerLeftImg} rel="preload" />}

      <CornerRight src={CornerRightImg} rel="preload" />
      <Balance>
        <BalanceTitle
          onClick={
            isProdMode || isStageMode
              ? () => null
              : () => navigate(AppPath.debug)
          }
        >
          Your Balance MMPro Points
        </BalanceTitle>
        <BalanceRow data-tooltip-id="balance-tooltip">
          <BalanceIcon
            onClick={() => addDebugCountTaps(() => navigate(AppPath.userDebug))}
          />
          <BalanceValue value={mmproPointsBalance} format="( ddd)" />
        </BalanceRow>
      </Balance>

      <InfoTooltip
        isShowTooltip={isShowWinTooltip && !!cleanFarm}
        tooltipId="balance-tooltip"
        width="calc(100% - 40px)"
      >
        You Got <span style={{ fontWeight: 600 }}>+{cleanFarmFormatted}</span>{' '}
        MMPro Points
      </InfoTooltip>

      <Gain columns={isInProgress ? 4 : 3}>
        {isInProgress && (
          <GainCol>
            <ClaimTimer />
          </GainCol>
        )}
        {gains.map((gain, gainIndex) => (
          <GainCol key={gainIndex}>
            <GainHeader
              data-tooltip-id={
                gain.label === 'All' ? 'farm-plus-tap-info-tooltip' : ''
              }
              onClick={() => handleOpenShowInfo(gain.label === 'All')}
            >
              {gain.label === 'All' ? (
                <>
                  <GainFarm /> + <GainTap />
                  {userInfo.info.boost && (
                    <SupBoost>
                      <ArrowBoost fill="#33CC66" /> {userInfo.info.boost}
                    </SupBoost>
                  )}
                  <StyledInfoTooltip />
                  <Tooltip
                    id="farm-plus-tap-info-tooltip"
                    place="bottom-start"
                    isOpen={isShowInfoTooltip}
                    opacity={1}
                    style={{
                      zIndex: 10,
                      backgroundColor: '#20252c',
                      fontSize: '14px',
                    }}
                  >
                    <TooltipContent>
                      <TooltipRow>
                        The sum of auto-farm and taps, <br /> multiplied by the
                        applicable boost.
                      </TooltipRow>
                    </TooltipContent>
                  </Tooltip>
                </>
              ) : (
                <>
                  {gain.icon}
                  <GainLabel>{gain.label}</GainLabel>
                </>
              )}
            </GainHeader>
            <GainValue isSmall={gain.label !== 'All'}>
              {gain?.isIcons && <BalanceIcon />}
              {gain.value}
            </GainValue>
          </GainCol>
        ))}
      </Gain>
      <NewFarmButton />
      {(isInProgress || isFinished) && <Moon />}

      <InfoWrap>
        {boosterTime && (
          <BoostTimerWrap>
            <BoostTimerLabel>
              <ArrowBoost fill="#33CC66" />
              Boost
            </BoostTimerLabel>
            <BoostTimer />
          </BoostTimerWrap>
        )}

        {isFreezeMode && isInProgress && (
          <FreezeMode>
            <Flashing fill="rgba(106, 184, 255, 1)" />
            Freeze Mode
          </FreezeMode>
        )}
      </InfoWrap>
    </Page>
  );
};

export default observer(Tapper);
