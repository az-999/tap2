import styled, { createGlobalStyle, css } from 'styled-components/macro';

import { AirdropTaskAlertType } from '@/pages/Airdrop/components/AirdropTaskAlert/index';
import { TaskType } from '@/pages/Airdrop/types';

const COLORS = {
  oneTime: '#9F00FF',
  limited: '#009DFF',
  recurring: '#FF00C8',
  special: '#2EFF73',
  error: '#F95317',
  lock: '#BEDFFE',
};

const TITLE_COLOR = { ...COLORS, special: '#3C6' };

export const SuccessfullyAlertContainer = styled.div<{
  $type: AirdropTaskAlertType;
}>`
  width: 100%;
  padding: 26px 20px 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  background: ${({ $type }) => {
    return css`radial-gradient(at calc(-130px) calc(100% + 130px), ${COLORS[$type]}, #131516 85%)`;
  }};

  & > div:first-child > span:last-child {
    opacity: 0.6;
  }
`;

export const ContentContainer = styled.div<{ $type: AirdropTaskAlertType }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;

  & > div:first-child {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background-color: ${({ $type }) => css`
      ${TITLE_COLOR[$type]}
    `};
    padding: 2px 6px;
    height: 22px;
  }
`;

export const RewardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;

  & > span:first-child {
    opacity: 0.7;
  }
`;

export const Rewards = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  & > div {
    display: flex;
    align-items: center;
    gap: 6px;

    svg {
      width: 22px;
      height: 22px;
    }
  }
`;

export const SwalStyles = createGlobalStyle`
    div:where(.swal2-container) .swal2-html-container {
        padding: 0;
    }

    div:where(.swal2-container) div:where(.swal2-popup) {
        border-radius: 12px;
        background-color: transparent;
        color: transparent;
    }
`;
