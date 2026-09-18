import { observer } from 'mobx-react-lite';
import React from 'react';

import CloseButton from '@/components/CloseButton';
import {
  ContentContainer,
  MultiWalletTooltipContainer,
  TitleContainer,
} from '@/components/MultiWalletTooltip/styled';
import TooltipPortal from '@/components/TooltipPortal/tooltipPortal';
import Text from '@/components/UI/Text';

import rootStore from '@/store';

const MultiWalletTooltip = () => {
  const {
    userStore: {
      isWalletInvalidModalVisible,
      setWalletInvalidModal,
      walletUsersList,
    },
  } = rootStore;

  return (
    <TooltipPortal>
      <MultiWalletTooltipContainer $isActive={isWalletInvalidModalVisible}>
        <CloseButton
          onClick={() => setWalletInvalidModal(false)}
          color="green"
          top={6}
          right={6}
        />
        <TitleContainer>
          <Text fontSize={14} fontWeight={600}>
            One wallet per account
          </Text>

          <div>
            <Text fontSize={12} fontWeight={400}>
              According to our rules, one wallet can be linked to only
            </Text>
            <Text fontSize={12} fontWeight={400}>
              one user account
            </Text>
          </div>
        </TitleContainer>

        <ContentContainer>
          <Text fontSize={12} fontWeight={500}>
            To connect to this account, first log out of:
          </Text>

          {walletUsersList &&
            walletUsersList.map(
              ({ name_first, name_last, username, chat_id }) => (
                <li key={chat_id}>
                  <Text fontSize={12} fontWeight={400}>
                    {name_first} {name_last} ({username}, id: {chat_id})
                  </Text>
                </li>
              ),
            )}
        </ContentContainer>
      </MultiWalletTooltipContainer>
    </TooltipPortal>
  );
};

export default observer(MultiWalletTooltip);
