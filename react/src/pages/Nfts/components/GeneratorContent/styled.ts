import styled from 'styled-components/macro';

export const GeneratorContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

export const EnergiesContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
`;

export const EnergiesItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 6px;

  img {
    width: 100%;
    object-fit: contain;
  }
`;

export const EnergyContainer = styled.div<{
  $color: string;
  $opacityColor: string;
  $energyValue: number;
}>`
  position: relative;
  display: flex;
  gap: 2px;
  align-items: center;
  justify-content: center;
  height: 22px;
  border-radius: 7px;
  background-color: ${({ $opacityColor }) => $opacityColor};
  width: 100%;
  overflow: hidden;

  &::before {
    position: absolute;
    left: 0;
    background-color: ${({ $color }) => $color};
    width: ${({ $energyValue }) => `${$energyValue}%`};
    height: 100%;
    content: '';
  }

  svg {
    z-index: 1;
  }

  div {
    display: flex;
    z-index: 1;
    height: fit-content;
  }

  span:nth-child(2) {
    opacity: 0.5;
  }
`;

export const UpgradeButtonContainer = styled.button<{ $isMaxLevel: boolean }>`
  height: 44px;
  border-radius: 6px;
  border: none;
  background-color: ${({ $isMaxLevel }) => ($isMaxLevel ? '#222325' : '#3C6')};
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;

  span {
    color: ${({ $isMaxLevel }) => ($isMaxLevel ? '#3C6' : '#fff')};
  }
`;

export const UpgradeStyled = styled.span`
  display: flex;
  flex-direction: column;
  gap: 4px;

  span {
    display: flex;
    justify-content: center;
    gap: 2px;
  }
`;
