import { TonConnectButton } from '@tonconnect/ui-react';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import IllustrationTopLayout from '@/assets/decorations/IllustrationTopLayout.png';

import Text from '@/components/UI/Text';

import BumpIcon from '@/pages/MultiWalletPage/assets/BumpIcon';
import WalletIcon from '@/pages/MultiWalletPage/assets/WalletIcon';
import {
  ButtonContainer,
  ContentContainer,
  GlobalStyles,
  IllustrationTop,
  LogoContainer,
  MultiWalletPageContainer,
  ResponseText,
  StyledList,
  Subtitle,
  TitleContainer,
} from '@/pages/MultiWalletPage/styled';
import rootStore from '@/store';
import { RootPath } from '@/types/routes';

const MultiWalletPage = () => {
  const navigate = useNavigate();
  const {
    userStore: {
      walletUsersList,
      isWalletDisconnect,
      isWalletSuccess,
      setIsWalletInvalid,
      setWalletUsersList,
      isRoadmapShowed,
    },
  } = rootStore;
  const isAccessResumed = !isWalletDisconnect && isWalletSuccess;
  const isReconnectedWalletInvalid =
    walletUsersList && isWalletDisconnect === false && !isWalletSuccess;

  useEffect(() => {
    if (!isAccessResumed) return;

    const navigateToMainPage = () => {
      setIsWalletInvalid(false);
      setWalletUsersList(null);
      navigate(RootPath.base, { replace: true });
    };

    setTimeout(navigateToMainPage, 5_000);
  }, [isAccessResumed]);

  if (!isRoadmapShowed) return null;

  return (
    <MultiWalletPageContainer>
      <GlobalStyles />
      <IllustrationTop
        src={IllustrationTopLayout}
        rel="preload"
        data-tooltip-id="tasks-claim-modal"
      />

      <TitleContainer>
        <WalletIcon />
        <Text fontSize={24} fontWeight={600}>
          One wallet per account
        </Text>
        <div>
          <Text fontSize={14} fontWeight={400}>
            According to our rules, one wallet can be
          </Text>
          <Text fontSize={14} fontWeight={400}>
            linked to only one user account
          </Text>
        </div>
      </TitleContainer>

      <ContentContainer>
        {!isAccessResumed && walletUsersList && (
          <StyledList>
            <Text fontSize={12} fontWeight={600}>
              Wallet address linked to accounts:
            </Text>

            <div>
              {walletUsersList.map(
                ({ name_first, name_last, username, chat_id }) => (
                  <li key={chat_id}>
                    <Text fontSize={12} fontWeight={400}>
                      {name_first} {name_last} ({username}, id: {chat_id})
                    </Text>
                  </li>
                ),
              )}
            </div>
          </StyledList>
        )}
      </ContentContainer>

      <ButtonContainer>
        {isWalletDisconnect && walletUsersList && (
          <Subtitle>
            <Text fontSize={14} fontWeight={600}>
              Now connect your wallet
            </Text>
          </Subtitle>
        )}

        <>
          {isAccessResumed && (
            <ResponseText>
              <Text fontSize={14} fontWeight={600}>
                <span id="highlight-text">
                  Access to the application has been resumed.
                </span>{' '}
              </Text>
              <Text fontSize={14} fontWeight={600}>
                After 5 seconds, you will be redirected
              </Text>
              <Text fontSize={14} fontWeight={600}>
                to the application
              </Text>
            </ResponseText>
          )}

          {isReconnectedWalletInvalid && (
            <Subtitle>
              <Text fontSize={14} fontWeight={600}>
                Please use a wallet on this account
              </Text>
              <Text fontSize={14} fontWeight={600}>
                that is not linked to others
              </Text>
            </Subtitle>
          )}
        </>

        <TonConnectButton />
      </ButtonContainer>

      <LogoContainer>
        <div>
          <Text fontSize={8} fontWeight={500}>
            Beta
          </Text>
        </div>
        <BumpIcon />
      </LogoContainer>
    </MultiWalletPageContainer>
  );
};

export default observer(MultiWalletPage);
