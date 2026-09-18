// import { toNano, TonClient4, WalletContractV4, Address } from '@ton/ton';
// import { Address } from '@ton/core';
import { Account } from '@tonconnect/ui-react';
import { makeAutoObservable, toJS } from 'mobx';

// import { VoucherCollection } from './MM-NFT_VoucherCollection';
// import { TonClient } from '@ton/core';

let mnemonics =
  'video act illegal frequent west web crunch ecology helmet fabric leader polar drop expire crunch direct festival welcome swift stadium teach opinion situate yellow';

export class WalletStore {
  account: Account | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setAccount = (account: Account | null) => {
    this.account = account;
    console.debug(toJS(this.account));
  };

  byu = async (price: number) => {};

  // get isAuth() {
  //   return this.account !== null;
  // }

  // get MintMsg(): MintByOwner | undefined {
  //   if (!this.isAuth) return undefined;

  //   return {
  //     $$type: 'MintByOwner',
  //     mint_to: Address.parse(this.account?.address as string),
  //   };
  // }
}

const walletStore = new WalletStore();
export default walletStore;
