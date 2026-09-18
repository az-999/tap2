import { ReactNode } from 'react';

import CollectShips from '@/pages/Announcement/CollectShips';
import EarnPoints from '@/pages/Announcement/components/EarnPoints';
import EarnWithShip from '@/pages/Announcement/components/EarnWithShip';
import Staking from '@/pages/Announcement/components/Staking';

export type AnnouncementItem = {
  id: number;
  title: string;
  content: ReactNode;
};

export const ANNOUNCEMENT_DATA: AnnouncementItem[] = [
  { id: 1, title: 'EarnPoints', content: <Staking /> },
  { id: 2, title: 'EarnPoints', content: <EarnPoints /> },
  { id: 3, title: 'EarnWithShip', content: <EarnWithShip index={0} /> },
  { id: 4, title: 'EarnWithShip', content: <EarnWithShip index={1} /> },
  { id: 5, title: 'CollectShips', content: <CollectShips /> },
  {
    id: 6,
    title: '',
    content: null,
  },
];
