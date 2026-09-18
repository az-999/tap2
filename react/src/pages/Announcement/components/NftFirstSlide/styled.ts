import styled from 'styled-components/macro';

export const Slide = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  flex-direction: column;
  border-radius: 24px;
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
  margin-top: -54px;

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

  ul:is(#main-list) {
    display: flex;
    flex-direction: column;
    gap: 16px;
    overflow-y: auto;

    & > li {
      display: flex;
      gap: 6px;

      svg {
        flex-shrink: 0;
        margin-top: 5px;
      }
    }
  }

  ul:is(#sec-list) {
    display: flex;
    flex-direction: column;
    gap: 2px;

    span {
      padding-bottom: 2px;
    }

    li {
      margin-left: 10px;
      font-weight: 400;
      font-size: 11px;
      line-height: 18px;
      list-style-type: disc;
    }
  }
`;
