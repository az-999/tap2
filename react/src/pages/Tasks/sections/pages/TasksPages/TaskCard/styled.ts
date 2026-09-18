import styled, { css } from 'styled-components/macro';

import bullRunBg from '@/pages/Tasks/sections/assets/partners/bull-run.png';
import monetagBg from '@/pages/Tasks/sections/assets/partners/monetag.png';
import tapMinerBg from '@/pages/Tasks/sections/assets/partners/tap-miner-bg.png';

export const Wrapper = styled.div`
  width: 100%;
  margin-top: 5px;
  display: flex;
`;

export const Row = styled.div<{
  isActive: boolean;
  $isTonkeeperIcon?: boolean;
  $isTonstakersIcon?: boolean;
  $isBullsIcon?: boolean;
  $isBoomIcon?: boolean;
  $isTrustWalletIcon?: boolean;
  $isTapMinerTask: boolean;
  $isMonetagTask: boolean;
  $isBullRunTask: boolean;
}>`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 12px;
  -webkit-backdrop-filter: blur(10px) brightness(100%);
  backdrop-filter: blur(10px) brightness(100%);
  background: ${({ isActive }) => (isActive ? '#22232580' : '#222325')};
  border-radius: 10px;
  cursor: pointer;
  gap: 6px;
  font-family: 'SF Pro Display', sans-serif;

  ${({ $isTonkeeperIcon }) =>
    $isTonkeeperIcon &&
    css`
      background-color: #62acef;
    `}

  ${({ $isTonstakersIcon }) =>
    $isTonstakersIcon &&
    css`
      background-color: #c6eef4;
    `}
  
  ${({ $isBoomIcon }) =>
    $isBoomIcon &&
    css`
      background-color: #dc8360;
    `} 
  
  ${({ $isTrustWalletIcon }) =>
    $isTrustWalletIcon &&
    css`
      background: linear-gradient(30deg, #0500ff 24.01%, #46fc95 118.27%);
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
    `} 
  
  ${({ $isBullRunTask }) =>
    $isBullRunTask &&
    css`
      background-image: url(${bullRunBg});
      background-size: cover;
      background-position: center;
    `}
  
  ${({ $isBullsIcon, isActive }) =>
    $isBullsIcon &&
    css`
      background: linear-gradient(270deg, #2554ca 0%, #122a64 100%);

      #bulls-bg {
        position: absolute;
        left: 0;
        opacity: ${() => (isActive ? 0.5 : 1)};
        width: 53px;
        height: 102%;
      }

      #sec-bulls-bg {
        position: absolute;
        right: 15%;
        bottom: 0;
        opacity: ${() => (isActive ? 0.5 : 1)};
        width: 82px;
      }
    `}

  ${({ $isTapMinerTask }) =>
    $isTapMinerTask &&
    css`
      background-image: url(${tapMinerBg});
      background-size: cover;
      background-position: center;
    `}

  ${({ $isMonetagTask }) =>
    $isMonetagTask &&
    css`
      background-image: url(${monetagBg});
      background-size: cover;
      background-position: center;
    `}
`;

export const RightAngle = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  border-radius: 0 0 10px;
  width: 104px;
  height: 26px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const ConfettiWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 1px;
  height: 1px;
`;

export const Col = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  z-index: 1;
`;

export const Ratio = styled.div<{
  isActive: boolean;
  $isTonkeeperIcon?: boolean;
  $isTonstakersIcon?: boolean;
  $isBullsIcon?: boolean;
  $isPiggyIcon?: boolean;
  $isSecurityAIIcon?: boolean;
  $isBitgetIcon?: boolean;
  $isTrustWalletIcon?: boolean;
  $isTapMinerTask: boolean;
  $isBullRunTask: boolean;
  $isMonetagTask: boolean;
}>`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  opacity: ${(p) => (p.isActive ? '0.5' : '1')};
  margin-right: 5px;

  &:has(#wormfare-coin-img) {
    width: 50px;
  }

  &:has(#time-ton-icon) {
    margin-right: 0;
    width: 38px;
  }

  svg {
    width: 30px;
    height: 30px;
  }

  ${({ $isTonkeeperIcon }) =>
    $isTonkeeperIcon &&
    css`
      width: 68px;
      height: 36px;

      svg {
        width: 68px;
        height: 36px;
      }
    `}

  ${({ $isTrustWalletIcon }) =>
    $isTrustWalletIcon &&
    css`
      width: 34px;
      height: 36px;

      svg {
        width: 33px;
        height: 33px;
      }
    `}

  ${({ $isTonstakersIcon }) =>
    $isTonstakersIcon &&
    css`
      width: 50px;

      #tonstakers-telegram {
        width: 48px;
        height: 48px;
      }

      #tonstakers-twitter {
        width: 45px;
        height: 50px;
      }
    `}

  ${({ $isBullsIcon }) =>
    $isBullsIcon &&
    css`
      width: 50px;

      #bulls-img {
        width: 47px;
        height: 53px;
      }
    `}
  
  ${({ $isPiggyIcon }) =>
    $isPiggyIcon &&
    css`
      width: 50px;

      #piggy-img {
        width: 48px;
        height: 34px;
      }
    `} 
  
  ${({ $isBitgetIcon }) =>
    $isBitgetIcon &&
    css`
      width: 88px;

      #bitget-img {
        width: 86px;
        height: 32px;
      }
    `}  
  
  ${({ $isTapMinerTask }) =>
    $isTapMinerTask &&
    css`
      height: 123px;
      width: 123px;
      margin-right: 12px;

      #tap-miner-img {
        border-radius: 14px;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    `}  
  
  ${({ $isBullRunTask }) =>
    $isBullRunTask &&
    css`
      height: 50px;
      width: 50px;
      margin-right: 10px;

      #bull-run-img {
        width: 47px;
        height: 53px;
        object-fit: contain;
      }
    `}  
  
  ${({ $isMonetagTask }) =>
    $isMonetagTask &&
    css`
      height: 50px;
      width: 50px;
      margin-right: 10px;

      #monetag-img {
        width: 47px;
        height: 53px;
        object-fit: contain;
      }
    `}

  #security-img {
    width: 36px;
    height: 36px;
  }

  #image-from-server {
    border-radius: 50%;
    width: 36px;
    height: 36px;
  }

  #hexn-coin-img {
    width: 36px;
    height: 36px;
  }

  #booms-img {
    width: 32px;
    height: 32px;
  }

  #mogul-img {
    width: 34px;
    height: 34px;
  }

  #time-farm-img {
    width: 34px;
    height: 34px;
  }

  #crypto-rank-img {
    border-radius: 50%;
    width: 34px;
    height: 34px;
  }

  #blocksport-img {
    width: 34px;
    height: 34px;
  }

  #cats-img {
    width: 40px;
    height: 40px;
  }

  #swiss-img {
    width: 42px;
    height: 34px;
  }

  #meet-safe-connect-img {
    width: 34px;
    height: 34px;
  }

  #wormfare-coin-img {
    width: 48px;
    height: 36px;
  }

  #zima-img {
    width: 44px;
    height: 44px;
  }

  #time-ton-icon {
    transform: scale(1.1);
    margin-right: 2px;
    width: 50px;
    height: 46px;
  }

  #vertus-img {
    width: 32px;
    height: 32px;
  }

  #puppies-img {
    width: 34px;
    height: 34px;
  }

  #artifica-img {
    width: 42px;
    height: 42px;
  }

  #kolo-img {
    width: 32px;
    height: 32px;
  }

  #nomis-img {
    width: 30px;
    height: 30px;
  }

  #tiger-img {
    width: 36px;
    height: 42px;
  }

  #hamstersPADImg-img {
    width: 32px;
    height: 32px;
  }

  #seed-img {
    width: 32px;
    height: 32px;
  }

  #hbb-img {
    width: 32px;
    height: 32px;
  }

  #kem-img {
    width: 32px;
    height: 32px;
  }

  #yescoin-img {
    width: 32px;
    height: 32px;
  }

  #memefi-img {
    width: 32px;
    height: 32px;
  }

  #tonboxImg-img {
    width: 42px;
    height: 42px;
  }

  #memeland-default-img,
  #memeland-telegram-img {
    width: 56px;
    height: 56px;
  }

  #rocket-img {
    border-radius: 6px;
    width: 34px;
    height: 34px;
  }

  #boom-img {
    width: 42px;
    height: 42px;
  }

  #hemera-img {
    width: 40px;
    height: 40px;
  }

  #cuberium-img {
    width: 34px;
    height: 26px;
  }

  #simple-img {
    width: 34px;
    height: 34px;
  }

  #hamster-img {
    width: 34px;
    height: 34px;
  }
`;

export const Title = styled.div<{
  $isTapMinerTask: boolean;
  $isBullRunTask: boolean;
}>`
  font-size: 14px;
  font-weight: 400;
  font-family: 'SF Pro Display-Regular', Helvetica, sans-serif;
  color: #ffffff;

  ${({ $isTapMinerTask }) =>
    $isTapMinerTask &&
    css`
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
    `}

  ${({ $isBullRunTask }) =>
    $isBullRunTask &&
    css`
      max-width: 200px;
    `}
`;

export const Url = styled.a<{ isActive: boolean }>`
  display: block;
  font-size: 12px;
  font-weight: 400;
  font-family: 'SF Pro Display-Regular', Helvetica, sans-serif;
  color: rgb(51, 204, 102);
  opacity: ${(p) => (p.isActive ? '0.5' : '1')};
`;

export const Price = styled.div<{
  isActive: boolean;
  $isTonkeeperWalet?: boolean;
  $isTonstakersIcon?: boolean;
  $isBullsIcon?: boolean;
  $isBoomIcon?: boolean;
  $isTrustWalletIcon?: boolean;
  $isTapMinerTask: boolean;
  $isBullRunTask: boolean;
}>`
  font-family: 'SF Pro Display-Semibold', Helvetica, sans-serif;
  opacity: ${(p) => (p.isActive ? '0.5' : '1')};
  background-color: #33cc66;
  border-radius: 6px;
  padding: 5px;
  width: fit-content;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;

  span {
    color: rgba(255, 255, 255, 1);
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
  }

  ${({ $isTonkeeperWalet }) =>
    $isTonkeeperWalet &&
    css`
      background-color: rgba(255, 255, 255, 0.35);
    `}

  ${({ $isTonstakersIcon }) =>
    $isTonstakersIcon &&
    css`
      background-color: #222325;

      span {
        color: #ffffff !important;
      }
    `}
  
  ${({ $isTapMinerTask }) =>
    $isTapMinerTask &&
    css`
      background-color: #ffffff59;

      span {
        color: #ffffff !important;
      }
    `}
  
  ${({ $isBullsIcon }) =>
    $isBullsIcon &&
    css`
      background-color: #ecb419;

      span {
        color: #ffffff !important;
      }
    `}
  
  ${({ $isBoomIcon, $isTrustWalletIcon }) =>
    ($isBoomIcon || $isTrustWalletIcon) &&
    css`
      background-color: rgba(255, 255, 255, 0.35);

      span {
        color: #ffffff !important;
      }
    `}
  
  ${({ $isBullRunTask }) =>
    $isBullRunTask &&
    css`
      background-color: transparent;
      border: 1px solid #dff315;

      span {
        color: #ffffff !important;
      }
    `}
`;

export const TextRow = styled.div<{ $isTonstakersIcon?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 6px;

  ${({ $isTonstakersIcon }) =>
    $isTonstakersIcon &&
    css`
      & div,
      & span {
        color: #222325;
      }
    `}
`;

export const TitleContainer = styled.div<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 2px;
  opacity: ${({ $isActive }) => ($isActive ? '0.5' : '1')};
`;

export const CheckmarkWrapper = styled.div<{
  $isCompleted: boolean;
  $isTrustWalletIcon: boolean;
}>`
  ${({ $isCompleted }) =>
    $isCompleted &&
    css`
      svg {
        opacity: 0.5;
      }
    `}

  ${({ $isTrustWalletIcon }) =>
    $isTrustWalletIcon &&
    css`
      svg g path {
        fill: #222325;
      }
    `}
`;

export const IsOverContainer = styled.div`
  display: flex;
  gap: 3px;
  opacity: 0.5;
  align-items: center;

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const MeetSafeConnectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  span:first-of-type {
    opacity: 0.67;
  }
`;

export const StepsContainer = styled.div`
  display: flex;
  gap: 8px;
  color: #fff;
  padding-bottom: 6px;

  div {
    display: flex;
    gap: 4px;

    span:first-child {
      display: flex;
      flex-shrink: 0;
      justify-content: center;
      align-items: center;
      opacity: 1;
      border-radius: 50%;
      background: #33cc66;
      width: 17px;
      height: 17px;
      font-weight: 600;
      font-size: 10px;
    }
  }
`;

export const TapMinerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  div {
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;
