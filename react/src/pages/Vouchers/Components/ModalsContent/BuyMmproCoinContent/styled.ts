import styled from 'styled-components/macro';

export const BuyMmproCoinContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  border-radius: 10px 10px 0 0;
  background-color: #0d0e0f;
  width: 100%;
  gap: 14px;
  overflow-y: auto;
`;

export const ImageContainer = styled.div`
  display: flex;
  position: relative;

  #mmpro-coin-background {
    border-radius: 8px 0 0 8px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  #mmpro-coin-image {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 96vw;
    height: auto;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 20px;
  gap: 14px;

  & > span:first-child {
    margin-bottom: -6px;
    max-width: 320px;
    text-align: center;
  }

  #soon-text {
    color: #9c9c9c;
  }

  #subtitle-green-highlight {
    color: #3c6;
    font-weight: 600;
  }
`;

export const WithdrawContainer = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 10px;
  border: 1px solid #222325;
  background: #131314;
`;

export const WithdrawItem = styled.li`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 5px;
  position: relative;
  padding: 6px;

  &:first-child {
    padding: 22px 16px;

    span {
      max-width: 290px;
      text-align: center;

      #green-highlight {
        color: #3c6;
      }
    }
  }

  &:last-child {
    flex-direction: column;
    gap: 14px;
    padding: 18px 16px;

    & > div:first-child {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 4px;
      width: 100%;

      div {
        display: flex;
        align-items: center;
        gap: 4px;

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  &:not(:last-child)::before {
    position: absolute;
    bottom: 0;
    border-bottom: 1px solid #222325;
    width: 100%;
    height: 2px;
    content: '';
  }
`;

export const SaleItemsContainer = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 14px;

  & > div:first-child {
    display: flex;
    gap: 12px;
    width: 100%;
  }
`;
