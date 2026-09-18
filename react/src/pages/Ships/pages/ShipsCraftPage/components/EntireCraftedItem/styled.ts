import styled from 'styled-components/macro';

export const EntireCraftedItemContainer = styled.div<{ $disabled: boolean }>`
  position: relative;
  width: 100%;
  height: fit-content;
  color: #fff;
  font-family: 'SF Pro Display', sans-serif;
  opacity: ${({ $disabled }) => ($disabled ? 0.4 : 1)};

  #lootbox-craft-count-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  svg {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`;

export const ButtonInfo = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 2;
  width: 28px;
  height: 28px;
  border: none;
  background: none;
  -webkit-tap-highlight-color: transparent;

  #lootbox-craft-info {
    width: 100%;
    height: 100%;
  }
`;

export const CountContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -15%);
  width: 54px;
  height: 48px;
  font-size: 22px;
  font-weight: 700;

  span {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    z-index: 1;
    padding-top: 4px;
    width: 100%;
    height: 100%;
  }
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

  div {
    position: relative;
    width: 100%;

    svg {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -60%);
      width: 42px;
      height: 42px;
    }
  }
`;

export const TextContainer = styled.div`
  position: absolute;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 22px;
  font-weight: 700;
  width: max-content;
  padding: 10px;
`;

export const TooltipRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 6px 10px;
  font-size: 14px;
  font-weight: 400;
`;
