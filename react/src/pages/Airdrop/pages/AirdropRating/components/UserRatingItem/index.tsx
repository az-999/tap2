import React, { forwardRef } from 'react';

import Text from '@/components/UI/Text';

import AirdropIcon from '@/pages/Airdrop/assets/AirdropIcon';
import {
  DataWrapper,
  TitleWrapper,
  UserRatingItemContainer,
} from '@/pages/Airdrop/pages/AirdropRating/components/UserRatingItem/styled';

interface UserRatingItemProps {
  place: number;
  name_first: string;
  name_last: string;
  balance_ap: number;
}

const UserRatingItem = forwardRef<HTMLLIElement, UserRatingItemProps>(
  (props, ref) => {
    const { place, name_first, name_last, balance_ap } = props;
    const userName = ref ? 'Your rating' : `${name_first} ${name_last}`;

    return (
      <UserRatingItemContainer
        $isActive={!!ref}
        ref={ref}
        style={{ background: ref ? '#33CC66' : 'transparent' }}
      >
        <TitleWrapper>
          <Text fontSize={14} fontWeight={800}>
            {place}
          </Text>
          <Text fontSize={14} fontWeight={ref ? 500 : 400}>
            {userName}
          </Text>
        </TitleWrapper>

        <DataWrapper>
          <AirdropIcon />
          <Text fontSize={14} fontWeight={700}>
            {balance_ap.toLocaleString('ru-RU')} AP
          </Text>
        </DataWrapper>
      </UserRatingItemContainer>
    );
  },
);

UserRatingItem.displayName = 'UserRatingItem';

export default UserRatingItem;
