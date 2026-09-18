import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface TooltipPortalProps {
  children: ReactNode;
}

const GamePortal = ({ children }: TooltipPortalProps) => {
  const portalRoot = document.getElementById('game-portal');

  return portalRoot ? ReactDOM.createPortal(children, portalRoot) : null;
};

export default GamePortal;
