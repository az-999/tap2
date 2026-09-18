import BumpIcon from '@/pages/Vouchers/Components/ModalsContent/BuyOgPassContent/assets/BumpIcon';
import GameIcon from '@/pages/Vouchers/Components/ModalsContent/BuyOgPassContent/assets/GameIcon';
import MmproIcon from '@/pages/Vouchers/Components/ModalsContent/BuyOgPassContent/assets/MmproIcon';
import UnlockIcon from '@/pages/Vouchers/Components/ModalsContent/BuyOgPassContent/assets/UnlockIcon';
import { Gift } from '@/pages/Vouchers/Components/ModalsContent/Gifts';

export const OG_PASS_GIFTS_DATA: Gift[] = [
  {
    icon: <BumpIcon />,
    title: 'Increased token drop',
  },
  {
    icon: <GameIcon />,
    title: 'Early access to games',
  },
  {
    icon: <UnlockIcon />,
    title: 'Increased % TGE unlock',
  },
  {
    icon: <MmproIcon />,
    title: '5 000 000 000 MMPro Points bonus',
  },
];
