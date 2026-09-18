import React from 'react';
import { css } from 'styled-components/macro';

import Text from '@/components/UI/Text';

import { DataWrapper, RatingItemContainer, TitleWrapper } from './styled';
import FriendIcon from '@/pages/Friends/Assets/FriendIcon';
import FriendInvite from '@/pages/Friends/Assets/FriendInvite';
import FirstPlace from '@/pages/Rating/Assets/FirstPlace';
import SecondPlace from '@/pages/Rating/Assets/SecondPlace';
import ThirdPlace from '@/pages/Rating/Assets/ThirdPlace';
import { RatingItem as RatingItemType } from '@/pages/Rating/types';
import Utils from '@/utils';

interface RatingItemProps {
  rating: Omit<RatingItemType, 'chat_id' | 'place'> & {
    place: number | string | null;
  };
  isActive: boolean;
}

const RatingItem = ({ rating, isActive }: RatingItemProps) => {
  const { name_first, name_last, balance_farmed, friends, place } = rating;

  const userName = isActive ? 'Your rating' : `${name_first} ${name_last}`;

  return (
    <RatingItemContainer $isActive={isActive}>
      <TitleWrapper $index={place}>
        {place === 1 && <FirstPlace />}
        {place === 2 && <SecondPlace />}
        {place === 3 && <ThirdPlace />}
        <Text
          fontSize={14}
          fontWeight={800}
          styledFragment={css`
            min-width: 32px;
            text-align: center;
            z-index: 1;
          `}
        >
          {place}
        </Text>
        <Text fontSize={14} fontWeight={400}>
          {userName}
        </Text>
      </TitleWrapper>

      <DataWrapper>
        <FriendInvite />
        <Text fontSize={16} fontWeight={700}>
          {friends}
        </Text>
        <FriendIcon />
        <Text fontSize={16} fontWeight={700}>
          {Utils.formatNumber(balance_farmed)}
        </Text>
      </DataWrapper>
    </RatingItemContainer>
  );
};

export default RatingItem;
