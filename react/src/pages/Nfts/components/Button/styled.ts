import styled, { css } from 'styled-components/macro';

export const ButtonContainer = styled.button<{
  $color: string;
  $isDisabled: boolean;
}>`
  height: 50px;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: none;
  background-color: ${({ $color }) => $color};

  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      opacity: 0.5;
    `};
`;
