import styled from 'styled-components/macro';

export const BuyOgPassContentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: fit-content;
  border-radius: 10px 10px 0 0;
  overflow-y: hidden;
`;

export const ImageContainer = styled.div`
  display: flex;
  position: relative;

  #og-pass-background {
    border-radius: 10px 10px 0 0;
    width: 100%;
    height: auto;
    object-fit: contain;
  }

  #og-pass-nft-image {
    position: absolute;
    bottom: 26px;
    left: 50%;
    transform: translateX(-50%);
    width: 41vw;
    height: 49vw;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
  align-items: center;
  padding: 18px 20px;
  overflow-y: auto;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const SubtitleContainer = styled.div`
  display: flex;
  flex-direction: column;

  span {
    opacity: 0.7;
    text-align: center;
  }
`;

export const PriceContainer = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;

  span:first-child {
    opacity: 0.5;
  }
`;
