import styled from 'styled-components/macro';

import bg from '@/pages/Airdrop/assets/airdrop-completed-modal-bg.png';

export const CongratulationPopupContainer = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  z-index: 1;
  position: relative;
  width: 100%;
  background-image: url(${bg});
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  padding: 170px 10px 10px;

  & > div:nth-child(1),
  & > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    div {
      display: flex;
      align-items: center;
      gap: 6px;
    }
  }

  & > div:last-child {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;
