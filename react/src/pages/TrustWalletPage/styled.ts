import styled from 'styled-components/macro';

export const TrustWalletPageContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 20px 10px 0;
  align-items: center;
  justify-content: center;

  #trust-wallet-page-pump-icon {
    position: absolute;
    top: 20px;
    left: 20px;
  }
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
`;

export const StyledLogo = styled.img`
  width: 73px;
  height: 82px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 10px;

  span:last-of-type {
    opacity: 0.8;
  }
`;

export const StyledButton = styled.button`
  font-family: 'SF Pro Display', serif;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px 16px;
  min-height: 50px;
  background: #3c6;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  outline: none;
  border: none;
  color: #fff;
  box-shadow: 0 4px 19px 0 rgba(51, 204, 102, 0.85);
  -webkit-tap-highlight-color: transparent;

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.65;
  }
`;
