import { action, makeObservable, observable } from 'mobx';

import { fetchFriends, postClaim } from '@/pages/Friends/api';
import { Friend } from '@/pages/Friends/types';
import {
  ERROR_DURING_GET_FRIENDS,
  ERROR_DURING_UPDATE_USER_BALANCE,
} from '@/services/constants/errorMessages';
import { RootStore } from '@/store';
import { BaseStore } from '@/store/baseStore';
import Utils from '@/utils';

export class FriendsStore extends BaseStore {
  rootStore: RootStore;

  friends: Friend[] | null = null;
  friendsClaim = 0;
  claimSum: number | null = null;
  offset = 0;
  friendsCount = 0;

  constructor(rootStore: RootStore) {
    super();

    this.rootStore = rootStore;

    makeObservable(this, {
      friends: observable,
      friendsClaim: observable,
      claimSum: observable,
      offset: observable,
      friendsCount: observable,

      getFriends: action,
      updateUserBalance: action,
      updateFriendsList: action,
    });
  }

  getFriends = async () => {
    this.rootStore.fetchState = 'pending';

    if (this.offset === 0) {
      this.rootStore.setIsLoading(true);
    }

    try {
      const limit = 20;

      const hash = this.rootStore.createHash([
        { limit },
        { offset: this.offset },
      ]);
      const response = await fetchFriends({ limit, offset: this.offset, hash });

      if (response) {
        const { friend_claim, list, count } = response;

        this.friends =
          this.friends !== null ? [...this.friends, ...list] : list;
        this.offset = this.friends?.length;

        if (friend_claim !== undefined && count !== undefined) {
          this.friendsClaim = friend_claim;
          this.friendsCount = count;
        }
      }

      this.rootStore.fetchState = 'done';
      this.rootStore.setIsLoading(false);
    } catch (err) {
      console.error(ERROR_DURING_GET_FRIENDS, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }

      this.rootStore.fetchState = 'error';
      this.rootStore.setIsLoading(false);
    }
  };

  updateUserBalance = async () => {
    this.rootStore.fetchState = 'pending';
    this.rootStore.setIsLoading(true);

    try {
      const hash = this.rootStore.createHash([]);

      const response = await postClaim({ hash });
      this.rootStore.userStore.userInfo = {
        ...this.rootStore.userStore.userInfo,
        balance: response.balance,
      };
      this.friendsClaim = 0;

      this.claimSum = response.sum;
      this.friends = (this.friends as Friend[]).map((friend) => ({
        ...friend,
        ref_balance: 0,
      }));

      this.rootStore.showWinTooltip();

      this.rootStore.fetchState = 'done';
      this.rootStore.setIsLoading(false);
    } catch (err) {
      console.error(ERROR_DURING_UPDATE_USER_BALANCE, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }

      this.rootStore.fetchState = 'error';
      this.rootStore.setIsLoading(false);
    }
  };

  updateFriendsList = async () => {
    try {
      const limit = 1;

      const hash = this.rootStore.createHash([{ limit }, { offset: 0 }]);
      const response = await fetchFriends({ limit, offset: 0, hash });

      if (response && response.count !== undefined) {
        this.friendsCount = response.count;
      }
    } catch (err) {
      console.error(ERROR_DURING_GET_FRIENDS, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }
    }
  };
}
