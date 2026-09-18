import React from 'react';

import Text from '@/components/UI/Text';

import {
  UpgradeButtonContainer,
  UpgradeStyled,
} from '@/pages/Nfts/components/GeneratorContent/styled';
import PointsIcon from '@/pages/Nfts/pages/LootboxCraftPage/assets/PointsIcon';

interface UpgradeButtonProps {
  isMaxLevel: boolean;
}

const UpgradeButton = ({ isMaxLevel }: UpgradeButtonProps) => {
  return (
    <UpgradeButtonContainer $isMaxLevel={isMaxLevel} disabled={isMaxLevel}>
      {isMaxLevel ? (
        <Text fontSize={9} fontWeight={600}>
          Max Level
        </Text>
      ) : (
        <UpgradeStyled>
          <Text fontSize={9} fontWeight={600}>
            Upgrade
          </Text>
          <span>
            <PointsIcon />
            <Text fontSize={11} fontWeight={700}>
              10M
            </Text>
          </span>
        </UpgradeStyled>
      )}
    </UpgradeButtonContainer>
  );
};

export default UpgradeButton;
