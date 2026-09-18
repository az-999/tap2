import styled, { css } from 'styled-components/macro';

export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TitleContainer = styled.div<{ $isOpen: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

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

export const ContentContainer = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  max-height: 0;
  transition:
    max-height 0.2s ease,
    margin-top 0.3s ease;
  -webkit-transition:
    max-height 0.2s ease,
    margin-top 0.3s ease;
  overflow: hidden;
  margin-top: 0;

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      margin-top: 10px;
      max-height: 10000px;
    `}
`;

export const ContentItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  span:first-of-type {
    opacity: 0.4;
  }
`;

export const ContentItemWithClipboard = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: end;

  & div:first-of-type {
    display: flex;
    flex-direction: column;
    gap: 4px;

    span:first-of-type {
      opacity: 0.4;
    }
  }

  & div:last-of-type {
    display: flex;
    width: 60px;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      background: transparent;

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;
