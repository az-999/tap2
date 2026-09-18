import styled, { css } from 'styled-components/macro';

import { PageType } from '@/pages/BumpTicket';

export const ButtonsGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  div:first-of-type {
    display: flex;
    gap: 10px;
  }
`;

export const ButtonContainer = styled.button<{
  $type: PageType | 'invite' | 'friend';
}>`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  color: #fff;
  font-family: 'SF Pro Display', sans-serif;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  gap: 4px;
  background-color: #33cc66;
  -webkit-tap-highlight-color: transparent;

  &:focus {
    outline: none;
  }

  ${({ $type }) => {
    if ($type === 'soldOut' || $type === 'friend') {
      return css`
        background-color: transparent;
        border: 1px solid #33cc66;
      `;
    }

    if ($type === 'taps') {
      return css`
        background-color: #33cc6666;
      `;
    }
  }}
`;
