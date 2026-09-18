import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Airdrop from '@/pages/Airdrop';
import AirdropRatingPage from '@/pages/Airdrop/pages/AirdropRating';
import BumpFly from '@/pages/Airdrop/pages/BumpFly';
import HowItWorkPage from '@/pages/Airdrop/pages/HowItWork';
import SeasonTasksPage from '@/pages/Airdrop/pages/SeasonTasks';
import SynthesisEngine from '@/pages/Airdrop/pages/SynthesisEngine';
import Announcement from '@/pages/Announcement';
import Boosters from '@/pages/Boosters';
import Bump from '@/pages/Bump';
import BumpTicketPage from '@/pages/BumpTicket';
import Debug from '@/pages/Debug';
import Friends from '@/pages/Friends';
import Main from '@/pages/Main';
import NftsPage from '@/pages/Nfts';
import BumpStorePage from '@/pages/Nfts/pages/BumpStorePage';
import BuyNftPage from '@/pages/Nfts/pages/BuyNftPage';
import ForSellNftPage from '@/pages/Nfts/pages/ForSellNftPage';
import LootboxCraftPage from '@/pages/Nfts/pages/LootboxCraftPage';
import LootboxPage from '@/pages/Nfts/pages/LootboxPage';
import MarketplacePage from '@/pages/Nfts/pages/MarketplacePage';
import MyNftsPage from '@/pages/Nfts/pages/MyNftsPage';
import WithdrawNftPage from '@/pages/Nfts/pages/WithdrawNftPage';
import Rating from '@/pages/Rating';
import BannersPage from '@/pages/Ships/pages/BannersPage';
import DefensePage from '@/pages/Ships/pages/DefensePage';
import DefenseWidgetPage from '@/pages/Ships/pages/DefenseWidgetPage';
import ModeSelectionPage from '@/pages/Ships/pages/ModeSelectionPage';
import PiratePage from '@/pages/Ships/pages/PiratePage';
import ShipsCraftPage from '@/pages/Ships/pages/ShipsCraftPage';
import Tapper from '@/pages/Tapper';
import Tasks from '@/pages/Tasks';
import DailyRewardsPage from '@/pages/Tasks/sections/pages/DailyRewardsPage';
import GamePage from '@/pages/Tasks/sections/pages/GamePage';
import GameIFramePage from '@/pages/Tasks/sections/pages/GamePage/components/GameIFramePage';
import CommunityPage from '@/pages/Tasks/sections/pages/TasksPages/CommunityPage';
import KolsPage from '@/pages/Tasks/sections/pages/TasksPages/KolsPage';
import TrustWalletPage from '@/pages/TrustWalletPage';
import Tutorial from '@/pages/Tutorial';
import UserDebug from '@/pages/UserDebug';
import {
  AirdropPath,
  AppPath,
  GamePath,
  LootboxPath,
  NftsPath,
  RootPath,
  ShipsPath,
  TasksPath,
} from '@/types/routes';

function App() {
  const WebApp = useWebApp();

  useEffect(() => {
    WebApp.expand();
    WebApp.ready();
  }, []);

  const { base } = RootPath;
  const {
    clicker,
    boosters,
    bump,
    friends,
    rating,
    tasks,
    nfts,
    bumpTicket,
    debug,
    tutorial,
    announcement,
    userDebug,
    trustWallet,
    ships,
    airdrop,
  } = AppPath;
  const { community, kols, daily, game } = TasksPath;
  const { spaceArcade } = GamePath;
  const { shipCraft, pirate, defense, defenseWidget, modeSelection, banners } =
    ShipsPath;
  const { marketplace, bumpStore, myNfts, sell, forSell, shop, lootbox } =
    NftsPath;
  const { craft } = LootboxPath;
  const { seasonTasks, synthesisEngine, bumpFly, airdropRating, howItWork } =
    AirdropPath;

  return (
    <Routes>
      <Route path={base} element={<Main />} />
      <Route path={clicker} element={<Tapper />} />
      <Route path={boosters} element={<Boosters />} />
      <Route path={bump} element={<Bump />} />
      <Route path={friends} element={<Friends />} />
      <Route path={rating} element={<Rating />} />
      <Route path={tasks} element={<Tasks />}>
        <Route path={community} element={<CommunityPage />} />
        <Route path={kols} element={<KolsPage />} />
        <Route path={daily} element={<DailyRewardsPage />} />
        <Route path={game} element={<GamePage />}>
          <Route path={spaceArcade} element={<GameIFramePage />} />
        </Route>
      </Route>
      <Route path={nfts} element={<NftsPage />}>
        <Route path={marketplace} element={<MarketplacePage />} />
        <Route path={bumpStore} element={<BumpStorePage />} />
        <Route path={myNfts} element={<MyNftsPage />} />
        <Route path={sell} element={<WithdrawNftPage />} />
        <Route path={forSell} element={<ForSellNftPage />} />
        <Route path={shop} element={<BuyNftPage />} />
        <Route path={lootbox} element={<LootboxPage />}>
          <Route path={craft} element={<LootboxCraftPage />}></Route>
        </Route>
      </Route>
      <Route path={ships}>
        <Route path={banners} element={<BannersPage />} />
        <Route path={modeSelection} element={<ModeSelectionPage />} />
        <Route path={shipCraft} element={<ShipsCraftPage />} />
        <Route path={pirate} element={<PiratePage />} />
        <Route path={defense} element={<DefensePage />} />
        <Route path={defenseWidget} element={<DefenseWidgetPage />} />
      </Route>
      <Route path={airdrop} element={<Airdrop />}>
        <Route path={seasonTasks} element={<SeasonTasksPage />} />
        <Route path={synthesisEngine} element={<SynthesisEngine />} />
        <Route path={bumpFly} element={<BumpFly />} />
        <Route path={airdropRating} element={<AirdropRatingPage />} />
        <Route path={howItWork} element={<HowItWorkPage />} />
      </Route>
      <Route path={bumpTicket} element={<BumpTicketPage />} />
      <Route path={debug} element={<Debug />} />
      <Route path={tutorial} element={<Tutorial />} />
      <Route path={announcement} element={<Announcement />} />
      <Route path={userDebug} element={<UserDebug />} />
      <Route path={trustWallet} element={<TrustWalletPage />} />
    </Routes>
  );
}

export default App;
