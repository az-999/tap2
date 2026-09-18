import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';

import Text from '@/components/UI/Text';

import ExplanationList from '@/pages/BumpTicket/components/ExplanationList/ExplanationList';
import ArrowIcon from '@/pages/Nfts/assets/ArrowIcon';
import LootboxStakingItem from '@/pages/Nfts/components/Lootbox/LootboxStakingItem';
import {
  ContentContainer,
  LootboxStakingsContainer,
  TitleContainer,
} from '@/pages/Nfts/components/Lootbox/LootboxStakings/styled';
import {
  EXPLANATION_LIST_ITEMS,
  SLIDER_DATA,
} from '@/pages/Nfts/pages/LootboxCraftPage/const';
import rootStore from '@/store';

const LootboxStakings = () => {
  const [isOpen, setIsOpen] = useState(true);

  const {
    stakingStore: { stakedLootboxes },
  } = rootStore;

  if (!stakedLootboxes) return null;

  return (
    <LootboxStakingsContainer
      $isOpen={isOpen}
      $isStakedListExist={!!stakedLootboxes.length}
    >
      {stakedLootboxes.length > 0 && (
        <>
          <TitleContainer $isOpen={isOpen}>
            <Text fontSize={14} fontWeight={600}>
              Active Stakings ({stakedLootboxes.length})
            </Text>

            <button onClick={() => setIsOpen(!isOpen)}>
              <ArrowIcon />
            </button>
          </TitleContainer>

          {isOpen && (
            <ContentContainer>
              {stakedLootboxes.map((stakedLoobtox, index) => (
                <LootboxStakingItem
                  key={`staked-lootbox=${stakedLoobtox.id}`}
                  image={SLIDER_DATA[stakedLoobtox.lootbox_id - 1].image!}
                  {...stakedLoobtox}
                />
              ))}
            </ContentContainer>
          )}
        </>
      )}

      <ExplanationList
        list={EXPLANATION_LIST_ITEMS}
        withPadding={false}
        withDots={false}
      />
    </LootboxStakingsContainer>
  );
};

export default observer(LootboxStakings);
