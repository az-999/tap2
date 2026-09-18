import styled from 'styled-components/macro';

export const StyledBackButton = styled.button`
  position: absolute;
  left: 20px;
  top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: #222325;
  width: 64px;
  height: 30px;
  z-index: 1;

  &:hover {
    cursor: pointer;
  }
`;
