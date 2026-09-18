import styled, { css } from 'styled-components/macro';

import { PageType } from '@/pages/BumpTicket';

export const ModalBackground = styled.div<{
  $isActive: boolean;
}>`
  position: fixed;
  width: 100%;
  height: 100%;
  opacity: 0;
  visibility: hidden;
  background: #000000b3;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  transition: all 0.2s ease-in-out;
  top: 0;
  left: 0;
  z-index: 1000;

  ${({ $isActive }) =>
    $isActive &&
    css`
      visibility: visible;
      opacity: 1;
    `}
`;

export const ExtraTaskModalContainer = styled.div<{
  $isActive: boolean;
}>`
  position: fixed;
  opacity: 0;
  display: flex;
  top: 50%;
  transform: translateY(-110%);
  width: calc(100% - 20px);
  border-radius: 10px;
  background: #151718;
  box-shadow: 0 0 24px 0 #000;
  color: white;
  margin: 0 10px;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  z-index: 1000;

  ${({ $isActive }) =>
    $isActive &&
    css`
      transform: translateY(-50%);
      opacity: 1;
    `}

  img {
    border-radius: 10px 10px 0 0;
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 10px 10px;
  align-items: center;
  justify-content: center;

  div:first-of-type {
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0.8;
    padding: 8px 30px 0;
    text-align: center;
  }

  div:not(:first-of-type) {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-top: 18px;
    width: 100%;
  }
`;

export const Button = styled.button<{
  $type: 'solid' | 'transparent';
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
  border: 1px solid #33cc66;
  gap: 4px;
  background-color: ${({ $type }) =>
    $type === 'solid' ? '#33cc66' : 'transparent'};
  -webkit-tap-highlight-color: transparent;

  &:focus {
    outline: none;
  }
`;
