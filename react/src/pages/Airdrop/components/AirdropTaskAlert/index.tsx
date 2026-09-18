import React from 'react';
import { css } from 'styled-components/macro';
import Swal from 'sweetalert2';

import CloseButton from '@/components/CloseButton';
import Text from '@/components/UI/Text';

import AirdropIcon from '@/pages/Airdrop/assets/AirdropIcon';
import LockIcon from '@/pages/Airdrop/assets/LockIcon';
import MmproIcon from '@/pages/Airdrop/assets/MmproIcon';
import {
  ContentContainer,
  RewardContainer,
  Rewards,
  SuccessfullyAlertContainer,
  SwalStyles,
} from '@/pages/Airdrop/components/AirdropTaskAlert/styled';
import Title from '@/pages/Airdrop/components/InformationBlock/components/Title';
import { TaskType } from '@/pages/Airdrop/types';
import Utils from '@/utils';

export type AirdropTaskAlertType = TaskType | 'error' | 'lock';

interface AirdropTaskAlertProps {
  type: AirdropTaskAlertType;
  title: string;
  reward?: number;
  pointsReward?: number;
}

const AirdropTaskAlert = ({
  type,
  title,
  reward,
  pointsReward,
}: AirdropTaskAlertProps) => (
  <>
    <SwalStyles />
    <SuccessfullyAlertContainer $type={type}>
      <CloseButton onClick={() => Swal.close()} />

      <Title type={type} fontSize={11} />
      {type === 'lock' && <LockIcon />}

      <ContentContainer $type={type}>
        <div>
          <Text
            fontSize={12}
            fontWeight={500}
            styledFragment={
              type === 'lock'
                ? css`
                    color: #131516;
                  `
                : undefined
            }
          >
            {type === 'error'
              ? 'Task conditions not met'
              : type === 'lock'
                ? 'The task is locked'
                : 'Congratulations!'}
          </Text>
        </div>

        {type === 'lock' && (
          <Text
            fontSize={12}
            fontWeight={500}
            styledFragment={css`
              max-width: 168px;
              opacity: 0.7;
              margin-bottom: -4px;
            `}
          >
            Completion of the task is required for access:
          </Text>
        )}

        <Text fontSize={16} fontWeight={500}>
          {title}
        </Text>

        {type !== 'lock' && (
          <RewardContainer>
            <Text fontSize={12} fontWeight={500}>
              {type === 'error'
                ? 'Please try again and recheck'
                : 'You have been awarded a reward:'}
            </Text>

            <Rewards>
              {reward && type !== 'error' && (
                <div>
                  <AirdropIcon />
                  <Text fontSize={14} fontWeight={700}>
                    {reward} AP
                  </Text>
                </div>
              )}

              {!!pointsReward && (
                <div>
                  <MmproIcon />
                  <Text fontSize={14} fontWeight={700}>
                    {Utils.formatNumber(pointsReward)}
                  </Text>
                </div>
              )}
            </Rewards>
          </RewardContainer>
        )}
      </ContentContainer>
    </SuccessfullyAlertContainer>
  </>
);

export default AirdropTaskAlert;
