import React from 'react';

import Text from '@/components/UI/Text';

import { EnergyContainer } from '@/pages/Nfts/components/GeneratorContent/styled';
import EnergyIcon from '@/pages/Nfts/pages/LootboxCraftPage/assets/EnergyIcon';

interface EnergyProps {
  color: string;
  opacityColor: string;
  energyValue: number;
}

const Energy = ({ color, opacityColor, energyValue }: EnergyProps) => {
  return (
    <EnergyContainer
      $color={color}
      $opacityColor={opacityColor}
      $energyValue={energyValue}
    >
      <EnergyIcon />

      <div>
        <Text fontSize={12} fontWeight={600}>
          {energyValue}
        </Text>
        <Text fontSize={12} fontWeight={600}>
          /100
        </Text>
      </div>
    </EnergyContainer>
  );
};

export default Energy;
