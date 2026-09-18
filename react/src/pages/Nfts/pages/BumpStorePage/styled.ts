import styled from 'styled-components/macro';

export const BumpStoreWrapper = styled.div`
  justify-content: start; // !! todo
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 15px 20px;
  align-items: start; // !! todo
  //flex-grow: 1;

  @media screen and (max-width: 340px) {
    justify-content: center;
  }

  @media screen and (max-width: 380px) {
    gap: 10px 12px;
  }
`;

export const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

export const WarningContainer = styled.div`
  display: flex;
  width: 100%;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
