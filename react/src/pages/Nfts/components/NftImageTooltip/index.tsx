import { observer } from 'mobx-react-lite';
import React from 'react';

import CloseButton from '@/components/CloseButton';
import TooltipPortal from '@/components/TooltipPortal/tooltipPortal';

import {
  NftImageBackground,
  NftImageContainer,
} from '@/pages/Nfts/components/NftImageTooltip/styled';
import rootStore from '@/store';

const NftImageTooltip = () => {
  const {
    nftsStore: {
      isNftImageTooltipOpen,
      deleteNftImageTooltipVisible,
      activeNft,
    },
  } = rootStore;

  return (
    <TooltipPortal>
      <NftImageBackground $isActive={isNftImageTooltipOpen}>
        <NftImageContainer $isActive={isNftImageTooltipOpen}>
          <CloseButton onClick={deleteNftImageTooltipVisible} />
          <img src={activeNft?.image} alt="" />
        </NftImageContainer>
      </NftImageBackground>
    </TooltipPortal>
  );
};

export default observer(NftImageTooltip);
