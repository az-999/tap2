import React from 'react';
import SecureLS from 'secure-ls';

import CloseButton from '@/components/CloseButton';
import Text from '@/components/UI/Text';

import EntireCraftedItem from '@/pages/Ships/pages/ShipsCraftPage/components/EntireCraftedItem';
import { LOOTBOX_CRAFT } from '@/pages/Ships/pages/ShipsCraftPage/components/ShipsCraft/const';
import {
  Button,
  EntireCraftedItemContainer,
  SuccessCraftModalContainer,
  TextContainer,
} from '@/pages/Ships/pages/ShipsCraftPage/components/SuccessCraftModal/styled';

interface SuccessCraftModal {
  onClose: () => void;
}

const ls = new SecureLS();

const SuccessCraftModal = ({ onClose }: SuccessCraftModal) => {
  return (
    <SuccessCraftModalContainer>
      <CloseButton onClick={onClose} />

      <TextContainer>
        <Text fontSize={16} fontWeight={700}>
          Congratulation!
        </Text>

        <div>
          <Text fontSize={12} fontWeight={400}>
            Your NFT spaceship will be assembled in a few minutes
          </Text>
          <Text fontSize={12} fontWeight={400}>
            and will be ready for launch! I wish you a successful adventure!
          </Text>
        </div>
      </TextContainer>

      <EntireCraftedItemContainer>
        <EntireCraftedItem
          itemData={{
            name: LOOTBOX_CRAFT.title,
            image: LOOTBOX_CRAFT.imageSrc,
          }}
          isDisabled={false}
          shipLevel={ls.get('craftShipLevelSecure')}
        />
      </EntireCraftedItemContainer>

      {/*<Button>Claim NFT</Button>*/}
    </SuccessCraftModalContainer>
  );
};

export default SuccessCraftModal;
