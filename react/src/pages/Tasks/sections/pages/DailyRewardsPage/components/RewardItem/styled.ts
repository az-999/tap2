import styled, { css, keyframes } from 'styled-components/macro';

export const RewardItemContainer = styled.div<{ $isFullWidth: boolean }>`
  position: relative;
  height: ${({ $isFullWidth }) => ($isFullWidth ? '150px' : '140px')};
  width: ${({ $isFullWidth }) => ($isFullWidth ? '100%' : '100px')};
  border-radius: 16px;

  & > svg {
    position: absolute;
    top: 40px;
    right: ${({ $isFullWidth }) =>
      $isFullWidth ? 'calc(50% - 56px)' : '-4px'};
    transform: translateX(-50%);
    z-index: 10;
  }
`;

export const RewardItemWrapper = styled.div<{
  $isActive: boolean;
  $isCompleted: boolean;
  $isFullWidth: boolean;
}>`
  height: 100%;
  width: 100%;
  border-radius: 16px;
  background-color: #101314;
  position: relative;

  & > span {
    position: absolute;
    top: 7px;
    left: ${({ $isFullWidth }) => ($isFullWidth ? '30px' : '50%')};
    transform: translateX(-50%);
  }

  ${({ $isFullWidth }) =>
    $isFullWidth &&
    css`
      img {
        height: 105px;
        object-fit: cover;
      }
    `}

  ${({ $isActive }) =>
    $isActive &&
    css`
      box-shadow: 0 0 5px 0 #33cc66d9;
      border: 1px solid #33cc66;
    `}

  ${({ $isCompleted }) =>
    $isCompleted &&
    css`
      opacity: 0.5;
    `}
`;

export const StyledImg = styled.img`
  border-radius: 16px 16px 0 0;
  width: 100%;
`;

export const TitleContainer = styled.div<{ $isFullWidth: boolean }>`
  display: flex;
  gap: 2px;
  justify-content: center;
  height: ${({ $isFullWidth }) => ($isFullWidth ? '45px' : '35px')};
  transform: translateX(-18px);

  ${({ $isFullWidth }) =>
    $isFullWidth
      ? css`
          svg {
            transform: translate(21px, -18px);
            width: 72px;
            height: 72px;
          }
        `
      : css`
          svg {
            transform: translate(16px, -13px);
          }
        `}

  span {
    transform: translateY(7px);
  }
`;

export const Timer = styled.div<{ $time: number; $isFullWidth: boolean }>`
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: ${({ $isFullWidth }) =>
    $isFullWidth ? 'translate(-50%, -80%)' : 'translate(-50%, -65%)'};

  &::before {
    position: absolute;
    left: 0;
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border-radius: 50%;
    width: 100%;
    height: 100%;
    content: '';
  }

  svg {
    transform: rotateY(-180deg) rotateZ(-90deg);
  }

  svg #border-color {
    stroke-dasharray: 170px;
    // делаем линейную интерполяцию (при старте 0px, при окончании 170px)
    stroke-dashoffset: ${({ $time }) =>
      `${0 + ((60 * 60 * 24 - $time - 0) / (60 * 60 * 24 - 0)) * (170 - 0)}px`};
    stroke-linecap: round;
    stroke-width: 3px;
    stroke: #33cc66;
    fill: none;
  }

  & > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -70%);
    z-index: 2;
  }
`;

export const ExplodingContainer = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
