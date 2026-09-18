import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import SecureLS from 'secure-ls';

import CloseButton from '@/components/CloseButton';
import { TooltipContainer } from '@/components/NftMintTooltip/styled';
import ReloadIcon from '@/components/ReloadIcon';
import TooltipPortal from '@/components/TooltipPortal/tooltipPortal';
import Text from '@/components/UI/Text';

import rootStore from '@/store';

const ls = new SecureLS();

const NftMintTooltip = () => {
  const [isActive, setIsActive] = useState(false);
  const {
    vouchersStore: { isNftMintModalActive, setIsNftMintModalActive },
  } = rootStore;

  const handleClose = () => {
    setIsActive(false);
    setIsNftMintModalActive(false);
  };

  useEffect(() => {
    if (ls.get('secureCurrentVoucherIdBuying')) {
      setIsNftMintModalActive(true);
    }
  }, []);

  useEffect(() => {
    if (ls.get('secureCurrentVoucherIdBuying') && isNftMintModalActive) {
      setIsActive(true);
      return;
    }
    if (!isNftMintModalActive) {
      handleClose();
    }
  }, [isNftMintModalActive]);

  return (
    <TooltipPortal>
      <TooltipContainer $isActive={isActive}>
        <div>
          <ReloadIcon />
          <Text fontSize={14} fontWeight={500}>
            Thank you! The NFT minting process can take{' '}
            <strong>up to 15 minutes</strong>.
          </Text>
        </div>

        <CloseButton onClick={handleClose} color="green" />
      </TooltipContainer>
    </TooltipPortal>
  );
};

export default observer(NftMintTooltip);
