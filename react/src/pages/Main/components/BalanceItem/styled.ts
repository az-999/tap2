import styled from 'styled-components/macro';

export const BalanceItemContainer = styled.li<{ $isFullWidth: boolean }>`
  display: flex;
  flex-direction: ${({ $isFullWidth }) => ($isFullWidth ? 'row' : 'column')};
  padding: 8px;
  background-color: #141516;
  border-radius: 10px 10px 0 0;
  gap: 12px;
  position: relative;

  &::before {
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #2eff73;
    width: 100%;
    height: 2px;
    content: '';
  }
`;

export const IconContainer = styled.div`
  display: flex;
  gap: 3px;
  align-items: center;

  svg {
    width: 20px;
    height: 20px;
  }

  #wallet-icon {
    width: 14px;
    height: 14px;
  }
`;

export const ValueContainer = styled.div<{ $isFullWidth: boolean }>`
  display: flex;
  flex-direction: ${({ $isFullWidth }) => ($isFullWidth ? 'row' : 'column')};
  flex: 1 0 auto;
  justify-content: space-between;
  align-items: ${({ $isFullWidth }) => ($isFullWidth ? 'center' : 'start')};
  gap: ${({ $isFullWidth }) => ($isFullWidth ? 8 : 2)}px;

  span:first-child {
    max-width: ${({ $isFullWidth }) =>
      $isFullWidth ? 'calc(84vw - 100px)' : '23vw'};
    overflow: hidden;
    text-overflow: ellipsis;
    text-wrap: nowrap;
  }

  span:last-child {
    opacity: 0.7;
  }
`;
