import React from 'react';

import GamePortal from '@/components/GamePortal';

const GameIFramePage = () => {
  return (
    <GamePortal>
      <iframe
        src="https://wayfinder.nfb.ca/"
        style={{
          width: '100%',
          height: '100%',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: '1000000',
          border: 'none',
        }}
      />
    </GamePortal>
  );
};

export default GameIFramePage;
