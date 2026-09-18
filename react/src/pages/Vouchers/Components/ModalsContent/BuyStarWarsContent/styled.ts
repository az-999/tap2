import styled from 'styled-components/macro';

export const BuyStarWarsContentContainer = styled.div<{
  $isFullHeight: boolean;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  height: fit-content;
  border-radius: 10px 10px 0 0;
  overflow-y: auto;

  & > button:first-child {
    position: ${({ $isFullHeight }) => ($isFullHeight ? 'fixed' : 'absolute')};
    top: ${({ $isFullHeight }) => ($isFullHeight ? '44px' : '10px')};
  }
`;

export const StarWarsBlockContainer = styled.div``;

export const TitleImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 230px;
  position: relative;

  img:first-child {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  img:nth-child(2) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 170px;
    height: 170px;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 18px 20px 24px;
  gap: 18px;
  position: relative;

  #pirate-left-image,
  #pirate-right-image {
    position: absolute;
    top: 0;
    width: auto;
    height: 100%;
    object-fit: contain;
  }

  #pirate-left-image {
    left: 0;
  }

  #pirate-right-image {
    right: 0;
  }

  #defense-left-image,
  #defense-right-image {
    position: absolute;
    top: 0;
    width: 90px;
    height: auto;
    object-fit: contain;
  }

  #defense-left-image {
    left: 0;
  }

  #defense-right-image {
    right: 0;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;
`;

export const PriceContainer = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  position: relative;

  span:first-child {
    opacity: 0.5;
  }

  & > button {
    position: absolute;
    top: 0;
    right: -15px;
    border: none;
    background: none;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid #222325;
  background: #131314;
  padding: 16px;

  span {
    text-align: center;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 14px;
  width: 100%;

  & > div:first-child {
    flex-direction: column;

    div {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }

  button {
    flex-grow: 1;
    width: auto;
  }
`;

export const TooltipRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 8px;
`;
