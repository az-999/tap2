import styled from 'styled-components/macro';

export const Slide = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  flex-direction: column;
  border-radius: 24px;
  font-family: 'SF Pro Display', sans-serif;

  img {
    width: 100%;
    object-fit: contain;
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
  background: #15151591;

  h5 {
    padding-bottom: 8px;
    font-weight: 700;
    font-size: 28px;
    line-height: 32px;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 8px;
    list-style: none;

    & > li {
      display: flex;
      gap: 6px;

      svg {
        flex-shrink: 0;
        margin-top: 5px;
      }

      span {
        color: #fff;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 17px; /* 141.667% */
      }
    }
  }
`;
