import styled from 'styled-components/macro';

export const NftsPageContainer = styled.div`
  padding: 60px 10px 30px;
  display: flex;
  flex-direction: column;
  gap: 17px;
  flex-grow: 1;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 12px;

  div {
    display: flex;
    flex-direction: column;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
  flex-grow: 1;
`;

export const NoContent = styled.div`
  font-family: 'SF Pro Display', sans-serif;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 0 10px;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  div:first-child {
    gap: 2px;
  }

  & > div {
    gap: 10px;
  }

  button {
    margin-top: 8px;
    padding: 0 20px;
    width: fit-content;
    color: #fff;
    font-weight: 600;
    font-size: 14px;
  }
`;
