import styled from 'styled-components/macro';

export const Slide = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  flex-direction: column;
  border-radius: 24px;
  position: relative;
  font-family: 'SF Pro Display', sans-serif;
  background: #15151591;

  img {
    width: 100%;
    object-fit: contain;
  }

  h5 {
    position: absolute;
    top: 18px;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    font-weight: 700;
    font-size: 19px;
    line-height: 32px;
    text-align: center;
  }
`;

export const Content = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 20px 20px 18px 24px;
  font-family: 'SF Pro Display', sans-serif;
  color: #fff;
  justify-content: center;
  text-align: start;
  gap: 12px;
  backdrop-filter: blur(22.5px);
  -webkit-backdrop-filter: blur(22.5px);

  p {
    font-weight: 700;
    font-size: 12px;
    line-height: 17px;

    span {
      margin-left: 4px;
    }
  }

  span {
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
  }

  span:first-child {
    font-weight: 700;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 16px;
    list-style: none;

    & > li {
      display: flex;
      flex-direction: column;
      gap: 6px;

      svg {
        flex-shrink: 0;
        margin-top: 5px;
      }

      div {
        display: flex;
        gap: 6px;
        padding-bottom: 4px;

        span {
          font-weight: 700;
          font-size: 12px;
          line-height: 17px;
        }
      }

      img {
        padding-bottom: 6px;
      }

      p {
        font-weight: 400;
        font-size: 12px;
        line-height: 17px;
      }
    }
  }
`;
