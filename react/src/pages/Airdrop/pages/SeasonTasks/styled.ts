import styled from 'styled-components/macro';

import bg from '@/pages/Airdrop/assets/dark-bg.png';

export const SeasonTasksPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 16px;
  background-image: url(${bg});
  background-color: #151718;
  background-size: cover;
  background-position: left top -700px;
  background-repeat: no-repeat;
  align-items: center;
  padding: 0 20px;

  & > button:first-of-type {
    z-index: 3;
  }
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

export const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`;

export const TasksListContainer = styled.div`
  width: 100vw;
  border-radius: 20px 20px 0 0;
  flex-grow: 1;
  background-color: #151718cc;
  padding: 24px 20px 120px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media screen and (max-width: 360px) {
    padding: 20px 16px 90px;
  }
`;

export const TaskTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;

  & > div:first-of-type {
    position: relative;
  }

  & > div:last-child {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  button {
    position: absolute;
    top: -6px;
    right: -10px;
    border: none;
    background-color: transparent;

    svg {
      width: 14px;
      height: 14px;
    }
  }

  @media screen and (max-width: 360px) {
    gap: 10px;
  }
`;
