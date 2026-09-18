import React from 'react';

import ClickerIcon from '@/pages/Announcement/assets/ClickerIcon';
import NftsIcon from '@/pages/Announcement/assets/NftsIcon';
import ShipIcon from '@/pages/Announcement/assets/ShipIcon';
import StakeIcon from '@/pages/Announcement/assets/StakeIcon';
import TasksIcon from '@/pages/Announcement/assets/TasksIcon';

export const BOTTOM_DATA = [
  {
    id: (Math.random() * 10).toString(16),
    title: 'Clicker',
    icon: <ClickerIcon />,
    isActive: false,
  },
  {
    id: (Math.random() * 10).toString(16),
    title: 'Staking',
    icon: <StakeIcon />,
    isActive: true,
  },
  {
    id: (Math.random() * 10).toString(16),
    title: 'Tasks',
    icon: <TasksIcon />,
    isActive: false,
  },
  {
    id: (Math.random() * 10).toString(16),
    title: 'NFTs',
    icon: <NftsIcon />,
    isActive: false,
  },
  {
    id: (Math.random() * 10).toString(16),
    title: 'Ships',
    icon: <ShipIcon />,
    isActive: false,
  },
];
