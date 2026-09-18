import styled from 'styled-components/macro';

export const SelectShipContainer = styled.div`
  width: 100%;
  display: flex;
`;

export const SelectedContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;

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

export const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 7px;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  & > span:first-of-type {
    opacity: 0.4;
  }
`;

export const ShipLevel = styled.div<{ $isShipSelected: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 32px;
  opacity: ${({ $isShipSelected }) => ($isShipSelected ? 1 : 0.5)};

  svg {
    position: absolute;
    top: 0;
    left: 0;
  }

  span {
    z-index: 2;
    padding-top: 2px;
  }
`;
