import React from 'react';

import BackButton from '@/components/BackButton';
import Text from '@/components/UI/Text';

import SynthesisIcon from '@/pages/Airdrop/assets/SynthesisIcon';
import {
  SynthesisEnginePageContainer,
  TitleContainer,
} from '@/pages/Airdrop/pages/SynthesisEngine/styled';

const SynthesisEngine = () => {
  return (
    <SynthesisEnginePageContainer>
      <BackButton delta={-1} />

      <TitleContainer>
        <SynthesisIcon />
        <Text fontSize={24} fontWeight={700}>
          Synthesis Engine
        </Text>
        <div>
          <Text fontSize={12} fontWeight={400}>
            Complete tasks and advance your season
          </Text>
          <Text fontSize={12} fontWeight={400}>
            progress by earning points
          </Text>
        </div>
      </TitleContainer>
    </SynthesisEnginePageContainer>
  );
};

export default SynthesisEngine;
