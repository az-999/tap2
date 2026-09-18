import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadGetterTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
}

export function storeStdAddress(src: StdAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}

export function loadStdAddress(slice: Slice) {
    let sc_0 = slice;
    let _workchain = sc_0.loadIntBig(8);
    let _address = sc_0.loadUintBig(256);
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleStdAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleStdAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleStdAddress(source: StdAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
}

function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStdAddress(src.loadRef().beginParse());
        }
    }
}

export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
}

export function storeVarAddress(src: VarAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}

export function loadVarAddress(slice: Slice) {
    let sc_0 = slice;
    let _workchain = sc_0.loadIntBig(32);
    let _address = sc_0.loadRef().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleVarAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleVarAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleVarAddress(source: VarAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
}

function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
        },
        parse: (src) => {
            return loadVarAddress(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadGetterTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadGetterTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadGetterTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadGetterTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadGetterTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type ProxyMsg = {
    $$type: 'ProxyMsg';
    to: Address;
    value: bigint;
    body: Cell;
}

export function storeProxyMsg(src: ProxyMsg) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3531620403, 32);
        b_0.storeAddress(src.to);
        b_0.storeCoins(src.value);
        b_0.storeRef(src.body);
    };
}

export function loadProxyMsg(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3531620403) { throw Error('Invalid prefix'); }
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadCoins();
    let _body = sc_0.loadRef();
    return { $$type: 'ProxyMsg' as const, to: _to, value: _value, body: _body };
}

function loadTupleProxyMsg(source: TupleReader) {
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _body = source.readCell();
    return { $$type: 'ProxyMsg' as const, to: _to, value: _value, body: _body };
}

function loadGetterTupleProxyMsg(source: TupleReader) {
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _body = source.readCell();
    return { $$type: 'ProxyMsg' as const, to: _to, value: _value, body: _body };
}

function storeTupleProxyMsg(source: ProxyMsg) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeCell(source.body);
    return builder.build();
}

function dictValueParserProxyMsg(): DictionaryValue<ProxyMsg> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeProxyMsg(src)).endCell());
        },
        parse: (src) => {
            return loadProxyMsg(src.loadRef().beginParse());
        }
    }
}

export type Deposit = {
    $$type: 'Deposit';
    query_id: bigint;
    value: bigint;
    signature: Slice;
}

export function storeDeposit(src: Deposit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2955650924, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.value);
        b_0.storeRef(src.signature.asCell());
    };
}

export function loadDeposit(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2955650924) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _value = sc_0.loadCoins();
    let _signature = sc_0.loadRef().asSlice();
    return { $$type: 'Deposit' as const, query_id: _query_id, value: _value, signature: _signature };
}

function loadTupleDeposit(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _value = source.readBigNumber();
    let _signature = source.readCell().asSlice();
    return { $$type: 'Deposit' as const, query_id: _query_id, value: _value, signature: _signature };
}

function loadGetterTupleDeposit(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _value = source.readBigNumber();
    let _signature = source.readCell().asSlice();
    return { $$type: 'Deposit' as const, query_id: _query_id, value: _value, signature: _signature };
}

function storeTupleDeposit(source: Deposit) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.value);
    builder.writeSlice(source.signature.asCell());
    return builder.build();
}

function dictValueParserDeposit(): DictionaryValue<Deposit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeposit(src)).endCell());
        },
        parse: (src) => {
            return loadDeposit(src.loadRef().beginParse());
        }
    }
}

export type TransferOwnership = {
    $$type: 'TransferOwnership';
    query_id: bigint;
    new_owner: Address;
}

export function storeTransferOwnership(src: TransferOwnership) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1800991741, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.new_owner);
    };
}

export function loadTransferOwnership(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1800991741) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _new_owner = sc_0.loadAddress();
    return { $$type: 'TransferOwnership' as const, query_id: _query_id, new_owner: _new_owner };
}

function loadTupleTransferOwnership(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _new_owner = source.readAddress();
    return { $$type: 'TransferOwnership' as const, query_id: _query_id, new_owner: _new_owner };
}

function loadGetterTupleTransferOwnership(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _new_owner = source.readAddress();
    return { $$type: 'TransferOwnership' as const, query_id: _query_id, new_owner: _new_owner };
}

function storeTupleTransferOwnership(source: TransferOwnership) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.new_owner);
    return builder.build();
}

function dictValueParserTransferOwnership(): DictionaryValue<TransferOwnership> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTransferOwnership(src)).endCell());
        },
        parse: (src) => {
            return loadTransferOwnership(src.loadRef().beginParse());
        }
    }
}

export type SetReferalAddress = {
    $$type: 'SetReferalAddress';
    query_id: bigint;
    referal_address: Address;
}

export function storeSetReferalAddress(src: SetReferalAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1232702265, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.referal_address);
    };
}

export function loadSetReferalAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1232702265) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _referal_address = sc_0.loadAddress();
    return { $$type: 'SetReferalAddress' as const, query_id: _query_id, referal_address: _referal_address };
}

function loadTupleSetReferalAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _referal_address = source.readAddress();
    return { $$type: 'SetReferalAddress' as const, query_id: _query_id, referal_address: _referal_address };
}

function loadGetterTupleSetReferalAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _referal_address = source.readAddress();
    return { $$type: 'SetReferalAddress' as const, query_id: _query_id, referal_address: _referal_address };
}

function storeTupleSetReferalAddress(source: SetReferalAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.referal_address);
    return builder.build();
}

function dictValueParserSetReferalAddress(): DictionaryValue<SetReferalAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetReferalAddress(src)).endCell());
        },
        parse: (src) => {
            return loadSetReferalAddress(src.loadRef().beginParse());
        }
    }
}

export type SetPrizeAddress = {
    $$type: 'SetPrizeAddress';
    query_id: bigint;
    prize_address: Address;
}

export function storeSetPrizeAddress(src: SetPrizeAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(894415229, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.prize_address);
    };
}

export function loadSetPrizeAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 894415229) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _prize_address = sc_0.loadAddress();
    return { $$type: 'SetPrizeAddress' as const, query_id: _query_id, prize_address: _prize_address };
}

function loadTupleSetPrizeAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _prize_address = source.readAddress();
    return { $$type: 'SetPrizeAddress' as const, query_id: _query_id, prize_address: _prize_address };
}

function loadGetterTupleSetPrizeAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _prize_address = source.readAddress();
    return { $$type: 'SetPrizeAddress' as const, query_id: _query_id, prize_address: _prize_address };
}

function storeTupleSetPrizeAddress(source: SetPrizeAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.prize_address);
    return builder.build();
}

function dictValueParserSetPrizeAddress(): DictionaryValue<SetPrizeAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetPrizeAddress(src)).endCell());
        },
        parse: (src) => {
            return loadSetPrizeAddress(src.loadRef().beginParse());
        }
    }
}

export type SetMainAddress = {
    $$type: 'SetMainAddress';
    query_id: bigint;
    main_address: Address;
}

export function storeSetMainAddress(src: SetMainAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2534796593, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.main_address);
    };
}

export function loadSetMainAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2534796593) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _main_address = sc_0.loadAddress();
    return { $$type: 'SetMainAddress' as const, query_id: _query_id, main_address: _main_address };
}

function loadTupleSetMainAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _main_address = source.readAddress();
    return { $$type: 'SetMainAddress' as const, query_id: _query_id, main_address: _main_address };
}

function loadGetterTupleSetMainAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _main_address = source.readAddress();
    return { $$type: 'SetMainAddress' as const, query_id: _query_id, main_address: _main_address };
}

function storeTupleSetMainAddress(source: SetMainAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.main_address);
    return builder.build();
}

function dictValueParserSetMainAddress(): DictionaryValue<SetMainAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetMainAddress(src)).endCell());
        },
        parse: (src) => {
            return loadSetMainAddress(src.loadRef().beginParse());
        }
    }
}

export type UpdatePublicKey = {
    $$type: 'UpdatePublicKey';
    query_id: bigint;
    new_public_key: bigint;
}

export function storeUpdatePublicKey(src: UpdatePublicKey) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1599039702, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeUint(src.new_public_key, 256);
    };
}

export function loadUpdatePublicKey(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1599039702) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _new_public_key = sc_0.loadUintBig(256);
    return { $$type: 'UpdatePublicKey' as const, query_id: _query_id, new_public_key: _new_public_key };
}

function loadTupleUpdatePublicKey(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _new_public_key = source.readBigNumber();
    return { $$type: 'UpdatePublicKey' as const, query_id: _query_id, new_public_key: _new_public_key };
}

function loadGetterTupleUpdatePublicKey(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _new_public_key = source.readBigNumber();
    return { $$type: 'UpdatePublicKey' as const, query_id: _query_id, new_public_key: _new_public_key };
}

function storeTupleUpdatePublicKey(source: UpdatePublicKey) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.new_public_key);
    return builder.build();
}

function dictValueParserUpdatePublicKey(): DictionaryValue<UpdatePublicKey> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdatePublicKey(src)).endCell());
        },
        parse: (src) => {
            return loadUpdatePublicKey(src.loadRef().beginParse());
        }
    }
}

export type UpdateValue = {
    $$type: 'UpdateValue';
    query_id: bigint;
    new_value: bigint;
}

export function storeUpdateValue(src: UpdateValue) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1382399430, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.new_value);
    };
}

export function loadUpdateValue(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1382399430) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _new_value = sc_0.loadCoins();
    return { $$type: 'UpdateValue' as const, query_id: _query_id, new_value: _new_value };
}

function loadTupleUpdateValue(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _new_value = source.readBigNumber();
    return { $$type: 'UpdateValue' as const, query_id: _query_id, new_value: _new_value };
}

function loadGetterTupleUpdateValue(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _new_value = source.readBigNumber();
    return { $$type: 'UpdateValue' as const, query_id: _query_id, new_value: _new_value };
}

function storeTupleUpdateValue(source: UpdateValue) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.new_value);
    return builder.build();
}

function dictValueParserUpdateValue(): DictionaryValue<UpdateValue> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateValue(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateValue(src.loadRef().beginParse());
        }
    }
}

export type Divider = {
    $$type: 'Divider';
    numerator: bigint;
    denominator: bigint;
}

export function storeDivider(src: Divider) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.numerator, 257);
        b_0.storeInt(src.denominator, 257);
    };
}

export function loadDivider(slice: Slice) {
    let sc_0 = slice;
    let _numerator = sc_0.loadIntBig(257);
    let _denominator = sc_0.loadIntBig(257);
    return { $$type: 'Divider' as const, numerator: _numerator, denominator: _denominator };
}

function loadTupleDivider(source: TupleReader) {
    let _numerator = source.readBigNumber();
    let _denominator = source.readBigNumber();
    return { $$type: 'Divider' as const, numerator: _numerator, denominator: _denominator };
}

function loadGetterTupleDivider(source: TupleReader) {
    let _numerator = source.readBigNumber();
    let _denominator = source.readBigNumber();
    return { $$type: 'Divider' as const, numerator: _numerator, denominator: _denominator };
}

function storeTupleDivider(source: Divider) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.numerator);
    builder.writeNumber(source.denominator);
    return builder.build();
}

function dictValueParserDivider(): DictionaryValue<Divider> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDivider(src)).endCell());
        },
        parse: (src) => {
            return loadDivider(src.loadRef().beginParse());
        }
    }
}

export type SetDividors = {
    $$type: 'SetDividors';
    query_id: bigint;
    ref_divider: Divider;
    prize_divider: Divider;
}

export function storeSetDividors(src: SetDividors) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4172235513, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.store(storeDivider(src.ref_divider));
        let b_1 = new Builder();
        b_1.store(storeDivider(src.prize_divider));
        b_0.storeRef(b_1.endCell());
    };
}

export function loadSetDividors(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4172235513) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _ref_divider = loadDivider(sc_0);
    let sc_1 = sc_0.loadRef().beginParse();
    let _prize_divider = loadDivider(sc_1);
    return { $$type: 'SetDividors' as const, query_id: _query_id, ref_divider: _ref_divider, prize_divider: _prize_divider };
}

function loadTupleSetDividors(source: TupleReader) {
    let _query_id = source.readBigNumber();
    const _ref_divider = loadTupleDivider(source);
    const _prize_divider = loadTupleDivider(source);
    return { $$type: 'SetDividors' as const, query_id: _query_id, ref_divider: _ref_divider, prize_divider: _prize_divider };
}

function loadGetterTupleSetDividors(source: TupleReader) {
    let _query_id = source.readBigNumber();
    const _ref_divider = loadGetterTupleDivider(source);
    const _prize_divider = loadGetterTupleDivider(source);
    return { $$type: 'SetDividors' as const, query_id: _query_id, ref_divider: _ref_divider, prize_divider: _prize_divider };
}

function storeTupleSetDividors(source: SetDividors) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeTuple(storeTupleDivider(source.ref_divider));
    builder.writeTuple(storeTupleDivider(source.prize_divider));
    return builder.build();
}

function dictValueParserSetDividors(): DictionaryValue<SetDividors> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetDividors(src)).endCell());
        },
        parse: (src) => {
            return loadSetDividors(src.loadRef().beginParse());
        }
    }
}

export type Router$Data = {
    $$type: 'Router$Data';
    owner_address: Address;
    owner_pubkey: bigint;
    referal_address: Address;
    prize_address: Address;
    main_address: Address;
    value: bigint;
    refDivider: Divider;
    prizeDivider: Divider;
}

export function storeRouter$Data(src: Router$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner_address);
        b_0.storeInt(src.owner_pubkey, 257);
        b_0.storeAddress(src.referal_address);
        let b_1 = new Builder();
        b_1.storeAddress(src.prize_address);
        b_1.storeAddress(src.main_address);
        b_1.storeInt(src.value, 257);
        let b_2 = new Builder();
        b_2.store(storeDivider(src.refDivider));
        let b_3 = new Builder();
        b_3.store(storeDivider(src.prizeDivider));
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadRouter$Data(slice: Slice) {
    let sc_0 = slice;
    let _owner_address = sc_0.loadAddress();
    let _owner_pubkey = sc_0.loadIntBig(257);
    let _referal_address = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _prize_address = sc_1.loadAddress();
    let _main_address = sc_1.loadAddress();
    let _value = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _refDivider = loadDivider(sc_2);
    let sc_3 = sc_2.loadRef().beginParse();
    let _prizeDivider = loadDivider(sc_3);
    return { $$type: 'Router$Data' as const, owner_address: _owner_address, owner_pubkey: _owner_pubkey, referal_address: _referal_address, prize_address: _prize_address, main_address: _main_address, value: _value, refDivider: _refDivider, prizeDivider: _prizeDivider };
}

function loadTupleRouter$Data(source: TupleReader) {
    let _owner_address = source.readAddress();
    let _owner_pubkey = source.readBigNumber();
    let _referal_address = source.readAddress();
    let _prize_address = source.readAddress();
    let _main_address = source.readAddress();
    let _value = source.readBigNumber();
    const _refDivider = loadTupleDivider(source);
    const _prizeDivider = loadTupleDivider(source);
    return { $$type: 'Router$Data' as const, owner_address: _owner_address, owner_pubkey: _owner_pubkey, referal_address: _referal_address, prize_address: _prize_address, main_address: _main_address, value: _value, refDivider: _refDivider, prizeDivider: _prizeDivider };
}

function loadGetterTupleRouter$Data(source: TupleReader) {
    let _owner_address = source.readAddress();
    let _owner_pubkey = source.readBigNumber();
    let _referal_address = source.readAddress();
    let _prize_address = source.readAddress();
    let _main_address = source.readAddress();
    let _value = source.readBigNumber();
    const _refDivider = loadGetterTupleDivider(source);
    const _prizeDivider = loadGetterTupleDivider(source);
    return { $$type: 'Router$Data' as const, owner_address: _owner_address, owner_pubkey: _owner_pubkey, referal_address: _referal_address, prize_address: _prize_address, main_address: _main_address, value: _value, refDivider: _refDivider, prizeDivider: _prizeDivider };
}

function storeTupleRouter$Data(source: Router$Data) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner_address);
    builder.writeNumber(source.owner_pubkey);
    builder.writeAddress(source.referal_address);
    builder.writeAddress(source.prize_address);
    builder.writeAddress(source.main_address);
    builder.writeNumber(source.value);
    builder.writeTuple(storeTupleDivider(source.refDivider));
    builder.writeTuple(storeTupleDivider(source.prizeDivider));
    return builder.build();
}

function dictValueParserRouter$Data(): DictionaryValue<Router$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRouter$Data(src)).endCell());
        },
        parse: (src) => {
            return loadRouter$Data(src.loadRef().beginParse());
        }
    }
}

 type Router_init_args = {
    $$type: 'Router_init_args';
    owner_address: Address;
    owner_pubkey: bigint;
    referal_address: Address;
    prize_address: Address;
    main_address: Address;
    value: bigint;
}

function initRouter_init_args(src: Router_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner_address);
        b_0.storeInt(src.owner_pubkey, 257);
        b_0.storeAddress(src.referal_address);
        let b_1 = new Builder();
        b_1.storeAddress(src.prize_address);
        b_1.storeAddress(src.main_address);
        b_1.storeInt(src.value, 257);
        b_0.storeRef(b_1.endCell());
    };
}

async function Router_init(owner_address: Address, owner_pubkey: bigint, referal_address: Address, prize_address: Address, main_address: Address, value: bigint) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initRouter_init_args({ $$type: 'Router_init_args', owner_address, owner_pubkey, referal_address, prize_address, main_address, value })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Router_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    11: { message: `'Unknown' error` },
    12: { message: `Fatal error` },
    13: { message: `Out of gas error` },
    14: { message: `Virtualization error` },
    32: { message: `Action list is invalid` },
    33: { message: `Action list is too long` },
    34: { message: `Action is invalid or not supported` },
    35: { message: `Invalid source address in outbound message` },
    36: { message: `Invalid destination address in outbound message` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    39: { message: `Outbound message does not fit into a cell after rewriting` },
    40: { message: `Cannot process a message` },
    41: { message: `Library reference is null` },
    42: { message: `Library change action error` },
    43: { message: `Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree` },
    50: { message: `Account state size exceeded limits` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    4090: { message: `Only owner can set dividors` },
    6827: { message: `Only owner can set prize address` },
    12603: { message: `Only owner can proxy message` },
    28099: { message: `Only owner can set referal address` },
    36952: { message: `Only owner can transfer` },
    37779: { message: `Only owner can set main address` },
    46826: { message: `Only owner can update public key` },
    48401: { message: `Invalid signature` },
    53983: { message: `Price requirement is not met` },
    57449: { message: `Only owner can set value` },
    61734: { message: `Only owner can deposit` },
}

const Router_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ProxyMsg","header":3531620403,"fields":[{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"body","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Deposit","header":2955650924,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"value","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"signature","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"TransferOwnership","header":1800991741,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"new_owner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SetReferalAddress","header":1232702265,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"referal_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SetPrizeAddress","header":894415229,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"prize_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SetMainAddress","header":2534796593,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"main_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UpdatePublicKey","header":1599039702,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"new_public_key","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"UpdateValue","header":1382399430,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"new_value","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"Divider","header":null,"fields":[{"name":"numerator","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"denominator","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"SetDividors","header":4172235513,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"ref_divider","type":{"kind":"simple","type":"Divider","optional":false}},{"name":"prize_divider","type":{"kind":"simple","type":"Divider","optional":false}}]},
    {"name":"Router$Data","header":null,"fields":[{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner_pubkey","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"referal_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"prize_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"main_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refDivider","type":{"kind":"simple","type":"Divider","optional":false}},{"name":"prizeDivider","type":{"kind":"simple","type":"Divider","optional":false}}]},
]

const Router_getters: ABIGetter[] = [
    {"name":"getMainAddress","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"getPrizeAddress","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"getReferalAddress","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"getValue","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getRefDivider","arguments":[],"returnType":{"kind":"simple","type":"Divider","optional":false}},
    {"name":"getPrizeDivider","arguments":[],"returnType":{"kind":"simple","type":"Divider","optional":false}},
]

export const Router_getterMapping: { [key: string]: string } = {
    'getMainAddress': 'getGetMainAddress',
    'getPrizeAddress': 'getGetPrizeAddress',
    'getReferalAddress': 'getGetReferalAddress',
    'getValue': 'getGetValue',
    'getRefDivider': 'getGetRefDivider',
    'getPrizeDivider': 'getGetPrizeDivider',
}

const Router_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"TransferOwnership"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ProxyMsg"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetMainAddress"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetPrizeAddress"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetReferalAddress"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdatePublicKey"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateValue"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetDividors"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deposit"}},
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class Router implements Contract {
    
    static async init(owner_address: Address, owner_pubkey: bigint, referal_address: Address, prize_address: Address, main_address: Address, value: bigint) {
        return await Router_init(owner_address, owner_pubkey, referal_address, prize_address, main_address, value);
    }
    
    static async fromInit(owner_address: Address, owner_pubkey: bigint, referal_address: Address, prize_address: Address, main_address: Address, value: bigint) {
        const init = await Router_init(owner_address, owner_pubkey, referal_address, prize_address, main_address, value);
        const address = contractAddress(0, init);
        return new Router(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Router(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Router_types,
        getters: Router_getters,
        receivers: Router_receivers,
        errors: Router_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: TransferOwnership | ProxyMsg | SetMainAddress | SetPrizeAddress | SetReferalAddress | UpdatePublicKey | UpdateValue | SetDividors | Deposit | null | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TransferOwnership') {
            body = beginCell().store(storeTransferOwnership(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ProxyMsg') {
            body = beginCell().store(storeProxyMsg(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetMainAddress') {
            body = beginCell().store(storeSetMainAddress(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetPrizeAddress') {
            body = beginCell().store(storeSetPrizeAddress(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetReferalAddress') {
            body = beginCell().store(storeSetReferalAddress(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdatePublicKey') {
            body = beginCell().store(storeUpdatePublicKey(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateValue') {
            body = beginCell().store(storeUpdateValue(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetDividors') {
            body = beginCell().store(storeSetDividors(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deposit') {
            body = beginCell().store(storeDeposit(message)).endCell();
        }
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetMainAddress(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getMainAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getGetPrizeAddress(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getPrizeAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getGetReferalAddress(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getReferalAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getGetValue(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getValue', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetRefDivider(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getRefDivider', builder.build())).stack;
        const result = loadGetterTupleDivider(source);
        return result;
    }
    
    async getGetPrizeDivider(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getPrizeDivider', builder.build())).stack;
        const result = loadGetterTupleDivider(source);
        return result;
    }
    
}