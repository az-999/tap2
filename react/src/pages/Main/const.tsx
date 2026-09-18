import { ReactNode } from 'react';

import AirdropIcon from '@/pages/Airdrop/assets/AirdropIcon';
import BumpTokenIcon from '@/pages/Airdrop/assets/BumpTokenIcon';
import MmproIcon from '@/pages/Airdrop/assets/MmproIcon';
import WalletIcon from '@/pages/Main/assets/WalletIcon';
import airdripNewsImg from '@/pages/Main/assets/aidrop-bg.png';
import bumpNewsImg from '@/pages/Main/assets/bump-2.png';
import clickerPageImg from '@/pages/Main/assets/clicker-page.png';
import friendsPageImg from '@/pages/Main/assets/friends-page.png';
import piratePageImg from '@/pages/Main/assets/pirate-page.png';
import shipsPageImg from '@/pages/Main/assets/ships-page.png';
import tasksPageImg from '@/pages/Main/assets/tasks-page.png';
import MmproTokenIcon from '@/pages/Nfts/components/Lootbox/LootboxMonthlyField/assets/MmproTokenIcon';
import { AppPath, ShipsPath, TasksPath } from '@/types/routes';

export type LargeBanner = {
  title: string;
  subTitle: string;
  link: string;
  image: string;
};

export type Banner = {
  title: string;
  link: string;
  image: string;
};

export type News = {
  title: ReactNode;
  subtitle: string;
  image: string;
};

type PageData = {
  balance: {
    id: string;
    title: string;
    icon: ReactNode;
    secIcon?: ReactNode;
  }[];
  activity: {
    largeBanners: (LargeBanner & {
      id: string;
    })[];
    regularBanners: (Banner & {
      id: string;
    })[];
  };
  news: (News & { id: string })[];
};

export const PAGE_DATA: PageData = {
  balance: [
    {
      id: window.self.crypto.randomUUID(),
      icon: <MmproIcon />,
      title: 'MMPro Points',
    },
    {
      id: window.self.crypto.randomUUID(),
      icon: <AirdropIcon />,
      title: 'Airdrop Points',
    },
    {
      id: window.self.crypto.randomUUID(),
      icon: <MmproTokenIcon />,
      title: 'MMPro Tokens',
    },
    {
      id: window.self.crypto.randomUUID(),
      icon: <BumpTokenIcon />,
      secIcon: <WalletIcon />,
      title: 'Bump Tokens',
    },
  ],
  activity: {
    largeBanners: [
      {
        id: window.self.crypto.randomUUID(),
        title: 'Clicker',
        subTitle: 'Earn by clicking',
        link: AppPath.clicker,
        image: clickerPageImg,
      },
      {
        id: window.self.crypto.randomUUID(),
        title: 'Bump Wars',
        subTitle: 'Pirate or Guardian',
        link: `${AppPath.ships}/${ShipsPath.modeSelection}`,
        image: piratePageImg,
      },
    ],
    regularBanners: [
      {
        id: window.self.crypto.randomUUID(),
        title: 'Tasks',
        link: `${AppPath.tasks}/${TasksPath.kols}`,
        image: tasksPageImg,
      },
      {
        id: window.self.crypto.randomUUID(),
        title: 'Friends',
        link: AppPath.friends,
        image: friendsPageImg,
      },
      {
        id: window.self.crypto.randomUUID(),
        title: 'NFT Spaceships',
        link: `${AppPath.ships}/${ShipsPath.banners}`,
        image: shipsPageImg,
      },
    ],
  },
  news: [
    {
      id: window.self.crypto.randomUUID(),
      title: (
        <>
          <span id="green">Airdrop</span> Season 1
        </>
      ),
      subtitle:
        'Airdrop activities are here! Take part and make the most of them!',
      image: airdripNewsImg,
    },
    {
      id: window.self.crypto.randomUUID(),
      title: (
        <>
          Bump 2.0 <span id="green">is live</span>
        </>
      ),
      subtitle:
        'Don’t miss your chance to be one of the first to experience Bump 2.0!',
      image: bumpNewsImg,
    },
  ],
};
