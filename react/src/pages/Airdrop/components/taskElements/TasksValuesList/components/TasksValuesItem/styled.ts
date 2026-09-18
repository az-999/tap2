import styled from 'styled-components/macro';

export const TasksValuesItemContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  span:nth-of-type(1) {
    opacity: 0.5;
  }

  svg {
    width: 32px;
    height: 32px;
  }
`;
