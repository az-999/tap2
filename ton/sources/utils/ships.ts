import { Address, beginCell, Builder, Cell, Dictionary } from "@ton/core"
import { OFFCHAIN_CONTENT_PREFIX } from "./api";

export const shipsConfig = {
    // address: 'EQCwo-MsbrmWaMtB3Pb-egBCo2ZfZtc8vZ-xnOs8B6O-tFOi',
    address: 'EQCliFZPd1xVOmzrN9Hx45SJX_fZd7DZsWQnNB4IMzoPp1f9',
    nft_id: 6,
    metadata: 'https://ipfs.filebase.io/ipfs/Qme9K7MGvtXbbK1NZgfMMaennyRoadSgxAtdyvN8HVbc1T',
    defaultItem: 'https://ipfs.filebase.io/ipfs/Qmdkqe2hFNWbSC6BUyT29gjB2jDpSyEXT9DMJ9ab6kX6vi',
    items: [
        {
            name: 'Cabin Module',
            metadata: 'https://ipfs.filebase.io/ipfs/Qmdkqe2hFNWbSC6BUyT29gjB2jDpSyEXT9DMJ9ab6kX6vi'
        },
        {
            name: "Right Wing Module",
            metadata: "https://ipfs.filebase.io/ipfs/Qmdp264FpiPZYSBmHz8dPyg1UXApWGi1tKmkC3JKsLHYPM"
        },
        {
            name: "Left Wing Module",
            metadata: "https://ipfs.filebase.io/ipfs/QmW11cmchq4cM674pd6D5FxLvKUuZQMVwyimHjxvidbBjG"
        },
        {
            name: "Engine Unit Module",
            metadata: "https://ipfs.filebase.io/ipfs/QmRLo4T1i7YQiRSDdokzbzTi9PyJySbQKsuksbJqzS1TC1"
        },
        {
            name: "Ship Nose Module",
            metadata: "https://ipfs.filebase.io/ipfs/QmYPgxDsQR7UUoqpEBZv9FsBbzmfkhobzz4dE9EatYjG7T"
        },
        {
            name: "Tail Section Module",
            metadata: "https://ipfs.filebase.io/ipfs/QmPXQtuMvRUZYmXRA4mTAe1JpfoAD7a5XXcCebm49MFbUj"
        }
    ]
}

export const getShipMetadataAsMap = () => {
    const dict = Dictionary.empty<bigint, Cell>();
    let idx = BigInt(0);
    for (const item of shipsConfig.items) {
        dict.set(idx, beginCell().storeInt(OFFCHAIN_CONTENT_PREFIX, 8).storeStringRefTail(item.metadata).endCell());
        idx++;
    }
    
    return dict;
}

export const ogpassConfig = {
    address: 'EQCNANRvXO-Z5GK6uLbBMqzeCOsNjxVYVHz0nT27E_yEm3cn',
    nft_id: 7,
    metadata: 'https://ipfs.filebase.io/ipfs/QmSgf6XqytYv8fVfRUfKvTYFPmUtRYHrdRDSqXQ5EWWRBN',
    item: 'https://ipfs.filebase.io/ipfs/QmVbEy9GXSbuqQJpUzra5WFy4ESswAoRN12scTgqToHUwh'
}

export type TransferNftItem = {
    nft_id: number,
    item_id: number,
    dest: string,
    address: string
}

export type MintNft = {
    nft_id: number,
    item_id: number,
    address: string
}

export type IssueRequest = {
    mint: MintNft[],
    transfer: TransferNftItem[]
}

const OP_NFT_TRANSFER = 0x5fcc3d14;

export type NftTransfer = {
    queryId?: bigint,
    dest: Address,
    responseAddress: Address,
    forwardAmount?: bigint,
    forwardPayload?: Cell
}

export const createNftTransferBody = (params: NftTransfer) => {
    const builder = new Builder();
    builder.storeUint(OP_NFT_TRANSFER, 32);
    builder.storeUint(params.queryId || 0, 64);
    builder.storeAddress(params.dest);
    builder.storeAddress(params.responseAddress);
    builder.storeBit(false);
    builder.storeCoins(params.forwardAmount || BigInt(0));
    if (params.forwardPayload) {
        if (params.forwardPayload.refs) {
            builder.storeBit(true);
            builder.storeRef(params.forwardPayload);
        } else {
            builder.storeBit(false);
            builder.storeBits(params.forwardPayload.bits);
        }
    } else {
        builder.storeBit(false);
    }

    return builder.asCell();
}

export type ValidateIssue = {
        queryId: bigint,
}

export type ValidateIssue2 = {
        queryId: string,
}

export const qweCollection = "EQCwF7-OQiHBxKePiBFOAWwzHDTFHkJR9likOqTYFQc08OmS"