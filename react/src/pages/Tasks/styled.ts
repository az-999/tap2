import styled, { css } from 'styled-components/macro';

export const StyledBoosters = styled.div<{
  $isLoading: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: ${({ $isLoading }) => ($isLoading ? '100%' : 'fit-content')};
  color: white;
  padding: 60px 0 30px;
  flex-grow: 1;
`;

export const Title = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
  padding-bottom: 20px;
`;

export const SubTitle = styled.div`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  opacity: 0.8;
  padding: 0 40px 10px 40px;
  text-align: center;
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  padding: 10px 0 14px;
  overflow-x: scroll;
`;

export const ButtonWrapper = styled.div`
  position: relative;
`;

export const ModalContainer = styled.div<{ $isTopPosition: boolean }>`
  position: ${({ $isTopPosition }) => ($isTopPosition ? 'absolute' : 'sticky')};
  width: 1px;
  height: 1px;
  left: 50%;
  top: ${({ $isTopPosition }) => ($isTopPosition ? '60px' : '6px')};
  transform: translateX(-50%);
`;

export const DailyRewardsContainer = styled.div`
  position: relative;
  background-color: transparent;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  width: calc(100vw - 20px);
  padding: 26px 10px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TitleContainer = styled.div`
  display: flex;
  gap: 24px;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  & > div:first-of-type {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  #daily-title-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    max-width: 90%;
    line-height: 19px;
    text-align: center;

    span:nth-of-type(2) {
      opacity: 0.8;
      width: 90%;
    }
  }
`;

export const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  gap: 10px;
  justify-content: center;
  padding-top: 22px;
  width: 100%;
  max-width: 90%;

  div:nth-child(7),
  div:nth-child(14),
  div:nth-child(21),
  div:nth-child(28) {
    grid-column: 1/-1;
    justify-self: center;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-grow: 1;
`;

export const TasksContainer = styled.div<{ $isVisible: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 0;
  transition: max-height 0.1s ease;
  -webkit-transition: max-height 0.1s ease;
  overflow: hidden;

  ${({ $isVisible }) =>
    $isVisible &&
    css`
      max-height: 10000px;
    `}
`;

export const IconWrapper = styled.div<{ $isVisible: boolean }>`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #222325;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);

  svg {
    transform: ${({ $isVisible }) =>
      $isVisible ? 'rotate(0)' : 'rotate(180deg)'};
    transition: all 0.1s ease-in;
  }
`;

export const ArchiveButton = styled.button`
  border: none;
  background-color: transparent;
  opacity: 0.7;
  font-style: normal;
  line-height: normal;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 8px;
  margin-bottom: 3px;
`;

export const GameButton = styled.button`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: #3c6;
  border: none;
  box-shadow: 0 4px 29px 0 rgba(51, 204, 102, 0.35);
`;
