import styled from 'styled-components/macro';

export const ClaimRewardContainer = styled.button`
  position: fixed;
  bottom: 108px;
  left: 10px;
  width: calc(100vw - 20px);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: #33cc66;
  border: none;
  padding: 12px;
  border-radius: 10px;
  /* width: 100%; */
  min-height: 60px;
  box-shadow: 0 4px 18.9px 0 #33cc66d9;
  z-index: 2;
  -webkit-tap-highlight-color: transparent;

  &:focus {
    outline: none;
  }

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    opacity: 0.85;
    cursor: default;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const ClaimBlock = styled.div`
  position: fixed;
  bottom: 108px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: #1a1c1e;
  border-radius: 10px;
  width: calc(100vw - 20px);
  min-height: 60px;
`;
export const ClaimBlockText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 2px;
`;
