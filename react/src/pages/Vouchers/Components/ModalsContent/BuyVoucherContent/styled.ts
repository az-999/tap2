import styled, { keyframes } from 'styled-components/macro';

export const BuyNftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 13px;
  height: fit-content;
`;

export const Image = styled.img`
  width: 150px;
  height: 150px;
  margin-bottom: 12px;
  border-radius: 8px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding: 20px;
  background-color: #0d0e0f;
  align-items: center;

  &:is(#connect-wallet-btn) {
    button {
      font-weight: 600;
      font-size: 14px;

      span svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

export const CommissionCompletedContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 80%;

  #commission-completed-container {
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  span {
    text-align: center;
  }

  a {
    color: #33cc66;
    text-decoration: underline;
  }

  button {
    border: none;
    background: transparent;
    -webkit-tap-highlight-color: transparent;

    svg {
      animation: none;
      margin-bottom: -3px;
      padding-top: 2px;
      width: 18px;
      min-width: 18px;
      height: 18px;
      min-height: 18px;
    }
  }

  @media screen and (max-width: 380px) {
    width: 90%;
  }
`;

export const Button = styled.button`
  height: 50px;
  width: 100%;
  border-radius: 10px;
  background: #3c6;
  border: none;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  color: #fff;
  -webkit-tap-highlight-color: transparent;

  &:disabled {
    opacity: 0.7;
  }
`;
