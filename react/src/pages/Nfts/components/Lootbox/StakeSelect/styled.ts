import styled, { css } from 'styled-components/macro';

export const StakeSelectContainer = styled.div<{ $isOpen: boolean }>`
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background: #222325;
  height: ${({ $isOpen }) => ($isOpen ? '135px' : '56px')};
  transition: height 0.2s ease;
  -webkit-transition: height 0.2s ease;
  overflow: hidden;
  position: absolute;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  align-items: start;

  div {
    display: flex;
    align-items: center;
    gap: 6px;
    z-index: 4;
    width: 100%;
  }

  #staking-arrow-icon {
    position: absolute;
    top: 16px;
    right: 10px;
    transform: ${({ $isOpen }) =>
      $isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
    z-index: 2;
    transition: transform 0.1s ease;
    -webkit-transition: transform 0.1s ease;
  }
`;
