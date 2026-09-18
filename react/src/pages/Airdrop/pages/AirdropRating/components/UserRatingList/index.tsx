import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';

import Text from '@/components/UI/Text';

import UserRatingItem from '@/pages/Airdrop/pages/AirdropRating/components/UserRatingItem';
import {
  List,
  UserRatingListContainer,
} from '@/pages/Airdrop/pages/AirdropRating/components/UserRatingList/styled';
import rootStore from '@/store';

const UserRatingList = () => {
  const {
    airdropStore: { userRatingList },
  } = rootStore;

  const containerRef = useRef<HTMLUListElement>(null);
  const currentItemRef = useRef<HTMLLIElement>(null);
  const myIndex = userRatingList.findIndex((user) => user.is_my);

  useEffect(() => {
    if (
      !containerRef?.current ||
      !currentItemRef?.current ||
      !userRatingList?.length
    )
      return;

    const container = containerRef.current;
    const currentItem = currentItemRef.current;

    if (container && currentItem) {
      const containerRect = container.getBoundingClientRect();
      const itemRect = currentItem.getBoundingClientRect();

      const relativeTop = itemRect.top - containerRect.top;

      container.scrollTop +=
        relativeTop - container.clientHeight / 2 + currentItem.clientHeight / 2;
    }
  }, [userRatingList, containerRef, currentItemRef]);

  return (
    <UserRatingListContainer>
      <Text fontSize={14} fontWeight={800}>
        ...
      </Text>

      <List ref={containerRef}>
        {userRatingList.map((user, i) => (
          <UserRatingItem
            {...user}
            ref={i === myIndex ? currentItemRef : null}
          />
        ))}
      </List>
    </UserRatingListContainer>
  );
};

export default observer(UserRatingList);
