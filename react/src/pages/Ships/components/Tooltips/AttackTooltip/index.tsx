import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useState } from 'react';

import Text from '@/components/UI/Text';

import SkullIcon from '@/pages/Ships/components/Tooltips/AttackTooltip/assets/SkullIcon';
import {
  AttackTooltipContainer,
  ButtonContainer,
  ContentContainer,
  InnerContainer,
  StolenContent,
} from '@/pages/Ships/components/Tooltips/AttackTooltip/styled';
import MmproIcon from '@/pages/Ships/pages/PiratePage/assets/MmproIcon';
import { ExtraButton } from '@/pages/Vouchers/Components/Voucher/styled';
import rootStore from '@/store';

const AttackTooltip = () => {
  const [isActive, setIsActive] = useState(false);

  const {
    shipsStore: {
      pirateAndDefenseTooltips,
      deletePirateAndDefenseTooltips,
      modalStolenPoints,
      piracyMissionReward,
    },
  } = rootStore;
  const isPirateMissionComplete = pirateAndDefenseTooltips?.[0] === 4;

  useEffect(() => {
    if (![1, 2, 3, 4].includes(pirateAndDefenseTooltips?.[0])) return;

    const timer = setTimeout(() => {
      setIsActive(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [pirateAndDefenseTooltips.length]);

  const handleClose = () => {
    setIsActive(false);
    setTimeout(deletePirateAndDefenseTooltips, 100);
  };

  const getTooltipData = useCallback(() => {
    const index = pirateAndDefenseTooltips?.[0];

    switch (index) {
      case 1:
        return {
          title: (
            <Text fontSize={23} fontWeight={600}>
              The dark forces are <span id="red-highlight">not sleeping!</span>
            </Text>
          ),
          subtitle: (
            <Text fontSize={12} fontWeight={400}>
              Pirates tried to seize part of your points, but their attack was
              weak. You lost a few points. Caution is advised!
            </Text>
          ),
        };
      case 2:
        return {
          title: (
            <Text fontSize={23} fontWeight={600}>
              The <span id="red-highlight">pirates</span> are intensifying their
              attack!
            </Text>
          ),
          subtitle: (
            <Text fontSize={12} fontWeight={400}>
              It was a powerful assault, and they took some of your points. Your
              defense cracked, but you held your ground. Prepare for the next
              wave!
            </Text>
          ),
        };
      case 3:
        return {
          title: (
            <Text fontSize={23} fontWeight={600}>
              The pirates are <span id="red-highlight">at it again</span>
            </Text>
          ),
          subtitle: (
            <Text fontSize={12} fontWeight={400}>
              Over the past few days, they’ve taken a significant amount of your
              points. Their fleet is growing stronger, and they won't stop at
              this. Stay alert!
            </Text>
          ),
        };
      case 4:
        return {
          title: (
            <Text fontSize={23} fontWeight={600}>
              You've <span id="red-highlight">returned</span> from the pirate
              raid
            </Text>
          ),
          subtitle: (
            <Text fontSize={12} fontWeight={400}>
              New riches are now yours! Pirate luck was on your side, and all
              the trophies are already in your hands! Go to the{' '}
              <span id="red-highlight">"Ships/pirate mode"</span> to claim
              rewards!
            </Text>
          ),
        };
    }
  }, [pirateAndDefenseTooltips.length]);

  return (
    <AttackTooltipContainer
      $isActive={isActive}
      $index={pirateAndDefenseTooltips?.[0]}
    >
      <InnerContainer>
        <ContentContainer $index={pirateAndDefenseTooltips?.[0]}>
          {getTooltipData()?.title}
          {getTooltipData()?.subtitle}
        </ContentContainer>

        <StolenContent>
          <div>
            {isPirateMissionComplete ? (
              <Text fontSize={12} fontWeight={600}>
                Mission reward
              </Text>
            ) : (
              <>
                <SkullIcon />
                <Text fontSize={12} fontWeight={600}>
                  Stolen from you
                </Text>
              </>
            )}
          </div>

          <div>
            <MmproIcon />
            <Text fontSize={20} fontWeight={700}>
              {isPirateMissionComplete
                ? piracyMissionReward.toLocaleString('ru-RU')
                : modalStolenPoints.toLocaleString('ru-RU')}
            </Text>
          </div>
        </StolenContent>

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
        </ButtonContainer>
      </InnerContainer>
    </AttackTooltipContainer>
  );
};

export default observer(AttackTooltip);
