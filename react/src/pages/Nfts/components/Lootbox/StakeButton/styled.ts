import styled from 'styled-components/macro';

export const StakeButtonContainer = styled.button<{
  $type: 'solid' | 'outlined';
  $color: 'primary' | 'green';
  $height: number;
}>`
  height: ${({ $height }) => `${$height}px`};
  width: 100%;
  border-radius: 10px;
  background: ${({ $type, $color }) =>
    $color === 'green'
      ? '#3C6'
      : $type === 'solid'
        ? '#38F4F1'
        : 'transparent'};
  border: ${({ $type }) => ($type === 'solid' ? 'none' : '2px solid #49DFDD')};
  color: #fff;
  text-align: center;
  font-family: 'SF Pro Display', sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  z-index: 2;
  -webkit-tap-highlight-color: transparent;

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.65;
  }
`;
