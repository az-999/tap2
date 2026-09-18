import styled from 'styled-components/macro';

import topBg from '@/pages/Airdrop/assets/top-background.png';

export const TopBlockContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-image: url(${topBg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  justify-content: center;
  align-items: center;
  padding: 12px 20px 32px;
`;

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
`;

export const AboutContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 6px;

  span {
    flex-shrink: 0;
    opacity: 0.8;
    width: calc(50% - 8px);
    text-align: end;
  }

  button {
    flex-shrink: 0;
    width: calc(50% - 8px);
  }
`;

export const TopLogo = styled.img`
  width: 174px;
  height: 174px;
  margin-bottom: -16px;
`;
