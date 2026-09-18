import styled from 'styled-components/macro';

export const ServerErrorPage = styled.div`
  background-color: #0d0e0f;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
  width: 100vw;
  height: 100vh;
  font-family: 'SF Pro Display', sans-serif;
  background-image: url('/img/server-error-bg.png');
  background-position: center;
  background-size: cover;
  color: #fff;
  font-style: normal;
  padding: 8px;
  box-sizing: border-box;

  p,
  h5 {
    margin: 0;
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .title {
    padding-bottom: 20px;
    font-weight: 600;
    font-size: 22px;
    text-align: center;
  }

  .paragraph {
    font-weight: 400;
    font-size: 20px;
    text-align: center;

    &:last-of-type {
      padding-top: 18px;
    }

    span {
      color: #3c6;
      font-weight: 700;
    }
  }
`;
