import { useTonAddress } from '@tonconnect/ui-react';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';

import LoadingIcon from '@/assets/LoadingIcon';

import Text from '@/components/UI/Text';

import {
  Button,
  CaptchaContainer,
  CaptchaImage,
  CaptchaInput,
  DownImage,
  ImagesContainer,
  StyledRange,
  UpImage,
} from '@/pages/Vouchers/Components/Captcha/styled';
import rootStore from '@/store';

interface CaptchaProps {
  onModalClose: () => void;
}

const Captcha = ({ onModalClose }: CaptchaProps) => {
  const userWalletAddress = useTonAddress();

  const {
    vouchersStore: {
      captchaResponse,
      isCaptchaLoading,
      getCaptchaPosition,
      getCaptchaSecondPosition,
      postVerifyCaptcha,
    },
  } = rootStore;
  const randomValue = () => Math.floor(Math.random() * 1601) + 400;

  const [range, setRange] = useState(randomValue());
  const [secondRange, setSecondRange] = useState(randomValue());
  const [isCaptchaPositionExist, setIsCaptchaPositionExist] = useState(false);
  // const [captchaWord, setCaptchaWord] = useState('');

  const getBackgroundSize = (range: number) => {
    return `${((range - 400) / 1600) * 100}%`;
  };

  const handleChange = (event: any) => {
    setRange(event.target.value);
  };

  const handleSecondCaptureChange = (event: any) => {
    setSecondRange(event.target.value);
  };

  const getImageCaptchaPosition = () => {
    setIsCaptchaPositionExist(true);
  };

  const handleCaptchaSend = () => {
    getCaptchaPosition(range);
    getCaptchaSecondPosition(secondRange);

    postVerifyCaptcha({ walletAddress: userWalletAddress });
    onModalClose();
  };

  return (
    <CaptchaContainer>
      <Text fontSize={16} fontWeight={700}>
        Captcha
      </Text>

      {isCaptchaLoading ? (
        <LoadingIcon />
      ) : (
        <>
          {!isCaptchaPositionExist && (
            <>
              <ImagesContainer>
                <UpImage $backgroundImage={`url(${captchaResponse?.up})`} />
                <DownImage
                  $backgroundPosition={`${range}px 0`}
                  $backgroundImage={`url(${captchaResponse?.down})`}
                />
                <StyledRange
                  type="range"
                  min={400}
                  max={2000}
                  step={10}
                  value={range}
                  onChange={handleChange}
                  $trackPosition={getBackgroundSize(range)}
                />
              </ImagesContainer>
              <Button onClick={getImageCaptchaPosition}>Next step</Button>
            </>
          )}

          {isCaptchaPositionExist && (
            <>
              {/*   <CaptchaImage src={captchaResponse?.captcha} alt="" />
              <CaptchaInput
                placeholder="Enter the captcha code"
                value={captchaWord}
                onChange={(e) => setCaptchaWord(e.target.value)}
                onFocus={() => document.activeElement?.scrollIntoView()}
              />*/}
              <ImagesContainer>
                <UpImage $backgroundImage={`url(${captchaResponse?.up2})`} />
                <DownImage
                  $backgroundPosition={`${secondRange}px 0`}
                  $backgroundImage={`url(${captchaResponse?.down2})`}
                />
                <StyledRange
                  type="range"
                  min={400}
                  max={2000}
                  step={10}
                  value={secondRange}
                  onChange={handleSecondCaptureChange}
                  $trackPosition={getBackgroundSize(secondRange)}
                />
              </ImagesContainer>

              <Button onClick={handleCaptchaSend}>Send</Button>
            </>
          )}
        </>
      )}
    </CaptchaContainer>
  );
};

export default observer(Captcha);
