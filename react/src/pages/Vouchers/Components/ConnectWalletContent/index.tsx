import React, { ReactNode } from 'react';

import Text from '@/components/UI/Text';

import { ConnectWalletContainer } from './styled';

interface ConnectWalletContentProps {
  children: ReactNode;
}

const ConnectWalletContent = ({ children }: ConnectWalletContentProps) => {
  return (
    <ConnectWalletContainer>
      <Text fontSize={16} fontWeight={700}>
        Connect a Wallet
      </Text>
      {children}
    </ConnectWalletContainer>
  );
};

export default ConnectWalletContent;
