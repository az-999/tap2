import { useTonConnectUI } from '@tonconnect/ui-react';
import {
  BackButton,
  WebAppProvider,
  useWebApp,
} from '@vkruglikov/react-telegram-web-app';
import { observer } from 'mobx-react-lite';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import CornerBoostersImg from '@/assets/decorations/CornerBoosters.png';
import CornerLeftImg from '@/assets/decorations/CornerLeft.png';
import CornerMainImg from '@/assets/decorations/CornerMain.png';
import CornerRightImg from '@/assets/decorations/CornerRight.png';
import IllustrationBottomLayout from '@/assets/decorations/IllustrationBottomLayout.png';
import IllustrationTopLayout from '@/assets/decorations/IllustrationTopLayout.png';

import DesktopDevice from '@/components/DesktopDevice';
import ErrorCraftShipModal from '@/components/ErrorCraftShipModal';
import ErrorTooltips from '@/components/ErrorTooltips';
import ExtraTaskModal from '@/components/ExtraTaskModal';
import GrantReward from '@/components/GrantReward';
import GrantRewardBox from '@/components/GrantRewardBox';
import MultiWalletTooltip from '@/components/MultiWalletTooltip';
import Navigation from '@/components/Navigation';
import NewVersionTooltip from '@/components/NewVersionTooltip';
import NftMintTooltip from '@/components/NftMintTooltip';
import RewardTooltip from '@/components/RewardTooltip';
import RewardTooltipWithoutBalance from '@/components/RewardTooltipWithoutBalance';
import StarryBackground from '@/components/StarryBackground';
import WalletButtonMenu from '@/components/WalletButtonMenu';

import useCurrentWidth from '@/hooks/useCurrentWidth';
import { useGetMode } from '@/hooks/useGetMode';
import { useGetTrustWalletPage } from '@/hooks/useGetTrustWalletPage';
import { GlobalStyles } from '@/layout/globalStyles';
import {
  CornerLeft,
  CornerRight,
  IllustrationBottom,
  IllustrationTop,
  MainContainer,
} from '@/layout/styled';
import { useGetLayoutData } from '@/layout/useGetLayoutData';
import AirdropTooltip from '@/pages/Airdrop/components/AirdropTooltip';
import Roadmap from '@/pages/Roadmap';
import PirateAndDefenseTooltips from '@/pages/Ships/components/Tooltips';
import MainPageBottomButtons from '@/pages/Tapper/components/MainPageBottomButtons';
import NewNftTooltip from '@/pages/Vouchers/Components/NewNftTooltip';
import rootStore from '@/store';
import { ANIMATION_DURATION } from '@/store/const';
import { AppPath, TasksPath } from '@/types/routes';
import Utils from '@/utils';
import walletStore from '@/walletStore';

type LayoutProps = {
  children: ReactNode | ReactNode[];
};

const Layout = ({ children }: LayoutProps) => {
  const {
    userStore: {
      initUser,
      isAppReady,
      isGrantBoxVisible,
      isRoadmapShowed,
      setIsRoadmapShowed,
    },
    shipsStore: { pirateAndDefenseTooltips },
    airdropStore: { isAirdropTooltipOpen },
  } = rootStore;
  const { setAccount } = walletStore;

  const refContainer = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isProdMode, isStageMode } = useGetMode();
  const { screenWidth } = useCurrentWidth();
  const WebApp = useWebApp();
  const platform = WebApp.platform;

  const isDesktop = platform === 'tdesktop';
  const isMobileDevice = isProdMode || isStageMode ? !isDesktop : true;

  const { isTrustWalletPage } = useGetTrustWalletPage();
  const {
    topDecorRule,
    walletButtonMenuRule,
    pagesWithoutFullScreen,
    pagesWithoutBottomPadding,
    pagesWithNavManu,
    cornerRightRule,
    cornerExtraRightRule,
    cornerLeftRule,
    isMainPage,
    isClickerPage,
    isGameIFramePage,
    isTrustwallet,
    isAirdropPages,
  } = useGetLayoutData();

  const [isFontsLoaded, setIsFontsLoaded] = useState(false);

  const [tonConnectUI] = useTonConnectUI();

  useEffect(() => {
    Utils.loadFonts()
      .then(() => {
        console.info('fonts loaded');
        setIsFontsLoaded(true);
      })
      .catch((error: any) => {
        console.error('One or more fonts failed to load:', error);
        setIsFontsLoaded(true);
      });

    const handleContextmenu = (e: MouseEvent) => {
      if (!isProdMode && !isStageMode) return;

      e.preventDefault();
    };
    document.addEventListener('contextmenu', handleContextmenu);

    return () => {
      document.removeEventListener('contextmenu', handleContextmenu);
    };
  }, []);

  useEffect(() => {
    setAccount(tonConnectUI?.account);
  }, [setAccount, tonConnectUI]);

  useEffect(() => {
    if (isMobileDevice && !isTrustWalletPage) {
      initUser({
        showDailyFn: () => navigate(`${AppPath.tasks}/${TasksPath.daily}`),
        showTutorialFn: () => navigate(AppPath.tutorial),
      });

      if (
        process.env.REACT_APP_ANALYTICS_RECORD_TOKEN &&
        process.env.REACT_APP_ANALYTICS_APP_NAME &&
        window.telegramAnalytics
      ) {
        window.telegramAnalytics.init({
          token: process.env.REACT_APP_ANALYTICS_RECORD_TOKEN,
          appName: process.env.REACT_APP_ANALYTICS_APP_NAME,
        });
      }

      if ('Telegram' in window) {
        window.Telegram.WebApp.isClosingConfirmationEnabled = true;
        window.Telegram.WebApp.isVerticalSwipesEnabled = false;
      }

      navigate(AppPath.announcement);
    }
  }, [initUser]);

  useEffect(() => {
    if (
      !isClickerPage ||
      !WebApp.initData ||
      !isRoadmapShowed ||
      pirateAndDefenseTooltips.length ||
      isAirdropTooltipOpen
    )
      return;

    const preventDefault = (e: TouchEvent) => {
      if (e.type === 'touchmove') {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', preventDefault, { passive: false });

    return () => {
      document.removeEventListener('touchmove', preventDefault);
    };
  }, [
    isClickerPage,
    isRoadmapShowed,
    pirateAndDefenseTooltips.length,
    isAirdropTooltipOpen,
  ]);

  useEffect(() => {
    if (!isFontsLoaded) return;

    const timer = setTimeout(
      () => {
        setIsRoadmapShowed(true);
      },
      (ANIMATION_DURATION / 5) * 3,
    ); // 3 секунды;

    return () => clearTimeout(timer);
  }, [isFontsLoaded]);

  useEffect(() => {
    if (!Swal.isVisible()) return;
    Swal.close();
  }, [pathname]);

  return (
    <WebAppProvider options={{ smoothButtonsTransition: true }}>
      {!isClickerPage && <BackButton onClick={() => navigate(-1)} />}

      <GlobalStyles $initData={WebApp.initData} />
      {!isGameIFramePage && !isAirdropPages && <StarryBackground />}

      {isFontsLoaded &&
        (isMobileDevice &&
        ((!WebApp.initData && screenWidth < 500) ||
          (WebApp.initData && screenWidth < 1200)) ? (
          <>
            {(isAppReady && isRoadmapShowed) || isTrustWalletPage ? (
              <>
                <NewVersionTooltip />
                <MultiWalletTooltip />
                <GrantReward />
                <ErrorTooltips />
                <NewNftTooltip />
                <NftMintTooltip />
                <RewardTooltip />
                <RewardTooltipWithoutBalance />

                {pagesWithoutFullScreen && (
                  <>
                    <ErrorCraftShipModal />
                    <ExtraTaskModal />
                    <PirateAndDefenseTooltips />
                    <AirdropTooltip />
                  </>
                )}

                <GrantRewardBox />

                {walletButtonMenuRule && <WalletButtonMenu />}

                <MainContainer
                  isMainPage={isClickerPage}
                  isWithoutBottomPadding={pagesWithoutBottomPadding}
                  ref={refContainer}
                >
                  {topDecorRule && (
                    <IllustrationTop
                      src={IllustrationTopLayout}
                      rel="preload"
                      data-tooltip-id="tasks-claim-modal"
                    />
                  )}

                  {cornerRightRule && (
                    <CornerRight
                      $isWide={false}
                      src={CornerRightImg}
                      rel="preload"
                    />
                  )}

                  {cornerExtraRightRule && (
                    <CornerRight
                      $isWide
                      src={isMainPage ? CornerMainImg : CornerBoostersImg}
                      rel="preload"
                    />
                  )}

                  {cornerLeftRule && !isGrantBoxVisible && (
                    <CornerLeft src={CornerLeftImg} rel="preload" />
                  )}

                  {children}

                  {pagesWithNavManu && (
                    <>
                      <Navigation isMainPage={isClickerPage} />
                      <IllustrationBottom
                        src={IllustrationBottomLayout}
                        rel="preload"
                      />
                    </>
                  )}

                  {isTrustwallet && (
                    <IllustrationBottom
                      src={IllustrationBottomLayout}
                      rel="preload"
                    />
                  )}

                  {isClickerPage && <MainPageBottomButtons />}
                </MainContainer>
              </>
            ) : (
              <Roadmap />
            )}
          </>
        ) : (
          <>
            <CornerRight $isWide src={CornerBoostersImg} rel="preload" />
            <DesktopDevice />
          </>
        ))}
    </WebAppProvider>
  );
};

export default observer(Layout);
