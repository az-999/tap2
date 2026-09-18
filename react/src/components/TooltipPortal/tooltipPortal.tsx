import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface TooltipPortalProps {
  children: ReactNode;
}

const TooltipPortal = ({ children }: TooltipPortalProps) => {
  const portalRoot = document.getElementById('tooltip-portal');

  return portalRoot ? ReactDOM.createPortal(children, portalRoot) : null;
};

export default TooltipPortal;
