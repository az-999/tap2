import styled from 'styled-components/macro';

export const StyledButton = styled.button<{ $isDefenseActive: boolean }>`
  border: ${({ $isDefenseActive }) =>
    $isDefenseActive ? '1px solid #2EFF73' : 'none'};
  background-color: ${({ $isDefenseActive }) =>
    $isDefenseActive ? 'transparent' : '#3C6'};
  box-shadow: ${({ $isDefenseActive }) =>
    $isDefenseActive ? 'none' : '0 4px 19px 0 rgba(46, 255, 115, 0.4)'};
  width: 155px;
  height: 50px;
  border-radius: 10px;
  outline: none;
  color: #fff;
  font-family: 'SF Pro Display', sans-serif;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  -webkit-tap-highlight-color: transparent;
`;
