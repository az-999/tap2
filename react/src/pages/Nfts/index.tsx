import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import Modal from '@/components/Modal';
import Text from '@/components/UI/Text';

import { useGetMode } from '@/hooks/useGetMode';
import { useGetPathname } from '@/hooks/useGetPathname';
import AndroidIcon from '@/pages/Nfts/assets/AndroidIcon';
import AppleIcon from '@/pages/Nfts/assets/AppleIcon';
import Button from '@/pages/Nfts/components/Button';
import NavigationButton from '@/pages/Nfts/components/NavigationButton';
import NftImageTooltip from '@/pages/Nfts/components/NftImageTooltip';
import NftSellErrorTooltip from '@/pages/Nfts/components/NftSellErrorTooltip';
import ProcessingContent from '@/pages/Nfts/components/ProcessingContent';
import { NAV_DATA } from '@/pages/Nfts/const';
import {
  ButtonContainer,
  ContentContainer,
  NftsPageContainer,
  NoContent,
  TitleWrapper,
} from '@/pages/Nfts/styled';
import rootStore from '@/store';

const NftsPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const WebApp = useWebApp();
  const platform = WebApp.platform;

  const {
    nftsStore: { isModalOpen },
  } = rootStore;

  const {
    isShopNftPage,
    isForSellNftsPage,
    isSellNftsPage,
    isLootboxPage,
    isLootboxCraftPage,
  } = useGetPathname();
  const { isProdMode, isStageMode } = useGetMode();

  const lootBoxPages = isLootboxPage || isLootboxCraftPage;
  const withoutHeaderPages =
    isShopNftPage || isForSellNftsPage || isSellNftsPage || lootBoxPages;

  const getTitle = useCallback(() => {
    switch (pathname) {
      case '/nfts/marketplace':
        return {
          title: 'Marketplace',
          subtitle: [
            'Secondary sales of NFTs between users;',
            'set your own price and sell',
          ],
        };
      case '/nfts/bump-store':
        return {
          title: 'BUMP Store',
          subtitle: [
            'Direct NFT sales from BUMP developers; ',
            'announcements and new collections',
          ],
        };
      case '/nfts/my-nfts':
        return {
          title: 'My NFT',
          subtitle: ['NFTs owned by the user,', 'available for sale'],
        };
      default:
        return { title: '', subtitle: [''] };
    }
  }, [pathname]);

  if (platform === 'ios' || platform === 'macos') {
    return (
      <NoContent>
        <AndroidIcon />

        <div>
          <div>
            <Text fontSize={22} fontWeight={700}>
              NFT Store Available
            </Text>
            <Text fontSize={22} fontWeight={700}>
              for Android Only
            </Text>
          </div>

          <div>
            <Text fontSize={12} fontWeight={400}>
              iOS users, due to Apple’s policies,
            </Text>
            <Text fontSize={12} fontWeight={400}>
              we cannot provide access at this time,
            </Text>
            <Text fontSize={12} fontWeight={400}>
              but we are working on a solution
            </Text>
          </div>
        </div>

        <Button
          color="green"
          onClick={() =>
            WebApp.openLink(process.env.REACT_APP_WEB_ANNOUNCEMENT_PAGE)
          }
        >
          Learn how to switch to Web BUMP
        </Button>
      </NoContent>
    );
  }

  return (
    <NftsPageContainer>
      {withoutHeaderPages ? (
        <Outlet />
      ) : (
        <>
          <TitleWrapper>
            <Text fontSize={24} fontWeight={700}>
              {getTitle().title}
            </Text>

            <div>
              {getTitle().subtitle.map((sub) => (
                <Text
                  key={sub}
                  fontSize={12}
                  fontWeight={400}
                  color={'rgba(255, 255, 255, .8)'}
                >
                  {sub}
                </Text>
              ))}
            </div>
          </TitleWrapper>

          <ContentContainer>
            <ButtonContainer>
              {NAV_DATA.filter((navItem, index) =>
                isProdMode || isStageMode ? index !== 3 : navItem,
              ).map((navItem) => (
                <NavigationButton
                  key={navItem.id}
                  onClick={() => navigate(navItem.navigatePath)}
                  isActive={pathname === navItem.navigatePath}
                  size="medium"
                >
                  {navItem.title}
                </NavigationButton>
              ))}
            </ButtonContainer>

            <Outlet />
          </ContentContainer>
        </>
      )}

      <Modal
        isActive={isModalOpen}
        onClose={() => null}
        withoutCloseButton={true}
      >
        <ProcessingContent />
      </Modal>

      <NftImageTooltip />
      <NftSellErrorTooltip />
    </NftsPageContainer>
  );
};

export default observer(NftsPage);
