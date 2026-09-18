import { action, makeObservable, observable } from 'mobx';

import { postTrustWalletTask } from '@/pages/TrustWalletPage/api';
import { ERROR_DURING_POST_TRUST_WALLET_ADDRESS } from '@/services/constants/errorMessages';
import { RootStore } from '@/store';
import { BaseStore } from '@/store/baseStore';
import Utils from '@/utils';

export class TrustWalletStore extends BaseStore {
  rootStore: RootStore;
  isTrustWalletTaskPosted = false;
  isErrorDuringTrustWalletTaskPosted = false;

  constructor(rootStore: RootStore) {
    super();

    this.rootStore = rootStore;

    makeObservable(this, {
      isTrustWalletTaskPosted: observable,
      isErrorDuringTrustWalletTaskPosted: observable,

      postTrustWalletAddress: action,
      resetStatuses: action,
    });
  }

  resetStatuses = () => {
    this.isErrorDuringTrustWalletTaskPosted = false;
    this.isTrustWalletTaskPosted = false;
  };

  postTrustWalletAddress = async ({
    address,
    token,
  }: {
    address: string;
    token: string | null;
  }) => {
    if (!token) return;

    this.rootStore.setIsLoading(true);
    const hash = this.rootStore.createHash([{ address }]);

    try {
      await postTrustWalletTask({ hash, address, token });

      this.isErrorDuringTrustWalletTaskPosted = false;
      this.isTrustWalletTaskPosted = true;
      this.rootStore.setIsLoading(false);
    } catch (err) {
      console.error(`${ERROR_DURING_POST_TRUST_WALLET_ADDRESS}:`, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }

      this.isErrorDuringTrustWalletTaskPosted = true;
      this.rootStore.setIsLoading(false);
    }
  };
}
