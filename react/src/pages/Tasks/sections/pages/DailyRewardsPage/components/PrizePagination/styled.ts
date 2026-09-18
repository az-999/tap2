import styled, { css } from 'styled-components/macro';

export const PrizePaginationContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

export const PaginationButton = styled.button<{
  $isDisabled: boolean;
}>`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background: #222325;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;

  &:focus {
    outline: none;
  }

  svg {
    width: 14px;
    height: 14px;
    object-fit: contain;
  }

  &:nth-of-type(1) {
    svg {
      margin-right: 2px;
    }
  }

  &:nth-of-type(2) {
    svg {
      margin-left: 2px;
    }
  }

  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      opacity: 0.3;
    `}
`;

export const PaginationCount = styled.div`
  display: flex;
  gap: 3px;
  height: 30px;
  border-radius: 5px;
  background: #222325;
  min-width: 40px;
  padding: 12px;
  align-items: center;
  justify-content: center;

  span:not(:first-child) {
    opacity: 0.5;
  }
`;
