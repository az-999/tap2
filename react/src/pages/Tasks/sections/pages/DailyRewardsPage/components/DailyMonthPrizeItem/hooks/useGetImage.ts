import { useCallback } from 'react';

import prizeFirst from '@/pages/Tasks/sections/assets/dailyRewards/prizeSmall-1.png';
import prizeSec from '@/pages/Tasks/sections/assets/dailyRewards/prizeSmall-2.png';
import prizeThird from '@/pages/Tasks/sections/assets/dailyRewards/prizeSmall-3.png';
import prizeForth from '@/pages/Tasks/sections/assets/dailyRewards/prizeSmall-4.png';
import prizeFifth from '@/pages/Tasks/sections/assets/dailyRewards/prizeSmall-5.png';
import prizeSixth from '@/pages/Tasks/sections/assets/dailyRewards/prizeSmall-6.png';
import prizeSeventh from '@/pages/Tasks/sections/assets/dailyRewards/prizeSmall-7.png';
import prizeEighth from '@/pages/Tasks/sections/assets/dailyRewards/prizeSmall-8.png';
import prizeNinth from '@/pages/Tasks/sections/assets/dailyRewards/prizeSmall-9.png';

export const useGetImage = () => {
  const getImage = useCallback((index: number) => {
    switch (index) {
      case 1:
        return prizeFirst;
      case 2:
        return prizeSec;
      case 3:
        return prizeThird;
      case 4:
        return prizeForth;
      case 5:
        return prizeFifth;
      case 6:
        return prizeSixth;
      case 7:
        return prizeSeventh;
      case 8:
        return prizeEighth;
      case 9:
        return prizeNinth;
    }
  }, []);

  return { getImage };
};
