import { observer } from 'mobx-react-lite';
import React from 'react';

import IllustrationTopLayout from '@/assets/decorations/IllustrationTopLayout.png';

import BackButton from '@/components/BackButton';
import Text from '@/components/UI/Text';

import InformationBlock from '@/pages/Airdrop/components/InformationBlock';
import HowAreRewardsDistributed from '@/pages/Airdrop/components/InformationBlock/components/HowAreRewardsDistributed';
import RatingItem from '@/pages/Airdrop/pages/AirdropRating/components/RatingItem';
import UserRatingList from '@/pages/Airdrop/pages/AirdropRating/components/UserRatingList';
import {
  AirdropRatingPageContainer,
  RatingList,
  TitleContainer,
} from '@/pages/Airdrop/pages/AirdropRating/styled';
import { IllustrationTop } from '@/pages/Airdrop/styled';
import rootStore from '@/store';

const AirdropRatingPage = () => {
  const {
    airdropStore: { ratingList, myRating },
  } = rootStore;

  return (
    <AirdropRatingPageContainer>
      <IllustrationTop src={IllustrationTopLayout} rel="preload" />
      <BackButton delta={-1} />

      <TitleContainer>
        <Text fontSize={24} fontWeight={700}>
          Airdrop Rating
        </Text>
        <Text fontSize={12} fontWeight={600}>
          <span id="green-strong">All participants,</span> regardless of their
          position in the ranking,{' '}
          <span id="green-strong">will receive BUMP Tokens,</span> but the
          amount will depend on <span id="strong">their ranking position.</span>
        </Text>
      </TitleContainer>

      <RatingList>
        {ratingList.slice(0, 10).map((content, index) => (
          <RatingItem
            key={`${content.place}-${content.name_first}`}
            isActive={index + 1 === myRating?.place}
            {...content}
          />
        ))}

        {!!(myRating && !myRating.is_place_10 && !!myRating.place) && (
          <>
            <Text fontSize={14} fontWeight={800}>
              ...
            </Text>
            <RatingItem
              name_first="Your"
              name_last="rating"
              balance_ap={myRating.balance_ap}
              place={myRating.place}
              isActive={true}
            />
          </>
        )}
      </RatingList>

      {myRating?.place && <UserRatingList />}

      <InformationBlock
        content={<HowAreRewardsDistributed />}
        title="How are rewards distributed?"
      />
    </AirdropRatingPageContainer>
  );
};

export default observer(AirdropRatingPage);
