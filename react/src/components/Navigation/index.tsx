import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import AirdropNavigation from '@/assets/static/AirdropNavigation';
import BumpFunNavigation from '@/assets/static/BumpFunNavigation';
import MarketNavigation from '@/assets/static/MarketNavigation';
import StakingIcon from '@/assets/static/StakingIcon';
import MmproNavigation from '@/assets/static/mmproNavigation';

import { NavButton, NavWrapper, Text } from './styled';
import { BUMP_FUN_URL } from '@/store/const';
import {
  AirdropPath,
  AppPath,
  LootboxPath,
  NftsPath,
  RootPath,
} from '@/types/routes';

const { base } = RootPath;
const { nfts, airdrop } = AppPath;
const { marketplace, bumpStore, myNfts, lootbox } = NftsPath;
const airdropPaths = AirdropPath;
const { craft } = LootboxPath;

const navButtons = [
  {
    id: 1,
    title: 'Main',
    icon: <MmproNavigation />,
    navigate: base,
  },
  {
    id: 2,
    title: 'BumpFun',
    icon: <BumpFunNavigation />,
    navigate: BUMP_FUN_URL,
  },
  {
    id: 3,
    title: 'Staking',
    icon: <StakingIcon />,
    navigate: `${nfts}/${lootbox}/${craft}`,
  },
  {
    id: 4,
    title: 'Market',
    icon: <MarketNavigation />,
    navigate: `${nfts}/${marketplace}`,
    paths: [
      `${nfts}/${marketplace}`,
      `${nfts}/${bumpStore}`,
      `${nfts}/${myNfts}`,
    ],
  },
  {
    id: 5,
    title: 'Airdrop',
    icon: <AirdropNavigation />,
    navigate: airdrop,
    paths: [
      airdrop,
      ...Object.values(airdropPaths).map((i) => `${airdrop}/${i}`),
    ],
  },
];

const Navigation = ({ isMainPage }: { isMainPage: boolean }) => {
  const WebApp = useWebApp();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLinkClick = (navigatePath: string) => {
    navigatePath.startsWith('https://')
      ? navigateOutsideLink(navigatePath)
      : navigate(navigatePath);
  };

  const navigateOutsideLink = (navigatePath: string) =>
    WebApp.initData
      ? WebApp.openLink(navigatePath)
      : window.open(navigatePath, '_blank');

  return (
    <NavWrapper bottomNav={true} isMainPage={isMainPage}>
      {navButtons.map(({ id, title, icon, navigate: navigatePath, paths }) => (
        <NavButton
          key={id}
          onClick={() => handleLinkClick(navigatePath)}
          $isActive={
            paths?.includes(location.pathname) ??
            location.pathname === navigatePath
          }
          $isLastIndex={id === 5}
        >
          {icon}
          <Text>{title}</Text>
        </NavButton>
      ))}
    </NavWrapper>
  );
};

export default Navigation;
