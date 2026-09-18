import React from 'react';

import IllustrationTopLayout from '@/assets/decorations/IllustrationTopLayout.png';

import BackButton from '@/components/BackButton';
import Text from '@/components/UI/Text';

import InformationBlock from '@/pages/Airdrop/components/InformationBlock';
import HowAreRewardsDistributed from '@/pages/Airdrop/components/InformationBlock/components/HowAreRewardsDistributed';
import HowItWorkContent from '@/pages/Airdrop/components/InformationBlock/components/HowItWorkContent';
import HowToCompleteTasks from '@/pages/Airdrop/components/InformationBlock/components/HowToCompleteTasks';
import TrackYourProgress from '@/pages/Airdrop/components/InformationBlock/components/TrackYourProgress';
import TypesOfTasks from '@/pages/Airdrop/components/InformationBlock/components/TypesOfTasks';
import {
  ContentContainer,
  HowItWorkPageContainer,
  TitleContainer,
} from '@/pages/Airdrop/pages/HowItWork/styled';
import { IllustrationTop } from '@/pages/Airdrop/styled';

const HowItWorkPage = () => (
  <HowItWorkPageContainer>
    <IllustrationTop src={IllustrationTopLayout} rel="preload" />
    <BackButton delta={-1} />

    <TitleContainer>
      <Text fontSize={24} fontWeight={700}>
        Seasonal Tasks:
      </Text>
      <Text fontSize={24} fontWeight={700}>
        Complete — Earn — Win!
      </Text>
    </TitleContainer>

    <ContentContainer>
      <InformationBlock content={<HowItWorkContent />} title="How It Works" />
      <InformationBlock content={<TypesOfTasks />} title="Types of Tasks" />
      <InformationBlock
        content={<HowToCompleteTasks />}
        title="How to complete tasks?"
      />
      <InformationBlock
        content={<TrackYourProgress />}
        title="Track your progress"
      />
      <InformationBlock
        content={<HowAreRewardsDistributed />}
        title="How are rewards distributed?"
      />
    </ContentContainer>
  </HowItWorkPageContainer>
);

export default HowItWorkPage;
