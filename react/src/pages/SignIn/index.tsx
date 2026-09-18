import { LoginButton } from '@telegram-auth/react';
import { observer } from 'mobx-react-lite';
import React from 'react';

import illustrationTopLayout from '@/assets/decorations/IllustrationTopLayout.png';
import Mmpro from '@/assets/static/mmpro';

import Text from '@/components/UI/Text';

import illustrationBottom from '@/pages/SignIn/assets/bump-logo.png';
import {
  IllustrationBottom,
  IllustrationTop,
  SignInPage,
} from '@/pages/SignIn/styled';
import rootStore from '@/store';

const SignIn = () => {
  const {
    userStore: { updateUserInitData },
  } = rootStore;

  return (
    <SignInPage>
      <IllustrationTop src={illustrationTopLayout} alt="" rel="preload" />
      <Mmpro />

      <Text fontSize={24} fontWeight={600}>
        Welcome!
      </Text>

      <div>
        <Text fontSize={12} fontWeight={400}>
          We are pleased to introduce a full version of the Mini-App
        </Text>
        <Text fontSize={12} fontWeight={400}>
          for the browser, where the NFT store is available
        </Text>
      </div>

      <LoginButton
        botUsername={
          (process.env.REACT_APP_BOT_VERSION &&
            (process.env.REACT_APP_BOT_VERSION === '1'
              ? process.env.REACT_APP_FIRST_BOT_USERNAME
              : process.env.REACT_APP_SECOND_BOT_USERNAME)) ??
          process.env.REACT_APP_BOT_USERNAME ??
          'MMproBump_bot'
        }
        buttonSize="large"
        onAuthCallback={(data) => {
          localStorage.setItem('userInitData', JSON.stringify(data));
          updateUserInitData(data);
        }}
      />

      <div>
        <span id="sign-beta-icon">Beta</span>
        <IllustrationBottom src={illustrationBottom} alt="" rel="preload" />
      </div>
    </SignInPage>
  );
};

export default observer(SignIn);
