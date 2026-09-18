import { action, computed, makeObservable, observable, toJS } from 'mobx';

import { buyBoost, deleteBoost } from './api';
import { Boost } from '@/pages/Boosters/types';
import {
  ERROR_DELETE_BUY_BOOST,
  ERROR_DURING_BUY_BOOST,
} from '@/services/constants/errorMessages';
import { RootStore } from '@/store';
import { BaseStore } from '@/store/baseStore';
import Utils from '@/utils';

export class BoostersStore extends BaseStore {
  rootStore: RootStore;

  _boosterTime: number | null = null;

  constructor(rootStore: RootStore) {
    super();

    this.rootStore = rootStore;

    makeObservable(this, {
      _boosterTime: observable,

      buyBoost: action,
      deleteBoost: action,

      boosterTime: computed,
    });
  }

  buyBoost = async (boostId: Boost['id']) => {
    this.rootStore.setIsLoading(true);

    try {
      const hash = this.rootStore.createHash([{ id: boostId }]);

      const { price, finish_at } = await buyBoost({ boostId, hash });
      this.rootStore.userStore.userInfo.info.boost = boostId;
      this.rootStore.userStore.userInfo.info.active_booster_finish_at =
        finish_at;
      this.rootStore.userStore.userInfo.balance =
        this.rootStore.userStore.userInfo.balance - price;
      this._boosterTime =
        this.rootStore.userStore.userInfo.info.active_booster_finish_at -
        this.rootStore.timeNow;

      this.rootStore.setIsLoading(false);
    } catch (err) {
      console.error(ERROR_DURING_BUY_BOOST, err);
      this.rootStore.userStore.addErrorResponse(err);

      if (Utils.getErrorMessage(err)) {
        this.rootStore.addErrorTooltip(Utils.getErrorMessage(err));
      }

      this.rootStore.setIsLoading(false);
      throw err;
    }
  };

  // for debug
  deleteBoost = async () => {
    const hash = this.rootStore.createHash([]);

    try {
      const response = await deleteBoost({ hash });

      if (response) {
        this.rootStore.userStore.userInfo.info.boost = '';
        this._boosterTime = null;
      }
    } catch (err) {
      console.error(ERROR_DELETE_BUY_BOOST, err);
    }
  };

  get boosterTime() {
    if (this._boosterTime === null) return null;

    const { info } = this.rootStore.userStore.userInfo;

    this.boosterTime = info.active_booster_finish_at
      ? info.active_booster_finish_at - this.rootStore.timeNow
      : 0;

    if (!this._boosterTime) {
      this._boosterTime = null;

      this.rootStore.userStore.userInfo.info = {
        farm: info.farm,
        taps: info.taps,
      };
    }

    return this._boosterTime;
  }

  set boosterTime(newValue) {
    this._boosterTime = newValue;
  }
}
