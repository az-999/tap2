import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Dictionary, Sender, SenderArguments, SendMode, toNano } from '@ton/core';
import { Opcodes } from './common';
import * as ton from 'ton';
import { BN } from 'bn.js';

export type RoyaltyParams = {
    base: bigint;
    factor: bigint;
    address: Address;
}

export function royaltyParamsToCell(params: RoyaltyParams): Cell {
    return beginCell()
        .storeUint(params.factor, 16)
        .storeUint(params.base, 16)
        .storeAddress(params.address)
        .endCell();
}

export type ShipsCollectionConfig = {
    owner: Address;
    secondMinter: Address;
    content: Cell;
    item_code: Cell;
    royalty: RoyaltyParams;
    treasury: Address;
};

export function shipsCollectionConfigToCell(config: ShipsCollectionConfig): Cell {
    const royalty = royaltyParamsToCell(config.royalty);
    return beginCell()
        .storeAddress(config.owner)
        .storeUint(BigInt(Date.now()), 64)
        .storeRef(config.content)
        .storeRef(config.item_code)
        .storeRef(royalty)
        .storeAddress(config.secondMinter)
        .storeAddress(config.treasury)
        .endCell();
}

export type MintParams = {
    to: Address;
    value: bigint;
    index: bigint; 
    content: Cell;
    queryId: bigint;
    treasury: Address;
}

export type CollectionData = {
    nextItemIndex: bigint;
    content: Cell;
    ownerAddress: Address;
}

export class ShipsCollection implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new ShipsCollection(address);
    }

    static createFromConfig(config: ShipsCollectionConfig, code: Cell, workchain = 0) {
        const data = shipsCollectionConfigToCell(config);
        const init = { code, data };
        return new ShipsCollection(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async createDeployTxParams(value: bigint): Promise<SenderArguments> {
        return {
            body: beginCell().endCell(),
            to: this.address,
            value,
            bounce: false,
            init: this.init,
            sendMode: SendMode.IGNORE_ERRORS,
        }
    }

    async createNftContent(to: Address, content: Cell, treasury: Address): Promise<Cell> {
        return beginCell()
            .storeAddress(to)
            .storeRef(content)
            .storeAddress(treasury)
            .endCell();
    }

    async createMintTxParams(params: MintParams): Promise<SenderArguments> {
        const nftItemContent = await this.createNftContent(params.to, params.content, params.treasury);
        const body = beginCell()
            .storeUint(Opcodes.Mint, 32)
            .storeUint(params.queryId, 64)
            .storeUint(params.index, 64)
            .storeCoins(params.value)
            .storeRef(nftItemContent)
            .endCell();
        
        return {
            body,
            to: this.address,
            value: BigInt(0),
            bounce: false,
            init: this.init,
            sendMode: SendMode.PAY_GAS_SEPARATELY
        }
    }

    async createMultiMintTxParams(queryId: bigint, value: bigint, params: MintParams[]): Promise<SenderArguments> {
        const items = new Map<string, MintParams>();
        for (let item of params) {
            items.set(item.index.toString(10), item);
        }

        const dict = ton.serializeDict(items, 64, (src, cell) => {
            const nftItemContent = ton.beginCell()
                .storeAddress(ton.Address.parse(src.to.toRawString()))
                .storeRef(ton.Cell.fromBoc(src.content.toBoc())[0])
                .storeAddress(ton.Address.parse(src.treasury.toRawString()))
                .endCell();
            cell.bits.writeCoins(new BN(src.value.toString(10)));
            cell.refs.push(nftItemContent);
        })

        console.log(items);
        const body = beginCell()
            .storeUint(Opcodes.MultiMint, 32)
            .storeUint(queryId, 64)
            .storeRef(Cell.fromBoc(dict.toBoc())[0])
            .endCell();
        
        return {
            body,
            to: this.address,
            value,
            bounce: false,
            init: this.init,
            sendMode: SendMode.PAY_GAS_SEPARATELY
        }
    }

    async createTransferTonTxParams(queryId: bigint, value: bigint, to: Address): Promise<SenderArguments> {
        const body = beginCell()
            .storeUint(Opcodes.TransferTon, 32)
            .storeUint(queryId, 64)
            .storeCoins(value)
            .storeAddress(to)
            .endCell();
        
        return {
            body,
            to: this.address,
            value: toNano('0.05'),
            bounce: false,
            init: this.init,
            sendMode: SendMode.PAY_GAS_SEPARATELY
        }
    }

    async getCollectionData(provider: ContractProvider): Promise<CollectionData> {
        const data = await provider.get('get_collection_data', []);
        return {
            nextItemIndex: data.stack.readBigNumber(),
            content: data.stack.readCell(),
            ownerAddress: data.stack.readAddress()
        }
    }

    async getNftAddressByIndex(provider: ContractProvider, index: bigint): Promise<Address> {
        const data = await provider.get('get_nft_address_by_index', [{
            type: 'int',
            value: index
        }]);
        return data.stack.readAddress();
    }

    async getRoyaltyParams(provider: ContractProvider): Promise<RoyaltyParams> {
        const data = await provider.get('get_royalty_params', []);
        return {
            base: data.stack.readBigNumber(),
            factor: data.stack.readBigNumber(),
            address: data.stack.readAddress()
        }
    }

    async getTreasury(provider: ContractProvider): Promise<Address> {
        const data = await provider.get('treasury', []);
        return data.stack.readAddress();
    }
}

export function collectionDataFromCell(cell: Cell): CollectionData {
    const reader = cell.beginParse();
    const nextItemIndex = reader.loadUint(64);
    const content = reader.loadRef();
    const ownerAddress = reader.loadAddress();
    return { nextItemIndex: BigInt(nextItemIndex), content, ownerAddress };
}