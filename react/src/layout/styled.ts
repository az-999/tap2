import styled from 'styled-components/macro';

export const MainContainer = styled.div<{
  isMainPage: boolean;
  isWithoutBottomPadding: boolean;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  width: 100vw;
  padding: ${({ isMainPage, isWithoutBottomPadding }) =>
    isMainPage ? '0' : isWithoutBottomPadding ? '0 10px' : '0 10px 80px'};
`;
export const IllustrationTop = styled.img`
  position: fixed;
  top: 0;
  width: 100%;
  height: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  object-fit: cover;
  object-position: bottom;
`;
export const IllustrationBottom = styled.img`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 78px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  object-fit: cover;
  object-position: center;
`;

export const IllustrationRoundedBottom = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 60px;
`;

export const CornerLeft = styled.img<{ $isTutorialPage?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: ${({ $isTutorialPage }) => ($isTutorialPage ? '60px' : '70px')};
  /* width: 100%; */
  z-index: 1;
`;

export const CornerRight = styled.img<{ $isWide: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: ${({ $isWide }) => ($isWide ? '113px' : '70px')};
  /* width: 100%; */
  z-index: 1;
`;
