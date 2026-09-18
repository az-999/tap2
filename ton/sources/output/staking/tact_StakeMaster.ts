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

export type TransferTON = {
    $$type: 'TransferTON';
    to_address: Address;
    value: bigint;
}

export function storeTransferTON(src: TransferTON) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(271167746, 32);
        b_0.storeAddress(src.to_address);
        b_0.storeCoins(src.value);
    };
}

export function loadTransferTON(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 271167746) { throw Error('Invalid prefix'); }
    let _to_address = sc_0.loadAddress();
    let _value = sc_0.loadCoins();
    return { $$type: 'TransferTON' as const, to_address: _to_address, value: _value };
}

function loadTupleTransferTON(source: TupleReader) {
    let _to_address = source.readAddress();
    let _value = source.readBigNumber();
    return { $$type: 'TransferTON' as const, to_address: _to_address, value: _value };
}

function loadGetterTupleTransferTON(source: TupleReader) {
    let _to_address = source.readAddress();
    let _value = source.readBigNumber();
    return { $$type: 'TransferTON' as const, to_address: _to_address, value: _value };
}

function storeTupleTransferTON(source: TransferTON) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.to_address);
    builder.writeNumber(source.value);
    return builder.build();
}

function dictValueParserTransferTON(): DictionaryValue<TransferTON> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTransferTON(src)).endCell());
        },
        parse: (src) => {
            return loadTransferTON(src.loadRef().beginParse());
        }
    }
}

export type MintByOwner = {
    $$type: 'MintByOwner';
    mint_to: Address;
    content: Cell;
}

export function storeMintByOwner(src: MintByOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1607220500, 32);
        b_0.storeAddress(src.mint_to);
        b_0.storeRef(src.content);
    };
}

export function loadMintByOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1607220500) { throw Error('Invalid prefix'); }
    let _mint_to = sc_0.loadAddress();
    let _content = sc_0.loadRef();
    return { $$type: 'MintByOwner' as const, mint_to: _mint_to, content: _content };
}

function loadTupleMintByOwner(source: TupleReader) {
    let _mint_to = source.readAddress();
    let _content = source.readCell();
    return { $$type: 'MintByOwner' as const, mint_to: _mint_to, content: _content };
}

function loadGetterTupleMintByOwner(source: TupleReader) {
    let _mint_to = source.readAddress();
    let _content = source.readCell();
    return { $$type: 'MintByOwner' as const, mint_to: _mint_to, content: _content };
}

function storeTupleMintByOwner(source: MintByOwner) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.mint_to);
    builder.writeCell(source.content);
    return builder.build();
}

function dictValueParserMintByOwner(): DictionaryValue<MintByOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMintByOwner(src)).endCell());
        },
        parse: (src) => {
            return loadMintByOwner(src.loadRef().beginParse());
        }
    }
}

export type TokenNotification = {
    $$type: 'TokenNotification';
    query_id: bigint;
    amount: bigint;
    from: Address;
    forward_payload: Slice;
}

export function storeTokenNotification(src: TokenNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _forward_payload = sc_0;
    return { $$type: 'TokenNotification' as const, query_id: _query_id, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function loadTupleTokenNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TokenNotification' as const, query_id: _query_id, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function loadGetterTupleTokenNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TokenNotification' as const, query_id: _query_id, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function storeTupleTokenNotification(source: TokenNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserTokenNotification(): DictionaryValue<TokenNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenNotification(src)).endCell());
        },
        parse: (src) => {
            return loadTokenNotification(src.loadRef().beginParse());
        }
    }
}

export type MintJetton = {
    $$type: 'MintJetton';
    query_id: bigint;
    amount: bigint;
    receiver: Address;
}

export function storeMintJetton(src: MintJetton) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(21, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.receiver);
    };
}

export function loadMintJetton(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 21) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _receiver = sc_0.loadAddress();
    return { $$type: 'MintJetton' as const, query_id: _query_id, amount: _amount, receiver: _receiver };
}

function loadTupleMintJetton(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _receiver = source.readAddress();
    return { $$type: 'MintJetton' as const, query_id: _query_id, amount: _amount, receiver: _receiver };
}

function loadGetterTupleMintJetton(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _receiver = source.readAddress();
    return { $$type: 'MintJetton' as const, query_id: _query_id, amount: _amount, receiver: _receiver };
}

function storeTupleMintJetton(source: MintJetton) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.receiver);
    return builder.build();
}

function dictValueParserMintJetton(): DictionaryValue<MintJetton> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMintJetton(src)).endCell());
        },
        parse: (src) => {
            return loadMintJetton(src.loadRef().beginParse());
        }
    }
}

export type TokenExcesses = {
    $$type: 'TokenExcesses';
    queryId: bigint;
}

export function storeTokenExcesses(src: TokenExcesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadTokenExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'TokenExcesses' as const, queryId: _queryId };
}

function loadTupleTokenExcesses(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'TokenExcesses' as const, queryId: _queryId };
}

function loadGetterTupleTokenExcesses(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'TokenExcesses' as const, queryId: _queryId };
}

function storeTupleTokenExcesses(source: TokenExcesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserTokenExcesses(): DictionaryValue<TokenExcesses> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadTokenExcesses(src.loadRef().beginParse());
        }
    }
}

export type TokenBurn = {
    $$type: 'TokenBurn';
    query_id: bigint;
    amount: bigint;
    response_destination: Address | null;
    custom_payload: Cell | null;
}

export function storeTokenBurn(src: TokenBurn) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1499400124, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
    };
}

export function loadTokenBurn(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1499400124) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _response_destination = sc_0.loadMaybeAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'TokenBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function loadTupleTokenBurn(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    return { $$type: 'TokenBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function loadGetterTupleTokenBurn(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    return { $$type: 'TokenBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function storeTupleTokenBurn(source: TokenBurn) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    return builder.build();
}

function dictValueParserTokenBurn(): DictionaryValue<TokenBurn> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenBurn(src)).endCell());
        },
        parse: (src) => {
            return loadTokenBurn(src.loadRef().beginParse());
        }
    }
}

export type Claim = {
    $$type: 'Claim';
    query_id: bigint;
    owner_address: Address;
    wallet_address: Address;
    signature: Slice;
}

export function storeClaim(src: Claim) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1586636328, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.owner_address);
        b_0.storeAddress(src.wallet_address);
        b_0.storeRef(src.signature.asCell());
    };
}

export function loadClaim(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1586636328) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _owner_address = sc_0.loadAddress();
    let _wallet_address = sc_0.loadAddress();
    let _signature = sc_0.loadRef().asSlice();
    return { $$type: 'Claim' as const, query_id: _query_id, owner_address: _owner_address, wallet_address: _wallet_address, signature: _signature };
}

function loadTupleClaim(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _owner_address = source.readAddress();
    let _wallet_address = source.readAddress();
    let _signature = source.readCell().asSlice();
    return { $$type: 'Claim' as const, query_id: _query_id, owner_address: _owner_address, wallet_address: _wallet_address, signature: _signature };
}

function loadGetterTupleClaim(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _owner_address = source.readAddress();
    let _wallet_address = source.readAddress();
    let _signature = source.readCell().asSlice();
    return { $$type: 'Claim' as const, query_id: _query_id, owner_address: _owner_address, wallet_address: _wallet_address, signature: _signature };
}

function storeTupleClaim(source: Claim) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.owner_address);
    builder.writeAddress(source.wallet_address);
    builder.writeSlice(source.signature.asCell());
    return builder.build();
}

function dictValueParserClaim(): DictionaryValue<Claim> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeClaim(src)).endCell());
        },
        parse: (src) => {
            return loadClaim(src.loadRef().beginParse());
        }
    }
}

export type Released = {
    $$type: 'Released';
    query_id: bigint;
}

export function storeReleased(src: Released) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3468646859, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadReleased(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3468646859) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'Released' as const, query_id: _query_id };
}

function loadTupleReleased(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'Released' as const, query_id: _query_id };
}

function loadGetterTupleReleased(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'Released' as const, query_id: _query_id };
}

function storeTupleReleased(source: Released) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserReleased(): DictionaryValue<Released> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeReleased(src)).endCell());
        },
        parse: (src) => {
            return loadReleased(src.loadRef().beginParse());
        }
    }
}

export type Deposit = {
    $$type: 'Deposit';
    query_id: bigint;
    amount: bigint;
    out_amount: bigint;
    mint_count: bigint;
    duration: bigint;
    owner_address: Address;
    signature: Slice;
    max_claims: bigint;
}

export function storeDeposit(src: Deposit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(69877033, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeCoins(src.out_amount);
        b_0.storeUint(src.mint_count, 32);
        b_0.storeUint(src.duration, 32);
        b_0.storeAddress(src.owner_address);
        b_0.storeRef(src.signature.asCell());
        b_0.storeUint(src.max_claims, 32);
    };
}

export function loadDeposit(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 69877033) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _out_amount = sc_0.loadCoins();
    let _mint_count = sc_0.loadUintBig(32);
    let _duration = sc_0.loadUintBig(32);
    let _owner_address = sc_0.loadAddress();
    let _signature = sc_0.loadRef().asSlice();
    let _max_claims = sc_0.loadUintBig(32);
    return { $$type: 'Deposit' as const, query_id: _query_id, amount: _amount, out_amount: _out_amount, mint_count: _mint_count, duration: _duration, owner_address: _owner_address, signature: _signature, max_claims: _max_claims };
}

function loadTupleDeposit(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _out_amount = source.readBigNumber();
    let _mint_count = source.readBigNumber();
    let _duration = source.readBigNumber();
    let _owner_address = source.readAddress();
    let _signature = source.readCell().asSlice();
    let _max_claims = source.readBigNumber();
    return { $$type: 'Deposit' as const, query_id: _query_id, amount: _amount, out_amount: _out_amount, mint_count: _mint_count, duration: _duration, owner_address: _owner_address, signature: _signature, max_claims: _max_claims };
}

function loadGetterTupleDeposit(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _out_amount = source.readBigNumber();
    let _mint_count = source.readBigNumber();
    let _duration = source.readBigNumber();
    let _owner_address = source.readAddress();
    let _signature = source.readCell().asSlice();
    let _max_claims = source.readBigNumber();
    return { $$type: 'Deposit' as const, query_id: _query_id, amount: _amount, out_amount: _out_amount, mint_count: _mint_count, duration: _duration, owner_address: _owner_address, signature: _signature, max_claims: _max_claims };
}

function storeTupleDeposit(source: Deposit) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.out_amount);
    builder.writeNumber(source.mint_count);
    builder.writeNumber(source.duration);
    builder.writeAddress(source.owner_address);
    builder.writeSlice(source.signature.asCell());
    builder.writeNumber(source.max_claims);
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

export type ProxyMsg = {
    $$type: 'ProxyMsg';
    query_id: bigint;
    to: Address;
    value: bigint;
    body: Cell | null;
}

export function storeProxyMsg(src: ProxyMsg) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3891826139, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.to);
        b_0.storeCoins(src.value);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
    };
}

export function loadProxyMsg(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3891826139) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadCoins();
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'ProxyMsg' as const, query_id: _query_id, to: _to, value: _value, body: _body };
}

function loadTupleProxyMsg(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _body = source.readCellOpt();
    return { $$type: 'ProxyMsg' as const, query_id: _query_id, to: _to, value: _value, body: _body };
}

function loadGetterTupleProxyMsg(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _body = source.readCellOpt();
    return { $$type: 'ProxyMsg' as const, query_id: _query_id, to: _to, value: _value, body: _body };
}

function storeTupleProxyMsg(source: ProxyMsg) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
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

export type UpdateFeeAddress = {
    $$type: 'UpdateFeeAddress';
    query_id: bigint;
    new_fee_address: Address;
}

export function storeUpdateFeeAddress(src: UpdateFeeAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(130433518, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.new_fee_address);
    };
}

export function loadUpdateFeeAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 130433518) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _new_fee_address = sc_0.loadAddress();
    return { $$type: 'UpdateFeeAddress' as const, query_id: _query_id, new_fee_address: _new_fee_address };
}

function loadTupleUpdateFeeAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _new_fee_address = source.readAddress();
    return { $$type: 'UpdateFeeAddress' as const, query_id: _query_id, new_fee_address: _new_fee_address };
}

function loadGetterTupleUpdateFeeAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _new_fee_address = source.readAddress();
    return { $$type: 'UpdateFeeAddress' as const, query_id: _query_id, new_fee_address: _new_fee_address };
}

function storeTupleUpdateFeeAddress(source: UpdateFeeAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.new_fee_address);
    return builder.build();
}

function dictValueParserUpdateFeeAddress(): DictionaryValue<UpdateFeeAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateFeeAddress(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateFeeAddress(src.loadRef().beginParse());
        }
    }
}

export type UpdateJettonAddress = {
    $$type: 'UpdateJettonAddress';
    query_id: bigint;
    new_jetton_address: Address;
}

export function storeUpdateJettonAddress(src: UpdateJettonAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2933033334, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.new_jetton_address);
    };
}

export function loadUpdateJettonAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2933033334) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _new_jetton_address = sc_0.loadAddress();
    return { $$type: 'UpdateJettonAddress' as const, query_id: _query_id, new_jetton_address: _new_jetton_address };
}

function loadTupleUpdateJettonAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _new_jetton_address = source.readAddress();
    return { $$type: 'UpdateJettonAddress' as const, query_id: _query_id, new_jetton_address: _new_jetton_address };
}

function loadGetterTupleUpdateJettonAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _new_jetton_address = source.readAddress();
    return { $$type: 'UpdateJettonAddress' as const, query_id: _query_id, new_jetton_address: _new_jetton_address };
}

function storeTupleUpdateJettonAddress(source: UpdateJettonAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.new_jetton_address);
    return builder.build();
}

function dictValueParserUpdateJettonAddress(): DictionaryValue<UpdateJettonAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateJettonAddress(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateJettonAddress(src.loadRef().beginParse());
        }
    }
}

export type UpdateNftAddress = {
    $$type: 'UpdateNftAddress';
    query_id: bigint;
    new_nft_address: Address;
}

export function storeUpdateNftAddress(src: UpdateNftAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3529429755, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.new_nft_address);
    };
}

export function loadUpdateNftAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3529429755) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _new_nft_address = sc_0.loadAddress();
    return { $$type: 'UpdateNftAddress' as const, query_id: _query_id, new_nft_address: _new_nft_address };
}

function loadTupleUpdateNftAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _new_nft_address = source.readAddress();
    return { $$type: 'UpdateNftAddress' as const, query_id: _query_id, new_nft_address: _new_nft_address };
}

function loadGetterTupleUpdateNftAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _new_nft_address = source.readAddress();
    return { $$type: 'UpdateNftAddress' as const, query_id: _query_id, new_nft_address: _new_nft_address };
}

function storeTupleUpdateNftAddress(source: UpdateNftAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.new_nft_address);
    return builder.build();
}

function dictValueParserUpdateNftAddress(): DictionaryValue<UpdateNftAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateNftAddress(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateNftAddress(src.loadRef().beginParse());
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

export type Claimed = {
    $$type: 'Claimed';
    query_id: bigint;
}

export function storeClaimed(src: Claimed) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1603741764, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadClaimed(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1603741764) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'Claimed' as const, query_id: _query_id };
}

function loadTupleClaimed(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'Claimed' as const, query_id: _query_id };
}

function loadGetterTupleClaimed(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'Claimed' as const, query_id: _query_id };
}

function storeTupleClaimed(source: Claimed) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserClaimed(): DictionaryValue<Claimed> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeClaimed(src)).endCell());
        },
        parse: (src) => {
            return loadClaimed(src.loadRef().beginParse());
        }
    }
}

export type DoMint = {
    $$type: 'DoMint';
    query_id: bigint;
    receiver: Address;
    sender: Address;
    signature: Slice;
    mint_count: bigint;
    amount: bigint;
    wallet_address: Address;
    fees: bigint;
}

export function storeDoMint(src: DoMint) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2793121783, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.receiver);
        b_0.storeAddress(src.sender);
        b_0.storeRef(src.signature.asCell());
        b_0.storeUint(src.mint_count, 32);
        b_0.storeCoins(src.amount);
        let b_1 = new Builder();
        b_1.storeAddress(src.wallet_address);
        b_1.storeCoins(src.fees);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadDoMint(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2793121783) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _receiver = sc_0.loadAddress();
    let _sender = sc_0.loadAddress();
    let _signature = sc_0.loadRef().asSlice();
    let _mint_count = sc_0.loadUintBig(32);
    let _amount = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _wallet_address = sc_1.loadAddress();
    let _fees = sc_1.loadCoins();
    return { $$type: 'DoMint' as const, query_id: _query_id, receiver: _receiver, sender: _sender, signature: _signature, mint_count: _mint_count, amount: _amount, wallet_address: _wallet_address, fees: _fees };
}

function loadTupleDoMint(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _receiver = source.readAddress();
    let _sender = source.readAddress();
    let _signature = source.readCell().asSlice();
    let _mint_count = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _wallet_address = source.readAddress();
    let _fees = source.readBigNumber();
    return { $$type: 'DoMint' as const, query_id: _query_id, receiver: _receiver, sender: _sender, signature: _signature, mint_count: _mint_count, amount: _amount, wallet_address: _wallet_address, fees: _fees };
}

function loadGetterTupleDoMint(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _receiver = source.readAddress();
    let _sender = source.readAddress();
    let _signature = source.readCell().asSlice();
    let _mint_count = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _wallet_address = source.readAddress();
    let _fees = source.readBigNumber();
    return { $$type: 'DoMint' as const, query_id: _query_id, receiver: _receiver, sender: _sender, signature: _signature, mint_count: _mint_count, amount: _amount, wallet_address: _wallet_address, fees: _fees };
}

function storeTupleDoMint(source: DoMint) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.receiver);
    builder.writeAddress(source.sender);
    builder.writeSlice(source.signature.asCell());
    builder.writeNumber(source.mint_count);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.wallet_address);
    builder.writeNumber(source.fees);
    return builder.build();
}

function dictValueParserDoMint(): DictionaryValue<DoMint> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDoMint(src)).endCell());
        },
        parse: (src) => {
            return loadDoMint(src.loadRef().beginParse());
        }
    }
}

export type Restake = {
    $$type: 'Restake';
    query_id: bigint;
}

export function storeRestake(src: Restake) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1489790520, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadRestake(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1489790520) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'Restake' as const, query_id: _query_id };
}

function loadTupleRestake(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'Restake' as const, query_id: _query_id };
}

function loadGetterTupleRestake(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'Restake' as const, query_id: _query_id };
}

function storeTupleRestake(source: Restake) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserRestake(): DictionaryValue<Restake> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRestake(src)).endCell());
        },
        parse: (src) => {
            return loadRestake(src.loadRef().beginParse());
        }
    }
}

export type Withdraw = {
    $$type: 'Withdraw';
    query_id: bigint;
    signature: Slice;
    wallet_address: Address;
}

export function storeWithdraw(src: Withdraw) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3123246349, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeRef(src.signature.asCell());
        b_0.storeAddress(src.wallet_address);
    };
}

export function loadWithdraw(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3123246349) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _signature = sc_0.loadRef().asSlice();
    let _wallet_address = sc_0.loadAddress();
    return { $$type: 'Withdraw' as const, query_id: _query_id, signature: _signature, wallet_address: _wallet_address };
}

function loadTupleWithdraw(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _signature = source.readCell().asSlice();
    let _wallet_address = source.readAddress();
    return { $$type: 'Withdraw' as const, query_id: _query_id, signature: _signature, wallet_address: _wallet_address };
}

function loadGetterTupleWithdraw(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _signature = source.readCell().asSlice();
    let _wallet_address = source.readAddress();
    return { $$type: 'Withdraw' as const, query_id: _query_id, signature: _signature, wallet_address: _wallet_address };
}

function storeTupleWithdraw(source: Withdraw) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeSlice(source.signature.asCell());
    builder.writeAddress(source.wallet_address);
    return builder.build();
}

function dictValueParserWithdraw(): DictionaryValue<Withdraw> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdraw(src)).endCell());
        },
        parse: (src) => {
            return loadWithdraw(src.loadRef().beginParse());
        }
    }
}

export type RestakeOldStake = {
    $$type: 'RestakeOldStake';
    query_id: bigint;
    stake_id: bigint;
}

export function storeRestakeOldStake(src: RestakeOldStake) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4053056756, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeUint(src.stake_id, 64);
    };
}

export function loadRestakeOldStake(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4053056756) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _stake_id = sc_0.loadUintBig(64);
    return { $$type: 'RestakeOldStake' as const, query_id: _query_id, stake_id: _stake_id };
}

function loadTupleRestakeOldStake(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _stake_id = source.readBigNumber();
    return { $$type: 'RestakeOldStake' as const, query_id: _query_id, stake_id: _stake_id };
}

function loadGetterTupleRestakeOldStake(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _stake_id = source.readBigNumber();
    return { $$type: 'RestakeOldStake' as const, query_id: _query_id, stake_id: _stake_id };
}

function storeTupleRestakeOldStake(source: RestakeOldStake) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.stake_id);
    return builder.build();
}

function dictValueParserRestakeOldStake(): DictionaryValue<RestakeOldStake> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRestakeOldStake(src)).endCell());
        },
        parse: (src) => {
            return loadRestakeOldStake(src.loadRef().beginParse());
        }
    }
}

export type WithdrawOldStake = {
    $$type: 'WithdrawOldStake';
    query_id: bigint;
    stake_id: bigint;
    signature: Slice;
    wallet_address: Address;
}

export function storeWithdrawOldStake(src: WithdrawOldStake) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(974840603, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeUint(src.stake_id, 64);
        b_0.storeRef(src.signature.asCell());
        b_0.storeAddress(src.wallet_address);
    };
}

export function loadWithdrawOldStake(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 974840603) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _stake_id = sc_0.loadUintBig(64);
    let _signature = sc_0.loadRef().asSlice();
    let _wallet_address = sc_0.loadAddress();
    return { $$type: 'WithdrawOldStake' as const, query_id: _query_id, stake_id: _stake_id, signature: _signature, wallet_address: _wallet_address };
}

function loadTupleWithdrawOldStake(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _stake_id = source.readBigNumber();
    let _signature = source.readCell().asSlice();
    let _wallet_address = source.readAddress();
    return { $$type: 'WithdrawOldStake' as const, query_id: _query_id, stake_id: _stake_id, signature: _signature, wallet_address: _wallet_address };
}

function loadGetterTupleWithdrawOldStake(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _stake_id = source.readBigNumber();
    let _signature = source.readCell().asSlice();
    let _wallet_address = source.readAddress();
    return { $$type: 'WithdrawOldStake' as const, query_id: _query_id, stake_id: _stake_id, signature: _signature, wallet_address: _wallet_address };
}

function storeTupleWithdrawOldStake(source: WithdrawOldStake) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.stake_id);
    builder.writeSlice(source.signature.asCell());
    builder.writeAddress(source.wallet_address);
    return builder.build();
}

function dictValueParserWithdrawOldStake(): DictionaryValue<WithdrawOldStake> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdrawOldStake(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawOldStake(src.loadRef().beginParse());
        }
    }
}

export type OldStakeRecord = {
    $$type: 'OldStakeRecord';
    stake_amount: bigint;
    out_amount: bigint;
    mint_count: bigint;
    max_claims: bigint;
    claims_count: bigint;
    stake_time: bigint;
    created_at: bigint;
    next_claim: bigint;
    last_claim: bigint;
    end_time: bigint;
    wallet_address: Address;
}

export function storeOldStakeRecord(src: OldStakeRecord) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.stake_amount);
        b_0.storeCoins(src.out_amount);
        b_0.storeUint(src.mint_count, 8);
        b_0.storeUint(src.max_claims, 32);
        b_0.storeUint(src.claims_count, 32);
        b_0.storeUint(src.stake_time, 32);
        b_0.storeUint(src.created_at, 32);
        b_0.storeUint(src.next_claim, 32);
        b_0.storeUint(src.last_claim, 32);
        b_0.storeUint(src.end_time, 32);
        b_0.storeAddress(src.wallet_address);
    };
}

export function loadOldStakeRecord(slice: Slice) {
    let sc_0 = slice;
    let _stake_amount = sc_0.loadCoins();
    let _out_amount = sc_0.loadCoins();
    let _mint_count = sc_0.loadUintBig(8);
    let _max_claims = sc_0.loadUintBig(32);
    let _claims_count = sc_0.loadUintBig(32);
    let _stake_time = sc_0.loadUintBig(32);
    let _created_at = sc_0.loadUintBig(32);
    let _next_claim = sc_0.loadUintBig(32);
    let _last_claim = sc_0.loadUintBig(32);
    let _end_time = sc_0.loadUintBig(32);
    let _wallet_address = sc_0.loadAddress();
    return { $$type: 'OldStakeRecord' as const, stake_amount: _stake_amount, out_amount: _out_amount, mint_count: _mint_count, max_claims: _max_claims, claims_count: _claims_count, stake_time: _stake_time, created_at: _created_at, next_claim: _next_claim, last_claim: _last_claim, end_time: _end_time, wallet_address: _wallet_address };
}

function loadTupleOldStakeRecord(source: TupleReader) {
    let _stake_amount = source.readBigNumber();
    let _out_amount = source.readBigNumber();
    let _mint_count = source.readBigNumber();
    let _max_claims = source.readBigNumber();
    let _claims_count = source.readBigNumber();
    let _stake_time = source.readBigNumber();
    let _created_at = source.readBigNumber();
    let _next_claim = source.readBigNumber();
    let _last_claim = source.readBigNumber();
    let _end_time = source.readBigNumber();
    let _wallet_address = source.readAddress();
    return { $$type: 'OldStakeRecord' as const, stake_amount: _stake_amount, out_amount: _out_amount, mint_count: _mint_count, max_claims: _max_claims, claims_count: _claims_count, stake_time: _stake_time, created_at: _created_at, next_claim: _next_claim, last_claim: _last_claim, end_time: _end_time, wallet_address: _wallet_address };
}

function loadGetterTupleOldStakeRecord(source: TupleReader) {
    let _stake_amount = source.readBigNumber();
    let _out_amount = source.readBigNumber();
    let _mint_count = source.readBigNumber();
    let _max_claims = source.readBigNumber();
    let _claims_count = source.readBigNumber();
    let _stake_time = source.readBigNumber();
    let _created_at = source.readBigNumber();
    let _next_claim = source.readBigNumber();
    let _last_claim = source.readBigNumber();
    let _end_time = source.readBigNumber();
    let _wallet_address = source.readAddress();
    return { $$type: 'OldStakeRecord' as const, stake_amount: _stake_amount, out_amount: _out_amount, mint_count: _mint_count, max_claims: _max_claims, claims_count: _claims_count, stake_time: _stake_time, created_at: _created_at, next_claim: _next_claim, last_claim: _last_claim, end_time: _end_time, wallet_address: _wallet_address };
}

function storeTupleOldStakeRecord(source: OldStakeRecord) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.stake_amount);
    builder.writeNumber(source.out_amount);
    builder.writeNumber(source.mint_count);
    builder.writeNumber(source.max_claims);
    builder.writeNumber(source.claims_count);
    builder.writeNumber(source.stake_time);
    builder.writeNumber(source.created_at);
    builder.writeNumber(source.next_claim);
    builder.writeNumber(source.last_claim);
    builder.writeNumber(source.end_time);
    builder.writeAddress(source.wallet_address);
    return builder.build();
}

function dictValueParserOldStakeRecord(): DictionaryValue<OldStakeRecord> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOldStakeRecord(src)).endCell());
        },
        parse: (src) => {
            return loadOldStakeRecord(src.loadRef().beginParse());
        }
    }
}

export type AddOldStakeRecord = {
    $$type: 'AddOldStakeRecord';
    query_id: bigint;
    stake_id: bigint;
    user_address: Address;
    stake_amount: bigint;
    out_amount: bigint;
    mint_count: bigint;
    max_claims: bigint;
    claims_count: bigint;
    stake_time: bigint;
    created_at: bigint;
    next_claim: bigint;
    last_claim: bigint;
    end_time: bigint;
    signature: Slice;
    wallet_address: Address;
}

export function storeAddOldStakeRecord(src: AddOldStakeRecord) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2363339442, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeUint(src.stake_id, 64);
        b_0.storeAddress(src.user_address);
        b_0.storeCoins(src.stake_amount);
        b_0.storeCoins(src.out_amount);
        b_0.storeUint(src.mint_count, 8);
        b_0.storeUint(src.max_claims, 32);
        b_0.storeUint(src.claims_count, 32);
        b_0.storeUint(src.stake_time, 32);
        b_0.storeUint(src.created_at, 32);
        b_0.storeUint(src.next_claim, 32);
        b_0.storeUint(src.last_claim, 32);
        b_0.storeUint(src.end_time, 32);
        b_0.storeRef(src.signature.asCell());
        let b_1 = new Builder();
        b_1.storeAddress(src.wallet_address);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadAddOldStakeRecord(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2363339442) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _stake_id = sc_0.loadUintBig(64);
    let _user_address = sc_0.loadAddress();
    let _stake_amount = sc_0.loadCoins();
    let _out_amount = sc_0.loadCoins();
    let _mint_count = sc_0.loadUintBig(8);
    let _max_claims = sc_0.loadUintBig(32);
    let _claims_count = sc_0.loadUintBig(32);
    let _stake_time = sc_0.loadUintBig(32);
    let _created_at = sc_0.loadUintBig(32);
    let _next_claim = sc_0.loadUintBig(32);
    let _last_claim = sc_0.loadUintBig(32);
    let _end_time = sc_0.loadUintBig(32);
    let _signature = sc_0.loadRef().asSlice();
    let sc_1 = sc_0.loadRef().beginParse();
    let _wallet_address = sc_1.loadAddress();
    return { $$type: 'AddOldStakeRecord' as const, query_id: _query_id, stake_id: _stake_id, user_address: _user_address, stake_amount: _stake_amount, out_amount: _out_amount, mint_count: _mint_count, max_claims: _max_claims, claims_count: _claims_count, stake_time: _stake_time, created_at: _created_at, next_claim: _next_claim, last_claim: _last_claim, end_time: _end_time, signature: _signature, wallet_address: _wallet_address };
}

function loadTupleAddOldStakeRecord(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _stake_id = source.readBigNumber();
    let _user_address = source.readAddress();
    let _stake_amount = source.readBigNumber();
    let _out_amount = source.readBigNumber();
    let _mint_count = source.readBigNumber();
    let _max_claims = source.readBigNumber();
    let _claims_count = source.readBigNumber();
    let _stake_time = source.readBigNumber();
    let _created_at = source.readBigNumber();
    let _next_claim = source.readBigNumber();
    let _last_claim = source.readBigNumber();
    let _end_time = source.readBigNumber();
    let _signature = source.readCell().asSlice();
    let _wallet_address = source.readAddress();
    return { $$type: 'AddOldStakeRecord' as const, query_id: _query_id, stake_id: _stake_id, user_address: _user_address, stake_amount: _stake_amount, out_amount: _out_amount, mint_count: _mint_count, max_claims: _max_claims, claims_count: _claims_count, stake_time: _stake_time, created_at: _created_at, next_claim: _next_claim, last_claim: _last_claim, end_time: _end_time, signature: _signature, wallet_address: _wallet_address };
}

function loadGetterTupleAddOldStakeRecord(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _stake_id = source.readBigNumber();
    let _user_address = source.readAddress();
    let _stake_amount = source.readBigNumber();
    let _out_amount = source.readBigNumber();
    let _mint_count = source.readBigNumber();
    let _max_claims = source.readBigNumber();
    let _claims_count = source.readBigNumber();
    let _stake_time = source.readBigNumber();
    let _created_at = source.readBigNumber();
    let _next_claim = source.readBigNumber();
    let _last_claim = source.readBigNumber();
    let _end_time = source.readBigNumber();
    let _signature = source.readCell().asSlice();
    let _wallet_address = source.readAddress();
    return { $$type: 'AddOldStakeRecord' as const, query_id: _query_id, stake_id: _stake_id, user_address: _user_address, stake_amount: _stake_amount, out_amount: _out_amount, mint_count: _mint_count, max_claims: _max_claims, claims_count: _claims_count, stake_time: _stake_time, created_at: _created_at, next_claim: _next_claim, last_claim: _last_claim, end_time: _end_time, signature: _signature, wallet_address: _wallet_address };
}

function storeTupleAddOldStakeRecord(source: AddOldStakeRecord) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.stake_id);
    builder.writeAddress(source.user_address);
    builder.writeNumber(source.stake_amount);
    builder.writeNumber(source.out_amount);
    builder.writeNumber(source.mint_count);
    builder.writeNumber(source.max_claims);
    builder.writeNumber(source.claims_count);
    builder.writeNumber(source.stake_time);
    builder.writeNumber(source.created_at);
    builder.writeNumber(source.next_claim);
    builder.writeNumber(source.last_claim);
    builder.writeNumber(source.end_time);
    builder.writeSlice(source.signature.asCell());
    builder.writeAddress(source.wallet_address);
    return builder.build();
}

function dictValueParserAddOldStakeRecord(): DictionaryValue<AddOldStakeRecord> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAddOldStakeRecord(src)).endCell());
        },
        parse: (src) => {
            return loadAddOldStakeRecord(src.loadRef().beginParse());
        }
    }
}

export type ClaimOldStake = {
    $$type: 'ClaimOldStake';
    query_id: bigint;
    stake_id: bigint;
    wallet_address: Address;
    signature: Slice;
}

export function storeClaimOldStake(src: ClaimOldStake) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1210333798, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeUint(src.stake_id, 64);
        b_0.storeAddress(src.wallet_address);
        b_0.storeRef(src.signature.asCell());
    };
}

export function loadClaimOldStake(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1210333798) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _stake_id = sc_0.loadUintBig(64);
    let _wallet_address = sc_0.loadAddress();
    let _signature = sc_0.loadRef().asSlice();
    return { $$type: 'ClaimOldStake' as const, query_id: _query_id, stake_id: _stake_id, wallet_address: _wallet_address, signature: _signature };
}

function loadTupleClaimOldStake(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _stake_id = source.readBigNumber();
    let _wallet_address = source.readAddress();
    let _signature = source.readCell().asSlice();
    return { $$type: 'ClaimOldStake' as const, query_id: _query_id, stake_id: _stake_id, wallet_address: _wallet_address, signature: _signature };
}

function loadGetterTupleClaimOldStake(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _stake_id = source.readBigNumber();
    let _wallet_address = source.readAddress();
    let _signature = source.readCell().asSlice();
    return { $$type: 'ClaimOldStake' as const, query_id: _query_id, stake_id: _stake_id, wallet_address: _wallet_address, signature: _signature };
}

function storeTupleClaimOldStake(source: ClaimOldStake) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.stake_id);
    builder.writeAddress(source.wallet_address);
    builder.writeSlice(source.signature.asCell());
    return builder.build();
}

function dictValueParserClaimOldStake(): DictionaryValue<ClaimOldStake> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeClaimOldStake(src)).endCell());
        },
        parse: (src) => {
            return loadClaimOldStake(src.loadRef().beginParse());
        }
    }
}

export type StakeMaster$Data = {
    $$type: 'StakeMaster$Data';
    owner_address: Address;
    owner_pubkey: bigint;
    nft_address: Address;
    jetton_address: Address;
    fee_address: Address;
    metadata: Dictionary<bigint, Cell>;
    next_stake_id: bigint;
    treasury: Address;
    old_stakes: Dictionary<bigint, Cell>;
    version: bigint;
}

export function storeStakeMaster$Data(src: StakeMaster$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner_address);
        b_0.storeInt(src.owner_pubkey, 257);
        b_0.storeAddress(src.nft_address);
        let b_1 = new Builder();
        b_1.storeAddress(src.jetton_address);
        b_1.storeAddress(src.fee_address);
        b_1.storeDict(src.metadata, Dictionary.Keys.BigInt(257), Dictionary.Values.Cell());
        b_1.storeInt(src.next_stake_id, 257);
        let b_2 = new Builder();
        b_2.storeAddress(src.treasury);
        b_2.storeDict(src.old_stakes, Dictionary.Keys.BigInt(257), Dictionary.Values.Cell());
        b_2.storeInt(src.version, 257);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadStakeMaster$Data(slice: Slice) {
    let sc_0 = slice;
    let _owner_address = sc_0.loadAddress();
    let _owner_pubkey = sc_0.loadIntBig(257);
    let _nft_address = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _jetton_address = sc_1.loadAddress();
    let _fee_address = sc_1.loadAddress();
    let _metadata = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.Cell(), sc_1);
    let _next_stake_id = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _treasury = sc_2.loadAddress();
    let _old_stakes = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.Cell(), sc_2);
    let _version = sc_2.loadIntBig(257);
    return { $$type: 'StakeMaster$Data' as const, owner_address: _owner_address, owner_pubkey: _owner_pubkey, nft_address: _nft_address, jetton_address: _jetton_address, fee_address: _fee_address, metadata: _metadata, next_stake_id: _next_stake_id, treasury: _treasury, old_stakes: _old_stakes, version: _version };
}

function loadTupleStakeMaster$Data(source: TupleReader) {
    let _owner_address = source.readAddress();
    let _owner_pubkey = source.readBigNumber();
    let _nft_address = source.readAddress();
    let _jetton_address = source.readAddress();
    let _fee_address = source.readAddress();
    let _metadata = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Cell(), source.readCellOpt());
    let _next_stake_id = source.readBigNumber();
    let _treasury = source.readAddress();
    let _old_stakes = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Cell(), source.readCellOpt());
    let _version = source.readBigNumber();
    return { $$type: 'StakeMaster$Data' as const, owner_address: _owner_address, owner_pubkey: _owner_pubkey, nft_address: _nft_address, jetton_address: _jetton_address, fee_address: _fee_address, metadata: _metadata, next_stake_id: _next_stake_id, treasury: _treasury, old_stakes: _old_stakes, version: _version };
}

function loadGetterTupleStakeMaster$Data(source: TupleReader) {
    let _owner_address = source.readAddress();
    let _owner_pubkey = source.readBigNumber();
    let _nft_address = source.readAddress();
    let _jetton_address = source.readAddress();
    let _fee_address = source.readAddress();
    let _metadata = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Cell(), source.readCellOpt());
    let _next_stake_id = source.readBigNumber();
    let _treasury = source.readAddress();
    let _old_stakes = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Cell(), source.readCellOpt());
    let _version = source.readBigNumber();
    return { $$type: 'StakeMaster$Data' as const, owner_address: _owner_address, owner_pubkey: _owner_pubkey, nft_address: _nft_address, jetton_address: _jetton_address, fee_address: _fee_address, metadata: _metadata, next_stake_id: _next_stake_id, treasury: _treasury, old_stakes: _old_stakes, version: _version };
}

function storeTupleStakeMaster$Data(source: StakeMaster$Data) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner_address);
    builder.writeNumber(source.owner_pubkey);
    builder.writeAddress(source.nft_address);
    builder.writeAddress(source.jetton_address);
    builder.writeAddress(source.fee_address);
    builder.writeCell(source.metadata.size > 0 ? beginCell().storeDictDirect(source.metadata, Dictionary.Keys.BigInt(257), Dictionary.Values.Cell()).endCell() : null);
    builder.writeNumber(source.next_stake_id);
    builder.writeAddress(source.treasury);
    builder.writeCell(source.old_stakes.size > 0 ? beginCell().storeDictDirect(source.old_stakes, Dictionary.Keys.BigInt(257), Dictionary.Values.Cell()).endCell() : null);
    builder.writeNumber(source.version);
    return builder.build();
}

function dictValueParserStakeMaster$Data(): DictionaryValue<StakeMaster$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStakeMaster$Data(src)).endCell());
        },
        parse: (src) => {
            return loadStakeMaster$Data(src.loadRef().beginParse());
        }
    }
}

export type Stake$Data = {
    $$type: 'Stake$Data';
    id: bigint;
    is_active: boolean;
    master_address: Address;
    owner_address: Address;
    fee_address: Address;
    amount: bigint;
    out_amount: bigint;
    created_at: bigint;
    stake_time: bigint;
    next_claim: bigint;
    mint_count: bigint;
    max_claims: bigint;
    claims_count: bigint;
}

export function storeStake$Data(src: Stake$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.id, 257);
        b_0.storeBit(src.is_active);
        b_0.storeAddress(src.master_address);
        b_0.storeAddress(src.owner_address);
        let b_1 = new Builder();
        b_1.storeAddress(src.fee_address);
        b_1.storeInt(src.amount, 257);
        b_1.storeInt(src.out_amount, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.created_at, 257);
        b_2.storeInt(src.stake_time, 257);
        b_2.storeInt(src.next_claim, 257);
        let b_3 = new Builder();
        b_3.storeInt(src.mint_count, 257);
        b_3.storeInt(src.max_claims, 257);
        b_3.storeInt(src.claims_count, 257);
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadStake$Data(slice: Slice) {
    let sc_0 = slice;
    let _id = sc_0.loadIntBig(257);
    let _is_active = sc_0.loadBit();
    let _master_address = sc_0.loadAddress();
    let _owner_address = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _fee_address = sc_1.loadAddress();
    let _amount = sc_1.loadIntBig(257);
    let _out_amount = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _created_at = sc_2.loadIntBig(257);
    let _stake_time = sc_2.loadIntBig(257);
    let _next_claim = sc_2.loadIntBig(257);
    let sc_3 = sc_2.loadRef().beginParse();
    let _mint_count = sc_3.loadIntBig(257);
    let _max_claims = sc_3.loadIntBig(257);
    let _claims_count = sc_3.loadIntBig(257);
    return { $$type: 'Stake$Data' as const, id: _id, is_active: _is_active, master_address: _master_address, owner_address: _owner_address, fee_address: _fee_address, amount: _amount, out_amount: _out_amount, created_at: _created_at, stake_time: _stake_time, next_claim: _next_claim, mint_count: _mint_count, max_claims: _max_claims, claims_count: _claims_count };
}

function loadTupleStake$Data(source: TupleReader) {
    let _id = source.readBigNumber();
    let _is_active = source.readBoolean();
    let _master_address = source.readAddress();
    let _owner_address = source.readAddress();
    let _fee_address = source.readAddress();
    let _amount = source.readBigNumber();
    let _out_amount = source.readBigNumber();
    let _created_at = source.readBigNumber();
    let _stake_time = source.readBigNumber();
    let _next_claim = source.readBigNumber();
    let _mint_count = source.readBigNumber();
    let _max_claims = source.readBigNumber();
    let _claims_count = source.readBigNumber();
    return { $$type: 'Stake$Data' as const, id: _id, is_active: _is_active, master_address: _master_address, owner_address: _owner_address, fee_address: _fee_address, amount: _amount, out_amount: _out_amount, created_at: _created_at, stake_time: _stake_time, next_claim: _next_claim, mint_count: _mint_count, max_claims: _max_claims, claims_count: _claims_count };
}

function loadGetterTupleStake$Data(source: TupleReader) {
    let _id = source.readBigNumber();
    let _is_active = source.readBoolean();
    let _master_address = source.readAddress();
    let _owner_address = source.readAddress();
    let _fee_address = source.readAddress();
    let _amount = source.readBigNumber();
    let _out_amount = source.readBigNumber();
    let _created_at = source.readBigNumber();
    let _stake_time = source.readBigNumber();
    let _next_claim = source.readBigNumber();
    let _mint_count = source.readBigNumber();
    let _max_claims = source.readBigNumber();
    let _claims_count = source.readBigNumber();
    return { $$type: 'Stake$Data' as const, id: _id, is_active: _is_active, master_address: _master_address, owner_address: _owner_address, fee_address: _fee_address, amount: _amount, out_amount: _out_amount, created_at: _created_at, stake_time: _stake_time, next_claim: _next_claim, mint_count: _mint_count, max_claims: _max_claims, claims_count: _claims_count };
}

function storeTupleStake$Data(source: Stake$Data) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeBoolean(source.is_active);
    builder.writeAddress(source.master_address);
    builder.writeAddress(source.owner_address);
    builder.writeAddress(source.fee_address);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.out_amount);
    builder.writeNumber(source.created_at);
    builder.writeNumber(source.stake_time);
    builder.writeNumber(source.next_claim);
    builder.writeNumber(source.mint_count);
    builder.writeNumber(source.max_claims);
    builder.writeNumber(source.claims_count);
    return builder.build();
}

function dictValueParserStake$Data(): DictionaryValue<Stake$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStake$Data(src)).endCell());
        },
        parse: (src) => {
            return loadStake$Data(src.loadRef().beginParse());
        }
    }
}

 type StakeMaster_init_args = {
    $$type: 'StakeMaster_init_args';
    owner_address: Address;
    owner_pubkey: bigint;
    jetton_address: Address;
    nft_address: Address;
    metadata: Dictionary<bigint, Cell>;
    fee_address: Address;
    treasury: Address;
    version: bigint;
}

function initStakeMaster_init_args(src: StakeMaster_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner_address);
        b_0.storeInt(src.owner_pubkey, 257);
        b_0.storeAddress(src.jetton_address);
        let b_1 = new Builder();
        b_1.storeAddress(src.nft_address);
        b_1.storeDict(src.metadata, Dictionary.Keys.BigInt(257), Dictionary.Values.Cell());
        b_1.storeAddress(src.fee_address);
        b_1.storeAddress(src.treasury);
        let b_2 = new Builder();
        b_2.storeInt(src.version, 257);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

async function StakeMaster_init(owner_address: Address, owner_pubkey: bigint, jetton_address: Address, nft_address: Address, metadata: Dictionary<bigint, Cell>, fee_address: Address, treasury: Address, version: bigint) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initStakeMaster_init_args({ $$type: 'StakeMaster_init_args', owner_address, owner_pubkey, jetton_address, nft_address, metadata, fee_address, treasury, version })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const StakeMaster_errors: { [key: number]: { message: string } } = {
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
    2512: { message: `Stake not found` },
    4429: { message: `Invalid sender` },
    5165: { message: `Not enough value` },
    12603: { message: `Only owner can proxy message` },
    14534: { message: `Not owner` },
    14562: { message: `Not enough claims` },
    15215: { message: `Only owner can update jetton address` },
    20993: { message: `Only owner can restake` },
    21750: { message: `Only owner can update nft address` },
    22565: { message: `Not enough balance` },
    26825: { message: `Only owner can withdraw` },
    30318: { message: `Only master can withdraw` },
    34646: { message: `Only owner can store TONs` },
    45220: { message: `Max claims reached` },
    48007: { message: `Only master contract can store TONs` },
    48401: { message: `Invalid signature` },
    53618: { message: `Only master contract can proxy message` },
    53983: { message: `Price requirement is not met` },
    56818: { message: `Stake is not active` },
    59508: { message: `Only owner can update fee address` },
    61734: { message: `Only owner can deposit` },
    62971: { message: `Only owner can transfer ownership` },
    63694: { message: `Early withdrawal` },
}

const StakeMaster_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TransferTON","header":271167746,"fields":[{"name":"to_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"MintByOwner","header":1607220500,"fields":[{"name":"mint_to","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"TokenNotification","header":1935855772,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"MintJetton","header":21,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TokenExcesses","header":3576854235,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"TokenBurn","header":1499400124,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Claim","header":1586636328,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"wallet_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"signature","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"Released","header":3468646859,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"Deposit","header":69877033,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"out_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"mint_count","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"duration","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"signature","type":{"kind":"simple","type":"slice","optional":false}},{"name":"max_claims","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"ProxyMsg","header":3891826139,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"UpdatePublicKey","header":1599039702,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"new_public_key","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"UpdateFeeAddress","header":130433518,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"new_fee_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UpdateJettonAddress","header":2933033334,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"new_jetton_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UpdateNftAddress","header":3529429755,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"new_nft_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TransferOwnership","header":1800991741,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"new_owner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Claimed","header":1603741764,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DoMint","header":2793121783,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"signature","type":{"kind":"simple","type":"slice","optional":false}},{"name":"mint_count","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"wallet_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"fees","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"Restake","header":1489790520,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"Withdraw","header":3123246349,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"signature","type":{"kind":"simple","type":"slice","optional":false}},{"name":"wallet_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RestakeOldStake","header":4053056756,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"stake_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"WithdrawOldStake","header":974840603,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"stake_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"signature","type":{"kind":"simple","type":"slice","optional":false}},{"name":"wallet_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"OldStakeRecord","header":null,"fields":[{"name":"stake_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"out_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"mint_count","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"max_claims","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"claims_count","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"stake_time","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"created_at","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"next_claim","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"last_claim","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"end_time","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"wallet_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"AddOldStakeRecord","header":2363339442,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"stake_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"user_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"stake_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"out_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"mint_count","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"max_claims","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"claims_count","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"stake_time","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"created_at","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"next_claim","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"last_claim","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"end_time","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"signature","type":{"kind":"simple","type":"slice","optional":false}},{"name":"wallet_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ClaimOldStake","header":1210333798,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"stake_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"wallet_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"signature","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"StakeMaster$Data","header":null,"fields":[{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner_pubkey","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"nft_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"jetton_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"fee_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"metadata","type":{"kind":"dict","key":"int","value":"cell","valueFormat":"ref"}},{"name":"next_stake_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"treasury","type":{"kind":"simple","type":"address","optional":false}},{"name":"old_stakes","type":{"kind":"dict","key":"int","value":"cell","valueFormat":"ref"}},{"name":"version","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Stake$Data","header":null,"fields":[{"name":"id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"is_active","type":{"kind":"simple","type":"bool","optional":false}},{"name":"master_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"fee_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"out_amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"created_at","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"stake_time","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"next_claim","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mint_count","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"max_claims","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"claims_count","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const StakeMaster_getters: ABIGetter[] = [
    {"name":"getStakeStateInit","arguments":[{"name":"msg","type":{"kind":"simple","type":"Deposit","optional":false}}],"returnType":{"kind":"simple","type":"StateInit","optional":false}},
    {"name":"getJettonAddress","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"getMetadata","arguments":[],"returnType":{"kind":"dict","key":"int","value":"cell","valueFormat":"ref"}},
    {"name":"getFeeAddress","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"getNftAddress","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"getOwnerAddress","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"getOwnerPubkey","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"nextStakeId","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"get_old_stake_record","arguments":[{"name":"stake_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"user_address","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"OldStakeRecord","optional":true}},
]

export const StakeMaster_getterMapping: { [key: string]: string } = {
    'getStakeStateInit': 'getGetStakeStateInit',
    'getJettonAddress': 'getGetJettonAddress',
    'getMetadata': 'getGetMetadata',
    'getFeeAddress': 'getGetFeeAddress',
    'getNftAddress': 'getGetNftAddress',
    'getOwnerAddress': 'getGetOwnerAddress',
    'getOwnerPubkey': 'getGetOwnerPubkey',
    'nextStakeId': 'getNextStakeId',
    'get_old_stake_record': 'getGetOldStakeRecord',
}

const StakeMaster_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"Deposit"}},
    {"receiver":"internal","message":{"kind":"typed","type":"DoMint"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TokenExcesses"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TokenNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ProxyMsg"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateFeeAddress"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateNftAddress"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateJettonAddress"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TransferOwnership"}},
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"AddOldStakeRecord"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ClaimOldStake"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RestakeOldStake"}},
    {"receiver":"internal","message":{"kind":"typed","type":"WithdrawOldStake"}},
]

export class StakeMaster implements Contract {
    
    static async init(owner_address: Address, owner_pubkey: bigint, jetton_address: Address, nft_address: Address, metadata: Dictionary<bigint, Cell>, fee_address: Address, treasury: Address, version: bigint) {
        return await StakeMaster_init(owner_address, owner_pubkey, jetton_address, nft_address, metadata, fee_address, treasury, version);
    }
    
    static async fromInit(owner_address: Address, owner_pubkey: bigint, jetton_address: Address, nft_address: Address, metadata: Dictionary<bigint, Cell>, fee_address: Address, treasury: Address, version: bigint) {
        const init = await StakeMaster_init(owner_address, owner_pubkey, jetton_address, nft_address, metadata, fee_address, treasury, version);
        const address = contractAddress(0, init);
        return new StakeMaster(address, init);
    }
    
    static fromAddress(address: Address) {
        return new StakeMaster(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  StakeMaster_types,
        getters: StakeMaster_getters,
        receivers: StakeMaster_receivers,
        errors: StakeMaster_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: Deposit | DoMint | TokenExcesses | TokenNotification | ProxyMsg | UpdateFeeAddress | UpdateNftAddress | UpdateJettonAddress | TransferOwnership | null | AddOldStakeRecord | ClaimOldStake | RestakeOldStake | WithdrawOldStake) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deposit') {
            body = beginCell().store(storeDeposit(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DoMint') {
            body = beginCell().store(storeDoMint(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenExcesses') {
            body = beginCell().store(storeTokenExcesses(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenNotification') {
            body = beginCell().store(storeTokenNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ProxyMsg') {
            body = beginCell().store(storeProxyMsg(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateFeeAddress') {
            body = beginCell().store(storeUpdateFeeAddress(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateNftAddress') {
            body = beginCell().store(storeUpdateNftAddress(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateJettonAddress') {
            body = beginCell().store(storeUpdateJettonAddress(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TransferOwnership') {
            body = beginCell().store(storeTransferOwnership(message)).endCell();
        }
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'AddOldStakeRecord') {
            body = beginCell().store(storeAddOldStakeRecord(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ClaimOldStake') {
            body = beginCell().store(storeClaimOldStake(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RestakeOldStake') {
            body = beginCell().store(storeRestakeOldStake(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawOldStake') {
            body = beginCell().store(storeWithdrawOldStake(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetStakeStateInit(provider: ContractProvider, msg: Deposit) {
        let builder = new TupleBuilder();
        builder.writeTuple(storeTupleDeposit(msg));
        let source = (await provider.get('getStakeStateInit', builder.build())).stack;
        const result = loadGetterTupleStateInit(source);
        return result;
    }
    
    async getGetJettonAddress(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getJettonAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getGetMetadata(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getMetadata', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Cell(), source.readCellOpt());
        return result;
    }
    
    async getGetFeeAddress(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getFeeAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getGetNftAddress(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getNftAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getGetOwnerAddress(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getOwnerAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getGetOwnerPubkey(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getOwnerPubkey', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getNextStakeId(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('nextStakeId', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetOldStakeRecord(provider: ContractProvider, stake_id: bigint, user_address: Address) {
        let builder = new TupleBuilder();
        builder.writeNumber(stake_id);
        builder.writeAddress(user_address);
        let source = (await provider.get('get_old_stake_record', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleOldStakeRecord(result_p) : null;
        return result;
    }
    
}