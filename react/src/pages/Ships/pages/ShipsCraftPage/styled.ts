import styled from 'styled-components/macro';

export const ShipsPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 60px 10px 30px;
  gap: 17px;
  flex-grow: 1;

  #ship-group {
    display: flex;
    justify-items: end;
    padding-top: 24px;
    max-width: 100% !important;

    img {
      transform: scale(1.1) translateX(-6vw);

      width: 100%;
      object-fit: contain;
    }
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 8px;

  div {
    display: flex;
    flex-direction: column;
  }

  span:first-child {
    position: relative;
  }

  #soon-message {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(100%, -50%);
    border: 1px solid #3c6;
    border-radius: 5px;
    padding: 2px 4px;
    color: #fff;
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: normal;
    font-family: 'SF Pro Display', sans-serif;
    text-align: center;
  }
`;
