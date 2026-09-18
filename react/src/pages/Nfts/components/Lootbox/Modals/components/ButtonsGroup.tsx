import React from 'react';

import Text from '@/components/UI/Text';

import Button from '@/pages/Nfts/components/Button';
import TonIcon from '@/pages/Nfts/components/Lootbox/Modals/assets/TonIcon';
import { ButtonsContainer } from '@/pages/Nfts/components/Lootbox/Modals/styled';

interface ButtonsGroupProps {
  title: string;
  onSubmit: () => void;
  onCancel: () => void;
  fee: string;
}

const ButtonsGroup = ({
  onSubmit,
  onCancel,
  title,
  fee,
}: ButtonsGroupProps) => {
  return (
    <ButtonsContainer>
      <div>
        <div>
          <Text fontSize={10} fontWeight={500}>
            Network Fee
          </Text>

          <div>
            <TonIcon />
            <Text fontSize={16} fontWeight={600}>
              {fee}
            </Text>
          </div>
        </div>
        <Button onClick={onSubmit}>{title}</Button>
      </div>

      <Button onClick={onCancel} color="grey">
        Cancel
      </Button>
    </ButtonsContainer>
  );
};

export default ButtonsGroup;
