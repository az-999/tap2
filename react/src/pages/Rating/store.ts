import { action, makeObservable, observable } from 'mobx';

import { fetchRating } from '@/pages/Rating/api';
import { RatingResponse } from '@/pages/Rating/types';
import { ERROR_DURING_GET_RATING } from '@/services/constants/errorMessages';
import { RootStore } from '@/store';
import { BaseStore } from '@/store/baseStore';
import Utils from '@/utils';

export class RatingStore extends BaseStore {
  rootStore: RootStore;
  rating: RatingResponse | null = null;

  constructor(rootStore: RootStore) {
    super();

    this.rootStore = rootStore;

    makeObservable(this, {
      rating: observable,

      getRating: action,
    });
  }

  getRating = async () => {
    this.rootStore.fetchState = 'pending';
    this.rootStore.setIsLoading(true);

    try {
      const hash = this.rootStore.createHash([]);
      this.rating = await fetchRating({ hash });

      this.rootStore.fetchState = 'done';
      this.rootStore.setIsLoading(false);
    } catch (err) {
      console.error(ERROR_DURING_GET_RATING, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }

      this.rootStore.fetchState = 'error';
      this.rootStore.setIsLoading(false);
    }
  };
}
