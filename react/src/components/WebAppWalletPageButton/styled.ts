import styled, { css } from 'styled-components/macro';

export const WalletContainer = styled.div<{ $isOpen?: boolean }>`
  position: fixed;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: none;
  background-color: #161c28;
  top: 10px;
  right: 0;
  height: 70px;
  width: ${({ $isOpen }) => ($isOpen ? 'fit-content' : '42px')};
  min-width: ${({ $isOpen }) => ($isOpen ? '182px' : '42px')};
  border-radius: 20px 0 0 20px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: ${({ $isOpen }) => ($isOpen ? '8px 12px' : '8px 6px 8px 12px')};
  font-family: 'SF Pro Display', sans-serif;
  gap: 4px;
  color: #fff;

  ${({ $isOpen }) =>
    !$isOpen &&
    css`
      //transform: translateX(70%);
    `}
`;

export const WalletIconContainer = styled.div<{ $isOpen?: boolean }>`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 11;
  background-color: #33cc66;

  svg {
    width: 10px;
    height: 10px;
  }

  ${({ $isOpen }) =>
    !$isOpen &&
    css`
      svg {
        transform: rotate(180deg) translateX(1px);
      }
    `}
`;

export const Row = styled.div<{ $isSpaceBetween?: boolean }>`
  display: flex;
  justify-content: ${({ $isSpaceBetween }) =>
    $isSpaceBetween ? 'space-between' : 'start'};
  height: 100%;
  gap: 4px;
  width: 100%;

  p {
    display: flex;
    align-items: center;
    height: 24px;
    font-weight: 600;
    font-size: 10px;
    line-height: 122%;
  }

  #ton-connect-button {
    display: flex;
    align-items: center;
    background-color: transparent;
    padding: 0;
    height: 24px;

    font-weight: 600;
    font-size: 14px;

    div,
    button {
      background-color: transparent;
      padding: 0;
      width: 100%;
      max-width: 130px;
      height: fit-content;
      font-weight: 600;
      font-size: 10px;
      line-height: 122%;
    }

    & > div {
      min-width: 130px;
    }

    button {
      display: flex;
      justify-content: start;
      align-items: center;
      min-width: 130px;

      div {
        width: fit-content;
        color: #fff;
      }
    }
  }
`;

export const UserImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

export const DefaultUserImage = styled.div<{
  $isWalletExist: boolean;
  $isTonkeeperWallet: boolean;
}>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${({ $isWalletExist, $isTonkeeperWallet }) =>
    $isWalletExist && $isTonkeeperWallet ? '1px solid #252c3d' : 'none'};
  background-color: ${({ $isWalletExist, $isTonkeeperWallet }) =>
    $isWalletExist ? ($isTonkeeperWallet ? '#161c28' : '#33aaf5') : '#2F384B'};
`;

export const UserWallet = styled.div<{ $isWalletExist: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2f384b;

  svg {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  ${({ $isWalletExist }) =>
    !$isWalletExist &&
    css`
      opacity: 0.6;

      svg {
        border-radius: 0;
        width: 14px;
        height: 14px;
      }
    `}
`;

export const RowItem = styled.div<{ $width?: number }>`
  width: ${({ $width }) => ($width ? `${$width}px` : 'fit-content')};
  height: 24px;
  background-color: #2f384b;
  display: flex;
  //align-items: center;
  //justify-content: start;
  border-radius: 24px;
  font-weight: 600;
  font-size: 8px;
  gap: 2px;
  padding: 4px 12px 4px 4px;

  align-items: center;
  justify-content: center;
  flex-grow: 2;
`;
