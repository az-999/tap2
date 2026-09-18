import styled from 'styled-components/macro';

export const StyledButton = styled.button<{ $color: 'red' | 'green' }>`
  padding: 2px;
  width: 100%;
  min-height: 46px;
  display: flex;
  border-radius: 10px;
  border: ${({ $color }) =>
    `1px solid ${$color === 'red' ? '#FF4500' : '#3C6'}`};
  background: ${({ $color }) => ($color === 'red' ? '#8a3212' : '#11682E')};
  box-shadow: ${({ $color }) =>
    `0 4px 19px 0 ${
      $color === 'red' ? 'rgba(212, 79, 30, 0.4)' : 'rgba(51, 204, 102, 0.38)'
    } `};
  -webkit-tap-highlight-color: transparent;

  &:disabled {
    opacity: 0.5;
  }
`;

export const InnerContainer = styled.div<{
  $color: 'red' | 'green';
  $size: 'primary' | 'big';
  $withUpperCase: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 10px;
  width: 100%;
  height: 100%;
  flex-grow: 1;
  border-radius: 9px;
  background: ${({ $color }) => ($color === 'red' ? '#f95317' : '#3C6')};
  color: #fff;
  font-family: 'SF Pro Display', sans-serif;
  font-size: ${({ $size }) => ($size === 'primary' ? '11px' : '13px')};
  font-weight: 700;
  text-transform: ${({ $withUpperCase }) =>
    $withUpperCase ? 'uppercase' : 'none'};

  span {
    text-align: start;
  }
`;
