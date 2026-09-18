import styled from 'styled-components/macro';

import topBg from '@/pages/Airdrop/assets/airdrop-completed-bg.png';

export const AirdropCompletedContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-image: url(${topBg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  align-items: center;
  padding: 12px 20px 120px;
  flex-grow: 1;
  overflow-y: auto;

  @media screen and (max-width: 360px) {
    padding-bottom: 90px;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;

  span {
    text-align: center;
  }
`;

export const BalanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    gap: 2px;
  }
`;

export const LinksContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
