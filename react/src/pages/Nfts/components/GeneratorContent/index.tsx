import React from 'react';

import Energy from '@/pages/Nfts/components/GeneratorContent/components/Energy';
import UpgradeButton from '@/pages/Nfts/components/GeneratorContent/components/UpgradeButton';
import { GENERATOR_DATA } from '@/pages/Nfts/components/GeneratorContent/const';
import {
  EnergiesContainer,
  EnergiesItemContainer,
  GeneratorContentContainer,
} from '@/pages/Nfts/components/GeneratorContent/styled';
import LootboxButton from '@/pages/Nfts/components/Lootbox/LootboxButton';

const GeneratorContent = () => {
  return (
    <GeneratorContentContainer>
      <EnergiesContainer>
        {GENERATOR_DATA.map(
          ({ color, opacityColor, image, energyValue, id }) => (
            <EnergiesItemContainer key={id}>
              <img src={image} alt="" />
              <Energy
                color={color}
                energyValue={energyValue}
                opacityColor={opacityColor}
              />
              <UpgradeButton isMaxLevel={energyValue >= 100} />
            </EnergiesItemContainer>
          ),
        )}
      </EnergiesContainer>

      <LootboxButton disabled={true} title="Open Lootbox" withMargin={false} />
    </GeneratorContentContainer>
  );
};

export default GeneratorContent;
