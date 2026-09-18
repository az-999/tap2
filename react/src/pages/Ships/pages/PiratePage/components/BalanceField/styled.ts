import styled from 'styled-components/macro';

export const BalanceFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  width: 100%;

  & > span:first-of-type {
    position: relative;
  }
`;

export const BalanceContainer = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;

  svg {
    width: 18px;
    height: 18px;
  }

  & > div {
    display: flex;
    justify-content: center;
    width: 100%;

    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;

export const LevelContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 20px;
  height: 17px;
  transform: translate(100%, -120%);
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    position: absolute;
  }

  span {
    z-index: 1;
  }
`;
