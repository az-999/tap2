import styled, { css } from 'styled-components/macro';

import bg from '@/pages/Airdrop/assets/modal-bg.png';

export const AirdropTooltipBackground = styled.div<{
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
  z-index: 1001;

  ${({ $isActive }) =>
    $isActive &&
    css`
      visibility: visible;
      opacity: 1;
    `}
`;

export const AirdropTooltipContainer = styled.div<{
  $isActive: boolean;
}>`
  position: fixed;
  opacity: 0;
  transform: translate(-50%, -120%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  top: 20px;
  left: 50%;
  width: calc(100% - 40px);
  max-width: 320px;
  border-radius: 16px;
  box-shadow: 0 0 24px 0 #000;
  color: white;
  transition: all 0.3s ease-in-out;
  z-index: 1000;
  box-sizing: border-box;
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
  max-height: 95vh;
  overflow-y: scroll;
  padding: 46px 10px 26px;

  ${({ $isActive }) =>
    $isActive &&
    css`
      top: 50%;
      transform: translate(-50%, -50%);
      opacity: 1;
    `}

  & > span:first-child {
    padding: 0 30px;
    text-align: center;

    @media screen and (max-width: 340px) {
      padding: 0 20px;
    }
  }

  button {
    flex: 1 0 auto;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  & > span:first-of-type {
    padding: 0 20px;
    text-align: center;

    @media screen and (max-width: 340px) {
      padding: 0 10px;
    }
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  padding: 0 20px;
  justify-content: center;

  img {
    width: 20vw;
    height: 20vw;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 2px;

    span:last-of-type {
      opacity: 0.8;
    }
  }

  @media screen and (max-width: 340px) {
    padding: 0 10px;
  }
`;

export const AirdropCardsList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  list-style: none;
  padding: 0 16px;

  @media screen and (max-width: 340px) {
    padding: 0 6px;
  }
`;
