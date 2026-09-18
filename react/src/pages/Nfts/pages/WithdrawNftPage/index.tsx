import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SecureLS from 'secure-ls';

import BackButton from '@/components/BackButton';
import Text from '@/components/UI/Text';

import Button from '@/pages/Nfts/components/Button';
import Details from '@/pages/Nfts/components/Details';
import History from '@/pages/Nfts/components/History';
import NftDetailTitle from '@/pages/Nfts/components/NftDetailTitle';
import NftSubtitle from '@/pages/Nfts/components/NftSubtitle';
import { SellNftPageContainer } from '@/pages/Nfts/pages/WithdrawNftPage/styled';
import rootStore from '@/store';
import { AppPath, NftsPath } from '@/types/routes';

const ls = new SecureLS();

const WithdrawNftPage = () => {
  const navigate = useNavigate();

  const {
    nftsStore: {
      cancelSellNftOnMarketplace,
      getSaleItemNft,
      isSubmitButtonDisabled,
    },
    userStore: { isWalletInvalid, setWalletInvalidModal },
    setIsWalletButtonVisible,
  } = rootStore;
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonAddress();

  const startTime = ls.get('startCancelSaleNftSecure');

  useEffect(() => {
    getSaleItemNft().catch((e) => console.error(e));
  }, []);

  const handleCancelSaleButtonClick = async () => {
    if (isWalletInvalid) {
      setWalletInvalidModal(true);
    } else {
      setIsWalletButtonVisible(true);

      await cancelSellNftOnMarketplace({
        tonConnectUI,
      });
    }
  };

  if (!wallet) navigate(`${AppPath.nfts}/${NftsPath.marketplace}`);

  return (
    <SellNftPageContainer>
      <BackButton delta={-1} />

      <NftDetailTitle type="withdraw" />
      <NftSubtitle />

      <Button
        color="grey"
        onClick={handleCancelSaleButtonClick}
        disabled={!!startTime || !wallet || isSubmitButtonDisabled}
      >
        <Text fontSize={14} fontWeight={600}>
          Remove from sale
        </Text>
      </Button>

      <Details />
      <History />
    </SellNftPageContainer>
  );
};

export default observer(WithdrawNftPage);
