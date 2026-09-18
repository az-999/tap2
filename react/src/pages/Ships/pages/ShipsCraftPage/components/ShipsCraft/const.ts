import firstImage from '@/pages/Ships/pages/ShipsCraftPage/components/ShipsCraft/assets/1.png';
import secImage from '@/pages/Ships/pages/ShipsCraftPage/components/ShipsCraft/assets/2.png';
import thirdImage from '@/pages/Ships/pages/ShipsCraftPage/components/ShipsCraft/assets/3.png';
import forthImage from '@/pages/Ships/pages/ShipsCraftPage/components/ShipsCraft/assets/4.png';
import fifthImage from '@/pages/Ships/pages/ShipsCraftPage/components/ShipsCraft/assets/5.png';
import sixthImage from '@/pages/Ships/pages/ShipsCraftPage/components/ShipsCraft/assets/6.png';
import entireImage from '@/pages/Ships/pages/ShipsCraftPage/components/ShipsCraft/assets/entire.png';

export const LOOTBOX_CRAFT = {
  title: 'Voyager-MMP-R10',
  imageSrc: entireImage,
  list: [
    {
      name: 'Left Wing Module',
      image: secImage,
      count: 0,
    },
    {
      name: 'Right Wing Module',
      image: firstImage,
      count: 0,
    },
    {
      name: 'Cabin Module',
      image: forthImage,
      count: 0,
    },
    {
      name: 'Engine Unit Module',
      image: thirdImage,
      count: 0,
    },
    {
      name: 'Ship Nose Module',
      image: fifthImage,
      count: 0,
    },
    {
      name: 'Tail Section Module',
      image: sixthImage,
      count: 0,
    },
  ],
};
