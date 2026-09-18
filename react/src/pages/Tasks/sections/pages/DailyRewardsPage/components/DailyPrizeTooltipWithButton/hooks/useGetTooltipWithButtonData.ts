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

export const useGetTooltipWithButtonData = () => {
  const getTooltipData = useCallback((id: number) => {
    switch (id) {
      case 1:
        return { imageSrc: prizeFirst, day: 28 };
      case 2:
        return { imageSrc: prizeSec, day: 28 * 2 };
      case 3:
        return { imageSrc: prizeThird, day: 28 * 3 };
      case 4:
        return { imageSrc: prizeForth, day: 28 * 4 };
      case 5:
        return { imageSrc: prizeFifth, day: 28 * 5 };
      case 6:
        return { imageSrc: prizeSixth, day: 28 * 6 };
      case 7:
        return { imageSrc: prizeSeventh, day: 28 * 7 };
      case 8:
        return { imageSrc: prizeEighth, day: 28 * 8 };
      case 9:
        return { imageSrc: prizeNinth, day: 28 * 9 };
      default: {
        return { imageSrc: prizeFirst, day: 28 };
      }
    }
  }, []);

  return { getTooltipData };
};
