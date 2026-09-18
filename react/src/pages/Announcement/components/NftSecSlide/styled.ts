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
`;

export const Content = styled.div`
  display: flex;
  flex-grow: 1;
  overflow: hidden;
  flex-direction: column;
  padding: 20px 16px 18px 16px;
  font-family: 'SF Pro Display', sans-serif;
  color: #fff;
  justify-content: center;
  text-align: start;
  gap: 12px;
  backdrop-filter: blur(22.5px);
  -webkit-backdrop-filter: blur(22.5px);

  h5 {
    padding-bottom: 8px;
    font-weight: 700;
    font-size: 28px;
    line-height: 32px;
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
    gap: 24px;
    overflow-y: auto;
    list-style: none;

    & > li {
      display: flex;
      flex-direction: column;
      gap: 6px;

      & div:nth-child(1) {
        display: flex;
        gap: 10px;

        #nav-bar-button {
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 10px;
          background: #3c6;
          padding: 12px 8px;
          min-height: 32px;
          font-weight: 600;
          font-size: 12px;
          line-height: 121%;
        }

        #nav-bar-button-disabled {
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 10px;
          background: #18181a;
          padding: 12px 8px;
          min-height: 32px;
          color: #ffffff80;
          font-weight: 600;
          font-size: 12px;
          line-height: 121%;
        }
      }

      & div:nth-child(2) {
        display: flex;
        gap: 6px;

        span {
          font-weight: 500;
          font-size: 12px;
          line-height: 17px;
        }

        svg {
          flex-shrink: 0;
          margin-top: 5px;
        }
      }
    }
  }
`;
