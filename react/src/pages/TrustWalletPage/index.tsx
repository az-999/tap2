import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import Text from '@/components/UI/Text';

import BumpIcon from '@/pages/TrustWalletPage/assets/BumpIcon';
import logo from '@/pages/TrustWalletPage/assets/trustWalletIcon.png';
import {
  MainContainer,
  StyledButton,
  StyledLogo,
  TextContainer,
  TrustWalletPageContainer,
} from '@/pages/TrustWalletPage/styled';
import { ERROR_DURING_POST_TRUST_WALLET_ADDRESS } from '@/services/constants/errorMessages';
import rootStore from '@/store';
import { defaultSweetAlertOptions } from '@/store/const';

const styledParagraph = {
  fontSize: 18,
  color: '#fff',
  fontWeight: 400,
  fontFamily: "'SF Pro Display', sans-serif",
};

const ModalText = () => {
  return (
    <p style={styledParagraph}>
      Your wallet has been added, go back to the app and check the task
    </p>
  );
};

const ErrorModalText = () => {
  return (
    <p style={styledParagraph}>{ERROR_DURING_POST_TRUST_WALLET_ADDRESS}</p>
  );
};

const TrustWalletPage = () => {
  const [searchParams] = useSearchParams();
  const {
    isLoading,
    trustWalletStore: {
      postTrustWalletAddress,
      isTrustWalletTaskPosted,
      isErrorDuringTrustWalletTaskPosted,
      resetStatuses,
    },
  } = rootStore;

  const token = searchParams.get('token');

  useEffect(() => {
    if (isTrustWalletTaskPosted) {
      withReactContent(Swal)
        .fire({
          ...defaultSweetAlertOptions,
          icon: 'success',
          background: '#20252C',
          title: <ModalText />,
          confirmButtonText: 'OK',
          returnFocus: false,
        })
        .finally(resetStatuses);
    }
  }, [isTrustWalletTaskPosted]);

  useEffect(() => {
    if (isErrorDuringTrustWalletTaskPosted) {
      withReactContent(Swal)
        .fire({
          ...defaultSweetAlertOptions,
          icon: 'error',
          background: '#20252C',
          title: <ErrorModalText />,
          confirmButtonText: 'OK',
          returnFocus: false,
        })
        .finally(resetStatuses);
    }
  }, [isErrorDuringTrustWalletTaskPosted]);

  return (
    <TrustWalletPageContainer>
      <BumpIcon />

      <MainContainer>
        <StyledLogo src={logo} alt="" rel="preload" />

        <TextContainer>
          <Text fontSize={24} fontWeight={700}>
            You're at the final step of the Trust Wallet task
          </Text>
          <Text fontSize={12} fontWeight={400}>
            Just one more step to earn your points!
          </Text>
        </TextContainer>

        <StyledButton
          onClick={() => postTrustWalletAddress({ address: '1', token })}
          disabled={isLoading || isTrustWalletTaskPosted}
        >
          Complete the task
        </StyledButton>
      </MainContainer>
    </TrustWalletPageContainer>
  );
};

export default observer(TrustWalletPage);
