import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useGetPathname } from '@/hooks/useGetPathname';

export const useWalletModal = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const modal = document.getElementById('tc-widget-root');

    const hideWallets = () => {
      if (modal) {
        const walletList = modal?.querySelectorAll('li');
        const walletListContainer = modal.querySelector('ul');
        const border = walletListContainer
          ? Array.from(walletListContainer.children).find(
              (child) => child.tagName === 'DIV',
            )
          : null;

        walletList?.forEach((walletItem) => {
          const button = walletItem.querySelector('button');

          if (button) {
            let hasMismatch = true;
            const divs = button.querySelectorAll('div');

            divs.forEach((div) => {
              const wallet = div?.textContent?.trim().toLowerCase();

              if (wallet === 'tonkeeper') {
                hasMismatch = false;
              }
            });

            if (hasMismatch) {
              walletItem.style.display = 'none';
            }

            if (border) (border as HTMLElement).style.display = 'none';
          }
        });

        if (walletListContainer) {
          walletListContainer.style.padding = '0 28px 24px';
        }

        /** убираем из разметки кнопку кошелька телеграма */
        const buttons = modal.querySelectorAll('button');
        const telegramButton = Array.from(buttons)?.find((btn) =>
          btn?.textContent?.toLowerCase().includes('telegram'),
        );
        const list = modal.querySelector('ul');

        const modalContainer = modal
          ?.querySelector('div')
          ?.querySelector('div')
          ?.querySelector('div');
        const subTitle = modal.querySelector('h2');

        if (telegramButton && modalContainer && subTitle) {
          /** todo кнопку пока решили вернуть */
          /*   telegramButton.style.display = 'none';
            modalContainer.style.minHeight = '0';

            subTitle.style.display = 'none'; */

          telegramButton.style.width = '72%';
          telegramButton.style.margin = '0 14% 24px';

          if (list) {
            list.style.justifyContent = 'space-evenly';
          }
        }
      }
    };

    hideWallets();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          hideWallets();
        }
      });
    });

    const config = { childList: true, subtree: true };

    if (modal) {
      observer.observe(modal, config);
    }

    return () => observer.disconnect();
  }, [pathname]);
};
