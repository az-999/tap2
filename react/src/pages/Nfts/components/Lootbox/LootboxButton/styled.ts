import styled from 'styled-components/macro';

export const LootboxButtonContainer = styled.button<{ $withMargin: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${({ $withMargin }) => ($withMargin ? '26px' : '0')};
  margin-bottom: 3px;
  border: none;
  border-radius: 10px;
  background: #3c6;
  width: 100%;
  height: 50px;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  font-family: 'SF Pro Display', sans-serif;
  -webkit-tap-highlight-color: transparent;

  &:disabled {
    opacity: 0.5;
  }
`;
