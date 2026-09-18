import { TonConnectUiOptions } from '@tonconnect/ui-react';

import { NAV_DATA_WITH_KOLS } from '@/pages/Tasks/const';

export const tonConnectUiOptions: TonConnectUiOptions = {
  uiPreferences: {
    borderRadius: 's',
    colorsSet: {
      DARK: {
        connectButton: {
          background: 'rgb(51, 204, 102)',
        },
      },
    },
  },
};

export const NAV_DATA = [
  {
    id: 'vouchers-nav-page-1',
    navigatePath: '/vouchers/shop',
    title: 'Shop',
  },
  {
    id: 'vouchers-nav-page-2',
    navigatePath: '/vouchers/my-vouchers',
    title: 'My Vouchers',
  },
];
