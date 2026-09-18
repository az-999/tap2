import styled, { css } from 'styled-components/macro';

export const AirdropCardContainer = styled.li<{ $isAvailable: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid #b5ced44c;
  background: #141516;
  z-index: 4;
  position: relative;
  overflow: hidden;

  ${({ $isAvailable }) =>
    !$isAvailable &&
    css`
      &::before {
        position: absolute;
        z-index: 2;
        border-radius: 10px;
        background-color: #222325e6;
        width: 100%;
        height: 100%;
        content: '';
      }
    `}
`;

export const Footer = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  border-radius: 0 0 10px 10px;
  background: #0f1011;
  padding: 16px 22px 22px;
`;

export const FooterItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;

  & > span:first-child {
    opacity: 0.5;
  }

  & > div {
    display: flex;
    align-items: center;
    gap: 4px;

    svg {
      width: 22px;
      height: 22px;
    }
  }
`;

export const TopContent = styled.div<{ $isMinView: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  gap: ${({ $isMinView }) => ($isMinView ? 12 : 16)}px;
`;

export const TitleContainer = styled.div<{ $isMinView: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: ${({ $isMinView }) =>
    $isMinView ? '12px 0 12px 18px' : '16px 0 16px 22px'};

  svg {
    flex-shrink: 0;
    width: 21px;
    height: 21px;
  }

  div {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  & > span:first-of-type {
    opacity: 0.8;
  }
`;

export const ImageWrapper = styled.div<{
  $cardIndex: number;
  $isAvailable: boolean;
}>`
  width: ${({ $cardIndex }) => ($cardIndex !== 2 ? '120px' : '154px')};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: ${({ $cardIndex }) =>
    $cardIndex === 1 ? 'start' : 'center'};
  flex-shrink: 0;

  img {
    height: auto;
    object-fit: cover;

    ${({ $cardIndex, $isAvailable }) => {
      switch ($cardIndex) {
        case 0:
          return css`
            width: 120px;
          `;
        case 1:
          return css`
            width: 140px;
            margin: 0 0 18px 6px;
          `;
        case 2:
          return css`
            width: 154px;
            border-radius: ${$isAvailable ? '0' : '0 10px 10px 0'};
          `;
      }
    }}
  }
`;

export const SoonContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  gap: 2px;
  align-items: center;
  z-index: 4;

  span {
    color: #2eff73;
  }
`;
