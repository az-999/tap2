import { useCallback } from 'react';

import prizeFirst from '@/pages/Tasks/sections/assets/dailyRewards/prizeBig-1.png';
import prizeSec from '@/pages/Tasks/sections/assets/dailyRewards/prizeBig-2.png';
import prizeThird from '@/pages/Tasks/sections/assets/dailyRewards/prizeBig-3.png';
import prizeForth from '@/pages/Tasks/sections/assets/dailyRewards/prizeBig-4.png';
import prizeFifth from '@/pages/Tasks/sections/assets/dailyRewards/prizeBig-5.png';
import prizeSixth from '@/pages/Tasks/sections/assets/dailyRewards/prizeBig-6.png';
import prizeSeventh from '@/pages/Tasks/sections/assets/dailyRewards/prizeBig-7.png';
import prizeEighth from '@/pages/Tasks/sections/assets/dailyRewards/prizeBig-8.png';
import prizeNinth from '@/pages/Tasks/sections/assets/dailyRewards/prizeBig-9.png';

export const useGetTooltipData = () => {
  const getTooltipData = useCallback((id: number) => {
    switch (id) {
      case 1:
        return {
          imageSrc: prizeFirst,
          title: 'You have become a stellar explorer!',
          subtitle:
            'Receive your astronaut pioneer statuette for 28 consecutive days of adventures in our game!',
        };
      case 2:
        return {
          imageSrc: prizeSec,
          title: 'You have become a legendary space gamer!',
          subtitle:
            'Receive your astronaut gamer statuette for 56 consecutive days of adventures in our game!',
        };
      case 3:
        return {
          imageSrc: prizeThird,
          title: 'You have become a resource harvester!',
          subtitle:
            'Receive your astronaut resource harvester statuette for 84 consecutive days of adventures in our game!',
        };
      case 4:
        return {
          imageSrc: prizeForth,
          title: 'You have become The Space Trucker!',
          subtitle:
            'New coordinates! Get the Navigator statuette for 112 consecutive days of adventure in our game!',
        };
      case 5:
        return {
          imageSrc: prizeFifth,
          title: 'You have become The Galactic Tourist!',
          subtitle:
            'A truly Desperate Galactic Tourist. You deserve your statuette for 140 consecutive days of adventures in our game!',
        };
      case 6:
        return {
          imageSrc: prizeSixth,
          title: 'You have become The Owner of something interesting!',
          subtitle:
            'Just some kind of holiday! Take the AstroCluber statuette for 168 consecutive days of adventures in our game!',
        };
      case 7:
        return {
          imageSrc: prizeSeventh,
          title: 'You have become like The Lord!',
          subtitle:
            'In good company! Take the Daredevil statuette for 196 consecutive days of adventures in our game!',
        };
      case 8:
        return {
          imageSrc: prizeEighth,
          title: 'You have become a farmer!',
          subtitle:
            'Walking through space gardens. Take the Gardener statuette for 224 consecutive days of adventures in our game!',
        };
      case 9:
        return {
          imageSrc: prizeNinth,
          title: 'You have become The Super Astronaut!',
          subtitle:
            'Space is like home! Take the Vanquisher statuette for 252 consecutive days of adventures in our game!',
        };
      default: {
        return {
          imageSrc: prizeFirst,
          title: 'You have become a stellar explorer!',
          subtitle:
            'Your dedication and perseverance have earned you a reward! Keep exploring, and the stars will favor you!',
        };
      }
    }
  }, []);

  return { getTooltipData };
};
