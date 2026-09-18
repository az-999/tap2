import styled from 'styled-components/macro';

export const CurrencyIconContainer = styled.div<{ $color: 'white' | 'green' }>`
  display: flex;
  align-items: center;
  gap: 5px;
  border-radius: 13px;
  padding: 4px 7px 4px 4px;
  background-color: ${({ $color }) =>
    $color === 'white' ? '#FFFFFF' : '#45AEF5'};

  &:hover {
    cursor: pointer;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #33cc66;
  width: 18px;
  height: 18px;
  border-radius: 50%;
`;
