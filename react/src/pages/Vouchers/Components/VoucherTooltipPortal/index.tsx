import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface VoucherTooltipPortalProps {
  children: ReactNode;
}

const VoucherTooltipPortal = ({ children }: VoucherTooltipPortalProps) => {
  const portalRoot = document.getElementById('voucher-portal');

  return portalRoot ? ReactDOM.createPortal(children, portalRoot) : null;
};

export default VoucherTooltipPortal;
