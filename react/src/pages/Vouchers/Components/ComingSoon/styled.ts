import styled from 'styled-components/macro';

export const ComingSoonContainer = styled.div`
  width: 100%;
  height: calc(100% - 50px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  z-index: 11;
  background: rgba(0, 0, 0, 0.6);
  padding: 40px 20px 0;
  flex-direction: column;
  overflow-y: auto;

  span {
    text-align: center;
  }
`;

export const UpperContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  height: 100%;

  span:first-of-type {
    padding: 0 20px;
  }
`;

export const MiddleContainer = styled.div`
  flex-grow: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 0 0 40px;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ImagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledBg = styled.img`
  width: 64vw;
  object-fit: cover;
`;

export const MainImage = styled.img`
  width: 100%;
  object-fit: contain;
  margin-top: -100px;
`;

export const BottomBlock = styled.div`
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 16px 0 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  h5 {
    color: #fff;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 150.5%; /* 18.06px */
  }

  li {
    opacity: 0.8;
    margin-left: 12px;
    color: #fff;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
  }
`;
