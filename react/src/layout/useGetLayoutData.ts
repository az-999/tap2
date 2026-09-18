import { useGetPathname } from '@/hooks/useGetPathname';

export const useGetLayoutData = () => {
  const {
    isMainPage,
    isClickerPage,
    isBoostersPage,
    isRatingPage,
    isDailyRewardsPage,
    isCommunityPage,
    isKolsPage,
    isCraftShipsPage,
    isGameIFramePage,
    isTutorialPage,
    isAnnouncementPage,
    isNftsPage,
    isMarketplacePage,
    isBumpStorePage,
    isMyNftsPage,
    isSellNftsPage,
    isForSellNftsPage,
    isShopNftPage,
    isLootboxPage,
    isLootboxCraftPage,
    isBumpTicketPage,
    isTrustwallet,
    isAirdropPages,
  } = useGetPathname();

  const nftsPages =
    isNftsPage || isMarketplacePage || isBumpStorePage || isMyNftsPage;

  const nftsShopDetailsPages =
    isSellNftsPage || isForSellNftsPage || isShopNftPage;

  const lootBoxPages = isLootboxPage || isLootboxCraftPage;

  const topDecorRule = isCommunityPage || isKolsPage || nftsShopDetailsPages;

  const walletButtonMenuRule =
    !isTutorialPage &&
    !isDailyRewardsPage &&
    !isGameIFramePage &&
    !isAnnouncementPage &&
    !isTrustwallet;

  const pagesWithoutFullScreen =
    !isTutorialPage && !isDailyRewardsPage && !isAnnouncementPage;

  const pagesWithoutBottomPadding =
    isDailyRewardsPage ||
    isTutorialPage ||
    isAnnouncementPage ||
    isAirdropPages ||
    isMainPage;

  const pagesWithNavManu =
    !isDailyRewardsPage &&
    !isTutorialPage &&
    !isGameIFramePage &&
    !isAnnouncementPage &&
    !isTrustwallet;

  const cornerRightRule =
    isBumpStorePage ||
    lootBoxPages ||
    isBumpTicketPage ||
    isCraftShipsPage ||
    isTrustwallet;

  const cornerExtraRightRule = isBoostersPage || isRatingPage || isMainPage;

  const cornerLeftRule =
    nftsPages || lootBoxPages || isBumpTicketPage || isCraftShipsPage;

  return {
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
    isBoostersPage,
    isRatingPage,
    isTrustwallet,
    isAirdropPages,
  };
};
