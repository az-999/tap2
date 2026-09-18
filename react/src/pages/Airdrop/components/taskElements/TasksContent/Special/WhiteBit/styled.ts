import styled from 'styled-components/macro';

export const WhiteBitContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  margin-bottom: -8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-right: 10vw;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 180px;
`;

export const Input = styled.input`
  height: 34px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: #222325;
  padding: 8px 12px;
  color: #fff;
  font-weight: 500;
  font-size: 12px;
  font-family: 'SF Pro Display', sans-serif;

  &::placeholder {
    opacity: 0.4;
    font-weight: 600;
  }

  &:focus {
    outline: none;
    border: 1px solid #3c6;
  }
`;

export const Important = styled.button`
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 19px 0 rgba(51, 204, 102, 0.04);
  padding: 8px 10px;
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 4px;
  background: transparent;

  svg g {
    opacity: 1;

    path {
      fill: #2eff73;
    }
  }
`;

export const X2 = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 2px;
    max-width: 130px;

    & > span:first-child {
      color: #2eff73;

      span:first-child {
        color: white;
      }
    }

    & > span:last-child {
      color: #a4afbb;

      span:first-child {
        font-weight: 700;
      }
    }
  }
`;

export const Moderation = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;

  span {
    color: #d9ba0b;
  }
`;

export const FailedContainer = styled.div`
  display: flex;
  gap: 6px;
`;

export const Failed = styled(Moderation)`
  span {
    color: #f95317;
  }
`;
