import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';

import LoadingIcon from '@/assets/LoadingIcon';

import BackButton from '@/components/BackButton';
import Text from '@/components/UI/Text';

import RatingItem from '@/pages/Rating/Components/RatingItem';
import {
  RatingContainer,
  TitleWrapper,
  UsersWrapper,
} from '@/pages/Rating/styled';
import rootStore from '@/store';
import { AppPath } from '@/types/routes';

const Rating = () => {
  const {
    userStore: { isGrantBoxVisible },
    ratingStore: { rating, getRating },
    isLoading,
  } = rootStore;

  useEffect(() => {
    if (!rating) {
      getRating().catch((e) => console.error(e));
    }
  }, [getRating]);

  return (
    <RatingContainer $isLoading={isLoading}>
      {!isGrantBoxVisible && <BackButton navigatePath={AppPath.friends} />}

      <TitleWrapper>
        <Text fontSize={24} fontWeight={700}>
          Rating
        </Text>
      </TitleWrapper>

      <UsersWrapper>
        {isLoading ? (
          <LoadingIcon />
        ) : (
          <>
            {rating &&
              rating.list
                .slice(0, 10)
                .map((item, index) => (
                  <RatingItem
                    rating={item}
                    key={item.chat_id}
                    isActive={rating.my_place.place === index + 1}
                  />
                ))}

            {rating && !rating.my_place.is_place_10 && (
              <>
                <Text fontSize={14} fontWeight={800}>
                  ...
                </Text>
                <RatingItem
                  rating={{
                    name_first: 'Your',
                    name_last: 'rating',
                    balance_farmed: rating.my_place.balance_farmed,
                    place: rating.my_place.place_plus,
                    friends: rating.my_place.friends,
                  }}
                  isActive
                />
              </>
            )}
          </>
        )}
      </UsersWrapper>
    </RatingContainer>
  );
};

export default observer(Rating);
