import styled from 'styled-components/macro';

export const StyledButton = styled.button`
  width: 80px;
  height: 32px;
  border-radius: 11px;
  border: 1px solid #3c6;
  background: rgba(0, 0, 0, 0.01);
  backdrop-filter: blur(2.5px);
  -webkit-backdrop-filter: blur(2.5px);
  color: #fff;
  font-family: 'SF Pro Display', sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 150.5%;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
