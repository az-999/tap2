import styled from 'styled-components/macro';

export const SellModalContentWrapper = styled.div`
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
  align-items: center;
  margin-top: -60px;

  img {
    width: 100%;
  }
`;
