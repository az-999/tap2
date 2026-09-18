import styled from 'styled-components/macro';

export const UserBlockPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  color: #fff;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  padding: 1.5rem;
  box-sizing: border-box;

  img {
    border-radius: 10px;
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`;

export const IllustrationTop = styled.img`
  position: fixed;
  top: 0;
  width: 100%;
  height: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  object-fit: cover;
  object-position: bottom;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
      opacity: 0.8;
    }
  }
`;

export const LogoContainer = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);

  div {
    display: flex;
    position: absolute;
    top: -12px;
    right: -16px;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    background: #3c6;
    padding: 3px;
    max-height: 8px;
  }
`;
