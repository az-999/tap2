import styled from 'styled-components/macro';

export const WalletButtonWrapper = styled.div<{ $isConnected?: boolean }>`
  display: flex;
  gap: 6px;
  justify-content: end;
  align-items: center;

  #ton-connect-button {
    button {
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      gap: 6px;
      border-radius: 10px !important;
      background-color: ${({ $isConnected }) =>
        $isConnected ? '#222325 !important' : '#33cc66 !important'};
      padding: 11px !important;
      width: auto !important;
      height: 40px !important;

      svg {
        /* background-color: #161c28 !important;
        border-radius: 50% !important;*/
      }

      div {
        color: #fff !important;
        font-weight: 600 !important;
        font-size: 14px !important;
      }
    }
  }
`;
