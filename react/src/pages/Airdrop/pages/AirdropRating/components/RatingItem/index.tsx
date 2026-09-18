import React from 'react';

import Text from '@/components/UI/Text';

import AirdropIcon from '@/pages/Airdrop/assets/AirdropIcon';
import {
  DataWrapper,
  RatingItemContainer,
  TitleWrapper,
} from '@/pages/Airdrop/pages/AirdropRating/components/RatingItem/styled';
import FirstPlace from '@/pages/Rating/Assets/FirstPlace';
import SecondPlace from '@/pages/Rating/Assets/SecondPlace';
import ThirdPlace from '@/pages/Rating/Assets/ThirdPlace';

interface RatingItemProps {
  isActive: boolean;
  name_first: string;
  name_last: string;
  place: number;
  balance_ap: number;
}

const RatingItem = ({
  isActive,
  name_first,
  name_last,
  place,
  balance_ap,
}: RatingItemProps) => {
  const userName = isActive ? 'Your rating' : `${name_first} ${name_last}`;

  return (
    <RatingItemContainer $isActive={isActive}>
      <TitleWrapper $index={place}>
        {place === 1 && <FirstPlace />}
        {place === 2 && <SecondPlace />}
        {place === 3 && <ThirdPlace />}

        <Text fontSize={14} fontWeight={800}>
          {place}
        </Text>
        <Text fontSize={14} fontWeight={isActive ? 500 : 400}>
          {userName}
        </Text>
      </TitleWrapper>

      <DataWrapper>
        <AirdropIcon />
        <Text fontSize={14} fontWeight={700}>
          {balance_ap.toLocaleString('ru-RU')} AP
        </Text>
      </DataWrapper>
    </RatingItemContainer>
  );
};

export default RatingItem;
