import styled, { css, keyframes } from 'styled-components/macro';

const borderAnimation = keyframes`
    0% {
        border-color: #ffe09a;
    }
    50% {
        border-color: #ffbd1a;
    }
    100% {
        border-color: #ffe09a;
    }
`;

export const NavWrapper = styled.div<{
  bottomNav?: boolean;
  isMainPage: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  border-radius: 10px;
  border: 1px solid rgba(181, 206, 212, 0.3);
  background: rgba(17, 17, 18, 0.7);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  height: 90px;
  padding: 10px;
  z-index: 10;
  position: fixed;
  bottom: 10px;
  left: 10px;
  width: calc(100vw - 20px);

  @media screen and (max-width: 360px) {
    padding: 5px;
    height: 60px;
  }
`;

export const NavButton = styled.button<{
  $isActive: boolean;
  $isLastIndex: boolean;
}>`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: ${(p) => (p.$isActive ? '#222325' : 'rgba(34,35,37,0.5)')};
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  height: 100%;
  gap: 7px;
  transition: all 0.3s ease;
  cursor: pointer;
  padding: 10px 6px;
  border: none;
  font-family: 'SF Pro Display', sans-serif;
  position: relative;
  -webkit-tap-highlight-color: transparent;

  ${({ $isLastIndex, $isActive }) =>
    $isLastIndex &&
    css`
      background: ${() =>
        $isActive
          ? 'linear-gradient(328deg, rgba(255, 236, 148, 0.50) 0%, rgba(255, 228, 106, 0.50) 110.54%)'
          : 'linear-gradient(328deg, rgba(255, 236, 148, 0.30) 0%, rgba(255, 228, 106, 0.30) 110.54%)'};
      border: 2px solid #ffe09a;

      ${!$isActive &&
      css`
        animation: ${borderAnimation} 2s infinite ease-in-out;
      `}
    `}

  svg {
    height: 26px;
  }

  &:disabled {
    opacity: 0.75;
    cursor: default;
  }

  @media screen and (max-width: 360px) {
    gap: 4px;
    padding: 5px 2px;

    svg {
      width: auto;
      height: 18px;
    }
  }

  @media screen and (min-width: 640px) {
    flex-direction: row;
  }
`;

export const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8px;
`;

export const Text = styled.div`
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
  color: #fff;

  @media screen and (max-width: 360px) {
    font-size: 10px;
  }
`;
