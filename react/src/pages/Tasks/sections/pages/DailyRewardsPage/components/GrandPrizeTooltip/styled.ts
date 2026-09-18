import styled, { css } from 'styled-components/macro';

export const GrandPrizeBackground = styled.div<{
  $isActive: boolean;
}>`
  position: fixed;
  width: 100%;
  height: 100%;
  opacity: 0;
  visibility: hidden;
  background: rgba(26, 28, 30, 0.4);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  transition: all 0.2s ease-in-out;
  top: 0;
  left: 0;

  ${({ $isActive }) =>
    $isActive &&
    css`
      visibility: visible;
      opacity: 1;
    `}
`;

export const GrandPrizeTooltipContainer = styled.div<{
  $isActive: boolean;
}>`
  position: fixed;
  opacity: 0;
  transform: translate(-50%, -120%);
  display: flex;
  top: 20px;
  left: 50%;
  width: calc(100% - 40px);
  max-width: 320px;
  border-radius: 20px;
  background: #151718;
  box-shadow: 0 0 24px 0 #000;
  color: white;
  gap: 6px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease-in-out;
  z-index: 1000;
  border: 4px solid #ffdf4f;
  height: 530px;
  box-sizing: border-box;

  ${({ $isActive }) =>
    $isActive &&
    css`
      top: 50%;
      transform: translate(-50%, -50%);
      opacity: 1;
    `}
`;

export const ImageContainer = styled.div`
  position: relative;

  img {
    border-radius: 16px 16px 0 0;
    width: 100%;
    height: 320px;
    object-fit: cover;
    object-position: center;
  }
`;

export const Logo = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 2;
  gap: 8px;
  width: 100%;
  padding: 20px 10px 10px;

  span:nth-of-type(2) {
    opacity: 0.9;
  }

  div {
    display: flex;
    align-items: center;
    margin: -12px 0 -12px -16px;

    span {
      margin-left: -10px;
    }
  }

  button {
    box-shadow: 0 4px 19px 0 rgba(254, 205, 62, 0.4);
    border: none;
    border-radius: 10px;
    background: linear-gradient(275deg, #ffdf50 1.01%, #e3af30 59.21%);
    width: 100%;
    height: 50px;
    color: #fff;
    font-weight: 600;
    font-size: 14px;
    font-family: 'SF Pro Display', sans-serif;
  }
`;
