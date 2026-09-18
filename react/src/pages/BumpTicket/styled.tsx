import styled, { css } from 'styled-components/macro';

import { PageType } from '@/pages/BumpTicket/index';

export const BumpTicketPageContainer = styled.div`
  padding: 60px 10px 30px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 360px) {
    padding-bottom: 0;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 12px;

  div {
    display: flex;
    flex-direction: column;
  }
`;

export const DetailsContainer = styled.div<{
  $type: PageType;
  $count?: number;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% + 20px);
  position: relative;

  & > div:has(#first-bump-ticket-img) {
    width: 80%;
  }

  & > div:has(#sec-bump-ticket-img) {
    position: relative;
    width: 60%;
    height: 70vw;

    svg {
      position: absolute;
      bottom: 20%;
      left: 46%;

      ${({ $count }) => {
        if (!$count) return;

        const totalHeight = 80.5; // Общая высота пути (85.75 - 5.25)
        const newHeight = ($count / 100) * totalHeight;
        const newY = 85.75 - newHeight;

        return css`
        #candle-dash {
          /*  d: path('M5 5.25C5 5.11193 5.11193 5 5.25 5H7.75C7.88807 5 8 5.11193 8 5.25V${newY}C8 ${newY - 0.13807} 7.88807 ${newY - 0.25} 7.75 ${newY - 0.25}H5.25C5.11193 ${newY - 0.25} 5 ${newY - 0.13807} 5 ${newY}V5.25Z') */
        }
        }`;
      }}
    }
  }

  & > div:has(#third-bump-ticket-img) {
  }

  img {
    width: 100%;
    height: fit-content;
  }

  img:is(#sec-bump-ticket-img) {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: left;
  }

  ${({ $type }) => {
    switch ($type) {
      case 'soldOut':
      case 'available':
        return css`
          margin: -60px 0 -20px -20px;
        `;
      case 'taps':
        return css`
          margin: -10px 0 24px -20px;
        `;
      case 'bump':
        return css`
          width: calc(100% + 40px);
          margin-left: -20px;
          margin-top: 0;
        `;
    }
  }}
`;

export const TicketContainer = styled.div<{ $type?: PageType }>`
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 40%;

  div:first-child {
    display: flex;
    align-items: center;
    gap: 2px;
    width: 100%;
  }

  ${({ $type }) =>
    $type &&
    $type === 'bump' &&
    css`
      right: 26px;
      bottom: 60%;
      transform: translateY(50%);
    `}
`;

export const Count = styled.div`
  @media screen and (max-width: 370px) {
    span {
      font-size: 26px;
    }
      
      @media screen and (max-width: 350px) {
    span {
      font-size: 24px;
    }
  }
`;

export const PriceContainer = styled.div`
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;

  & > span:first-child {
    opacity: 0.5;
  }

  div {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

export const TicketsAvailable = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 0;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    min-width: 58px;
    height: 44px;
  }

  div:first-child {
    border-radius: 8px 2px 2px 8px;
    background: #3c6;
    width: 50%;
  }

  div:last-child {
    border-radius: 2px 8px 8px 2px;
    background: #ffffff33;
    width: 50%;
  }
`;

export const Description = styled.div`
  display: flex;
  gap: 6px;
  width: 100%;
  padding-top: 5px;

  div:first-child {
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #33cc66;
    width: 20px;
    height: 20px;
  }
`;
