import styled from 'styled-components/macro';

export const RatingTimerComponents = styled.div`
  background: linear-gradient(
    90deg,
    #622eff 6.04%,
    #2eff73 47.33%,
    #2effee 77.69%
  );
  max-width: 90vw;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  position: relative;
  width: 100%;
`;

export const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #141516;
  border-radius: 10px;
  gap: 24px;
  padding: 16px;
`;

export const TopBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  &::before {
    position: absolute;
    bottom: -12px;
    left: 0;
    background-color: rgba(255, 255, 255, 0.2);
    width: 100%;
    height: 1px;
    content: '';
  }

  & > span:nth-of-type(2) {
    color: #2eff73;
  }

  div {
    display: flex;
    gap: 4px;

    span:last-of-type {
      opacity: 0.6;
    }
  }
`;

export const BottomBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;

  svg g {
    opacity: 1;
  }
`;
