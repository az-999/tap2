import styled from 'styled-components/macro';

export const Slide = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 28px;
  border-radius: 24px;
  position: relative;
  font-family: 'SF Pro Display', sans-serif;

  #earn-points-dec1,
  #earn-points-dec2 {
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    width: auto;
    height: 64vw;
    object-fit: contain;
  }

  #earn-points-dec1 {
    left: 0;
  }

  #earn-points-dec2 {
    right: 0;
  }
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 22px;
  z-index: 1;
  padding: 0 24px;
  align-items: center;

  & > div {
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    width: 100%;

    #left-top-angle,
    #right-top-angle,
    #right-bottom-angle,
    #left-bottom-angle {
      position: absolute;
      width: 20vw;
      height: auto;
      object-fit: contain;
    }

    #left-top-angle {
      top: 38px;
      left: -24px;
    }

    #right-top-angle {
      top: 38px;
      right: -24px;
    }

    #left-bottom-angle {
      bottom: 14px;
      left: -24px;
    }

    #right-bottom-angle {
      right: -24px;
      bottom: 14px;
    }
  }

  #top-earn-image {
    width: 75vw;
    height: auto;
    object-fit: contain;
  }

  #bottom-earn-image {
    width: 50vw;
    height: auto;
    object-fit: contain;
  }
`;
