import { TonConnectUIProvider } from '@tonconnect/ui-react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import AuthRoutes from '@/components/AuthRoutes/AuthRoutes';
import AuthWrapper from '@/components/AuthWrapper';
import WalletWrapper from '@/components/WalletWrapper';

import App from './App';
import Layout from './layout';
import './styles/main.css';
import ServerError from '@/pages/ServerError';

const getManifestUrl = (url: string | undefined) => {
  const {
    REACT_APP_WEB_TEST_URL,
    REACT_APP_TELEGRAM_TEST_URL,
    REACT_APP_WEB_PROD_URL,
    REACT_APP_TELEGRAM_PROD_URL,
  } = process.env;

  switch (url) {
    case REACT_APP_WEB_TEST_URL:
      return `${REACT_APP_WEB_TEST_URL}/tonconnect-manifest.web.dev.json`;
    case REACT_APP_TELEGRAM_TEST_URL:
      return `${REACT_APP_TELEGRAM_TEST_URL}/tonconnect-manifest.telegram.dev.json`;
    case REACT_APP_WEB_PROD_URL:
      return `${REACT_APP_WEB_PROD_URL}/tonconnect-manifest.web.prod.json`;
    case REACT_APP_TELEGRAM_PROD_URL:
      return `${REACT_APP_TELEGRAM_PROD_URL}/tonconnect-manifest.telegram.prod.json`;

    default:
      return `${REACT_APP_WEB_TEST_URL}/tonconnect-manifest.web.dev.json`;
  }
};

/** редирект на новый базовый роут */
if (
  !window.location.pathname.includes(
    process.env.REACT_APP_ROUTER_BASE_URL ?? '/u',
  )
) {
  window.history.replaceState(
    '',
    '',
    process.env.REACT_APP_ROUTER_BASE_URL ?? '/u' + window.location.pathname,
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <TonConnectUIProvider
    manifestUrl={getManifestUrl(window.location.origin)}
    actionsConfiguration={{
      twaReturnUrl: 'https://t.me/MMproBump_bot',
    }}
  >
    <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE_URL ?? '/u'}>
      <AuthWrapper>
        <WalletWrapper>
          <Layout>
            <App />
          </Layout>
        </WalletWrapper>
      </AuthWrapper>
      <AuthRoutes />
    </BrowserRouter>
  </TonConnectUIProvider>,
);
