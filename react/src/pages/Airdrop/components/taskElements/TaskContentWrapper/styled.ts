import styled from 'styled-components/macro';

export const TaskContentWrapperContainer = styled.div<{ $color: string }>`
  width: 100%;
  position: relative;
  padding-left: 8px;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 0 2px 2px 0;
    background: ${({ $color }) => $color};
    width: 2px;
    height: 100%;
    content: '';
  }
`;
