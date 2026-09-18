import styled, { css } from 'styled-components/macro';

export const LootboxStakingsContainer = styled.div<{
  $isOpen: boolean;
  $isStakedListExist: boolean;
}>`
  display: flex;
  flex-direction: column;
  width: 100vw;
  margin: 0 -20px;
  position: relative;

  #explanation-list-container {
    padding: 0 20px;
  }

  ${({ $isStakedListExist, $isOpen }) =>
    $isStakedListExist &&
    css`
      #explanation-list-container {
        margin-top: ${() => ($isOpen ? '-20px' : '42px')};
        padding: 0 20px;
      }
    `}
`;

export const TitleContainer = styled.div<{ $isOpen: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: none;
    border-radius: 8px;
    background: #222325;
    width: 28px;
    height: 28px;
    -webkit-tap-highlight-color: transparent;

    svg {
      transform: ${({ $isOpen }) => ($isOpen ? 'rotate(0)' : 'rotate(180deg)')};
      transition: all 0.1s ease-in;
    }
  }
`;

export const ContentContainer = styled.div`
  margin-top: 6px;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  z-index: 1;
  position: relative;
  padding-top: 24px;
  padding-bottom: 32px;
`;
