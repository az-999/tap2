import styled, { css } from 'styled-components/macro';

export const ForSellNftPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 14px;
  gap: 18px;

  & > button:first-child {
    top: 28px;
    z-index: 5;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;

  span:first-child {
    line-height: 150%;
  }

  input,
  input:before,
  input:after {
    -webkit-user-select: initial;
    -khtml-user-select: initial;
    -moz-user-select: initial;
    -ms-user-select: initial;
    user-select: initial;
  }

  #sell-input {
    border: 1px solid transparent;
    border-radius: 10px;
    background: #222325;
    padding: 16px 98px 16px 16px;
    width: 100%;
    height: 50px;
    color: #fff;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: normal;
    font-family: 'SF Pro Display', sans-serif;

    &:focus {
      outline: none;
    }

    &::placeholder {
      opacity: 0.45;
    }
  }

  #currency-icon {
    display: flex;
    position: absolute;
    top: 56px;
    right: 12px;
    align-items: center;
    gap: 10px;
    transform: translateY(-50%);

    svg {
      width: 30px;
      height: 30px;
    }
  }

  #services-fee {
    display: flex;
    position: relative;
    justify-content: space-between;
    margin-bottom: 30px;

    &::before {
      position: absolute;
      bottom: -20px;
      border-bottom: 1px solid #ffffff1a;
      width: 100%;
      content: '';
    }

    span:first-child {
      opacity: 0.5;
    }

    & > div {
      position: relative;

      #sale-service-fee-button {
        display: flex;
        position: absolute;
        top: -5px;
        right: -12px;
        justify-content: center;
        align-items: center;
        border: none;
        background-color: transparent;
        width: fit-content;
      }
    }
  }

  #receive-amount {
    display: flex;
    justify-content: space-between;
  }
`;

export const TooltipRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 6px 10px;
`;
