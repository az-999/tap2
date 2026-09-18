import styled, { css } from 'styled-components/macro';

export const ShipPartContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  height: 50px;

  img {
    border-radius: 4px;
    width: auto;
    height: 100%;
    object-fit: contain;
  }

  & > div {
    display: flex;
    flex-direction: column;
    gap: 4px;

    span {
      overflow: hidden;
      text-overflow: ellipsis;
      text-wrap: nowrap;
    }
  }
`;

export const Link = styled.div<{ $isCopied: boolean }>`
  padding: 5px;
  border-radius: 6px;
  background: #fff;
  display: flex;
  gap: 6px;
  align-items: center;

  a {
    color: #0075ff;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    font-family: 'SF Pro Display', sans-serif;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background: transparent;

    svg {
      width: 20px;
      height: 20px;

      path {
        ${({ $isCopied }) =>
          $isCopied
            ? css`
                stroke: #0075ff;
              `
            : css`
                fill: #0075ff;
              `}
      }
    }
  }
`;
