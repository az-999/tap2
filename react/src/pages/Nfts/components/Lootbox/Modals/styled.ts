import styled from 'styled-components/macro';

export const ModalContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 20px 24px;

  button {
    width: 100%;
    color: #fff;
    font-weight: 500;
    font-size: 14px;
    font-family: 'SF Pro Display', sans-serif;
  }
`;

export const TitleContainer = styled.div<{ $type?: 'wide' | undefined }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;

  svg {
    opacity: 0.5;
  }

  span {
    max-width: ${({ $type }) => ($type ? '100%' : '240px')};
    line-height: 150.5%;
    text-align: center;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;

  & > div {
    display: flex;
    gap: 12px;
    width: 100%;

    & > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      text-wrap: nowrap;

      span:first-child {
        opacity: 0.5;
      }

      div {
        display: flex;
        align-items: center;
        gap: 5px;
      }
    }
  }
`;

export const StakingItems = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #0a0a0b;
  align-items: center;
  padding: 22px 20px;
  width: calc(100% + 40px);
  margin-left: -20px;
  gap: 14px;
`;

export const StakingTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  #apy-container {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    margin: 0 3px 0 5px;

    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      object-fit: contain;
    }

    span {
      z-index: 1;
    }
  }
`;

export const Conditions = styled.div`
  display: flex;
  gap: 16px;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;

    span:first-child {
      opacity: 0.8;
    }
    div {
      display: flex;
      align-items: center;
      gap: 3px;
    }
  }
`;

export const MonthlyReward = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    gap: 3px;
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 20px;
  background-color: #0a0a0b;
  border-radius: 12px;
`;
