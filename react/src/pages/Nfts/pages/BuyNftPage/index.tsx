import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import BackButton from '@/components/BackButton';
import Text from '@/components/UI/Text';

import Button from '@/pages/Nfts/components/Button';
import Details from '@/pages/Nfts/components/Details';
import History from '@/pages/Nfts/components/History';
import NftDetailTitle from '@/pages/Nfts/components/NftDetailTitle';
import NftSubtitle from '@/pages/Nfts/components/NftSubtitle';
import { NftShopPageContainer } from '@/pages/Nfts/pages/BuyNftPage/styled';
import rootStore from '@/store';
import { AppPath, NftsPath } from '@/types/routes';

const BuyNftPage = () => {
  const navigate = useNavigate();

  const {
    nftsStore: { buyNftOnMarketplace, isSubmitButtonDisabled, activeNft },
    userStore: { isWalletInvalid, setWalletInvalidModal },
    setIsWalletButtonVisible,
  } = rootStore;
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonAddress();

  const handleBuyNftClick = async () => {
    if (isWalletInvalid) {
      setWalletInvalidModal(true);
    } else {
      setIsWalletButtonVisible(true);
      await buyNftOnMarketplace({ tonConnectUI });
    }
  };

  if (!activeNft) navigate(`${AppPath.nfts}/${NftsPath.marketplace}`);

  return (
    <NftShopPageContainer>
      <BackButton navigatePath={`${AppPath.nfts}/${NftsPath.marketplace}`} />

      <NftDetailTitle type="buy" />
      <NftSubtitle />

      <Button
        color="blue"
        onClick={handleBuyNftClick}
        disabled={!wallet || isSubmitButtonDisabled}
      >
        <Text fontSize={14} fontWeight={600}>
          {`Buy for ${activeNft && activeNft?.sale_price ? parseFloat((+activeNft.sale_price + 0.3).toFixed(5)) : ''} TON`}
        </Text>
      </Button>

      <Details />
      <History />
    </NftShopPageContainer>
  );
};

export default observer(BuyNftPage);
