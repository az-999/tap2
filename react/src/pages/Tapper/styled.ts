import styled from 'styled-components/macro';
import ReactOdometer from 'react-odometerjs';

import Info from './Assets/Info';

export const Page = styled.div`
  max-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 35px 20px 162px;
  position: relative;
  will-change: transform;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  @media screen and (max-width: 360px) {
    padding-bottom: 128px;
  }

  @media screen and (max-height: 570px) {
    padding-bottom: 118px;
  }
`;

export const CornerLeft = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  height: 70px;
  z-index: 1;
  will-change: transform;
`;

export const CornerRight = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  height: 70px;
  z-index: 1;
  will-change: transform;
`;

export const Balance = styled.div`
  position: relative;
  z-index: 10;
  padding: 0 35px 18px 35px;
  will-change: transform;

  @media screen and (max-height: 570px) {
    padding-bottom: 5px;
  }
`;

export const BalanceTitle = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  margin-bottom: 6px;
  will-change: transform;
`;

export const BalanceRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  will-change: transform;

  svg {
    flex-shrink: 0;
  }
`;

export const BalanceValue = styled(ReactOdometer)`
  font-size: 30px;
  font-weight: bold;
  color: white;
  text-align: center;
  will-change: transform;
  white-space: nowrap;

  @media screen and (max-height: 570px) {
    font-size: 26px;
  }
`;

export const TooltipContent = styled.div`
  text-align: center;
  padding: 15px;
  font-size: 14px;
`;

export const TooltipRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 4px;
`;

export const Gain = styled.div<{ columns: number }>`
  display: grid;
  align-items: flex-start !important;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  grid-gap: 5px;
  place-items: center;
`;

export const GainCol = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;

  &:last-of-type {
    min-width: 110px;
  }
`;

export const GainHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15px;
  gap: 5px;
  color: #fff;
  font-size: 12px;
`;
export const GainLabel = styled.div`
  font-size: 12px;
  font-weight: 500;
  line-height: 14px;
  color: white;
`;
export const GainValue = styled.div<{
	isSmall: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: ${({ isSmall }) => (isSmall ? '18px' : '24px')};
  line-height: 32px;
  font-weight: 700;
  color: white;
  text-align: center;

  svg {
    width: 26px;
  }
`;

export const BoostBtn = styled.div`
  min-height: 50px;
  background-color: #33cc66;
  border-radius: 10px;
  display: flex;
  flex-grow: 1;
  z-index: 100;

  @media screen and (max-height: 570px) {
    min-height: 40px;
  }
`;

export const BoostBtnLabel = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  font-weight: 700;
  color: white;
`;

export const TimerWrap = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(2px);
`;

export const SupBoost = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
`;

export const BoostTimerWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

export const BoostTimerLabel = styled.div`
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 2px;
  color: #fff;
`;

export const FreezeMode = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
`;

export const InfoWrap = styled.div`
  height: 12px;
  line-height: 12px;
  font-size: 12px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const StyledInfoTooltip = styled(Info)`
  position: absolute;
  left: 100%;
  top: 0;
  transform: translateY(-50%);
  opacity: 0.4;
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
`;

export const VibrateButton = styled.button<{ $isActive: boolean }>`
  min-height: 100%;
  width: 50px;
  border: none;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $isActive }) => ($isActive ? '#33cc66' : '#232426FF')};
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.6)};

  @media screen and (max-height: 570px) {
    width: 40px;
  }

  svg {
    width: 24px;
    height: 24px;

    @media screen and (max-height: 570px) {
      width: 20px;
      height: 20px;
    }
  }
`;
