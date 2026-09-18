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

export type MintNFT = {
    $$type: 'MintNFT';
    new_owner: Address;
    content: Cell;
}

export function storeMintNFT(src: MintNFT) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3586101469, 32);
        b_0.storeAddress(src.new_owner);
        b_0.storeRef(src.content);
    };
}

export function loadMintNFT(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3586101469) { throw Error('Invalid prefix'); }
    let _new_owner = sc_0.loadAddress();
    let _content = sc_0.loadRef();
    return { $$type: 'MintNFT' as const, new_owner: _new_owner, content: _content };
}

function loadTupleMintNFT(source: TupleReader) {
    let _new_owner = source.readAddress();
    let _content = source.readCell();
    return { $$type: 'MintNFT' as const, new_owner: _new_owner, content: _content };
}

function loadGetterTupleMintNFT(source: TupleReader) {
    let _new_owner = source.readAddress();
    let _content = source.readCell();
    return { $$type: 'MintNFT' as const, new_owner: _new_owner, content: _content };
}

function storeTupleMintNFT(source: MintNFT) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.new_owner);
    builder.writeCell(source.content);
    return builder.build();
}

function dictValueParserMintNFT(): DictionaryValue<MintNFT> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMintNFT(src)).endCell());
        },
        parse: (src) => {
            return loadMintNFT(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    new_owner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3652073726, 32);
        b_0.storeAddress(src.new_owner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3652073726) { throw Error('Invalid prefix'); }
    let _new_owner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, new_owner: _new_owner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _new_owner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, new_owner: _new_owner };
}

function loadGetterTupleChangeOwner(source: TupleReader) {
    let _new_owner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, new_owner: _new_owner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.new_owner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeNFTContent = {
    $$type: 'ChangeNFTContent';
    new_nft_content: Cell;
}

export function storeChangeNFTContent(src: ChangeNFTContent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(278000414, 32);
        b_0.storeRef(src.new_nft_content);
    };
}

export function loadChangeNFTContent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 278000414) { throw Error('Invalid prefix'); }
    let _new_nft_content = sc_0.loadRef();
    return { $$type: 'ChangeNFTContent' as const, new_nft_content: _new_nft_content };
}

function loadTupleChangeNFTContent(source: TupleReader) {
    let _new_nft_content = source.readCell();
    return { $$type: 'ChangeNFTContent' as const, new_nft_content: _new_nft_content };
}

function loadGetterTupleChangeNFTContent(source: TupleReader) {
    let _new_nft_content = source.readCell();
    return { $$type: 'ChangeNFTContent' as const, new_nft_content: _new_nft_content };
}

function storeTupleChangeNFTContent(source: ChangeNFTContent) {
    let builder = new TupleBuilder();
    builder.writeCell(source.new_nft_content);
    return builder.build();
}

function dictValueParserChangeNFTContent(): DictionaryValue<ChangeNFTContent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeNFTContent(src)).endCell());
        },
        parse: (src) => {
            return loadChangeNFTContent(src.loadRef().beginParse());
        }
    }
}

export type LogEventShipAssembled = {
    $$type: 'LogEventShipAssembled';
    user: Address;
    nft_received: Cell;
}

export function storeLogEventShipAssembled(src: LogEventShipAssembled) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1720509213, 32);
        b_0.storeAddress(src.user);
        b_0.storeRef(src.nft_received);
    };
}

export function loadLogEventShipAssembled(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1720509213) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _nft_received = sc_0.loadRef();
    return { $$type: 'LogEventShipAssembled' as const, user: _user, nft_received: _nft_received };
}

function loadTupleLogEventShipAssembled(source: TupleReader) {
    let _user = source.readAddress();
    let _nft_received = source.readCell();
    return { $$type: 'LogEventShipAssembled' as const, user: _user, nft_received: _nft_received };
}

function loadGetterTupleLogEventShipAssembled(source: TupleReader) {
    let _user = source.readAddress();
    let _nft_received = source.readCell();
    return { $$type: 'LogEventShipAssembled' as const, user: _user, nft_received: _nft_received };
}

function storeTupleLogEventShipAssembled(source: LogEventShipAssembled) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeCell(source.nft_received);
    return builder.build();
}

function dictValueParserLogEventShipAssembled(): DictionaryValue<LogEventShipAssembled> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLogEventShipAssembled(src)).endCell());
        },
        parse: (src) => {
            return loadLogEventShipAssembled(src.loadRef().beginParse());
        }
    }
}

export type GetNftCount = {
    $$type: 'GetNftCount';
    query_id: bigint;
    user: Address;
}

export function storeGetNftCount(src: GetNftCount) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3711924588, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.user);
    };
}

export function loadGetNftCount(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3711924588) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _user = sc_0.loadAddress();
    return { $$type: 'GetNftCount' as const, query_id: _query_id, user: _user };
}

function loadTupleGetNftCount(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _user = source.readAddress();
    return { $$type: 'GetNftCount' as const, query_id: _query_id, user: _user };
}

function loadGetterTupleGetNftCount(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _user = source.readAddress();
    return { $$type: 'GetNftCount' as const, query_id: _query_id, user: _user };
}

function storeTupleGetNftCount(source: GetNftCount) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.user);
    return builder.build();
}

function dictValueParserGetNftCount(): DictionaryValue<GetNftCount> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetNftCount(src)).endCell());
        },
        parse: (src) => {
            return loadGetNftCount(src.loadRef().beginParse());
        }
    }
}

export type AssembleShipMessage = {
    $$type: 'AssembleShipMessage';
    nft_contract_1: Address;
    nft_contract_2: Address;
    nft_contract_3: Address;
    nft_contract_4: Address;
    nft_contract_5: Address;
    nft_contract_6: Address;
    ship_level: bigint;
    signature: Slice;
}

export function storeAssembleShipMessage(src: AssembleShipMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1997904914, 32);
        b_0.storeAddress(src.nft_contract_1);
        b_0.storeAddress(src.nft_contract_2);
        b_0.storeAddress(src.nft_contract_3);
        let b_1 = new Builder();
        b_1.storeAddress(src.nft_contract_4);
        b_1.storeAddress(src.nft_contract_5);
        b_1.storeAddress(src.nft_contract_6);
        let b_2 = new Builder();
        b_2.storeInt(src.ship_level, 257);
        b_2.storeRef(src.signature.asCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadAssembleShipMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1997904914) { throw Error('Invalid prefix'); }
    let _nft_contract_1 = sc_0.loadAddress();
    let _nft_contract_2 = sc_0.loadAddress();
    let _nft_contract_3 = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _nft_contract_4 = sc_1.loadAddress();
    let _nft_contract_5 = sc_1.loadAddress();
    let _nft_contract_6 = sc_1.loadAddress();
    let sc_2 = sc_1.loadRef().beginParse();
    let _ship_level = sc_2.loadIntBig(257);
    let _signature = sc_2.loadRef().asSlice();
    return { $$type: 'AssembleShipMessage' as const, nft_contract_1: _nft_contract_1, nft_contract_2: _nft_contract_2, nft_contract_3: _nft_contract_3, nft_contract_4: _nft_contract_4, nft_contract_5: _nft_contract_5, nft_contract_6: _nft_contract_6, ship_level: _ship_level, signature: _signature };
}

function loadTupleAssembleShipMessage(source: TupleReader) {
    let _nft_contract_1 = source.readAddress();
    let _nft_contract_2 = source.readAddress();
    let _nft_contract_3 = source.readAddress();
    let _nft_contract_4 = source.readAddress();
    let _nft_contract_5 = source.readAddress();
    let _nft_contract_6 = source.readAddress();
    let _ship_level = source.readBigNumber();
    let _signature = source.readCell().asSlice();
    return { $$type: 'AssembleShipMessage' as const, nft_contract_1: _nft_contract_1, nft_contract_2: _nft_contract_2, nft_contract_3: _nft_contract_3, nft_contract_4: _nft_contract_4, nft_contract_5: _nft_contract_5, nft_contract_6: _nft_contract_6, ship_level: _ship_level, signature: _signature };
}

function loadGetterTupleAssembleShipMessage(source: TupleReader) {
    let _nft_contract_1 = source.readAddress();
    let _nft_contract_2 = source.readAddress();
    let _nft_contract_3 = source.readAddress();
    let _nft_contract_4 = source.readAddress();
    let _nft_contract_5 = source.readAddress();
    let _nft_contract_6 = source.readAddress();
    let _ship_level = source.readBigNumber();
    let _signature = source.readCell().asSlice();
    return { $$type: 'AssembleShipMessage' as const, nft_contract_1: _nft_contract_1, nft_contract_2: _nft_contract_2, nft_contract_3: _nft_contract_3, nft_contract_4: _nft_contract_4, nft_contract_5: _nft_contract_5, nft_contract_6: _nft_contract_6, ship_level: _ship_level, signature: _signature };
}

function storeTupleAssembleShipMessage(source: AssembleShipMessage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.nft_contract_1);
    builder.writeAddress(source.nft_contract_2);
    builder.writeAddress(source.nft_contract_3);
    builder.writeAddress(source.nft_contract_4);
    builder.writeAddress(source.nft_contract_5);
    builder.writeAddress(source.nft_contract_6);
    builder.writeNumber(source.ship_level);
    builder.writeSlice(source.signature.asCell());
    return builder.build();
}

function dictValueParserAssembleShipMessage(): DictionaryValue<AssembleShipMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAssembleShipMessage(src)).endCell());
        },
        parse: (src) => {
            return loadAssembleShipMessage(src.loadRef().beginParse());
        }
    }
}

export type ReportNftCount = {
    $$type: 'ReportNftCount';
    query_id: bigint;
    user: Address;
    nft_count: bigint;
}

export function storeReportNftCount(src: ReportNftCount) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1134221456, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.user);
        b_0.storeInt(src.nft_count, 257);
    };
}

export function loadReportNftCount(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1134221456) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _user = sc_0.loadAddress();
    let _nft_count = sc_0.loadIntBig(257);
    return { $$type: 'ReportNftCount' as const, query_id: _query_id, user: _user, nft_count: _nft_count };
}

function loadTupleReportNftCount(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _user = source.readAddress();
    let _nft_count = source.readBigNumber();
    return { $$type: 'ReportNftCount' as const, query_id: _query_id, user: _user, nft_count: _nft_count };
}

function loadGetterTupleReportNftCount(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _user = source.readAddress();
    let _nft_count = source.readBigNumber();
    return { $$type: 'ReportNftCount' as const, query_id: _query_id, user: _user, nft_count: _nft_count };
}

function storeTupleReportNftCount(source: ReportNftCount) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.user);
    builder.writeNumber(source.nft_count);
    return builder.build();
}

function dictValueParserReportNftCount(): DictionaryValue<ReportNftCount> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeReportNftCount(src)).endCell());
        },
        parse: (src) => {
            return loadReportNftCount(src.loadRef().beginParse());
        }
    }
}

export type Transfer = {
    $$type: 'Transfer';
    new_owner: Address;
    forward_amount: bigint;
    query_id: bigint;
}

export function storeTransfer(src: Transfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1530664467, 32);
        b_0.storeAddress(src.new_owner);
        b_0.storeUint(src.forward_amount, 64);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1530664467) { throw Error('Invalid prefix'); }
    let _new_owner = sc_0.loadAddress();
    let _forward_amount = sc_0.loadUintBig(64);
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'Transfer' as const, new_owner: _new_owner, forward_amount: _forward_amount, query_id: _query_id };
}

function loadTupleTransfer(source: TupleReader) {
    let _new_owner = source.readAddress();
    let _forward_amount = source.readBigNumber();
    let _query_id = source.readBigNumber();
    return { $$type: 'Transfer' as const, new_owner: _new_owner, forward_amount: _forward_amount, query_id: _query_id };
}

function loadGetterTupleTransfer(source: TupleReader) {
    let _new_owner = source.readAddress();
    let _forward_amount = source.readBigNumber();
    let _query_id = source.readBigNumber();
    return { $$type: 'Transfer' as const, new_owner: _new_owner, forward_amount: _forward_amount, query_id: _query_id };
}

function storeTupleTransfer(source: Transfer) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.new_owner);
    builder.writeNumber(source.forward_amount);
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserTransfer(): DictionaryValue<Transfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTransfer(src.loadRef().beginParse());
        }
    }
}

export type BurnNFT = {
    $$type: 'BurnNFT';
}

export function storeBurnNFT(src: BurnNFT) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2722049370, 32);
    };
}

export function loadBurnNFT(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2722049370) { throw Error('Invalid prefix'); }
    return { $$type: 'BurnNFT' as const };
}

function loadTupleBurnNFT(source: TupleReader) {
    return { $$type: 'BurnNFT' as const };
}

function loadGetterTupleBurnNFT(source: TupleReader) {
    return { $$type: 'BurnNFT' as const };
}

function storeTupleBurnNFT(source: BurnNFT) {
    let builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserBurnNFT(): DictionaryValue<BurnNFT> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBurnNFT(src)).endCell());
        },
        parse: (src) => {
            return loadBurnNFT(src.loadRef().beginParse());
        }
    }
}

export type RequestNftCount = {
    $$type: 'RequestNftCount';
    user: Address;
    nft_count: bigint;
}

export function storeRequestNftCount(src: RequestNftCount) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1939569222, 32);
        b_0.storeAddress(src.user);
        b_0.storeUint(src.nft_count, 64);
    };
}

export function loadRequestNftCount(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1939569222) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _nft_count = sc_0.loadUintBig(64);
    return { $$type: 'RequestNftCount' as const, user: _user, nft_count: _nft_count };
}

function loadTupleRequestNftCount(source: TupleReader) {
    let _user = source.readAddress();
    let _nft_count = source.readBigNumber();
    return { $$type: 'RequestNftCount' as const, user: _user, nft_count: _nft_count };
}

function loadGetterTupleRequestNftCount(source: TupleReader) {
    let _user = source.readAddress();
    let _nft_count = source.readBigNumber();
    return { $$type: 'RequestNftCount' as const, user: _user, nft_count: _nft_count };
}

function storeTupleRequestNftCount(source: RequestNftCount) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.nft_count);
    return builder.build();
}

function dictValueParserRequestNftCount(): DictionaryValue<RequestNftCount> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRequestNftCount(src)).endCell());
        },
        parse: (src) => {
            return loadRequestNftCount(src.loadRef().beginParse());
        }
    }
}

export type OwnershipAssigned = {
    $$type: 'OwnershipAssigned';
    query_id: bigint;
    prev_owner: Address;
}

export function storeOwnershipAssigned(src: OwnershipAssigned) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.query_id, 257);
        b_0.storeAddress(src.prev_owner);
    };
}

export function loadOwnershipAssigned(slice: Slice) {
    let sc_0 = slice;
    let _query_id = sc_0.loadIntBig(257);
    let _prev_owner = sc_0.loadAddress();
    return { $$type: 'OwnershipAssigned' as const, query_id: _query_id, prev_owner: _prev_owner };
}

function loadTupleOwnershipAssigned(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _prev_owner = source.readAddress();
    return { $$type: 'OwnershipAssigned' as const, query_id: _query_id, prev_owner: _prev_owner };
}

function loadGetterTupleOwnershipAssigned(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _prev_owner = source.readAddress();
    return { $$type: 'OwnershipAssigned' as const, query_id: _query_id, prev_owner: _prev_owner };
}

function storeTupleOwnershipAssigned(source: OwnershipAssigned) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.prev_owner);
    return builder.build();
}

function dictValueParserOwnershipAssigned(): DictionaryValue<OwnershipAssigned> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOwnershipAssigned(src)).endCell());
        },
        parse: (src) => {
            return loadOwnershipAssigned(src.loadRef().beginParse());
        }
    }
}

export type ShipNFT$Data = {
    $$type: 'ShipNFT$Data';
    collection_address: Address;
    trusted_contract: Address;
    item_index: bigint;
    is_initialized: boolean;
    owner: Address | null;
    content: Cell | null;
}

export function storeShipNFT$Data(src: ShipNFT$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.collection_address);
        b_0.storeAddress(src.trusted_contract);
        b_0.storeInt(src.item_index, 257);
        b_0.storeBit(src.is_initialized);
        let b_1 = new Builder();
        b_1.storeAddress(src.owner);
        if (src.content !== null && src.content !== undefined) { b_1.storeBit(true).storeRef(src.content); } else { b_1.storeBit(false); }
        b_0.storeRef(b_1.endCell());
    };
}

export function loadShipNFT$Data(slice: Slice) {
    let sc_0 = slice;
    let _collection_address = sc_0.loadAddress();
    let _trusted_contract = sc_0.loadAddress();
    let _item_index = sc_0.loadIntBig(257);
    let _is_initialized = sc_0.loadBit();
    let sc_1 = sc_0.loadRef().beginParse();
    let _owner = sc_1.loadMaybeAddress();
    let _content = sc_1.loadBit() ? sc_1.loadRef() : null;
    return { $$type: 'ShipNFT$Data' as const, collection_address: _collection_address, trusted_contract: _trusted_contract, item_index: _item_index, is_initialized: _is_initialized, owner: _owner, content: _content };
}

function loadTupleShipNFT$Data(source: TupleReader) {
    let _collection_address = source.readAddress();
    let _trusted_contract = source.readAddress();
    let _item_index = source.readBigNumber();
    let _is_initialized = source.readBoolean();
    let _owner = source.readAddressOpt();
    let _content = source.readCellOpt();
    return { $$type: 'ShipNFT$Data' as const, collection_address: _collection_address, trusted_contract: _trusted_contract, item_index: _item_index, is_initialized: _is_initialized, owner: _owner, content: _content };
}

function loadGetterTupleShipNFT$Data(source: TupleReader) {
    let _collection_address = source.readAddress();
    let _trusted_contract = source.readAddress();
    let _item_index = source.readBigNumber();
    let _is_initialized = source.readBoolean();
    let _owner = source.readAddressOpt();
    let _content = source.readCellOpt();
    return { $$type: 'ShipNFT$Data' as const, collection_address: _collection_address, trusted_contract: _trusted_contract, item_index: _item_index, is_initialized: _is_initialized, owner: _owner, content: _content };
}

function storeTupleShipNFT$Data(source: ShipNFT$Data) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.collection_address);
    builder.writeAddress(source.trusted_contract);
    builder.writeNumber(source.item_index);
    builder.writeBoolean(source.is_initialized);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    return builder.build();
}

function dictValueParserShipNFT$Data(): DictionaryValue<ShipNFT$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeShipNFT$Data(src)).endCell());
        },
        parse: (src) => {
            return loadShipNFT$Data(src.loadRef().beginParse());
        }
    }
}

 type ShipNFT_init_args = {
    $$type: 'ShipNFT_init_args';
    collection_address: Address;
    item_index: bigint;
    owner: Address;
    content: Cell;
}

function initShipNFT_init_args(src: ShipNFT_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.collection_address);
        b_0.storeInt(src.item_index, 257);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
    };
}

async function ShipNFT_init(collection_address: Address, item_index: bigint, owner: Address, content: Cell) {
    const __code = Cell.fromBase64('te6ccgECFAEAA8wAART/APSkE/S88sgLAQIBYgIDA37QAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVFds88uCC2zwPBAUCAW4NDgK8AZIwf+BwIddJwh+VMCDXCx/eIIIQWzwWE7qOtjDTHwGCEFs8FhO68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTP9M/VSBsE+CCEKI/LVq64wIwcAYHARbI+EMBzH8BygBVUAoBsPhBbyQQI18DggDVxwYgbvLQgCHHBRby9FMhwgCOtAF/BshZAoEBAc8AASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFskVQzBwAW1t2zyTNV8D4n8IAGrTHwGCEKI/LVq68uCBbTEwMvhBbyQQI18DggDAgAIgbvLQgCHHBZIwf5RSQMcF4vL0bXACfwHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wAJAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAvxQZSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlADINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WgQEBzwDKAMhQAyBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiIW6z4w/JAczJ7VQLDAAKfwHKAMwACHAyygAAEbRX3aiaGkAAMAIRtBb7Z5tnjYwwDxAC1O1E0NQB+GPSAAGOhNs8bBbg+CjXCwqDCbry4In6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUVTAE0VUC2zwREgACIwH2+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcA0gDUAdAg1wsBwwCOH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiUctchbeIB0gABEwAggVta+EJSUMcF8vQjQxN/AgAektQwkjBt4hAmECUQJBAj');
    const __system = Cell.fromBase64('te6cckECFgEAA9YAAQHAAQEFoFBbAgEU/wD0pBP0vPLICwMCAWIEDgN+0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRXbPPLggts8EQUKArwBkjB/4HAh10nCH5UwINcLH94gghBbPBYTuo62MNMfAYIQWzwWE7ry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdM/0z9VIGwT4IIQoj8tWrrjAjBwBgkBsPhBbyQQI18DggDVxwYgbvLQgCHHBRby9FMhwgCOtAF/BshZAoEBAc8AASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFskVQzBwAW1t2zyTNV8D4n8HAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7AAgAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwAatMfAYIQoj8tWrry4IFtMTAy+EFvJBAjXwOCAMCAAiBu8tCAIccFkjB/lFJAxwXi8vRtcAJ/ARbI+EMBzH8BygBVUAsC/FBlINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxaBAQHPAMoAyFADIG6VMHABywGOHiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFuIhbrPjD8kBzMntVAwNAAp/AcoAzAAIcDLKAAIBbg8QABG0V92omhpAADACEbQW+2ebZ42MMBEVAtTtRNDUAfhj0gABjoTbPGwW4Pgo1wsKgwm68uCJ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB1FUwBNFVAts8EhQB9vpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXANIA1AHQINcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iAdIAARMAHpLUMJIwbeIQJhAlECQQIwAggVta+EJSUMcF8vQjQxN/AgACI8SaE2g=');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initShipNFT_init_args({ $$type: 'ShipNFT_init_args', collection_address, item_index, owner, content })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const ShipNFT_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
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
    23386: { message: `Not from collection` },
    49280: { message: `not owner` },
    54727: { message: `Not the owner` },
}

const ShipNFT_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"MintNFT","header":3586101469,"fields":[{"name":"new_owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"ChangeOwner","header":3652073726,"fields":[{"name":"new_owner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeNFTContent","header":278000414,"fields":[{"name":"new_nft_content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"LogEventShipAssembled","header":1720509213,"fields":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"nft_received","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"GetNftCount","header":3711924588,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"user","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"AssembleShipMessage","header":1997904914,"fields":[{"name":"nft_contract_1","type":{"kind":"simple","type":"address","optional":false}},{"name":"nft_contract_2","type":{"kind":"simple","type":"address","optional":false}},{"name":"nft_contract_3","type":{"kind":"simple","type":"address","optional":false}},{"name":"nft_contract_4","type":{"kind":"simple","type":"address","optional":false}},{"name":"nft_contract_5","type":{"kind":"simple","type":"address","optional":false}},{"name":"nft_contract_6","type":{"kind":"simple","type":"address","optional":false}},{"name":"ship_level","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"signature","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"ReportNftCount","header":1134221456,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"nft_count","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Transfer","header":1530664467,"fields":[{"name":"new_owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_amount","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"BurnNFT","header":2722049370,"fields":[]},
    {"name":"RequestNftCount","header":1939569222,"fields":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"nft_count","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"OwnershipAssigned","header":null,"fields":[{"name":"query_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"prev_owner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ShipNFT$Data","header":null,"fields":[{"name":"collection_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"trusted_contract","type":{"kind":"simple","type":"address","optional":false}},{"name":"item_index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"is_initialized","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":true}},{"name":"content","type":{"kind":"simple","type":"cell","optional":true}}]},
]

const ShipNFT_getters: ABIGetter[] = [
    {"name":"getShipData","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

export const ShipNFT_getterMapping: { [key: string]: string } = {
    'getShipData': 'getGetShipData',
}

const ShipNFT_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"Transfer"}},
    {"receiver":"internal","message":{"kind":"typed","type":"BurnNFT"}},
]

export class ShipNFT implements Contract {
    
    static async init(collection_address: Address, item_index: bigint, owner: Address, content: Cell) {
        return await ShipNFT_init(collection_address, item_index, owner, content);
    }
    
    static async fromInit(collection_address: Address, item_index: bigint, owner: Address, content: Cell) {
        const init = await ShipNFT_init(collection_address, item_index, owner, content);
        const address = contractAddress(0, init);
        return new ShipNFT(address, init);
    }
    
    static fromAddress(address: Address) {
        return new ShipNFT(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  ShipNFT_types,
        getters: ShipNFT_getters,
        receivers: ShipNFT_receivers,
        errors: ShipNFT_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: Transfer | BurnNFT) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Transfer') {
            body = beginCell().store(storeTransfer(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'BurnNFT') {
            body = beginCell().store(storeBurnNFT(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetShipData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getShipData', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}