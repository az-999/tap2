import React from 'react';

import Text from '@/components/UI/Text';

import TitleIcon from '@/pages/Airdrop/components/InformationBlock/components/HowAreRewardsDistributed/TitleIcon';
import {
  CollCell,
  HowAreRewardsDistributedContainer,
  TitleContainer,
} from '@/pages/Airdrop/components/InformationBlock/components/HowAreRewardsDistributed/styled';
import Title from '@/pages/Airdrop/components/InformationBlock/components/Title';

const HowAreRewardsDistributed = () => {
  return (
    <HowAreRewardsDistributedContainer>
      <TitleContainer>
        <Text fontSize={10} fontWeight={600}>
          The distribution of the BUMP Token pool among participants is based on
          percentages:
        </Text>
        <TitleIcon />
      </TitleContainer>

      <CollCell>
        <Text fontSize={12} fontWeight={400}>
          The user rankings are divided into several{' '}
          <span id="strong">percentage-based groups</span> to ensure a fair
          distribution of rewards:
        </Text>
        <CollCell>
          <Title
            color="#2EFF73"
            title="Top 10% of participants"
            fontSize={12}
            fontWeight={700}
          />
          <Text fontSize={10} fontWeight={400}>
            Will receive the largest amount of BUMP Tokens.
          </Text>
        </CollCell>
      </CollCell>
      <CollCell>
        <Title
          color="#2EFF73B3"
          title="Next 20% of participants"
          fontSize={12}
          fontWeight={700}
        />
        <Text fontSize={10} fontWeight={400}>
          Will receive slightly less, but still a worthy reward.
        </Text>
      </CollCell>
      <CollCell>
        <Title
          color="#2EFF7366"
          title="30% of participants"
          fontSize={12}
          fontWeight={700}
        />
        <Text fontSize={10} fontWeight={400}>
          Will receive a moderate amount of tokens.
        </Text>
      </CollCell>
      <CollCell>
        <Title
          color="#2EFF7333"
          title="40% of participants"
          fontSize={12}
          fontWeight={700}
        />
        <Text fontSize={10} fontWeight={400}>
          Will receive the minimum amount of BUMP Tokens, but will still be able
          to benefit from their rewards.
        </Text>
      </CollCell>
    </HowAreRewardsDistributedContainer>
  );
};

export default HowAreRewardsDistributed;
