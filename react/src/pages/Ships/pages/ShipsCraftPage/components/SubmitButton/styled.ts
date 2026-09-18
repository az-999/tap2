import styled, { css } from 'styled-components/macro';

export const StyledButton = styled.button<{
  $isFullWidth: boolean;
  $isDisabled: boolean;
}>`
  height: ${({ $isFullWidth }) => ($isFullWidth ? '60px' : '40px')};
  width: ${({ $isFullWidth }) => ($isFullWidth ? '100%' : 'fit-content')};
  border-radius: 10px;
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    87deg,
    #3c6 -0.52%,
    #35d86b 22.93%,
    #1ebc8d 48.96%,
    #9b33cc 100.56%
  );
  border: none;
  color: #fff;
  font-family: 'SF Pro Display', sans-serif;
  font-size: 14px;
  font-weight: 600;
  padding: 12px 16px;
  -webkit-tap-highlight-color: transparent;

  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      opacity: 0.5;
    `};
`;
