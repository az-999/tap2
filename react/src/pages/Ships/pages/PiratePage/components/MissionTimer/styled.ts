import styled from 'styled-components/macro';

export const MissionTimerContainer = styled.div`
  border-radius: 10px;
  border: 1px solid #ff4500;
  box-shadow: 0 4px 19px 0 rgba(212, 79, 30, 0.4);
  height: 50px;
  width: 100%;
  display: flex;
  padding: 10px;
  gap: 6px;
  align-items: center;
  justify-content: center;

  & > span:first-child {
    text-transform: uppercase;
  }
`;
