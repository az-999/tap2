import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import BalanceIcon from '@/components/GrantReward/assets/BalanceIcon';
import DotIcon from '@/components/GrantReward/assets/DotIcon';
import boxImg from '@/components/GrantReward/assets/boxImg.png';
import {
  Balance,
  ButtonsContainer,
  GrantRewardContainer,
  RewardsContainer,
  RewardsList,
  SuccessButton,
} from '@/components/GrantReward/styled';
import TooltipPortal from '@/components/TooltipPortal/tooltipPortal';
import Text from '@/components/UI/Text';

import rootStore from '@/store';
import { RootPath } from '@/types/routes';

const GrantReward = () => {
  const navigate = useNavigate();

  const {
    userStore: {
      isGrantRewardModalVisible,
      acceptGrantReward,
      grantAmount,
      userInfo: { grant },
    },
  } = rootStore;

  return (
    <TooltipPortal>
      <GrantRewardContainer $isActive={isGrantRewardModalVisible}>
        <img src={boxImg} alt="" />

        <Text fontSize={16} fontWeight={600}>
          Get yours!
        </Text>

        <RewardsContainer>
          <Balance>
            <BalanceIcon />
            <Text fontSize={26} fontWeight={700}>
              {grantAmount.toLocaleString('ru-RU')}
            </Text>
          </Balance>

          <RewardsList>
            {grant?.map((grantItem) => (
              <li key={`grant-${grantItem.id}`}>
                <DotIcon />
                <Text fontSize={12} fontWeight={500}>
                  {grantItem.comment}
                </Text>
              </li>
            ))}
          </RewardsList>

          <ButtonsContainer>
            <SuccessButton
              onClick={() => acceptGrantReward(() => navigate(RootPath.base))}
            >
              Claim reward
            </SuccessButton>
          </ButtonsContainer>
        </RewardsContainer>
      </GrantRewardContainer>
    </TooltipPortal>
  );
};

export default observer(GrantReward);
