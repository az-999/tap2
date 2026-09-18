import firstImageSrc from '@/pages/Tasks/sections/assets/dailyRewards/grandPrize-1.png';
import secImageSrc from '@/pages/Tasks/sections/assets/dailyRewards/grandPrize-2.png';
import thirdImageSrc from '@/pages/Tasks/sections/assets/dailyRewards/grandPrize-3.png';

export const useGetGrandPrizeTooltipData = () => {
  const getGrandPrizeTooltipData = (id: number) => {
    switch (id) {
      case 1:
        return { imageSrc: firstImageSrc };
      case 2:
        return { imageSrc: secImageSrc };
      case 3:
        return { imageSrc: thirdImageSrc };
    }
  };

  return { getGrandPrizeTooltipData };
};
