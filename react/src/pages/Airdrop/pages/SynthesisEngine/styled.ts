import styled from 'styled-components/macro';

import bg from '@/pages/Airdrop/assets/synthesis-engine-bg.png';

export const SynthesisEnginePageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  background-image: url(${bg});
  background-color: #0d0e0f;
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  align-items: center;
  padding: 60px 20px 0 20px;
`;

export const TitleContainer = styled.div`
  max-width: 248px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    opacity: 0.8;
  }
`;
