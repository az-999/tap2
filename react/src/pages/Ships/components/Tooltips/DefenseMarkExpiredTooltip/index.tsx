import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Text from '@/components/UI/Text';

import {
  ButtonContainer,
  ContentContainer,
  DefenseLevelContainer,
  DefenseMarkExpiredTooltipContainer,
  ExpiredContainer,
  InnerContainer,
} from '@/pages/Ships/components/Tooltips/DefenseMarkExpiredTooltip/styled';
import ChargeLevel from '@/pages/Ships/pages/DefensePage/componets/ChargeLevel';
import MmproIcon from '@/pages/Ships/pages/PiratePage/assets/MmproIcon';
import { ExtraButton } from '@/pages/Vouchers/Components/Voucher/styled';
import rootStore from '@/store';
import { AppPath, NftsPath } from '@/types/routes';

const DefenseMarkExpiredTooltip = () => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const {
    shipsStore: {
      pirateAndDefenseTooltips,
      deletePirateAndDefenseTooltips,
      isModalShowMoreOneDay,
      modalProtectedPoints,
      defenseActiveTime,
    },
  } = rootStore;

  useEffect(() => {
    if (pirateAndDefenseTooltips?.[0] !== 6) return;

    const timer = setTimeout(() => {
      setIsActive(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [pirateAndDefenseTooltips.length]);

  const handleClose = () => {
    setIsActive(false);
    setTimeout(deletePirateAndDefenseTooltips, 100);
  };

  const handleBuyButtonClick = () => {
    handleClose();
    navigate(`${AppPath.nfts}/${NftsPath.bumpStore}`);
  };

  return (
    <DefenseMarkExpiredTooltipContainer $isActive={isActive}>
      <InnerContainer>
        <ContentContainer>
          <Text fontSize={23} fontWeight={600}>
            Your defense <span id="red-highlight">has expired!</span>
          </Text>
          <Text fontSize={12} fontWeight={400}>
            Be careful, your treasures are now at risk! Return and strengthen
            your defense before it's too late
          </Text>
        </ContentContainer>

        {!!modalProtectedPoints && (
          <ExpiredContainer>
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
          </ExpiredContainer>
        )}

        <DefenseLevelContainer>
          <ExpiredContainer>
            <Text fontSize={12} fontWeight={600}>
              Remaining defense
            </Text>
            <ChargeLevel />
          </ExpiredContainer>

          <ExpiredContainer>
            <Text fontSize={12} fontWeight={600}>
              Defense was active until
            </Text>
            <Text fontSize={12} fontWeight={600}>
              {defenseActiveTime}
            </Text>
          </ExpiredContainer>
        </DefenseLevelContainer>

        <ButtonContainer>
          <ExtraButton
            $color="red"
            $size="big"
            $isDisabled={false}
            $isFullWidth={true}
            onClick={handleClose}
          >
            Okay
          </ExtraButton>

          <ExtraButton
            $color="green"
            $size="big"
            $isDisabled={false}
            $isFullWidth={true}
            onClick={handleBuyButtonClick}
          >
            Buy defense
          </ExtraButton>
        </ButtonContainer>
      </InnerContainer>
    </DefenseMarkExpiredTooltipContainer>
  );
};

export default observer(DefenseMarkExpiredTooltip);
