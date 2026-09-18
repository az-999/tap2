import styled from 'styled-components/macro';

export const ActivationModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  align-items: center;
  padding-bottom: 20px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
  padding: 0 40px;
  align-items: center;

  span {
    text-align: center;
  }

  span:first-child {
    line-height: 32px;
  }

  span:last-child {
    line-height: 18px;
  }
`;

export const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 15vw 0 10.27vw;
  margin-top: 10px;

  #firstImg,
  #secImg {
    height: auto;
    object-fit: contain;
    object-position: center;
  }

  #phoneImg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
  }
`;
