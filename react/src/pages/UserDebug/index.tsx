import { useTonAddress } from '@tonconnect/ui-react';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import styled, { css } from 'styled-components/macro';

import BackButton from '@/components/BackButton';

import CheckIcon from '@/pages/Nfts/assets/CheckIcon';
import CopyIcon from '@/pages/Nfts/assets/CopyIcon';
import rootStore from '@/store';
import { RootPath } from '@/types/routes';
import Utils from '@/utils';

const StyledContainer = styled.div<{ $isCopied: boolean }>`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background: transparent;

    svg {
      width: 20px;
      height: 20px;

      path {
        ${({ $isCopied }) =>
          $isCopied
            ? css`
                stroke: wheat;
              `
            : css`
                fill: wheat;
              `}
      }
    }
  }
`;

const initialState = {
  isTelegramCopied: false,
  isWalletCopied: false,
};

const UserDebug = () => {
  const [{ isTelegramCopied, isWalletCopied }, setIsCopied] =
    useState(initialState);

  const {
    userStore: { apiResponses, userInfo },
  } = rootStore;

  const wallet = useTonAddress();
  const telegramId = userInfo.telegram_id;

  const handleCopyButtonClick = async ({
    value,
    isTelegramCopied,
    isWalletCopied,
  }: {
    value: string;
    isTelegramCopied: boolean;
    isWalletCopied: boolean;
  }) => {
    {
      try {
        await navigator.clipboard.writeText(value);
        setIsCopied({ isTelegramCopied, isWalletCopied });

        setTimeout(() => setIsCopied(initialState), 1500);
      } catch (err) {
        console.error('error during copied', err);
      }
    }
  };

  return (
    <div style={{ padding: '60px 20px', color: 'wheat' }}>
      <BackButton navigatePath={RootPath.base} />

      {telegramId && (
        <StyledContainer $isCopied={isTelegramCopied}>
          <span style={{ fontSize: 18, fontWeight: 600 }}>
            User's Telegram Id:
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            <p>{telegramId}</p>
            <button
              onClick={() =>
                handleCopyButtonClick({
                  value: telegramId?.toString(),
                  isTelegramCopied: true,
                  isWalletCopied: false,
                })
              }
              disabled={isTelegramCopied || isWalletCopied}
            >
              {isTelegramCopied ? <CheckIcon /> : <CopyIcon />}
            </button>
          </div>
        </StyledContainer>
      )}

      {wallet && (
        <StyledContainer $isCopied={isWalletCopied}>
          <span style={{ fontSize: 18, fontWeight: 600 }}>
            User's Wallet Address:
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            <p>{Utils.getShortCraftShipNftAddress(wallet)}</p>
            <button
              onClick={() =>
                handleCopyButtonClick({
                  value: wallet,
                  isTelegramCopied: false,
                  isWalletCopied: true,
                })
              }
              disabled={isTelegramCopied || isWalletCopied}
            >
              {isWalletCopied ? <CheckIcon /> : <CopyIcon />}
            </button>
          </div>
        </StyledContainer>
      )}

      <ol
        style={{
          width: '90%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {apiResponses.map((res) => (
          <li style={{ width: '100%' }}>
            status: <span style={{ fontWeight: 700 }}>{res.code}</span>,
            responseUrl:{' '}
            <span style={{ fontWeight: 700 }}>{res.responseUrl}</span>,
            response: {res.responseBody}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default observer(UserDebug);
