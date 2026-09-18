import nftSecImage from './assets/nftImage-2.png';
import nftImage from './assets/nftImage.png';
import { NftItem } from '@/pages/Nfts/types';

export const NAV_DATA = [
  {
    id: 'nfts-nav-page-1',
    navigatePath: '/nfts/marketplace',
    title: 'Marketplace',
  },
  {
    id: 'nfts-nav-page-2',
    navigatePath: '/nfts/bump-store',
    title: 'BUMP Store',
  },
  {
    id: 'nfts-nav-page-3',
    navigatePath: '/nfts/my-nfts',
    title: 'My NFTs',
  },
  /* {
    id: 'nfts-nav-page-4',
    navigatePath: '/nfts/lootbox/craft',
    title: 'Lootbox',
  },*/
];

export const MOCK_NFTS_ITEMS: NftItem[] = [
  {
    id: 'nfts-mock-1',
    title: 'Voucher Tier 1 - 10%',
    price: 100,
    owner: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
    imageSrc: nftImage,
    collection: 'NFT Vouchers',
    contractAddress: 'TQJkgoo0r9239…Ijkeryuyb48',
    tokenID: 'TQJkgoo0r9239…Ijkeryuyb52',
    metaData: 'Vouchers',
    history: {
      putUpForSale: {
        price: 190,
        time: 1721318400000,
        from: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
        to: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
      },
      withdrawnFromSale: {
        price: 192,
        time: 1721318400000,
        from: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
        to: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
      },
      sale: {
        price: 168,
        time: 1721318400000,
        from: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
        to: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
      },
    },
  },
  {
    id: 'nfts-mock-2',
    title: 'Voucher Tier 2 - 10%',
    price: 200,
    owner: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
    imageSrc: nftImage,
    collection: 'NFT Vouchers',
    contractAddress: 'TQJkgoo0r9239…Ijkeryuyb48',
    tokenID: 'TQJkgoo0r9239…Ijkeryuyb52',
    metaData: 'Vouchers',
    history: {
      putUpForSale: {
        price: 191,
        time: 1721318400000,
        from: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
        to: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
      },
      withdrawnFromSale: {
        price: 188,
        time: 1721318400000,
        from: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
        to: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
      },
      sale: {
        price: 194,
        time: 1721318400000,
        from: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
        to: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
      },
    },
  },
  {
    id: 'nfts-mock-3',
    title: 'Voucher Tier 3 - 10%',
    price: 50000,
    owner: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
    imageSrc: nftImage,
    collection: 'NFT Vouchers',
    contractAddress: 'TQJkgoo0r9239…Ijkeryuyb48',
    tokenID: 'TQJkgoo0r9239…Ijkeryuyb52',
    metaData: 'Vouchers',
    history: {
      putUpForSale: {
        price: 145,
        time: 1721318400000,
        from: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
        to: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
      },
      withdrawnFromSale: {
        price: 189,
        time: 1721318400000,
        from: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
        to: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
      },
      sale: {
        price: 192,
        time: 1721318400000,
        from: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
        to: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
      },
    },
  },
];

export const MOCK_MY_NFTS_ITEMS: NftItem[] = [
  {
    id: 'nfts-mock-1',
    title: 'Voucher Tier 1 - 10%',
    price: 100,
    owner: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
    imageSrc: nftImage,
    collection: 'NFT Vouchers',
    contractAddress: 'TQJkgoo0r9239…Ijkeryuyb48',
    tokenID: 'TQJkgoo0r9239…Ijkeryuyb52',
    metaData: 'Vouchers',
    status: 'sale',
    history: {
      putUpForSale: {
        price: 190,
        time: 1721318400000,
        from: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
        to: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
      },
      withdrawnFromSale: {
        price: 192,
        time: 1721318400000,
        from: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
        to: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
      },
      sale: {
        price: 168,
        time: 1721318400000,
        from: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
        to: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
      },
    },
  },
  {
    id: 'nfts-mock-2',
    title: 'Voucher Tier 2 - 10%',
    price: 200,
    owner: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
    imageSrc: nftSecImage,
    collection: 'NFT Vouchers',
    contractAddress: 'TQJkgoo0r9239…Ijkeryuyb48',
    tokenID: 'TQJkgoo0r9239…Ijkeryuyb52',
    metaData: 'Vouchers',
    status: 'moderation',
    history: {
      putUpForSale: {
        price: 191,
        time: 1721318400000,
        from: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
        to: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
      },
      withdrawnFromSale: {
        price: 188,
        time: 1721318400000,
        from: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
        to: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
      },
      sale: {
        price: 194,
        time: 1721318400000,
        from: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
        to: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
      },
    },
  },
  {
    id: 'nfts-mock-3',
    title: 'Voucher Tier 3 - 10%',
    price: 50000,
    owner: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
    imageSrc: nftImage,
    collection: 'NFT Vouchers',
    contractAddress: 'TQJkgoo0r9239…Ijkeryuyb48',
    tokenID: 'TQJkgoo0r9239…Ijkeryuyb52',
    metaData: 'Vouchers',
    status: 'default',
    history: {
      putUpForSale: {
        price: 145,
        time: 1721318400000,
        from: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
        to: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
      },
      withdrawnFromSale: {
        price: 189,
        time: 1721318400000,
        from: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
        to: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
      },
      sale: {
        price: 192,
        time: 1721318400000,
        from: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
        to: 'UQDn4XF1Nj_WANPZy7jtUN2BtJvPDccJHw3rhHPRjrES0yWy',
      },
    },
  },
];
