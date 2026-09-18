import styled from 'styled-components/macro';

export const DailyCheckContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  margin-bottom: -8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const RewardsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const DailyCount = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 4px;
`;

export const SubmitButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  button {
    width: 105px;
  }
`;
