import { observer } from 'mobx-react-lite';
import React from 'react';

import VoucherTooltip from '@/pages/Vouchers/Components/VoucherTooltip';
import VoucherTooltipPortal from '@/pages/Vouchers/Components/VoucherTooltipPortal';
import rootStore from '@/store';

const NewNftTooltip = () => {
  const {
    vouchersStore: { voucherTooltips, deleteVoucherTooltip },
  } = rootStore;

  return (
    <VoucherTooltipPortal>
      {voucherTooltips.map((voucher, index) => (
        <VoucherTooltip
          key={voucher.id}
          index={index}
          removeTooltip={() => deleteVoucherTooltip(voucher.id)}
          data={voucher}
        />
      ))}
    </VoucherTooltipPortal>
  );
};

export default observer(NewNftTooltip);
