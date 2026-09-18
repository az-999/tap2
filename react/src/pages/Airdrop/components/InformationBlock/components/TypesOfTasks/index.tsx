import React from 'react';

import Text from '@/components/UI/Text';

import Title from '@/pages/Airdrop/components/InformationBlock/components/Title';
import {
  CollCell,
  TypesOfTasksContainer,
} from '@/pages/Airdrop/components/InformationBlock/components/TypesOfTasks/styled';
import { SwalStyles } from '@/pages/Airdrop/components/InformationBlock/styled';

interface TypesOfTasksProps {
  size?: 'small' | 'regular';
}

const TypesOfTasks = ({ size = 'regular' }: TypesOfTasksProps) => {
  const isSmallSize = size === 'small';

  return (
    <TypesOfTasksContainer $isSmallSize={isSmallSize}>
      <SwalStyles />

      <CollCell $isSmallSize={isSmallSize}>
        <Title type="special" />
        <Text fontSize={12} fontWeight={400}>
          Tasks that hold greater value and may <span id="strong">change</span>{' '}
          throughout the season
        </Text>
      </CollCell>

      <CollCell $isSmallSize={isSmallSize}>
        <Title type="oneTime" />
        <Text fontSize={12} fontWeight={400}>
          One-time tasks.{' '}
          <span id="strong">Performed only once per season.</span>
        </Text>
      </CollCell>

      <CollCell $isSmallSize={isSmallSize}>
        <Title type="recurring" />
        <Text fontSize={12} fontWeight={400}>
          Repeatable tasks. They can be{' '}
          <span id="strong">performed infinitely</span> during the season.
        </Text>
      </CollCell>
    </TypesOfTasksContainer>
  );
};

export default TypesOfTasks;
