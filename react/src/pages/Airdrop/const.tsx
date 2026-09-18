import oneReward from '@/pages/Airdrop/assets/1ap.png';
import tenReward from '@/pages/Airdrop/assets/10ap.png';
import oneHundredReward from '@/pages/Airdrop/assets/100ap.png';
import AirdropIcon from '@/pages/Airdrop/assets/AirdropIcon';
import BumpFlyIcon from '@/pages/Airdrop/assets/BumpFlyIcon';
import BumpTokenIcon from '@/pages/Airdrop/assets/BumpTokenIcon';
import SeasonIcon from '@/pages/Airdrop/assets/SeasonIcon';
import SynthesisEngineIcon from '@/pages/Airdrop/assets/SynthesisEngineIcon';
import UserIcon from '@/pages/Airdrop/assets/UserIcon';
import bumpFlyImg from '@/pages/Airdrop/assets/bumpFly-image.png';
import seasonImg from '@/pages/Airdrop/assets/season-img.png';
import synthesisImg from '@/pages/Airdrop/assets/synthesis-engine-img.png';
import BumpFlyFooter from '@/pages/Airdrop/components/AirdropCard/components/BumpFlyFooter';
import SeasonFooter from '@/pages/Airdrop/components/AirdropCard/components/SeasonFooter';
import SynthesisEngineFooter from '@/pages/Airdrop/components/AirdropCard/components/SynthesisEngineFooter';
import CommonTask from '@/pages/Airdrop/components/taskElements/TasksContent/CommonTask';
import OneTimeTaskWithLink from '@/pages/Airdrop/components/taskElements/TasksContent/OneTime';
import KolsTasks from '@/pages/Airdrop/components/taskElements/TasksContent/Recurring/KolsTasks';
import DailyCheck from '@/pages/Airdrop/components/taskElements/TasksContent/Special/DailyCheck';
import Spaceship from '@/pages/Airdrop/components/taskElements/TasksContent/Special/Spaceship';
import WhiteBit from '@/pages/Airdrop/components/taskElements/TasksContent/Special/WhiteBit';
import { TaskContent, TaskKey } from '@/pages/Airdrop/types';
import { AirdropPath, AppPath, NftsPath, ShipsPath } from '@/types/routes';

type CommonTask = {
  subtitle: string;
  button?: {
    title: string;
    link: string;
  };
  reward?: string;
};

export const SUPPORT_URL = 'https://t.me/mmpro_support1';

export const TASKS_IDS: Record<
  'special' | 'regular',
  Record<number, TaskKey>
> = {
  special: {
    0: 'task1',
    1: 'task2',
    2: 'task3',
  },
  regular: {
    0: 'task4',
    1: 'task5',
    2: 'task6',
    3: 'task7',
    4: 'task8',
    5: 'task9',
    6: 'task10',
    7: 'task11',
    8: 'task12',
    9: 'task13',
    10: 'task14',
    11: 'task15',
    12: 'task16',
    13: 'task17',
  },
};

export const COMMON_TASKS_RESPONSE_IDS = [
  'task6',
  'task7',
  'task8',
  'task9',
  'task10',
  'task11',
  'task12',
];

export const TASK_COVER = {
  1: oneReward,
  10: tenReward,
  100: oneHundredReward,
  1_000: '',
};

export const AIRDROP_MAIN_PAGE_CONST = [
  {
    title: 'Season',
    subtitle:
      'Complete tasks and advance your season progress by earning points',
    img: seasonImg,
    navigatePath: `${AppPath.airdrop}/${AirdropPath.seasonTasks}`,
    icon: <SeasonIcon />,
    footer: <SeasonFooter />,
    isAvailable: true,
  },
  {
    title: 'Synthesis Engine',
    subtitle: 'Complete tasks and advance your season',
    img: synthesisImg,
    navigatePath: `${AppPath.airdrop}/${AirdropPath.synthesisEngine}`,
    icon: <SynthesisEngineIcon />,
    footer: <SynthesisEngineFooter />,
    isAvailable: false,
  },
  {
    title: 'BumpFly',
    subtitle: 'Complete tasks and advance your season',
    img: bumpFlyImg,
    navigatePath: `${AppPath.airdrop}/${AirdropPath.bumpFly}`,
    icon: <BumpFlyIcon />,
    footer: <BumpFlyFooter />,
    isImageWide: true,
    isAvailable: false,
  },
];

export const SEASON_TASKS_DATA = [
  {
    title: 'Airdrop points',
    icon: <AirdropIcon />,
  },
  {
    title: 'Rank position',
    icon: <UserIcon />,
  },
  {
    title: 'Tokens for rank',
    icon: <BumpTokenIcon />,
  },
];

export const SYNTHESIS_ENGINE_FOOTER_DATA = [
  {
    title: 'Synthesis',
    value: 1_000,
    icon: <SynthesisEngineIcon />,
  },
  {
    title: 'Synthesized',
    value: 25,
    icon: <BumpTokenIcon />,
  },
];

export const BUMP_FLY_FOOTER_DATA = [
  {
    title: 'Airdrop points',
    icon: <AirdropIcon />,
  },
  {
    title: 'Rank position',
    icon: <UserIcon />,
  },
  {
    title: 'Tokens for rank',
    icon: <BumpTokenIcon />,
  },
];

export const TASKS_DATA = {
  special: { title: 'Special', color: '#2EFF73' },
  recurring: { title: 'Recurring', color: '#FF00C8' },
  oneTime: { title: 'One-time', color: '#9F00FF' },
  limited: { title: 'Limited', color: '#009DFF' },
};

export const ONE_TIME_SUBSCRIBE_TASKS: Record<
  number,
  Record<'subtitle' | 'link' | 'id' | 'taskId', string | number>
> = {
  5: {
    subtitle:
      'Follow this link and subscribe. Extra MMPro Points if not done before in the "Tasks" section',
    link: 'https://t.me/marketmakingpro',
    id: 5,
    taskId: 2,
  },
  6: {
    subtitle:
      'Explore the website and its features. Extra MMPro Points if not done before in the "Tasks" section',
    link: 'https://bumpspace.io/',
    id: 6,
    taskId: 622,
  },
  7: {
    subtitle:
      'Follow this link and subscribe. Extra MMPro Points if not done before in the "Tasks" section',
    link: 'https://x.com/MarketmakingX',
    id: 7,
    taskId: 5,
  },
  8: {
    subtitle:
      'Follow this link and subscribe. Extra MMPro Points if not done before in the "Tasks" section',
    link: 'https://t.me/mmprotrust',
    id: 8,
    taskId: 3,
  },
  9: {
    subtitle:
      'Follow this link and subscribe. Extra MMPro Points if not done before in the "Tasks" section',
    link: 'https://x.com/mmprotrust',
    id: 9,
    taskId: 4,
  },
  10: {
    subtitle:
      'Follow this link and subscribe. Extra MMPro Points if not done before in the "Tasks" section',
    link: 'https://www.youtube.com/@mmprogroup?sub_confirmation=1',
    id: 10,
    taskId: 42,
  },
};

export const COMMON_TASKS: Record<number, CommonTask> = {
  11: {
    subtitle: 'All points earned from taps and farming are counted',
    reward: 'Reward',
  },
  12: {
    subtitle: 'Create and collect unique ship parts as NFTs',
    button: {
      title: 'Go to Store',
      link: `${AppPath.nfts}/${NftsPath.bumpStore}`,
    },
    reward: 'Reward for each mint',
  },
  13: {
    subtitle: 'Earn rewards by inviting three friends to join!',
    button: {
      title: 'Invite',
      link: `${AppPath.friends}`,
    },
    reward: 'Reward for every 3 friends',
  },
  14: {
    subtitle: 'Purchase a Protection Badge in the app',
    button: {
      title: 'Buy',
      link: `${AppPath.nfts}/${NftsPath.bumpStore}`,
    },
  },
  15: {
    subtitle: 'Mint more OG Passes and claim your reward!',
    button: {
      title: 'Go to Store',
      link: `${AppPath.nfts}/${NftsPath.bumpStore}`,
    },
    reward: 'Reward for each mint',
  },
  16: {
    subtitle:
      'Claim rewards for all NFT Spaceships minted this airdrop season!',
    button: {
      title: 'Create Ships',
      link: `${AppPath.ships}/${ShipsPath.shipCraft}`,
    },
    reward: 'Reward for each mint',
  },
  17: {
    subtitle: 'Purchase a Pirate Badge in the app',
    button: { title: 'Buy', link: `${AppPath.nfts}/${NftsPath.bumpStore}` },
  },
};

export const TASKS_LIST_SPECIAL: TaskContent[] = [
  {
    id: window.self.crypto.randomUUID(),
    type: 'special',
    title: 'Event with WhiteBIT Exchange',
    basedReward: 1000,
    content: <WhiteBit />,
  },
  {
    id: window.self.crypto.randomUUID(),
    type: 'special',
    title: 'Check in Daily in the Season',
    basedReward: 1,
    content: <DailyCheck />,
  },
  {
    id: window.self.crypto.randomUUID(),
    type: 'special',
    title: 'Create an NFT Spaceship of Level 3 or Higher',
    basedReward: 1000,
    content: <Spaceship />,
  },
];

export const TASK_LIST_REGULAR: TaskContent[] = [
  {
    id: window.self.crypto.randomUUID(),
    type: 'recurring',
    title: 'Complete a KOLs task',
    basedReward: 1,
    content: <KolsTasks />,
  },
  {
    id: window.self.crypto.randomUUID(),
    type: 'oneTime',
    title: 'Subscribe to the BUMP Telegram channel',
    basedReward: 1,
    content: <OneTimeTaskWithLink index={5} />,
  },
  {
    id: window.self.crypto.randomUUID(),
    type: 'oneTime',
    title: 'Visit the BUMP website',
    basedReward: 1,
    content: <OneTimeTaskWithLink index={6} />,
  },
  {
    id: window.self.crypto.randomUUID(),
    type: 'oneTime',
    title: 'Follow BUMP on X',
    basedReward: 1,
    content: <OneTimeTaskWithLink index={7} />,
  },
  {
    id: window.self.crypto.randomUUID(),
    type: 'oneTime',
    title: 'Subscribe to the Trust Telegram channel',
    basedReward: 1,
    content: <OneTimeTaskWithLink index={8} />,
  },
  {
    id: window.self.crypto.randomUUID(),
    type: 'oneTime',
    title: 'Follow Trust on X',
    basedReward: 1,
    content: <OneTimeTaskWithLink index={9} />,
  },
  {
    id: window.self.crypto.randomUUID(),
    type: 'oneTime',
    title: 'Subscribe to the BUMP YouTube channel',
    basedReward: 1,
    content: <OneTimeTaskWithLink index={10} />,
  },
  {
    id: window.self.crypto.randomUUID(),
    type: 'recurring',
    title: 'Reward for MMPRO Points',
    basedReward: 10,
    content: <CommonTask index={11} />,
  },
  {
    id: window.self.crypto.randomUUID(),
    type: 'recurring',
    title: 'Mint NFT Ship Parts',
    basedReward: 10,
    content: <CommonTask index={12} />,
  },
  {
    id: window.self.crypto.randomUUID(),
    type: 'recurring',
    title: 'Reward for Every 3 Friends Invited',
    basedReward: 10,
    content: <CommonTask index={13} />,
  },
  {
    id: window.self.crypto.randomUUID(),
    type: 'oneTime',
    title: 'Buy Protection Marks',
    basedReward: 10,
    content: <CommonTask index={14} />,
  },
  {
    id: window.self.crypto.randomUUID(),
    type: 'recurring',
    title: 'Mint OG Passes',
    basedReward: 100,
    content: <CommonTask index={15} />,
  },
  {
    id: window.self.crypto.randomUUID(),
    type: 'recurring',
    title: 'Mint NFT Spaceships',
    basedReward: 100,
    content: <CommonTask index={16} />,
  },
  {
    id: window.self.crypto.randomUUID(),
    type: 'oneTime',
    title: 'Buy Pirate Mark',
    basedReward: 100,
    content: <CommonTask index={17} />,
  },
];
