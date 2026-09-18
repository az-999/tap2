import styled from 'styled-components/macro';

export const MainPageWrapper = styled.div`
  width: 100vw;
  margin-left: -10px;
  flex-grow: 1;
  padding: 26px 20px 14px;
  background-color: rgba(13, 14, 15, 0.7);
`;

export const MainPageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 100px;

  @media screen and (max-width: 360px) {
    padding-bottom: 70px;
  }
`;

export const Profile = styled.div<{ $isVisible: boolean }>`
  display: flex;
  gap: 12px;
  align-items: center;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};

  img {
    border-radius: 8px;
    width: 33px;
    height: 33px;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 2px;

    span:first-of-type {
      opacity: 0.6;
    }
  }
`;
