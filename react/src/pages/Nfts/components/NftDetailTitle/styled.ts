import styled from 'styled-components/macro';

export const NftDetailTitleContainer = styled.div<{ $isSaleActive: boolean }>`
  width: 100%;
  display: flex;
  gap: 20px;

  #nft-image-container {
    position: relative;
    flex-shrink: 0;
    width: 150px;
    height: 150px;

    img {
      border-radius: 10px;
      background: #222325;
      width: 100%;
      height: 100%;
      pointer-events: auto;
    }
  }

  & > div:not(#nft-image-container) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${({ $isSaleActive }) => ($isSaleActive ? '6px' : '10px')};
    width: 100%;
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

export const InfoItemContainer = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
  justify-content: space-between;

  span {
    opacity: 0.5;
  }

  & > div {
    display: flex;
    align-items: center;
    gap: 5px;
    height: 24px;

    span {
      opacity: 1;
    }
  }
`;

export const InfoFeeItemContainer = styled(InfoItemContainer)`
  & > div {
    display: flex;
    position: relative;
    width: fit-content;
    height: fit-content;
  }

  #service-fee-button {
    display: flex;
    position: absolute;
    top: -8px;
    right: -14px;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: transparent;
    width: fit-content;
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

export const TooltipRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 6px 10px;
`;
