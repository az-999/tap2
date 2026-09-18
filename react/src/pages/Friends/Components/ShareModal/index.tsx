import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import React, { useState } from 'react';
import Sheet from 'react-modal-sheet';

import CloseButton from '@/components/CloseButton';
import Text from '@/components/UI/Text';

import {
  ButtonsWrapper,
  ContentWrapper,
  CopiedMessage,
  CustomSheet,
  Header,
  InviteButton,
} from './styled';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { useGetMode } from '@/hooks/useGetMode';
import Copy from '@/pages/Friends/Assets/Copy';
import Telegram from '@/pages/Friends/Assets/Telegram';
import rootStore from '@/store';
import { BOT_NAME, BOT_NAME_PROD, BOT_NAME_STAGE } from '@/store/const';

type ShareModalProps = {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
};

const ShareModal = ({ isActive, setIsActive }: ShareModalProps) => {
  const {
    userStore: { userInfo },
  } = rootStore;
  const [isCopied, setIsCopied] = useState(false);

  const { isProdMode, isStageMode } = useGetMode();
  const WebApp = useWebApp();
  const { copyToClipboard } = useCopyToClipboard();

  const handleClose = () => {
    setIsActive(false);
  };

  const botName = isProdMode
    ? BOT_NAME_PROD
    : isStageMode
      ? BOT_NAME_STAGE
      : BOT_NAME;

  const openTelegramShare = () => {
    const referralUrl = `https://t.me/${botName}?start=ref_${userInfo?.telegram_id}`;
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(
      referralUrl,
    )}&text=${encodeURIComponent(
      'Bump gives you a unique way to earn TON with GameFi and SocialFi features. You can create spaceships, build your own fleet, participate in space battles, and earn from the actions of your invited friends. Get rewarded whenever your friends create NFTs, build ships, or trade on the market. This is a real opportunity to earn in the world of blockchain and cryptocurrency!',
    )}`;

    WebApp.initData
      ? WebApp.openTelegramLink(shareUrl)
      : window.open(shareUrl, '_blank');
  };

  const handleCopyClick = async () => {
    copyToClipboard(`Bump gives you a unique way to earn TON with GameFi and SocialFi features. You can create spaceships, build your own fleet, participate in space battles, and earn from the actions of your invited friends. Get rewarded whenever your friends create NFTs, build ships, or trade on the market. This is a real opportunity to earn in the world of blockchain and cryptocurrency! 

Click the link to get started: https://t.me/${botName}?start=ref_${userInfo?.telegram_id}`).then(
      () => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      },
    );
  };

  return (
    <CustomSheet
      isOpen={isActive}
      onClose={handleClose}
      disableDrag={true}
      detent="content-height"
    >
      <Sheet.Container>
        <Sheet.Header>
          <Header>
            <CloseButton onClick={handleClose} />
          </Header>
        </Sheet.Header>
        <Sheet.Content>
          <ContentWrapper>
            <Text fontSize={16} fontWeight={700}>
              Send Invite
            </Text>
            <ButtonsWrapper>
              <InviteButton onClick={openTelegramShare}>
                <Telegram />
                <Text fontSize={12} fontWeight={500}>
                  Send to Telegram
                </Text>
              </InviteButton>
              <InviteButton onClick={handleCopyClick}>
                {isCopied ? (
                  <CopiedMessage isActive={isCopied}>
                    <Text fontSize={12} fontWeight={500}>
                      Copied!
                    </Text>
                  </CopiedMessage>
                ) : (
                  <>
                    <Copy />
                    <Text fontSize={12} fontWeight={500}>
                      Copy link
                    </Text>
                  </>
                )}
              </InviteButton>
            </ButtonsWrapper>
          </ContentWrapper>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={handleClose} />
    </CustomSheet>
  );
};

export default ShareModal;
