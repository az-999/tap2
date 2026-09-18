import styled from 'styled-components/macro';

export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  padding: 0 20px 20px 20px;
`;

export const BoosterIcon = styled.img`
  width: 135px;
  height: 97px;
`;

export const Content = styled.div<{ $gap?: number }>`
  border-radius: 10px;
  background: #222325;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => ($gap ? `${$gap}px` : '14px')};
  width: 100%;
  align-items: center;

  span {
    text-align: center;
  }
`;
