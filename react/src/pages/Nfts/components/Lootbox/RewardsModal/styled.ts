import styled from 'styled-components/macro';

export const ModalContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 20px 10px 80px 10px;
  border-radius: 10px 10px 0 0;
  background: linear-gradient(
    170deg,
    #0d0e0f 6.04%,
    #1ebc8d 47.33%,
    #9b33cc 77.69%
  );
  overflow-y: auto;
`;

export const LootboxImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  img:first-child {
    position: relative;
    z-index: 2;
    width: 80%;
    height: 80%;
  }

  img:last-child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    width: 160%;
    height: 160%;
  }
`;

export const TitleContainer = styled.div<{ $type: 'staking' | 'lastStaking' }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 14px;
  gap: 6px;

  span {
    text-align: center;
  }

  span:last-of-type {
    max-width: ${({ $type }) => ($type === 'staking' ? '100%' : '72vw')};
  }
`;

export const RewardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin-top: 6px;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  padding: 10px 10px 20px;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  z-index: 20;
`;

export const Button = styled.button`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: none;
  background-color: #3c6;
  color: #fff;
  font-family: 'SF Pro Display', sans-serif;
  font-size: 14px;
  font-weight: 600;
  -webkit-tap-highlight-color: transparent;

  &:disabled {
    opacity: 0.8;
  }
`;

export const RewardsPartsList = styled.div`
  display: flex;
  gap: 4px 8px;
  width: 100%;
  flex-wrap: wrap;
  padding: 6px 0;
`;
