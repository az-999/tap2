export type ValueFlow = {
  account: {
    address: string;
    name: string;
    is_scam: boolean;
    icon: string;
    is_wallet: boolean;
  };
  ton: number;
  fees: number;
  jettons: {
    account: {
      address: string;
      name: string;
      is_scam: boolean;
      icon: string;
      is_wallet: boolean;
    };
    jetton: {
      address: string;
      name: string;
      symbol: string;
      decimals: number;
      image: string;
      verification: string;
      custom_payload_api_uri: string;
    };
    quantity: number;
  }[];
};

export type Action = {
  type: string;
  status: string;
  TonTransfer: {
    sender: {
      address: string;
      name: string;
      is_scam: boolean;
      icon: string;
      is_wallet: boolean;
    };
    recipient: {
      address: string;
      name: string;
      is_scam: boolean;
      icon: string;
      is_wallet: boolean;
    };
    amount: number;
    comment: string;
    encrypted_comment: {
      encryption_type: string;
      cipher_text: string;
    };
    refund: {
      type: string;
      origin: string;
    };
  };
  ContractDeploy: {
    address: string;
    interfaces: string[];
  };
  JettonTransfer: {
    sender: {
      address: string;
      name: string;
      is_scam: boolean;
      icon: string;
      is_wallet: boolean;
    };
    recipient: {
      address: string;
      name: string;
      is_scam: boolean;
      icon: string;
      is_wallet: boolean;
    };
    senders_wallet: string;
    recipients_wallet: string;
    amount: string;
    comment: string;
    encrypted_comment: {
      encryption_type: string;
      cipher_text: string;
    };
    refund: {
      type: string;
      origin: string;
    };
    jetton: {
      address: string;
      name: string;
      symbol: string;
      decimals: number;
      image: string;
      verification: string;
      custom_payload_api_uri: string;
    };
  };
  JettonBurn: {
    sender: {
      address: string;
      name: string;
      is_scam: boolean;
      icon: string;
      is_wallet: boolean;
    };
    senders_wallet: string;
    amount: string;
    jetton: {
      address: string;
      name: string;
      symbol: string;
      decimals: number;
      image: string;
      verification: string;
      custom_payload_api_uri: string;
    };
  };
  JettonMint: {
    recipient: {
      address: string;
      name: string;
      is_scam: boolean;
      icon: string;
      is_wallet: boolean;
    };
    recipients_wallet: string;
    amount: string;
    jetton: {
      address: string;
      name: string;
      symbol: string;
      decimals: number;
      image: string;
      verification: string;
      custom_payload_api_uri: string;
    };
  };
  NftItemTransfer: {
    sender: {
      address: string;
      name: string;
      is_scam: boolean;
      icon: string;
      is_wallet: boolean;
    };
    recipient: {
      address: string;
      name: string;
      is_scam: boolean;
      icon: string;
      is_wallet: boolean;
    };
    nft: '';
    comment: string;
    encrypted_comment: {
      encryption_type: string;
      cipher_text: string;
    };
    payload: string;
    refund: {
      type: string;
      origin: string;
    };
  };
  Subscribe: {
    subscriber: {
      address: string;
      name: string;
      is_scam: boolean;
      icon: string;
      is_wallet: boolean;
    };
    subscription: string;
    beneficiary: {
      address: string;
      name: string;
      is_scam: boolean;
      icon: string;
      is_wallet: boolean;
    };
    amount: number;
    initial: false;
  };
  UnSubscribe: {
    subscriber: {
      address: string;
      name: string;
      is_scam: boolean;
      icon: string;
      is_wallet: boolean;
    };
    subscription: string;
    beneficiary: {
      address: string;
      name: string;
      is_scam: boolean;
      icon: string;
      is_wallet: boolean;
    };
  };
  AuctionBid: {
    auction_type: string;
    amount: {
      value: string;
      token_name: string;
    };
    nft: {
      address: string;
      index: number;
      owner: {
        address: string;
        name: string;
        is_scam: boolean;
        icon: string;
        is_wallet: boolean;
      };
      collection: {
        address: string;
        name: string;
        description: string;
      };
      verified: boolean;
      metadata: {};
      sale: {
        address: string;
        market: {
          address: string;
          name: string;
          is_scam: boolean;
          icon: string;
          is_wallet: boolean;
        };
        owner: {
          address: string;
          name: string;
          is_scam: boolean;
          icon: string;
          is_wallet: boolean;
        };
        price: {
          value: string;
          token_name: string;
        };
      };
      previews: [
        {
          resolution: string;
          url: string;
        },
      ];
      dns: string;
      include_cnft: false;
      trust: string;
    };
    bidder: {
      address: string;
      name: string;
      is_scam: boolean;
      icon: string;
      is_wallet: boolean;
    };
    auction: {
      address: string;
      name: string;
      is_scam: boolean;
      icon: string;
      is_wallet: boolean;
    };
  };
  NftPurchase: {
    auction_type: string;
    amount: {
      value: string;
      token_name: string;
    };
    nft: {
      address: string;
      index: number;
      owner: {
        address: string;
        name: string;
        is_scam: boolean;
        icon: string;
        is_wallet: boolean;
      };
      collection: {
        address: string;
        name: string;
        description: string;
      };
      verified: boolean;
      metadata: {};
      sale: {
        address: string;
        market: {
          address: string;
          name: string;
          is_scam: boolean;
          icon: string;
          is_wallet: boolean;
        };
        owner: {
          address: string;
          name: string;
          is_scam: boolean;
          icon: string;
          is_wallet: boolean;
        };
        price: {
          value: string;
          token_name: string;
        };
      };
      previews: [
        {
          resolution: string;
          url: string;
        },
      ];
      dns: string;
      include_cnft: false;
      trust: string;
    };
    seller: {
      address: string;
      name: string;
      is_scam: boolean;
      icon: string;
      is_wallet: boolean;
    };
    buyer: {
      address: string;
      name: string;
      is_scam: boolean;
      icon: string;
      is_wallet: boolean;
    };
  };
  DepositStake: {
    amount: number;
    staker: {
      address: string;
      name: string;
      is_scam: boolean;
      icon: string;
      is_wallet: boolean;
    };
    pool: {
      address: string;
      name: string;
      is_scam: boolean;
      icon: string;
      is_wallet: boolean;
    };
    implementation: string;
  };
  WithdrawStake: {
    amount: number;
    staker: {
      address: string;
      name: string;
      is_scam: boolean;
      icon: string;
      is_wallet: boolean;
    };
    pool: {
      address: string;
      name: string;
      is_scam: boolean;
      icon: string;
      is_wallet: boolean;
    };
    implementation: string;
  };
  WithdrawStakeRequest: {
    amount: number;
    staker: {
      address: string;
      name: string;
      is_scam: boolean;
      icon: string;
      is_wallet: boolean;
    };
    pool: {
      address: string;
      name: string;
      is_scam: boolean;
      icon: string;
      is_wallet: boolean;
    };
    implementation: string;
  };
  ElectionsDepositStake: {
    amount: number;
    staker: {
      address: string;
      name: string;
      is_scam: boolean;
      icon: string;
      is_wallet: boolean;
    };
  };
  ElectionsRecoverStake: {
    amount: number;
    staker: {
      address: string;
      name: string;
      is_scam: boolean;
      icon: string;
      is_wallet: boolean;
    };
  };
  JettonSwap: {
    dex: string;
    amount_in: string;
    amount_out: string;
    ton_in: number;
    ton_out: number;
    user_wallet: {
      address: string;
      name: string;
      is_scam: boolean;
      icon: string;
      is_wallet: boolean;
    };
    router: {
      address: string;
      name: string;
      is_scam: boolean;
      icon: string;
      is_wallet: boolean;
    };
    jetton_master_in: {
      address: string;
      name: string;
      symbol: string;
      decimals: number;
      image: string;
      verification: string;
      custom_payload_api_uri: string;
    };
    jetton_master_out: {
      address: string;
      name: string;
      symbol: string;
      decimals: number;
      image: string;
      verification: string;
      custom_payload_api_uri: string;
    };
  };
  SmartContractExec: {
    executor: {
      address: string;
      name: string;
      is_scam: boolean;
      icon: string;
      is_wallet: boolean;
    };
    contract: {
      address: string;
      name: string;
      is_scam: boolean;
      icon: string;
      is_wallet: boolean;
    };
    ton_attached: number;
    operation: string;
    payload: string;
    refund: {
      type: string;
      origin: string;
    };
  };
  DomainRenew: {
    domain: string;
    contract_address: string;
    renewer: {
      address: string;
      name: string;
      is_scam: boolean;
      icon: string;
      is_wallet: boolean;
    };
  };
  InscriptionTransfer: {
    sender: {
      address: string;
      name: string;
      is_scam: boolean;
      icon: string;
      is_wallet: boolean;
    };
    recipient: {
      address: string;
      name: string;
      is_scam: boolean;
      icon: string;
      is_wallet: boolean;
    };
    amount: string;
    comment: string;
    type: string;
    ticker: string;
    decimals: number;
  };
  InscriptionMint: {
    recipient: {
      address: string;
      name: string;
      is_scam: boolean;
      icon: string;
      is_wallet: boolean;
    };
    amount: string;
    type: string;
    ticker: string;
    decimals: number;
  };
  simple_preview: {
    name: string;
    description: string;
    action_image: string;
    value: string;
    value_image: string;
    accounts: [
      {
        address: string;
        name: string;
        is_scam: boolean;
        icon: string;
        is_wallet: boolean;
      },
    ];
  };
  base_transactions: string[];
};
