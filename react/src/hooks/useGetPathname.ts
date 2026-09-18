import { useLocation } from 'react-router-dom';

export const useGetPathname = () => {
  const { pathname } = useLocation();

  const isMainPage = pathname === '/';
  const isClickerPage = pathname === '/clicker';
  const isBoostersPage = pathname === '/boosters';
  const isRatingPage = pathname === '/rating';
  const isDailyRewardsPage = pathname === '/tasks/daily';
  const isCommunityPage = pathname === '/tasks/community';
  const isKolsPage = pathname === '/tasks/kols';
  const isGamePage = pathname === '/tasks/game';
  const isCraftShipsPage = pathname === '/ships/ship-craft';
  const isGameIFramePage = pathname === '/tasks/game/space-arcade';
  const isTutorialPage = pathname === '/tutorial';
  const isAnnouncementPage = pathname === '/announcement';
  const isNftsPage = pathname === '/nfts';
  const isMarketplacePage = pathname === '/nfts/marketplace';
  const isBumpStorePage = pathname === '/nfts/bump-store';
  const isMyNftsPage = pathname === '/nfts/my-nfts';
  const isSellNftsPage = pathname === '/nfts/sell';
  const isForSellNftsPage = pathname === '/nfts/for-sell';
  const isShopNftPage = pathname === '/nfts/shop';
  const isLootboxPage = pathname === '/nfts/lootbox';
  const isLootboxCraftPage = pathname === '/nfts/lootbox/craft';
  const isBumpTicketPage = pathname === '/bump-ticket';
  const isTrustwallet = pathname === '/trustwallet';
  const isAirdropPage = pathname === '/airdrop';
  const isAirdropSeasonsPage = pathname === '/airdrop/season-tasks';
  const isAirdropSynthesisEnginePage = pathname === '/airdrop/synthesis-engine';
  const isAirdropBumpFlyPage = pathname === '/airdrop/bump-fly';
  const isAirdropRatingPage = pathname === '/airdrop/rating';
  const isAirdropHowItWorkPage = pathname === '/airdrop/how-it-work';
  const isAirdropPages = pathname.includes('/airdrop');

  return {
    isMainPage,
    isClickerPage,
    isBoostersPage,
    isRatingPage,
    isDailyRewardsPage,
    isCommunityPage,
    isKolsPage,
    isGamePage,
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
    isAirdropPage,
    isAirdropSeasonsPage,
    isAirdropSynthesisEnginePage,
    isAirdropBumpFlyPage,
    isAirdropRatingPage,
    isAirdropHowItWorkPage,
    isAirdropPages,
  };
};
