import styled from 'styled-components/macro';

export const LootboxMonthlyFieldContainer = styled.div`
  width: 100vw;
  margin: -33vw 0 -20vw;
  position: relative;

  #box-container-icon {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`;

export const ContentContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 48%;
  transform: translate(-50%, -50%);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: calc(100% - 60px);

  svg {
    flex-shrink: 0;
  }

  span:first-child {
    flex-shrink: 5;
  }

  span:not(:first-child) {
    flex-shrink: 0;
  }

  span {
    text-align: center;
  }

  div {
    display: flex;
    align-items: center;
    gap: 3px;
  }

  #apy-container {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    margin: 0 3px;

    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      object-fit: contain;
    }

    span {
      z-index: 1;
    }
  }
`;
