import React from 'react';

import Text from '@/components/UI/Text';

import FriendMmproCoin from '@/pages/Friends/Assets/FriendMmproCoin';
import User from '@/pages/Friends/Assets/User';
import {
  CoinsCount,
  FriendIconWrapper,
  FriendItem,
  FriendWrapper,
  FriendsBlock,
} from '@/pages/Friends/Components/FriendsList/styled';
import { Referral } from '@/pages/Friends/types';

type FriendsListProps = {
  referrals: Referral[];
};

const FriendsList = ({ referrals }: FriendsListProps) => {
  return (
    <FriendsBlock>
      <Text fontSize={15} fontWeight={500}>
        {referrals.length} Friends
      </Text>
      {referrals.map((referral) => (
        <FriendItem key={referral.external_id}>
          <FriendWrapper>
            <FriendIconWrapper>
              <User />
            </FriendIconWrapper>
            <Text fontSize={14} fontWeight={400}>
              {referral.name}
            </Text>
          </FriendWrapper>
          <CoinsCount>
            <FriendMmproCoin />
            <Text fontSize={16} fontWeight={700}>
              {referral.balance.toFixed(2)}
            </Text>
          </CoinsCount>
        </FriendItem>
      ))}
    </FriendsBlock>
  );
};

export default FriendsList;
