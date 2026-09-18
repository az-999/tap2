import styled from 'styled-components/macro';

import defenseImg from '@/pages/Ships/pages/ModeSelectionPage/assets/defenseImg.png';
import pirateImg from '@/pages/Ships/pages/ModeSelectionPage/assets/pirateImg.png';

export const ModeSelectionPageContainer = styled.div`
  width: calc(100% + 20px);
  height: calc(100% + 40px);
  margin-left: -10px;
  margin-bottom: -40px;
  flex-grow: 1;
  display: flex;
`;

export const ModeItem = styled.div<{ $index: number }>`
  position: relative;
  display: flex;
  width: 50%;
  flex-grow: 2;
  padding: 14px;
  background-image: ${({ $index }) =>
    $index % 2 ? `url(${defenseImg})` : `url(${pirateImg})`};
  background-position: center;
  background-size: cover;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 16px;
    padding-top: 10vw;

    img {
      margin-left: -16px;
      width: 120%;
      height: auto;
      object-fit: contain;
    }

    button {
      align-self: end;
      z-index: 1;
    }
  }
`;
