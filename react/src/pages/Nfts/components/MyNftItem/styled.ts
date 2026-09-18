import styled, { css } from 'styled-components/macro';

export const MyNftItemContainer = styled.div`
  width: calc((100% / 2) - 10px);
  height: fit-content;
  border-radius: 8px;
  background: #141516;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  img {
    border-radius: 10px 10px 0 0;
    background: radial-gradient(50% 50% at 50% 50%, #1a3322 0%, #1b1d1f 100%);
    width: 100%;
    height: auto;
    object-fit: contain;
  }

  @media screen and (max-width: 340px) {
    width: 180px;
  }

  @media screen and (min-width: 341px) and (max-width: 380px) {
    width: calc((100% / 2) - 6px);
  }

  #ship-level-container {
    display: flex;
    position: absolute;
    top: 6px;
    right: 6px;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 25px;

    span {
      z-index: 2;
      padding-top: 1px;
      color: #fff;
      font-style: normal;
      font-weight: 700;
      font-size: 12px;
      line-height: 150.5%;
      font-family: 'SF Pro Display', sans-serif;
      text-align: center;
    }

    svg {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-height: 85px;
  height: 100%;
  padding: 13px 10px 18px;
  gap: 5px;

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    text-wrap: nowrap;
  }
`;

export const Moderation = styled.div`
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: 1px solid #ffdf4f;
  width: fit-content;
`;

export const Sale = styled.div`
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: 1px solid #3c6;
  width: fit-content;
`;

export const DefaultTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;

  span:first-child {
    opacity: 0.4;
  }
`;
