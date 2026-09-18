import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';

import CloseButton from '@/components/CloseButton';
import TooltipPortal from '@/components/TooltipPortal/tooltipPortal';
import Text from '@/components/UI/Text';

import CheckIcon from '@/pages/Nfts/components/NftSellErrorTooltip/assets/CheckIcon';
import CopyIcon from '@/pages/Nfts/components/NftSellErrorTooltip/assets/CopyIcon';
import {
  ContentPart,
  NftSellErrorTooltipBackground,
  NftSellErrorTooltipContainer,
} from '@/pages/Nfts/components/NftSellErrorTooltip/styled';
import Button from '@/pages/Tasks/sections/pages/TasksPages/Button';
import { ERROR_DURING_COPIED_NFT_HASH } from '@/services/constants/errorMessages';
import rootStore from '@/store';
import Utils from '@/utils';

const initialState = {
  isIdCopied: false,
  isNftAddressCopied: false,
  isWalletAddressCopied: false,
};

const NftSellErrorTooltip = () => {
  const [isActive, setIsActive] = useState(false);
  const [
    { isIdCopied, isNftAddressCopied, isWalletAddressCopied },
    setIsCopied,
  ] = useState(initialState);
  const WebApp = useWebApp();

  const isDisabled = isIdCopied || isNftAddressCopied || isWalletAddressCopied;

  const {
    nftsStore: { nftSellErrorTooltip, deleteNftSellErrorTooltip },
  } = rootStore;

  useEffect(() => {
    if (!nftSellErrorTooltip) return;

    const timer = setTimeout(() => {
      setIsActive(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [nftSellErrorTooltip]);

  const handleClose = () => {
    setIsActive(false);
    setTimeout(deleteNftSellErrorTooltip, 500);
  };

  const handleButtonHashCopy = async (
    value: string | number,
    index: number,
  ) => {
    try {
      await navigator.clipboard.writeText(value.toString());
      setIsCopied({
        ...initialState,
        [Object.keys(initialState)[index]]: true,
      });

      setTimeout(() => setIsCopied(initialState), 1500);
    } catch (err) {
      console.error(ERROR_DURING_COPIED_NFT_HASH, err);
    }
  };

  if (!nftSellErrorTooltip) return null;
  const { image, nftAddress, telegramId, walletAddress } = nftSellErrorTooltip;

  return (
    <TooltipPortal>
      {nftSellErrorTooltip && (
        <NftSellErrorTooltipBackground $isActive={isActive}>
          <NftSellErrorTooltipContainer $isActive={isActive}>
            <CloseButton onClick={handleClose} zIndex={1} />

            <img src={image} alt="" />
            <div>
              <Text fontSize={22} fontWeight={700}>
                Something went wrong
              </Text>
              <Text fontSize={22} fontWeight={700}>
                with your NFT!
              </Text>
            </div>

            <ContentPart>
              <div>
                <Text fontSize={14} fontWeight={500}>
                  To correct the error,{' '}
                  <span id="green-highlight">fill out the form using</span>
                </Text>
                <Text fontSize={14} fontWeight={500}>
                  <span id="green-highlight">the details below:</span>
                </Text>
              </div>

              <div>
                <Text fontSize={14} fontWeight={600}>
                  ID:
                </Text>{' '}
                <Text fontSize={14} fontWeight={600}>
                  {telegramId}
                </Text>
                <button
                  onClick={() => handleButtonHashCopy(telegramId, 0)}
                  disabled={isDisabled}
                >
                  {isIdCopied ? <CheckIcon /> : <CopyIcon />}
                </button>
              </div>

              <div>
                <Text fontSize={14} fontWeight={600}>
                  Wallet address:
                </Text>{' '}
                <div>
                  <Text fontSize={14} fontWeight={600}>
                    {Utils.getShortCraftShipNftAddress(walletAddress)}
                  </Text>
                  <button
                    onClick={() => handleButtonHashCopy(walletAddress, 1)}
                    disabled={isDisabled}
                  >
                    {isNftAddressCopied ? <CheckIcon /> : <CopyIcon />}
                  </button>
                </div>
              </div>

              <div>
                <Text fontSize={14} fontWeight={600}>
                  NFT address:
                </Text>{' '}
                <div>
                  <Text fontSize={14} fontWeight={600}>
                    {Utils.getShortCraftShipNftAddress(nftAddress)}
                  </Text>
                  <button
                    onClick={() => handleButtonHashCopy(nftAddress, 2)}
                    disabled={isDisabled}
                  >
                    {isWalletAddressCopied ? <CheckIcon /> : <CopyIcon />}
                  </button>
                </div>
              </div>
            </ContentPart>

            <Button
              onClick={() =>
                WebApp.openLink(
                  'https://docs.google.com/forms/d/1Dpx9cR98WXEeGskKsiVKp_o7OeiF31avaKRGQkj2I3Q/edit',
                )
              }
            >
              Proceed to fill out the form
            </Button>
            <Text fontSize={12} fontWeight={500}>
              *For convenience, keep this notification open until the form is
              completed
            </Text>
          </NftSellErrorTooltipContainer>
        </NftSellErrorTooltipBackground>
      )}
    </TooltipPortal>
  );
};

export default observer(NftSellErrorTooltip);
