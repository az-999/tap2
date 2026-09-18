import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';

import Text from '@/components/UI/Text';

import {
  ButtonContainer,
  ContentContainer,
  DefenseMarkExistTooltipContainer,
  InnerContainer,
  ProtectedContainer,
} from '@/pages/Ships/components/Tooltips/DefenseMarkExistTooltip/styled';
import ChargeLevel from '@/pages/Ships/pages/DefensePage/componets/ChargeLevel';
import MmproIcon from '@/pages/Ships/pages/PiratePage/assets/MmproIcon';
import { ExtraButton } from '@/pages/Vouchers/Components/Voucher/styled';
import rootStore from '@/store';

const DefenseMarkExistTooltip = () => {
  const [isActive, setIsActive] = useState(false);

  const {
    shipsStore: {
      pirateAndDefenseTooltips,
      deletePirateAndDefenseTooltips,
      isModalShowMoreOneDay,
      modalProtectedPoints,
    },
  } = rootStore;

  useEffect(() => {
    if (pirateAndDefenseTooltips?.[0] !== 5) return;

    const timer = setTimeout(() => {
      setIsActive(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [pirateAndDefenseTooltips.length]);

  const handleClose = () => {
    setIsActive(false);
    setTimeout(deletePirateAndDefenseTooltips, 100);
  };

  return (
    <DefenseMarkExistTooltipContainer $isActive={isActive}>
      <InnerContainer>
        <ContentContainer>
          <Text fontSize={23} fontWeight={600}>
            You've <span id="green-highlight">successfully protected</span> your
            treasures!
          </Text>
          <Text fontSize={12} fontWeight={400}>
            Expect new threats, stay on guard!
          </Text>
        </ContentContainer>

        <ProtectedContainer>
          <Text fontSize={12} fontWeight={600}>
            {isModalShowMoreOneDay
              ? 'During this period, you successfully protected'
              : 'Protected'}
          </Text>
          <div>
            <MmproIcon />
            <Text fontSize={20} fontWeight={700}>
              {modalProtectedPoints.toLocaleString('ru-RU')}
            </Text>
          </div>
        </ProtectedContainer>

        <ProtectedContainer>
          <Text fontSize={12} fontWeight={600}>
            Remaining defense
          </Text>
          <ChargeLevel />
        </ProtectedContainer>

        <ButtonContainer>
          <ExtraButton
            $color="green"
            $size="big"
            $isDisabled={false}
            $isFullWidth={true}
            onClick={handleClose}
          >
            Okay
          </ExtraButton>
        </ButtonContainer>
      </InnerContainer>
    </DefenseMarkExistTooltipContainer>
  );
};

export default observer(DefenseMarkExistTooltip);
