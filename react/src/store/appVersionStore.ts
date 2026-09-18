import { action, makeObservable, observable } from 'mobx';
import SecureLS from 'secure-ls';

import MOCK_VERSION from '@/pages/Roadmap/version.json';
import { BaseStore } from '@/store/baseStore';
import { RootStore } from '@/store/index';
import { Version } from '@/store/types';

const ls = new SecureLS();
const isProdMode = process.env.REACT_APP_MODE === 'prod';
const isStageMode = process.env.REACT_APP_MODE === 'stage';
const isTestMode = process.env.REACT_APP_MODE === 'test';

export class AppVersionStore extends BaseStore {
  rootStore: RootStore;

  version: Version | null = null;
  isFirstStart = false;
  isNewVersionPopupVisible = false;
  isReloadPageNeeded = false;

  constructor(rootStore: RootStore) {
    super();

    this.rootStore = rootStore;

    makeObservable(this, {
      version: observable,
      isFirstStart: observable,
      isNewVersionPopupVisible: observable,
      isReloadPageNeeded: observable,

      fetchVersionData: action,
      fetchNewAppVersion: action,
      checkNewAppVersion: action,
      addNewVersionModal: action,
      deleteNewVersionModal: action,
      updateNewVersion: action,
      startUpdateNewVersionTimer: action,
    });
  }

  fetchVersionData = async () => {
    try {
      if (isProdMode || isStageMode || isTestMode) {
        const response = await fetch(`${window.location.origin}/version.json`);

        if (!response.ok) {
          throw new Error(
            `Network response was not ok, ${response.statusText})`,
          );
        }

        this.version = await response.json();
      } else {
        this.version = MOCK_VERSION;
      }

      this.checkNewAppVersion();
    } catch (error) {
      console.error(error);
    }
  };

  fetchNewAppVersion = async () => {
    this.version ? (this.isFirstStart = false) : (this.isFirstStart = true);

    await this.fetchVersionData();
  };

  checkNewAppVersion = () => {
    const existingUserVersion = ls.get('versionSecure');

    if (this.version) {
      /* если у нас в localStorage имеется версия приложения */
      if (existingUserVersion) {
        if (this.version.version === existingUserVersion) {
          return;
        } else {
          /** строка с требованием перезагрузки не требуется
           если мы только что зашли */
          this.addNewVersionModal(!this.isFirstStart);
        }
      } else {
        /* записываем в localStorage для последующей проверки */
        ls.set('versionSecure', this.version.version);
      }
    }
  };

  addNewVersionModal = (isReloadNeeded: boolean) => {
    this.isNewVersionPopupVisible = true;
    this.isReloadPageNeeded = isReloadNeeded;
  };

  deleteNewVersionModal = () => {
    ls.set('versionSecure', (this.version as Version).version);

    this.isNewVersionPopupVisible = false;
    this.isReloadPageNeeded = false;
  };

  updateNewVersion = async () => {
    await this.fetchNewAppVersion();
  };

  startUpdateNewVersionTimer = () =>
    setInterval(this.updateNewVersion, 1000 * 60 * 15); // 15 минут интервал проверки версии;
}
