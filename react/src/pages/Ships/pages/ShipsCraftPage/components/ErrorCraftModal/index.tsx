import React from 'react';

import Text from '@/components/UI/Text';

import {
  ErrorCraftModalContainer,
  TitleWrapper,
} from '@/pages/Ships/pages/ShipsCraftPage/components/ErrorCraftModal/styled';
import Error from '@/pages/Vouchers/Assets/Error';

const ErrorCraftModal = () => {
  return (
    <ErrorCraftModalContainer>
      <Text fontSize={16} fontWeight={700}>
        Craft Spaceship
      </Text>

      <TitleWrapper>
        <Error />
        <Text fontSize={14} fontWeight={600}>
          Something went wrong, please try again!
        </Text>
      </TitleWrapper>
    </ErrorCraftModalContainer>
  );
};

export default ErrorCraftModal;
