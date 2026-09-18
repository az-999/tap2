import React from 'react';

import ArrowDown from '@/pages/Ships/pages/ShipsCraftPage/components/EntireCraftedItem/assets/ArrowDown';
import {
  ModalContentContainer,
  Title,
} from '@/pages/Ships/pages/ShipsCraftPage/components/PurchaseRulesModal/styled';
import SubmitButton from '@/pages/Ships/pages/ShipsCraftPage/components/SubmitButton';

const TITLES_DATA = [
  {
    content: (
      <p>
        <span>Buy 5 parts</span> in the <span>BUMP Store</span>
      </p>
    ),
  },
  {
    content: <p>+</p>,
  },
  {
    content: (
      <p>
        <span>Buy 1 part</span> in <span>Marketplace</span>
      </p>
    ),
  },
  { content: <ArrowDown /> },
];

const Index = () => {
  return (
    <ModalContentContainer>
      <h5>You're almost there!</h5>

      <div>
        <p>
          You can only purchase up to{' '}
          <strong>5 ship parts per user in the BUMP</strong>
        </p>
        <p>
          <strong>Store.</strong> To complete a full ship with all 6 parts,{' '}
          <strong>you'll need to get</strong>
        </p>
        <p>
          <strong>the remaining part from the marketplace</strong>
        </p>
      </div>

      <div id="craft-modal-title">
        {TITLES_DATA.map(({ content }, index) => (
          <Title key={`craft-modal-title-${index}`}>{content}</Title>
        ))}

        <SubmitButton
          title="Combine parts of a spaceship"
          isDisabled={false}
          isWalletInvalid={false}
          isFullWidth={false}
          onClick={() => null}
        />
      </div>
    </ModalContentContainer>
  );
};

export default Index;
