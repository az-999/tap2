import React from 'react';
import { useLocation } from 'react-router-dom';

import Text from '@/components/UI/Text';

import MMProWhite from './Assets/MMProWhite';
import {
  ClaimBlock,
  ClaimBlockText,
  ClaimRewardContainer,
  TitleWrapper,
} from './styled';
import { useGetPathname } from '@/hooks/useGetPathname';
import Mmpro from '@/pages/Friends/Assets/Mmpro';

interface ClaimRewardProps {
  onClick: () => void;
  claimValue: number;
  isActive: boolean;
  disabled?: boolean;
}

const ClaimRewardButton = ({
  onClick,
  claimValue,
  disabled = false,
  isActive,
}: ClaimRewardProps) => {
  const claim = Number(claimValue).toLocaleString('ru-RU') || 0;
  const { isCommunityPage, isKolsPage } = useGetPathname();

  return (
    <>
      {isActive && (
        <ClaimRewardContainer onClick={onClick} disabled={disabled}>
          <TitleWrapper>
            <MMProWhite />
            <Text fontSize={20} fontWeight={700}>
              {claim}
            </Text>
          </TitleWrapper>
          <Text fontSize={14} fontWeight={500}>
            Claim Reward
          </Text>
        </ClaimRewardContainer>
      )}

      {/* todo убрал пока неактивную кнопку на странице тасок */}
      {!isActive && !isCommunityPage && !isKolsPage && (
        <ClaimBlock>
          <Mmpro />
          <ClaimBlockText>
            <Text fontSize={14} fontWeight={500}>
              Claim Reward
            </Text>
          </ClaimBlockText>
        </ClaimBlock>
      )}
    </>
  );
};

export default ClaimRewardButton;
