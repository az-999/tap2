import {
  useHapticFeedback,
  useWebApp,
} from '@vkruglikov/react-telegram-web-app';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { css } from 'styled-components/macro';

import LoadingIcon from '@/assets/LoadingIcon';
import IllustrationTopLayout from '@/assets/decorations/IllustrationTopLayout.png';

import BackButton from '@/components/BackButton';
import ClaimRewardButton from '@/components/ClaimReward';
import InfoTooltip from '@/components/InfoTooltip';
import Button from '@/components/UI/Button';
import Text from '@/components/UI/Text';

import Friend from '@/pages/Friends/Assets/Friend';
import FriendIcon from '@/pages/Friends/Assets/FriendIcon';
import FriendInvite from '@/pages/Friends/Assets/FriendInvite';
import FriendRating from '@/pages/Friends/Assets/FriendRating';
import InfoIcon from '@/pages/Friends/Assets/InfoIcon';
import UpdateIcon from '@/pages/Friends/Assets/UpdateIcon';
import ShareModal from '@/pages/Friends/Components/ShareModal';
import {
  ButtonContainer,
  ButtonWrapper,
  ContentWrapper,
  FriendsCountContainer,
  IllustrationTop,
  LoadingContainer,
  NewFriendsList,
  NewFriendsListCol,
  NewFriendsListItem,
  NewFriendsListTitle,
  NoFriendContainer,
  NoFriendWrapper,
  RewardContainer,
  TitleWrapper,
  TooltipRow,
  Wrapper,
} from '@/pages/Friends/styled';
import rootStore from '@/store';
import { AppPath } from '@/types/routes';
import utils from '@/utils';

const Friends = () => {
  const {
    friendsStore: {
      claimSum,
      updateUserBalance,
      friends,
      getFriends,
      friendsClaim,
      friendsCount,
      updateFriendsList,
    },
    userStore: { userInfo },
    isVibrateActive,
    isShowInfoTooltip,
    isShowWinTooltip,
    showWinTooltip,
    isLoading,
  } = rootStore;

  const navigate = useNavigate();

  const isFriendsExisting = friends && friends?.length > 0;

  const [isActiveShareModal, setIsActiveShareModal] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [isFriendsListReloaded, setIsFriendsListReloaded] = useState(false);
  const [impactOccurred] = useHapticFeedback();
  const WebApp = useWebApp();

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  const claim = Number(claimSum).toLocaleString('ru-RU') || 0;

  const handleClaimClick = () => {
    updateUserBalance().catch((e) => console.error(e));
    setIsExploding(true);

    if (isVibrateActive) {
      if (WebApp.initData) {
        impactOccurred('medium');
      }

      if (!WebApp.initData && 'vibrate' in window.navigator) {
        window.navigator.vibrate(30);
      }
    }

    setTimeout(setIsExploding, 3000);
  };

  const handleFriendsReloadButtonClick = async () => {
    setIsFriendsListReloaded(true);
    setTimeout(() => setIsFriendsListReloaded(false), 600);

    await updateFriendsList();
  };

  useEffect(() => {
    if (friends !== null) return;

    getFriends().catch((e) => console.error(e));
  }, [friends, getFriends]);

  /** запрашиваем еще список друзей если сработал скролл (пагинация) */
  useEffect(() => {
    if (!inView || friendsCount === friends?.length || friends === null) return;

    getFriends().catch((e) => console.error(e));
  }, [inView, getFriends]);

  return (
    <Wrapper>
      <BackButton delta={-1} />

      <ContentWrapper>
        <IllustrationTop src={IllustrationTopLayout} rel="preload" />
        <TitleWrapper>
          <Text fontSize={24} fontWeight={700}>
            Invite Friends and Earn!
          </Text>
          <Text
            fontSize={12}
            fontWeight={400}
            color={'rgba(255, 255, 255, .8)'}
          >
            {/*Reward: 10% from referrals and 5% from their referrals*/}
            Get 10% from your friend's points
            {/* {fetchState} */}
          </Text>
        </TitleWrapper>

        <ButtonContainer data-tooltip-id="claim-tooltip">
          <Button
            onClick={() => navigate(AppPath.rating)}
            fragment={css`
              background-color: #232426;
              box-shadow: none;
              border-radius: 10px;
            `}
          >
            <ButtonWrapper>
              <FriendRating />
              <Text fontSize={12} fontWeight={500}>
                Your rating
              </Text>
            </ButtonWrapper>
          </Button>
          <Button
            onClick={() => setIsActiveShareModal(true)}
            fragment={css`
              border-radius: 10px;
            `}
          >
            <ButtonWrapper>
              <FriendInvite />
              <Text fontSize={12} fontWeight={500}>
                Invite Friends
              </Text>
            </ButtonWrapper>
          </Button>
        </ButtonContainer>

        <InfoTooltip isShowTooltip={isShowWinTooltip} tooltipId="claim-tooltip">
          You Got <span style={{ fontWeight: 600 }}>+{claim}</span> MMPro Points
        </InfoTooltip>

        {isLoading ? (
          <LoadingContainer>
            <LoadingIcon />
          </LoadingContainer>
        ) : isFriendsExisting ? (
          <>
            <NewFriendsListTitle>
              <FriendsCountContainer $isReloaded={isFriendsListReloaded}>
                <Text
                  fontSize={15}
                  fontWeight={600}
                  color={'rgba(255, 255, 255, 1)'}
                >
                  {friendsCount === 1 ? '1 Friend' : `${friendsCount} Friends`}
                </Text>
                <button
                  id="friends-reload-icon"
                  onClick={handleFriendsReloadButtonClick}
                >
                  <UpdateIcon />
                </button>
              </FriendsCountContainer>

              <RewardContainer>
                <Text fontSize={15} fontWeight={600}>
                  Your reward
                </Text>
                <button
                  data-tooltip-id="info-reward-tooltip"
                  onClick={() => showWinTooltip(true)}
                >
                  <InfoIcon />
                </button>
              </RewardContainer>

              <Tooltip
                id="info-reward-tooltip"
                place="bottom"
                isOpen={isShowInfoTooltip}
                style={{ width: '70%' }}
              >
                <TooltipRow>
                  <Text
                    fontSize={14}
                    fontWeight={400}
                    styledFragment={css`
                      text-align: center;
                    `}
                  >
                    When your referrals claim their rewards, you will see their
                    results
                  </Text>
                </TooltipRow>
              </Tooltip>
            </NewFriendsListTitle>
            <NewFriendsList>
              {friends.map((friend, index) => {
                return (
                  <NewFriendsListItem key={index}>
                    <NewFriendsListCol>
                      <Text
                        fontSize={14}
                        fontWeight={400}
                        color={'rgba(255, 255, 255, 1)'}
                      >
                        {friend.name_first} {friend.name_last}
                      </Text>
                    </NewFriendsListCol>
                    <NewFriendsListCol>
                      <FriendIcon />
                      <Text
                        fontSize={16}
                        fontWeight={700}
                        color={'rgba(255, 255, 255, 1)'}
                      >
                        {utils.formatNumber(friend.ref_balance)}
                      </Text>
                    </NewFriendsListCol>
                  </NewFriendsListItem>
                );
              })}

              <div ref={ref} />
            </NewFriendsList>
          </>
        ) : (
          <NoFriendWrapper>
            <Text
              fontSize={15}
              fontWeight={600}
              styledFragment={css`
                align-self: flex-start;
              `}
            >
              0 Friends
            </Text>
            <NoFriendContainer>
              <Friend />
              <Text
                fontSize={15}
                fontWeight={400}
                color="rgba(255, 255, 255, 0.6)"
                styledFragment={css`
                  text-align: center;
                  padding: 0 10px;
                `}
              >
                You haven't invited your friends to join the shared earning yet
              </Text>
              <Text fontSize={16} fontWeight={500}>
                Send an invite now!
              </Text>
            </NoFriendContainer>
          </NoFriendWrapper>
        )}
      </ContentWrapper>

      <ClaimRewardButton
        onClick={handleClaimClick}
        claimValue={friendsClaim}
        disabled={isLoading || !friendsClaim}
        isActive={Boolean(isFriendsExisting)}
      />

      <ShareModal
        isActive={isActiveShareModal}
        setIsActive={setIsActiveShareModal}
      />

      {isExploding && (
        <ConfettiExplosion
          force={0.9}
          duration={2500}
          particleCount={300}
          zIndex={100}
        />
      )}
    </Wrapper>
  );
};

export default observer(Friends);
