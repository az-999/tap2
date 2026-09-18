import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import React, { useState } from 'react';

import qrCodeImg from '@/assets/static/qr-code.png';

import ProdQrCode from '@/components/DesktopDevice/assets/ProdQrCode';
import TestQrCode from '@/components/DesktopDevice/assets/TestQrCode';

import { Link, Logo, QrCode, QrCodeSvg, Title, Wrapper } from './styled';
import CheckIcon from '@/pages/Nfts/assets/CheckIcon';
import CopyIcon from '@/pages/Nfts/assets/CopyIcon';
import { ERROR_DURING_COPIED_NFT_CONTRACT_ADDRESS } from '@/services/constants/errorMessages';

const DesktopDevice = () => {
  const [isUrlCopied, setIsUrlCopied] = useState(false);
  const url =
    process.env.REACT_APP_MODE === 'prod'
      ? process.env.REACT_APP_WEB_PROD_URL
      : process.env.REACT_APP_WEB_TEST_URL;

  const WebApp = useWebApp();

  const handleButtonUrlCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setIsUrlCopied(true);

      setTimeout(() => setIsUrlCopied(false), 2000);
    } catch (err) {
      console.error(ERROR_DURING_COPIED_NFT_CONTRACT_ADDRESS, err);
    }
  };

  return (
    <Wrapper>
      <Logo isFarming={true} />
      <Title>Play on your mobile</Title>

      {WebApp.initData && (
        <>
          <QrCode width={234} height={234} src={qrCodeImg} rel="preload" />
          <Link href="http://t.me/MMproBump_bot">@MMproBump_bot</Link>
        </>
      )}

      {!WebApp.initData && url && (
        <>
          <QrCodeSvg>
            {process.env.REACT_APP_MODE === 'prod' ? (
              <ProdQrCode />
            ) : (
              <TestQrCode />
            )}
          </QrCodeSvg>

          <div>
            <Link href={url} target="_blank">
              {url.replace('https://', '')}
            </Link>

            <button
              onClick={() => handleButtonUrlCopy(url)}
              disabled={isUrlCopied}
            >
              {isUrlCopied ? <CheckIcon /> : <CopyIcon />}
            </button>
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default DesktopDevice;
