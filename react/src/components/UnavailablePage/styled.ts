import styled from 'styled-components/macro';

export const UnavailablePageContainer = styled.div`
  width: 100%;
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;

  img {
    border-radius: 10px;
    padding-top: 12px;
    width: 100%;
    height: auto;
    object-fit: contain;
  }

  span:nth-of-type(2) {
    opacity: 0.8;
  }
`;
