import styled from 'styled-components/macro';

export const StyledButton = styled.button<{ $isBoldWeight: boolean }>`
  height: 40px;
  border-radius: 10px;
  background: #f95317;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: 'SF Pro Display', sans-serif;
  font-size: 12px;
  font-weight: ${({ $isBoldWeight }) => ($isBoldWeight ? 900 : 600)};
  outline: none;
  border: none;
  -webkit-tap-highlight-color: transparent;
`;
