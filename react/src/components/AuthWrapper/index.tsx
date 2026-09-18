import { observer } from 'mobx-react-lite';
import React, { ReactElement, forwardRef, useEffect, useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useGetTrustWalletPage } from '@/hooks/useGetTrustWalletPage';
import { useGetUserInitData } from '@/hooks/useGetUserInitData';
import rootStore from '@/store';
import { AuthPath, RootPath } from '@/types/routes';

interface AuthWrapperProps {
  children: ReactElement;
}

const Children = forwardRef<HTMLDivElement, AuthWrapperProps>(
  ({ children }, ref) => (
    <>
      <div ref={ref} />
      {children}
    </>
  ),
);

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const {
    userStore: { userInitData },
  } = rootStore;

  const { isTrustWalletPage } = useGetTrustWalletPage();
  const { isUserDataExist } = useGetUserInitData(userInitData);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { pathname } = useLocation();

  const shouldRenderChildren =
    isUserDataExist ||
    process.env.REACT_APP_MODE === 'dev' ||
    isTrustWalletPage;

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [pathname]);

  return shouldRenderChildren ? (
    <Children ref={scrollRef} children={children} />
  ) : (
    <Navigate to={`${RootPath.auth}/${AuthPath.signIn}`} replace />
  );
};

export default observer(AuthWrapper);
