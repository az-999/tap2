import { AppPath, TasksPath } from '@/types/routes';

const { tasks, friends } = AppPath;
const { kols, community, daily } = TasksPath;

export const NAV_DATA_WITH_KOLS = [
  {
    navigatePath: `${tasks}/${kols}`,
    title: 'KOLs',
    type: 'with-indicator',
  },
  {
    navigatePath: `${tasks}/${community}`,
    title: 'Community',
    type: 'with-indicator',
  },
  {
    navigatePath: `${tasks}/${daily}`,
    title: 'Daily',
  },
  {
    navigatePath: friends,
    title: 'Friends',
  },
];
