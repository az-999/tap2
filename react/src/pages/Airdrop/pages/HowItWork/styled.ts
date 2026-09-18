import styled from 'styled-components/macro';

export const HowItWorkPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 24px;
  background-color: #0d0e0f;
  align-items: center;
  padding: 0 20px 120px;

  @media screen and (max-width: 360px) {
    padding-bottom: 90px;
  }

  & > button:first-of-type {
    z-index: 3;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;

  span {
    text-align: center;
  }

  span:last-of-type {
    color: #2eff73;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
