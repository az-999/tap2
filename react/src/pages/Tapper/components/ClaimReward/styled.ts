import styled from 'styled-components/macro';

import BalanceIcon from '../../Assets/BalanceIcon';

export const ClaimTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: absolute;
  left: 50%;
  top: 50%;
  width: calc(100% + 5%);
  height: calc(100% + 5%);
  transform: translate(-50%, -50%) translateY(0);
  background: #3c6;
  border: 2px solid #67e591;
  border-radius: 50%;

  &.fade-enter {
    transform: translate(-50%, -50%) translateY(40px);
    opacity: 0;
  }

  &.fade-enter-active {
    transform: translate(-50%, -50%) translateY(0);
    opacity: 1;
    transition: all 0.5s;
  }

  &.fade-exit {
    opacity: 1;
  }

  &.fade-exit-active {
    transform: translate(-50%, -50%) translateY(40px);
    opacity: 0;
    transition: all 0.5s;
  }
`;

export const ClaimBalance = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 32px;
  font-weight: 700;

  @media screen and (max-height: 570px) {
    font-size: 22px;
  }
`;

export const Icon = styled(BalanceIcon)`
  height: 38px;
  width: auto;
  flex-shrink: 0;

  @media screen and (max-height: 570px) {
    height: 20px;
  }
`;

export const Text = styled.div`
  font-size: 18px;
  font-weight: 600;
  white-space: nowrap;

  @media screen and (max-height: 570px) {
    font-size: 14px;
  }
`;
