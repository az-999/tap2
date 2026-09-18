import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MultiWalletPage from '@/pages/MultiWalletPage';
import SignIn from '@/pages/SignIn';
import UserBlockPage from '@/pages/UserBlockPage';
import { AuthPath, RootPath } from '@/types/routes';

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path={RootPath.auth}>
        <Route path={AuthPath.signIn} element={<SignIn />} />
        <Route path={AuthPath.multiWallet} element={<MultiWalletPage />} />
        <Route path={AuthPath.userBlock} element={<UserBlockPage />} />
      </Route>
    </Routes>
  );
};

export default AuthRoutes;
