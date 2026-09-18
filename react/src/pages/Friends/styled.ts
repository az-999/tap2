import styled, { css, keyframes } from 'styled-components/macro';

const rotateIcon = keyframes`
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg)
  }
`;

export const IllustrationTop = styled.img`
  width: 100vw;
  height: 40px;
  object-fit: cover;
  object-position: bottom;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding-bottom: 30px;
  gap: 20px;
  flex-grow: 1;
`;
export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: inherit;
  gap: 20px;
  width: 100%;
  /* overflow: auto; */
  max-height: calc(100vh - 170px);
  position: relative;
  flex-grow: 1;
`;
export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 12px;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 5px;
`;

export const TooltipRow = styled.div<{ $withPadding?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: ${({ $withPadding }) => ($withPadding ? '14px 36px' : '12px 18px')};
`;

export const NewFriendsListTitle = styled.div`
  width: 100%;
  padding: 0 9px;
  text-align: left;
  display: flex;
  justify-content: space-between;
`;

export const FriendsCountContainer = styled.div<{ $isReloaded: boolean }>`
  display: flex;
  gap: 8px;
  align-items: center;

  #friends-reload-icon {
    border: none;
    background: none;
    width: 18px;
    height: 18px;

    svg {
      width: 100%;
      height: 100%;

      ${({ $isReloaded }) =>
        $isReloaded &&
        css`
          animation: ${rotateIcon} 0.6s linear infinite;
          -webkit-animation: ${rotateIcon} 0.6s linear infinite;
        `}
    }
  }
`;

export const RewardContainer = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: transparent;
  }
`;

export const NewFriendsList = styled.div`
  width: 100%;
  padding: 0 9px 172px;
`;

export const NewFriendsListItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const NewFriendsListCol = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const NoFriendWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  width: 100%;
  padding-top: 10px;
  flex-grow: 1;
`;

export const NoFriendContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
  align-items: center;
  width: 100%;
  flex-grow: 1;
  justify-content: center;
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-grow: 1;
`;
