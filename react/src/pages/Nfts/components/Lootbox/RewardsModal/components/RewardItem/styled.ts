import styled from 'styled-components/macro';

export const MainCraftItemWrapper = styled.div`
  width: calc(50% - 4px);
  position: relative;
`;

export const CraftItemContainer = styled.div<{ $noCount: boolean }>`
  position: relative;
  width: 100%;
  height: fit-content;
  color: #fff;
  font-family: 'SF Pro Display', sans-serif;
  opacity: ${({ $noCount }) => ($noCount ? 0.4 : 1)};

  svg {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`;

export const CountContainer = styled.div<{ $noCount: boolean }>`
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 2;
  min-width: 26px;
  height: 26px;
  border-radius: 7px;
  background: ${({ $noCount }) => ($noCount ? '#2A2D2F' : '#3c6')};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 12px;
  padding: 4px;
`;

export const ImageContainer = styled.div`
  position: absolute;
  width: calc(100% - 4px);
  left: 2px;
  top: 2px;
  height: fit-content;
  border-radius: 7px;

  img {
    border-radius: 7px;
    width: 100%;
  }

  div:not(#bump-logo-container) {
    position: relative;
    width: 100%;

    #bump-logo-container {
      display: flex;
      position: absolute;
      top: 0;
      left: 50%;
      justify-content: center;
      align-items: center;
      transform: translate(-50%, -70%);
      border: 1px solid #6d7584;
      border-radius: 50%;
      background: #1b1d1f;
      padding-left: 1px;
      width: 22px;
      height: 22px;
    }

    svg {
      width: 70%;
      height: 70%;
    }
  }
`;

export const TextContainer = styled.div`
  position: absolute;
  bottom: 9%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  font-weight: 700;
  width: max-content;
  padding: 10px;
`;
