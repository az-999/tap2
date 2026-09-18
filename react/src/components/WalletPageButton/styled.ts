import styled, { css } from 'styled-components/macro';

export const WalletContainer = styled.div<{
  $isOpen?: boolean;
  $isWalletConnect: boolean;
}>`
  position: fixed;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: none;
  background-color: #161c28;
  top: 10px;
  right: 0;
  height: 46px;
  width: ${({ $isWalletConnect }) =>
    $isWalletConnect ? 'fit-content' : '50px'};
  border-radius: 60px 0 0 60px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 6px;

  ${({ $isOpen, $isWalletConnect }) =>
    !$isOpen &&
    $isWalletConnect &&
    css`
      transform: translateX(70%);
    `}

  button > div {
    background-color: transparent;
    padding: 15px 6px 15px 0;
    height: 46px;
    color: #fff;
    font-weight: 600;
    font-size: 14px;
  }

  & > div:not(#wallet-icon) {
    border-radius: 60px 0 0 60px;
    background-color: transparent;
  }

  button {
    background-color: transparent;
  }
`;

export const WalletIconContainer = styled.div<{ $isWalletConnect?: boolean }>`
  position: absolute;
  left: -50%;
  transform: translateX(50%);
  width: 24px;
  height: 24px;
  background-color: #2f384b;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 11;

  ${({ $isWalletConnect }) =>
    $isWalletConnect &&
    css`
      left: -15%;
      background-color: #33cc66;

      svg {
        width: 10px;
        height: 10px;
      }
    `}
`;

export const IconWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 23px;
    height: 22px;
  }

  swiper-container {
    flex-grow: 2;
    width: 100%;
    height: 100%;
  }

  swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
