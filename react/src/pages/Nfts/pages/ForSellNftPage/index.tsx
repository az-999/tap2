import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import SecureLS from 'secure-ls';
import { css } from 'styled-components/macro';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import BackButton from '@/components/BackButton';
import Text from '@/components/UI/Text';

import InfoIcon from '@/pages/Nfts/assets/InfoIcon';
import TonCoinIcon from '@/pages/Nfts/assets/TonCoinIcon';
import Button from '@/pages/Nfts/components/Button';
import Details from '@/pages/Nfts/components/Details';
import History from '@/pages/Nfts/components/History';
import NftDetailTitle from '@/pages/Nfts/components/NftDetailTitle';
import NftSubtitle from '@/pages/Nfts/components/NftSubtitle';
import {
  ForSellNftPageContainer,
  InputContainer,
  TooltipRow,
} from '@/pages/Nfts/pages/ForSellNftPage/styled';
import rootStore from '@/store';
import { defaultSweetAlertOptions } from '@/store/const';
import { AppPath, NftsPath } from '@/types/routes';

const ls = new SecureLS();

const ModalText = () => {
  return (
    <>
      <p
        style={{
          fontSize: 16,
          color: '#fff',
          fontWeight: 400,
          fontFamily: "'SF Pro Display', sans-serif",
        }}
      >
        Sales opportunities are temporarily suspended - stay tuned to our{' '}
        <a
          href="https://t.me/marketmakingpro"
          target="_blank"
          style={{
            textDecoration: 'underline',
            color: '#fff',
            fontWeight: 600,
          }}
        >
          channel
        </a>{' '}
        for updates
      </p>
    </>
  );
};

const ForSellNftPage = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState('');
  const startTime = ls.get('startSaleNftSecure');

  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonAddress();

  const {
    nftsStore: { sellNftOnMarketplace },
    userStore: { isWalletInvalid, setWalletInvalidModal },
    setIsWalletButtonVisible,
    showWinTooltip,
    isShowInfoTooltip,
  } = rootStore;

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const inputValue = evt.target.value;
    // Разрешаем только числа и десятичную точку
    if (/^\d*\.?\d*$/.test(inputValue)) {
      setInputValue(inputValue);
    }
  };

  const handleKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    // Предотвращаем ввод нечисловых символов с помощью клавиатуры
    const allowedKeys = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '.',
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
    ];
    if (!allowedKeys.includes(evt.key)) {
      evt.preventDefault();
    }
  };

  const handleSellButtonClick = async () => {
    // withReactContent(Swal).fire({
    //   ...defaultSweetAlertOptions,
    //   icon: 'warning',
    //   background: '#2E3032',
    //   title: <ModalText />,
    //   confirmButtonText: 'OK',
    //   returnFocus: false,
    // });

    if (isWalletInvalid) {
      setWalletInvalidModal(true);
    } else {
      setIsWalletButtonVisible(true);

      await sellNftOnMarketplace({
        tonConnectUI,
        price: inputValue,
      });
      setInputValue('');
    }
  };

  if (!wallet) navigate(`${AppPath.nfts}/${NftsPath.marketplace}`);

  return (
    <ForSellNftPageContainer>
      <BackButton navigatePath={`${AppPath.nfts}/${NftsPath.myNfts}`} />
      <NftDetailTitle type="default" />
      <NftSubtitle />

      <InputContainer>
        <Text fontSize={14} fontWeight={600}>
          Specify the NFT price
        </Text>
        <input
          id="sell-input"
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter your price"
        />

        <div id="currency-icon">
          <Text fontSize={14} fontWeight={500}>
            TON
          </Text>
          <TonCoinIcon />
        </div>
        <div id="services-fee">
          <div>
            <Text fontSize={14} fontWeight={500}>
              Service fee
            </Text>
            <button
              id="sale-service-fee-button"
              data-tooltip-id="info-service-sale-fee-tooltip"
              onClick={() => showWinTooltip(true)}
            >
              <InfoIcon />
            </button>
          </div>

          <Text fontSize={14} fontWeight={500}>
            {parseFloat(((Number(inputValue) || 0) * 0.05).toFixed(5))} TON
          </Text>
        </div>
        <div id="receive-amount">
          <Text fontSize={14} fontWeight={500}>
            You will receive
          </Text>
          <Text fontSize={14} fontWeight={700}>
            {inputValue
              ? parseFloat(
                  (
                    Number(inputValue) -
                    parseFloat(((Number(inputValue) || 0) * 0.05).toFixed(5))
                  ).toFixed(5),
                )
              : 0}{' '}
            TON
          </Text>
        </div>
      </InputContainer>
      <Button
        color="green"
        onClick={handleSellButtonClick}
        disabled={inputValue === '' || !!startTime || !wallet}
      >
        <Text fontSize={14} fontWeight={600}>
          List for Sale
        </Text>
      </Button>
      <Details />
      <History />

      <Tooltip
        id="info-service-sale-fee-tooltip"
        place="bottom"
        isOpen={isShowInfoTooltip}
        style={{ width: '60%' }}
      >
        <TooltipRow>
          <Text
            fontSize={14}
            fontWeight={400}
            styledFragment={css`
              text-align: center;
            `}
          >
            Most of the commission will be refunded to you after the transaction
            is completed. Please note the change in your balance
          </Text>
        </TooltipRow>
      </Tooltip>
    </ForSellNftPageContainer>
  );
};

export default observer(ForSellNftPage);
