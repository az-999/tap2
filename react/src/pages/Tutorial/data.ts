import Tutorial1ImgFirst from './assets/tutorial-1-1.png';
import Tutorial1ImgSecond from './assets/tutorial-1-2.png';
import Tutorial1ImgThird from './assets/tutorial-1-3.png';
import Tutorial2Img from './assets/tutorial-2.png';

export type TutorialItemData = {
  id: number;
  title: string;
  subtitle: string;
  imageSrc?: string;
  imageArrSrc?: string[];
};

export const tutorialData: TutorialItemData[] = [
  {
    id: 1,
    title: 'Easy',
    subtitle: 'Earn Points',
    imageArrSrc: [Tutorial1ImgFirst, Tutorial1ImgSecond, Tutorial1ImgThird],
  },
  {
    id: 2,
    title: 'Easy',
    subtitle: 'Earn Points',
    imageSrc: Tutorial1ImgFirst,
  },
  {
    id: 3,
    title: 'Earn Together',
    subtitle: '10% from referrals',
    imageSrc: Tutorial2Img,
  },
  {
    id: 4,
    title: '',
    subtitle: '',
  },
];
