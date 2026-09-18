import { useLocation, useSearchParams } from 'react-router-dom';

export const useGetTrustWalletPage = () => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const isTrustWalletPage = Boolean(
    searchParams.get('token') && pathname === '/trustwallet',
  );

  return { isTrustWalletPage };
};
