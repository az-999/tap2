import styled, { css } from 'styled-components/macro';

export const GrantRewardContainer = styled.div<{
  $isActive: boolean;
}>`
  position: fixed;
  opacity: 0;
  transform: translateY(-110%);
  display: flex;
  top: 10px;
  width: calc(100% - 20px);
  border-radius: 10px;
  background: #151718;
  box-shadow: 0 0 24px 0 #000;
  color: white;
  padding: 25px 10px 14px;
  margin: 0 10px;
  gap: 6px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  z-index: 1000;

  ${({ $isActive }) =>
    $isActive &&
    css`
      transform: translateY(0);
      opacity: 1;
    `}

  & > img {
    width: 62px;
    height: 62px;
  }
`;

export const RewardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-top: 10px;

  span {
    text-align: start;
  }
`;

export const Balance = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const RewardsList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  border: 1px solid #d9dae733;
  border-radius: 7px;
  background: #0d0e0f;

  li {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 6px;
    padding: 0 28px;

    &:first-of-type {
      padding-top: 8px;
    }

    &:last-of-type {
      padding-bottom: 8px;
    }

    svg {
      flex-shrink: 0;
    }
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 6px;
  justify-content: end;
`;

export const SuccessButton = styled.button`
  font-family: 'SF Pro Display', serif;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  padding: 10px 12px;
  height: 50px;
  background: #3c6;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  outline: none;
  border: none;
  color: #fff;
  transition: all 0.3s ease;
  box-shadow: 0 4px 29px 0 rgba(51, 204, 102, 0.15);
  -webkit-tap-highlight-color: transparent;

  &:focus {
    outline: none;
  }
`;
