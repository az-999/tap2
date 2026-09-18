import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SenderArguments, SendMode, toNano } from '@ton/core';
import { Opcodes } from './common';

export type ShipsCollectionConfig = {};

export function shipsCollectionConfigToCell(config: ShipsCollectionConfig): Cell {
    return beginCell().endCell();
}

export type TransferParams = {
    queryId: bigint;
    value: bigint;
    to: Address;
    responseDestination?: Address;
    forwardAmount: bigint;
    forwardPayload: Cell;
}

export class Module implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Module(address);
    }

    static createFromConfig(config: ShipsCollectionConfig, code: Cell, workchain = 0) {
        const data = shipsCollectionConfigToCell(config);
        const init = { code, data };
        return new Module(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async createTransferTxParams(params: TransferParams): Promise<SenderArguments> {
        const body = beginCell()
            .storeUint(Opcodes.Transfer, 32)
            .storeUint(params.queryId, 64)
            .storeAddress(params.to)
            .storeAddress(params.responseDestination)
            .storeUint(0, 1)
            .storeCoins(params.forwardAmount)
            .storeSlice(params.forwardPayload.asSlice())
            .endCell();

        return {
            body,
            to: this.address,
            value: params.value,
            bounce: false,
            init: this.init,
            sendMode: SendMode.PAY_GAS_SEPARATELY
        }
    }

    async createDestroyTxParams(queryId: bigint): Promise<SenderArguments> {
        const body = beginCell()
            .storeUint(Opcodes.Destroy, 32)
            .storeUint(queryId, 64)
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
}
