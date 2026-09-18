import generatorAlpha from '@/pages/Nfts/pages/LootboxCraftPage/assets/DriveCore-Alpha.png';
import generatorBeta from '@/pages/Nfts/pages/LootboxCraftPage/assets/DriveCore-Beta.png';
import generatorDelta from '@/pages/Nfts/pages/LootboxCraftPage/assets/DriveCore-Delta.png';
import generatorEpsilon from '@/pages/Nfts/pages/LootboxCraftPage/assets/DriveCore-Epsilon.png';
import generatorEta from '@/pages/Nfts/pages/LootboxCraftPage/assets/DriveCore-Eta.png';
import generatorGamma from '@/pages/Nfts/pages/LootboxCraftPage/assets/DriveCore-Gamma.png';
import generatorIota from '@/pages/Nfts/pages/LootboxCraftPage/assets/DriveCore-Iota.png';
import generatorTheta from '@/pages/Nfts/pages/LootboxCraftPage/assets/DriveCore-Theta.png';
import generatorZeta from '@/pages/Nfts/pages/LootboxCraftPage/assets/DriveCore-Zeta.png';

export type StakingSlideItem = {
  id: number;
  title: string;
  image: string;
  apy: number;
  monthlyReward: {
    points: number;
    nft: number;
  };
};

export const EXPLANATION_LIST_ITEMS = [
  {
    id: `explanation-lootbox-title-1`,
    sequence: 1,
    title: 'Select Staking Amount and Duration',
    list: [
      "Choose the number of MMPro Tokens you'd like to stake and the duration (e.g., 3 months)",
    ],
  },
  {
    id: `explanation-lootbox-title-2`,
    sequence: 2,
    title: 'Earn Monthly Rewards',
    list: [
      'While your tokens are staked, you’ll earn monthly rewards in MMPro Tokens and NFTs based on the staking plan',
    ],
  },
  {
    id: `explanation-lootbox-title-3`,
    sequence: 3,
    title: 'Restake or Unstake',
    list: [
      'At the end of the staking period, you can claim your rewards and either restake for more rewards or unstake your staked tokens',
    ],
  },
];

export const SLIDER_DATA: StakingSlideItem[] = [
  {
    id: 1,
    title: 'DriveCore Alpha',
    image: generatorAlpha,
    apy: 15,
    monthlyReward: {
      points: 12.5,
      nft: 1,
    },
  },
  {
    id: 2,
    title: 'DriveCore Beta',
    image: generatorBeta,
    apy: 20,
    monthlyReward: {
      points: 16.7,
      nft: 4,
    },
  },
  {
    id: 3,
    title: 'DriveCore Gamma',
    image: generatorGamma,
    apy: 25,
    monthlyReward: {
      points: 20.8,
      nft: 21,
    },
  },
  {
    id: 4,
    title: 'DriveCore Delta',
    image: generatorDelta,
    apy: 20,
    monthlyReward: {
      points: 166.7,
      nft: 14,
    },
  },
  {
    id: 5,
    title: 'DriveCore Epsilon',
    image: generatorEpsilon,
    apy: 25,
    monthlyReward: {
      points: 208.0,
      nft: 53,
    },
  },
  {
    id: 6,
    title: 'DriveCore Zeta',
    image: generatorZeta,
    apy: 30,
    monthlyReward: {
      points: 250.0,
      nft: 254,
    },
  },
  {
    id: 7,
    title: 'DriveCore Eta',
    image: generatorEta,
    apy: 25,
    monthlyReward: {
      points: 1041.7,
      nft: 88,
    },
  },
  {
    id: 8,
    title: 'DriveCore Theta',
    image: generatorTheta,
    apy: 30,
    monthlyReward: {
      points: 1250.0,
      nft: 318,
    },
  },
  {
    id: 9,
    title: 'DriveCore Iota',
    image: generatorIota,
    apy: 35,
    monthlyReward: {
      points: 1458.0,
      nft: 1483,
    },
  },
];
