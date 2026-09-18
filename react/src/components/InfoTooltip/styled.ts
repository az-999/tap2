import styled from 'styled-components/macro';

export const TooltipRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  svg {
    filter: drop-shadow(0 0 12px rgba(51, 204, 102, 0.6));
    width: 20px;
    min-width: 20px;
    height: 20px;
    min-height: 20px;
  }
`;

export const TextItem = styled.div`
  color: #fff;
  font-family: 'SF Pro Display', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
`;
