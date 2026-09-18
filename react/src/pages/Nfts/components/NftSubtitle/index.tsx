import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';

import Text from '@/components/UI/Text';

import { Subtitle } from '@/pages/Nfts/components/NftSubtitle/styled';
import { partShipKeys } from '@/pages/Ships/pages/ShipsCraftPage/components/ShipsCraft';
import { PartShipKey } from '@/pages/Ships/types';
import rootStore from '@/store';

const NftSubtitle = () => {
  const [isTextEntireVisible, setIsTextEntireVisible] = useState(false);

  const {
    nftsStore: { activeNft },
  } = rootStore;

  if (!activeNft) return null;

  return (
    <Subtitle>
      <Text fontSize={12} fontWeight={400}>
        {partShipKeys.includes(activeNft.name as PartShipKey) ||
        activeNft.name.startsWith('Voyager') ||
        activeNft.name.toLowerCase() === 'bump og pass'
          ? isTextEntireVisible
            ? activeNft.description
            : activeNft.description?.split(' ').slice(0, 16).join(' ')
          : isTextEntireVisible
            ? 'The voucher gives an additional 10% to assets when combined with an NFT RWA of the appropriate tier. It can be used directly or sold to buyers making large asset purchases.'
            : 'The voucher gives an additional 10% to assets when combined with an NFT RWA of the appropriate tier'}
      </Text>

      {activeNft.description &&
        activeNft.description.split(' ').length > 15 && (
          <button
            onClick={
              isTextEntireVisible
                ? () => setIsTextEntireVisible(false)
                : () => setIsTextEntireVisible(true)
            }
          >
            {isTextEntireVisible ? 'read less...' : 'read more...'}
          </button>
        )}
    </Subtitle>
  );
};

export default observer(NftSubtitle);
