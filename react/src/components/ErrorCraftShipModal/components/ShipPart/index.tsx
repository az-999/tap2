import React, { useState } from 'react';

import {
  Link,
  ShipPartContainer,
} from '@/components/ErrorCraftShipModal/components/ShipPart/styled';
import Text from '@/components/UI/Text';

import CheckIcon from '@/pages/Nfts/assets/CheckIcon';
import CopyIcon from '@/pages/Nfts/assets/CopyIcon';
import { ERROR_DURING_COPIED_NFT_CONTRACT_ADDRESS } from '@/services/constants/errorMessages';
import Utils from '@/utils';

interface ShipPartProps {
  image: string;
  name: string;
  link: string;
}

const ShipPart = ({ image, name, link }: ShipPartProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleLinkCopyClick = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);

      setTimeout(() => setIsCopied(false), 1500);
    } catch (err) {
      console.error(ERROR_DURING_COPIED_NFT_CONTRACT_ADDRESS, err);
    }
  };

  return (
    <ShipPartContainer>
      <img src={image} alt="" />

      <div>
        <Text fontSize={12} fontWeight={700}>
          {name}
        </Text>

        <Link $isCopied={isCopied}>
          <a href={link} target="_blank">
            {Utils.getShortNftAddress(link)}
          </a>
          <button onClick={() => handleLinkCopyClick(link)} disabled={isCopied}>
            {isCopied ? <CheckIcon /> : <CopyIcon />}
          </button>
        </Link>
      </div>
    </ShipPartContainer>
  );
};

export default ShipPart;
