import styled, { keyframes } from 'styled-components/macro';

const rotate = keyframes`
    0% {
        transform: translate(-50%, -48%) rotate(0deg) 
    }
    100% {
        transform: translate(-50%, -48%) rotate(360deg) 
    }
`;

export const LootboxSliderItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  height: 120vw;
  justify-content: center;
  overflow: hidden;
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;

  #lootbox-background {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    animation: ${rotate} 10s linear infinite;
    -webkit-animation: ${rotate} 10s linear infinite;
    width: 120%;
    height: auto;
    object-fit: contain;
  }

  img:not(#lootbox-background) {
    z-index: 2;
    aspect-ratio: 1;
    width: 70vw;
    height: auto;
    object-fit: contain;
  }
`;

export const TitleWrapper = styled.div`
  margin-top: -40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 5px;
  position: absolute;
  bottom: 56px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;

  div {
    display: flex;
    flex-direction: column;
  }
`;
