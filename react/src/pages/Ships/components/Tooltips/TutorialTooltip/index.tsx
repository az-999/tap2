import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import Text from '@/components/UI/Text';

import defense from '@/pages/Ships/components/Tooltips/TutorialTooltip/assets/defense-mark.png';
import pirate from '@/pages/Ships/components/Tooltips/TutorialTooltip/assets/pirate-mark.png';
import {
  BalanceContainer,
  ButtonContainer,
  InnerWrapper,
  MarksContainer,
  TextContainer,
  TitleContainer,
  TutorialTooltipContainer,
} from '@/pages/Ships/components/Tooltips/TutorialTooltip/styled';
import MmproIcon from '@/pages/Ships/pages/PiratePage/assets/MmproIcon';
import { ExtraButton } from '@/pages/Vouchers/Components/Voucher/styled';
import rootStore from '@/store';

const TutorialTooltip = () => {
  const [isActive, setIsActive] = useState(false);

  const {
    shipsStore: {
      pirateAndDefenseTooltips,
      deletePirateAndDefenseTooltips,
      pirateOfferAccept,
    },
  } = rootStore;

  useEffect(() => {
    if (pirateAndDefenseTooltips?.[0] !== 0) return;

    const timer = setTimeout(() => {
      setIsActive(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [pirateAndDefenseTooltips.length]);

  const handleClose = async () => {
    setIsActive(false);
    setTimeout(deletePirateAndDefenseTooltips, 100);
    await pirateOfferAccept();
  };

  return (
    <TutorialTooltipContainer $isActive={isActive}>
      <InnerWrapper>
        <TitleContainer>
          <Text fontSize={23} fontWeight={600}>
            Star Wars has arrived, and the BUMP universe holds its breath
          </Text>
          <Text fontSize={12} fontWeight={400}>
            In the depths of space, a rare deposit of the most powerful energy
            has been discovered. This energy has sparked rapid growth and
            prosperity, adding a billion points to every resident of the BUMP
            universe. But pirate fleets are already on their way, planning to
            seize your riches.
          </Text>
        </TitleContainer>

        <BalanceContainer>
          <MmproIcon />
          <Text fontSize={22} fontWeight={700}>
            1 000 000 000
          </Text>
        </BalanceContainer>

        <MarksContainer>
          <LazyLoadImage
            src={pirate}
            alt=""
            width="auto"
            height={200}
            effect="blur"
          />
          <LazyLoadImage
            src={defense}
            alt=""
            width="auto"
            height={200}
            effect="blur"
          />
        </MarksContainer>

        <TextContainer>
          <Text fontSize={14} fontWeight={600}>
            Are you ready to <span id="green-highlight">defend</span> what's
            yours, or will you risk{' '}
            <span id="red-highlight">becoming one of them</span>?
          </Text>
        </TextContainer>

        <ButtonContainer>
          <ExtraButton
            $color="green"
            $size="big"
            $isDisabled={false}
            $isFullWidth={true}
            onClick={handleClose}
          >
            Ready!
          </ExtraButton>
        </ButtonContainer>
      </InnerWrapper>
    </TutorialTooltipContainer>
  );
};

export default observer(TutorialTooltip);
