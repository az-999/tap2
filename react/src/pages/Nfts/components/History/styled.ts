import styled, { css } from 'styled-components/macro';

export const HistoryContainer = styled.div`
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
      transition: all 0.2s ease-in;
    }
  }
`;

export const ContentContainer = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
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

export const HistoryItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: #141516;
  border-radius: 10px;
  overflow-y: auto;
  gap: 16px;
`;

export const Row = styled.div`
  display: flex;
  gap: 20px;
  width: fit-content;
  flex-shrink: 0;
  padding-bottom: 8px;

  div {
    position: relative;

    &:first-child {
      min-width: 170px;
    }

    &:nth-child(2) {
      min-width: 130px;
    }

    &:nth-child(3),
    &:nth-child(4),
    &:last-child {
      min-width: 140px;
    }

    &:last-child {
      &::before {
        width: calc(100%);
      }
    }

    &::before {
      position: absolute;
      bottom: -12px;
      border-bottom: solid 1px #ffffff1a;
      width: calc(100% + 20px);
      content: '';
    }

    span {
      opacity: 0.5;
    }
  }
`;

export const ContentRow = styled(Row)`
  padding-bottom: 0;

  div {
    display: flex;
    align-items: center;
    gap: 4px;

    &::before {
      border: none;
    }

    span {
      opacity: 1;
    }

    &:nth-child(1) {
      svg {
        width: 20px;
        height: 20px;
      }
    }

    &:nth-child(2) {
      svg {
        width: 26px;
        height: 26px;
      }
    }
  }
`;

export const NoHistoryContainer = styled.p`
  color: #fff;
  text-align: center;
  font-family: 'SF Pro Display', sans-serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
`;
