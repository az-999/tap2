import styled, { css } from 'styled-components/macro';

export const SmartContractVisualizationContainer = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
  color: #fff;
  font-family: 'SF Pro Display', sans-serif;
  padding-top: 56px;
  margin-bottom: 64px;

  svg:not(#bump-logo-smart-contract-block):not(#earning-icon):not(
      #earning-title
    ) {
    width: 100%;
    height: fit-content;
  }

  #earning-icon {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 40%);
    z-index: 1;
    width: 30px;
    height: 30px;
  }

  #earning-title {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 100%);
    width: 100%;
    height: fit-content;
  }

  #earning-text {
    position: absolute;
    bottom: -7%;
    left: 50%;
    transform: translate(-50%, 100%);
  }
`;

export const BumpTitle = styled.div`
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px;
  border: 1px solid #6d7584;
  background: #151718;
  padding: 10px 14px;
  display: flex;
  width: fit-content;
  align-items: center;
  gap: 20px;

  #bump-logo-smart-contract-block {
    width: 100%;
    height: 100%;
  }

  div {
    display: flex;
    position: relative;
    flex-direction: column;
    min-width: 58px;

    &::before {
      position: absolute;
      left: -10px;
      border-left: 1px solid #ffffff33;
      height: 30px;
      content: '';
    }

    @media screen and (max-width: 340px) {
      min-width: 48px;
      span {
        font-size: 10px;
      }
    }

    @media screen and (max-width: 310px) {
      min-width: 38px;
      span {
        font-size: 8px;
      }
    }
  }
`;

export const StyledList = styled.ul`
  padding-top: 60px;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  list-style: none;
  gap: 8px;

  @media screen and (max-width: 380px) {
    gap: 4px;
  }

  @media screen and (max-width: 360px) {
    gap: 2px;
    padding-top: 64px;
  }
`;

export const ItemContainer = styled.li<{ $isActive: boolean }>`
  position: relative;
  border-radius: 7px;
  border: 1px solid #d9dae733;
  background: #0d0e0f;
  height: 36px;
  color: #fff;
  font-family: 'SF Pro Display', sans-serif;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 210px;

  ${({ $isActive }) =>
    !$isActive &&
    css`
      opacity: 0.7;
    `}

  svg {
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
    width: 6px !important;
    height: 6px !important;
  }

  @media screen and (max-width: 360px) {
    height: 32px;
  }
`;
