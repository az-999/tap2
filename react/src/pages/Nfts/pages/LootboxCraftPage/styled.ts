import styled from 'styled-components/macro';

export const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

export const LootboxCraftPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  align-items: center;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 8px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9;
`;

export const SelectStakePlanContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;

  & > span:first-of-type {
    margin: 0 10px -6px;
    text-align: center;
  }

  #green-highlight {
    color: #2eff73;
  }
`;

export const BalanceContainer = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  margin-top: -4px;

  span:first-of-type {
    opacity: 0.78;
  }
`;

export const StakingButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 5px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background: #222325;

  div {
    display: flex;
    align-items: center;
    gap: 3px;

    span {
      opacity: 0.8;
    }
  }
`;

export const StakeSelectContainer = styled.div`
  width: 100%;
  height: 56px;
  position: relative;

  & > div:first-child {
    left: 0;
    width: calc(100% / 2 - 4px);
  }

  & > div:last-child {
    right: 0;
    width: calc(100% / 2 - 4px);
  }
`;

export const BuyTokensContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;

  div {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 10px;
    background: #3c6;
    width: 78px;
    height: 36px;
    color: #fff;
    font-weight: 500;
    font-size: 12px;
    font-family: 'SF Pro Display', sans-serif;
    text-align: center;
  }
`;
