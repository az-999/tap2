import styled, { css } from 'styled-components/macro';

export const NftSellErrorTooltipBackground = styled.div<{
  $isActive: boolean;
}>`
  position: fixed;
  width: 100%;
  height: 100%;
  opacity: 0;
  visibility: hidden;
  background: rgba(26, 28, 30, 0.4);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  transition: all 0.2s ease-in-out;
  top: 0;
  left: 0;
  z-index: 1000;

  ${({ $isActive }) =>
    $isActive &&
    css`
      visibility: visible;
      opacity: 1;
    `}
`;

export const NftSellErrorTooltipContainer = styled.div<{
  $isActive: boolean;
}>`
  position: fixed;
  opacity: 0;
  transform: translate(-50%, -120%);
  display: flex;
  top: 20px;
  left: 50%;
  width: calc(100% - 40px);
  max-width: 320px;
  border-radius: 16px;
  border: 1px solid #3b4046;
  background: #151718;
  box-shadow: 0 0 24px 0 #000;
  color: white;
  gap: 10px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease-in-out;
  z-index: 1000;
  box-sizing: border-box;
  padding: 20px 10px;

  ${({ $isActive }) =>
    $isActive &&
    css`
      top: 50%;
      transform: translate(-50%, -50%);
      opacity: 1;
    `}

  img {
    border-radius: 8px;
    width: 150px;
    height: 150px;
  }

  & > span:first-of-type {
    line-height: 150%;
    text-align: center;
  }

  & > span:last-of-type {
    opacity: 0.7;
    text-align: center;
  }

  & > div:first-of-type {
    display: flex;
    flex-direction: column;

    span {
      text-align: center;
    }
  }
`;

export const ContentPart = styled.div`
  border-radius: 16px;
  background: #0c0d0e;
  padding: 18px 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;

  #green-highlight {
    color: #33cc66;
  }

  & > div:nth-of-type(1) {
    display: flex;
    flex-direction: column;
  }

  & > div:not(:nth-of-type(1)) {
    display: flex;
    align-items: center;
    gap: 4px;

    &:not(:nth-of-type(2)) {
      flex-direction: column;
      align-items: start;

      div {
        display: flex;
        align-items: center;
        gap: 4px;
      }
    }

    & > span:first-of-type {
      opacity: 0.5;
    }
  }

  button {
    border: none;
    background: transparent;
    -webkit-tap-highlight-color: transparent;

    svg {
      animation: none;
      margin-bottom: -3px;
      padding-top: 2px;
      width: 18px;
      min-width: 18px;
      height: 18px;
      min-height: 18px;
    }
  }
`;
