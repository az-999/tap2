import dailyBaseImg from '@/pages/Tasks/Assets/daily-reward-1.png';
import dailySevenImg from '@/pages/Tasks/Assets/daily-reward-7.png';
import dailyFourteenImg from '@/pages/Tasks/Assets/daily-reward-14.png';
import dailyTwentyOneImg from '@/pages/Tasks/Assets/daily-reward-21.png';
import dailyTwentyEightImg from '@/pages/Tasks/Assets/daily-reward-28.png';

export type DailyRewards = {
  day: number;
  reward: number;
  src: string;
};

export const dailyRewardsData: DailyRewards[] = [
  {
    day: 1,
    reward: 400_000,
    src: dailyBaseImg,
  },
  {
    day: 2,
    reward: 500_000,
    src: dailyBaseImg,
  },
  {
    day: 3,
    reward: 600_000,
    src: dailyBaseImg,
  },
  {
    day: 4,
    reward: 700_000,
    src: dailyBaseImg,
  },
  {
    day: 5,
    reward: 800_000,
    src: dailyBaseImg,
  },
  {
    day: 6,
    reward: 900_000,
    src: dailyBaseImg,
  },
  {
    day: 7,
    reward: 1_000_000,
    src: dailySevenImg,
  },
  {
    day: 8,
    reward: 400_000,
    src: dailyBaseImg,
  },
  {
    day: 9,
    reward: 500_000,
    src: dailyBaseImg,
  },
  {
    day: 10,
    reward: 600_000,
    src: dailyBaseImg,
  },
  {
    day: 11,
    reward: 700_000,
    src: dailyBaseImg,
  },
  {
    day: 12,
    reward: 800_000,
    src: dailyBaseImg,
  },
  {
    day: 13,
    reward: 900_000,
    src: dailyBaseImg,
  },
  {
    day: 14,
    reward: 3_000_000,
    src: dailyFourteenImg,
  },
  {
    day: 15,
    reward: 400_000,
    src: dailyBaseImg,
  },
  {
    day: 16,
    reward: 500_000,
    src: dailyBaseImg,
  },
  {
    day: 17,
    reward: 600_000,
    src: dailyBaseImg,
  },
  {
    day: 18,
    reward: 700_000,
    src: dailyBaseImg,
  },
  {
    day: 19,
    reward: 800_000,
    src: dailyBaseImg,
  },
  {
    day: 20,
    reward: 900_000,
    src: dailyBaseImg,
  },
  {
    day: 21,
    reward: 7_000_000,
    src: dailyTwentyOneImg,
  },
  {
    day: 22,
    reward: 400_000,
    src: dailyBaseImg,
  },
  {
    day: 23,
    reward: 500_000,
    src: dailyBaseImg,
  },
  {
    day: 24,
    reward: 600_000,
    src: dailyBaseImg,
  },
  {
    day: 25,
    reward: 700_000,
    src: dailyBaseImg,
  },
  {
    day: 26,
    reward: 800_000,
    src: dailyBaseImg,
  },
  {
    day: 27,
    reward: 900_000,
    src: dailyBaseImg,
  },
  {
    day: 28,
    reward: 100_000_000,
    src: dailyTwentyEightImg,
  },
];
