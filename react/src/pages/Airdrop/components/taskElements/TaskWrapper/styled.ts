import styled, { css } from 'styled-components/macro';

export const TaskWrapperContainer = styled.div<{ $isWithProgress: boolean }>`
  width: 100%;
  display: grid;
  grid-template-columns: ${({ $isWithProgress }) =>
    $isWithProgress ? '1fr 32px' : '1fr'};
  gap: 8px;
  position: relative;

  &:not(:first-child) {
    padding-top: ${({ $isWithProgress }) => $isWithProgress && '20px'};
  }

  #top-task-block {
    flex-shrink: 0;
    z-index: 1;
  }
`;

export const Cover = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
`;

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const ProgressContainer = styled.div`
  width: 100%;
  height: calc(100% + 20px);
  margin-top: -10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Bar = styled.div<{
  $isWithBg: boolean;
  $isWithOpacity: boolean;
  $isWithoutBg: boolean;
}>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ $isWithBg, $isWithOpacity, $isWithoutBg }) =>
    $isWithBg &&
    ($isWithOpacity
      ? 'rgba(46,255,115,0.2)'
      : $isWithoutBg
        ? 'rgba(53,53,53,0.2)'
        : 'rgba(46,255,115,0.6)')};
  justify-content: end;
  position: relative;

  ${({ $isWithBg, $isWithOpacity, $isWithoutBg }) =>
    $isWithBg &&
    css`
      &::before {
        position: absolute;
        right: 0;
        background-color: ${() =>
          $isWithOpacity
            ? 'rgba(46,255,115,0.75)'
            : $isWithoutBg
              ? '#3B4046'
              : '#2eff73'};
        width: 2px;
        height: 100%;
        content: '';
      }
    `}

  &:nth-of-type(2n) {
    justify-content: start;
  }

  #complete-bar-icon {
    margin-bottom: 4px;
  }
`;

export const Line = styled.div<{
  $isWithoutBg: boolean;
}>`
  width: 100%;
  height: 5px;
  background-color: ${({ $isWithoutBg }) =>
    $isWithoutBg ? '#3B4046' : '#2eff73'};
  border-radius: 1px;
  position: relative;

  &::before {
    position: absolute;
    right: 0;
    background-color: ${($isWithoutBg) =>
      $isWithoutBg ? 'transparent' : '#2eff73'};
    width: 2px;
    height: 100%;
    content: '';
  }
`;

export const TopLayerContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: end;
`;

export const TitleContainer = styled.div<{ $bg: string }>`
  position: absolute;
  left: 20px;
  top: -2px;
  transform: translateY(100%);
  display: flex;
  align-items: center;
  gap: 5px;
  z-index: 3;

  span:first-of-type {
    border-radius: 4px;
    background-color: ${({ $bg }) => $bg};
    width: 18px;
    height: 18px;
  }

  span:last-of-type {
    opacity: 0.6;
    color: #fff;
  }
`;

export const TopLayer = styled.div<{ $bg: string }>`
  width: 100%;
  height: 13px;
  margin-left: -12px;
  border-radius: 0 10px 0 0;
  z-index: 2;
  background-color: ${({ $bg }) => $bg};
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 12px 100%);
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #0e1010cc;
  border-radius: 0 0 10px 10px;
  padding: 16px 20px;

  & > span:first-of-type {
    padding-right: 16vw;

    @media screen and (max-width: 360px) {
      padding-right: 6vw;
    }
  }

  @media screen and (max-width: 360px) {
    padding: 12px 16px;
  }
`;

export const MainContentContainer = styled.div<{ $isOpen: boolean }>`
  height: fit-content;
  max-height: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  transition:
    max-height 0.4s ease,
    opacity 0.25s ease;
  -webkit-transition:
    max-height 0.4s ease,
    opacity 0.25s ease;
  opacity: 0;

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      max-height: 600px;
      opacity: 1;
    `}
`;

export const ExpandButtonContainer = styled.div<{ $isOpen: boolean }>`
  width: 100%;
  height: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 10px;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    border: none;
    background: none;
    -webkit-tap-highlight-color: transparent;

    svg {
      flex-shrink: 0;
      transform: ${({ $isOpen }) => `rotate(${$isOpen ? 180 : 0}deg)`};
      transition: transform 0.2s ease;
      -webkit-transition: transform 0.2s ease;
    }
  }

  div {
    position: relative;
    width: 100%;
    height: 100%;

    &:before {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      border-bottom: 1px solid #ffffff0d;
      width: 100%;
      height: 2px;
      content: '';
    }
  }
`;
