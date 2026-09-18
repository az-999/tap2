import styled from 'styled-components/macro';

export const RegularTasksContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const Break = styled.div`
  width: 100%;
  position: relative;

  &::before {
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translateY(-50%);
    border-bottom: 1px solid #ffffff33;
    width: 100%;
    height: 2px;
    content: '';
  }
`;

export const DottedList = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 6px;
  padding-right: 10px;

  li {
    margin-left: 16px;
    height: fit-content;
    line-height: 14px;

    &::marker {
      color: white;
    }
  }

  span > span {
    font-weight: 600;
  }
`;
