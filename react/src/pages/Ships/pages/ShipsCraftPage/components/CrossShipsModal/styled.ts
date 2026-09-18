import styled, { css } from 'styled-components/macro';

export const CrossShipsModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const TitlePart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  span:not(:first-of-type) {
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0.8;
  }
`;

export const SelectShipsContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 0 12px 16px;
`;

export const PlusContainer = styled.div`
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #3b4046;
  border-radius: 5px;
  line-height: 100%;
  flex-shrink: 0;
  margin-bottom: 70px;
`;

export const ContentPart = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 26px;
  background: #151718;

  ul {
    display: flex;
    flex-wrap: nowrap;
    gap: 5px;
    width: 100%;
  }
`;

export const PartImage = styled.div`
  width: calc((100% / 5) - (5px * 4 / 5)) !important;
  height: auto;
  position: relative;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
    pointer-events: auto;
  }

  button {
    display: flex;
    position: absolute;
    top: 5px;
    right: 5px;
    justify-content: center;
    align-items: center;
    outline: none;
    border: none;
    border-radius: 5px;
    background: rgba(34, 35, 37, 0.4);
    width: 18px;
    height: 18px;

    svg {
      width: 55%;
      height: 55%;
    }
  }
`;

export const RequiredPart = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px 10px 0;
  gap: 14px;

  div {
    position: relative;
    width: fit-content;

    button:is(#required-ship-parts-modal-tooltip-button) {
      position: absolute;
      top: -6px;
      right: -16px;
      outline: none;
      border: none;
      background: none;
      width: 15px;
      height: 15px;
      -webkit-tap-highlight-color: transparent;

      #lootbox-craft-info {
        width: 100%;
        height: 100%;
      }
    }
  }
`;

export const ResultPart = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 10px 10px;
  border-radius: 10px 10px 0 0;
  background-color: #2a2e30;
  align-items: center;
  gap: 8px;
`;

export const Level = styled.div<{ $isShipSelected: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;

  ${({ $isShipSelected }) =>
    !$isShipSelected &&
    css`
      & > span {
        opacity: 0.5;
      }
    `}
`;

export const ButtonInfo = styled.button`
  position: absolute;
  top: -2px;
  right: -16px;
  left: auto;
  width: 15px;
  height: 15px;
  border: none;
  background: none;
  -webkit-tap-highlight-color: transparent;

  #lootbox-craft-info {
    width: 100%;
    height: 100%;
  }
`;

export const SubmitButton = styled.button<{ $isDisabled: boolean }>`
  width: 100%;
  height: 60px;
  border-radius: 10px;
  border: none;
  outline: none;
  background: linear-gradient(
    87deg,
    #3c6 -0.52%,
    #35d86b 22.93%,
    #1ebc8d 48.96%,
    #9b33cc 100.56%
  );
  color: #fff;
  font-family: 'SF Pro Display', sans-serif;
  font-size: 14px;
  font-weight: 600;
  -webkit-tap-highlight-color: transparent;

  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      opacity: 0.5;
    `};
`;
