import styled from 'styled-components/macro';

export const ButtonContainer = styled.button`
  border: none;
  border-radius: 10px;
  background: #3c6;
  box-shadow: 0 4px 19px 0 #33cc6666;
  height: 50px;
  width: 100%;
  color: #fff;
  text-align: center;
  font-family: 'SF Pro Display', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  position: relative;
  -webkit-tap-highlight-color: transparent;

  &:disabled {
    opacity: 0.7;
  }
`;
