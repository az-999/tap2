import styled from 'styled-components/macro';

export const SignInPage = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 10px;
  box-sizing: border-box;

  color: #fff;
  text-align: center;
  font-family: 'SF Pro Display', sans-serif;
  font-size: 24px;
  font-weight: 600;

  svg {
    width: 26px;
    height: 50px;
  }

  div:not(:last-of-type) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 10px;
  }

  div:last-of-type {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 3;

    #sign-beta-icon {
      position: absolute;
      top: -8px;
      right: -16px;
      border-radius: 2px;
      background: #3c6;
      padding: 2px 3px;
      color: #fff;
      font-style: normal;
      font-weight: 500;
      font-size: 8px;
    }
  }
`;

export const IllustrationTop = styled.img`
  position: absolute;
  top: 0;
  width: 100%;
  height: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  object-fit: cover;
  object-position: bottom;
`;

export const IllustrationBottom = styled.img`
  width: 51px;
  height: 18px;
  object-fit: cover;
  object-position: bottom;
`;
