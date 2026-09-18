import styled, { css } from 'styled-components/macro';

export const BackgroundContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: #000000e6;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InnerContainer = styled.div<{
  $isMarkExist: boolean;
  $isShipExist: boolean;
}>`
  position: relative;
  width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;

  #left-border-large,
  #right-border-large {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: auto;
    max-width: 22vw;
    object-fit: contain;
  }

  #left-border-large {
    left: 0;
  }

  #right-border-large {
    right: 0;
  }

  #inner-top-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;

    & > div:first-of-type {
      display: flex;
      gap: 4px;
    }

    div > span {
      text-transform: uppercase;
    }

    div > span:nth-of-type(2) {
      color: #f95317;
    }
  }

  #inner-images-container {
    display: flex;
    justify-content: center;
    gap: 4px;
    width: 100%;

    #inner-mark-image,
    #inner-ship-image {
      width: auto;
      height: 39vw;
      object-fit: contain;
    }

    #inner-mark-image {
      margin-right: -6vw;
      margin-left: -6vw;

      ${({ $isMarkExist }) =>
        !$isMarkExist &&
        css`
          filter: grayscale(1);
        `}
    }

    #inner-ship-image {
      ${({ $isShipExist }) =>
        !$isShipExist &&
        css`
          filter: grayscale(1);
        `}
    }
  }

  #inner-text-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2px;
    padding-top: 2px;

    span {
      text-transform: uppercase;
    }

    #red-highlight {
      color: #f95317;
    }
  }

  #inner-buttons-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 130px;
  }
`;
