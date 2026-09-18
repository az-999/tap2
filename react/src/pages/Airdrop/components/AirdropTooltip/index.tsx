import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';

import TooltipPortal from '@/components/TooltipPortal/tooltipPortal';
import Text from '@/components/UI/Text';

import topImage from '@/pages/Airdrop/assets/main-page-logo.png';
import AirdropCard from '@/pages/Airdrop/components/AirdropCard';
import {
  AirdropCardsList,
  AirdropTooltipBackground,
  AirdropTooltipContainer,
  ContentContainer,
  TitleContainer,
} from '@/pages/Airdrop/components/AirdropTooltip/styled';
import Button from '@/pages/Airdrop/components/Button';
import { AIRDROP_MAIN_PAGE_CONST } from '@/pages/Airdrop/const';
import rootStore from '@/store';

const AirdropTooltip = () => {
  const [isActive, setIsActive] = useState(false);

  const {
    airdropStore: {
      isAirdropTooltipOpen,
      closeAirdropTaskModal,
      postAirdropStart,
    },
    shipsStore: { pirateAndDefenseTooltips },
    isLoading,
  } = rootStore;

  useEffect(() => {
    if (pirateAndDefenseTooltips.length || !isAirdropTooltipOpen) return;

    const timer = setTimeout(() => {
      setIsActive(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [pirateAndDefenseTooltips.length, isAirdropTooltipOpen]);

  const handleClose = async () => {
    await postAirdropStart();

    setIsActive(false);
    setTimeout(closeAirdropTaskModal, 100);
  };

  if (pirateAndDefenseTooltips.length) return null;

  return (
    <TooltipPortal>
      <AirdropTooltipBackground $isActive={isAirdropTooltipOpen}>
        <AirdropTooltipContainer $isActive={isActive}>
          <Text fontSize={24} fontWeight={600}>
            The Airdrop Season has begun!
          </Text>

          <ContentContainer>
            {/*<TitleContainer>
              <img src={topImage} alt="" />
              <div>
                <Text fontSize={14} fontWeight={600}>
                  50% of BUMP Tokens Up for Grabs!
                </Text>
                <Text fontSize={9.3} fontWeight={400}>
                  Claim your share through our massive airdrop campaign.
                </Text>
              </div>
            </TitleContainer>*/}

            <Text fontSize={12} fontWeight={600}>
              Complete seasonal activities, earn Airdrop Points, climb the
              leaderboard, and claim BUMP Tokens!
            </Text>
          </ContentContainer>

          <AirdropCardsList>
            {AIRDROP_MAIN_PAGE_CONST.map((content, index) => (
              <AirdropCard
                key={`AirdropCard-${index}`}
                index={index}
                isMinView
                {...content}
              />
            ))}
          </AirdropCardsList>

          <Button
            title="Ready!"
            size="regular"
            onClick={handleClose}
            disabled={isLoading}
          />
        </AirdropTooltipContainer>
      </AirdropTooltipBackground>
    </TooltipPortal>
  );
};

export default observer(AirdropTooltip);
