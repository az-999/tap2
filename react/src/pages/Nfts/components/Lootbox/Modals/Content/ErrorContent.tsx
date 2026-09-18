import React from 'react';

import Text from '@/components/UI/Text';

import Button from '@/pages/Nfts/components/Button';
import {
  ErrorContainer,
  ModalContent,
} from '@/pages/Nfts/components/Lootbox/Modals/styled';
import Error from '@/pages/Vouchers/Assets/Error';

interface ErrorContentProps {
  onClose: () => void;
}

const ErrorContent = ({ onClose }: ErrorContentProps) => {
  return (
    <ModalContent>
      <ErrorContainer>
        <Error />
        <Text fontSize={14} fontWeight={600}>
          Something went wrong, please try again!
        </Text>
      </ErrorContainer>

      <Button onClick={onClose} color="grey">
        Close
      </Button>
    </ModalContent>
  );
};

export default ErrorContent;
