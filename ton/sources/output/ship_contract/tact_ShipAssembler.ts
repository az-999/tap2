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

export type MintShipNFT = {
    $$type: 'MintShipNFT';
    new_owner: Address;
    content: Cell;
}

export function storeMintShipNFT(src: MintShipNFT) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3341544087, 32);
        b_0.storeAddress(src.new_owner);
        b_0.storeRef(src.content);
    };
}

export function loadMintShipNFT(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3341544087) { throw Error('Invalid prefix'); }
    let _new_owner = sc_0.loadAddress();
    let _content = sc_0.loadRef();
    return { $$type: 'MintShipNFT' as const, new_owner: _new_owner, content: _content };
}

function loadTupleMintShipNFT(source: TupleReader) {
    let _new_owner = source.readAddress();
    let _content = source.readCell();
    return { $$type: 'MintShipNFT' as const, new_owner: _new_owner, content: _content };
}

function loadGetterTupleMintShipNFT(source: TupleReader) {
    let _new_owner = source.readAddress();
    let _content = source.readCell();
    return { $$type: 'MintShipNFT' as const, new_owner: _new_owner, content: _content };
}

function storeTupleMintShipNFT(source: MintShipNFT) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.new_owner);
    builder.writeCell(source.content);
    return builder.build();
}

function dictValueParserMintShipNFT(): DictionaryValue<MintShipNFT> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMintShipNFT(src)).endCell());
        },
        parse: (src) => {
            return loadMintShipNFT(src.loadRef().beginParse());
        }
    }
}

export type OwnershipAssigned = {
    $$type: 'OwnershipAssigned';
    query_id: bigint;
    prev_owner: Address;
    forward_payload: Slice;
}

export function storeOwnershipAssigned(src: OwnershipAssigned) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(85167505, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.prev_owner);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadOwnershipAssigned(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 85167505) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _prev_owner = sc_0.loadAddress();
    let _forward_payload = sc_0;
    return { $$type: 'OwnershipAssigned' as const, query_id: _query_id, prev_owner: _prev_owner, forward_payload: _forward_payload };
}

function loadTupleOwnershipAssigned(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _prev_owner = source.readAddress();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'OwnershipAssigned' as const, query_id: _query_id, prev_owner: _prev_owner, forward_payload: _forward_payload };
}

function loadGetterTupleOwnershipAssigned(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _prev_owner = source.readAddress();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'OwnershipAssigned' as const, query_id: _query_id, prev_owner: _prev_owner, forward_payload: _forward_payload };
}

function storeTupleOwnershipAssigned(source: OwnershipAssigned) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.prev_owner);
    builder.writeSlice(source.forward_payload.asCell());
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

export type CollectionData = {
    $$type: 'CollectionData';
    next_item_index: bigint;
    collection_content: Cell;
    owner_address: Address;
}

export function storeCollectionData(src: CollectionData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.next_item_index, 257);
        b_0.storeRef(src.collection_content);
        b_0.storeAddress(src.owner_address);
    };
}

export function loadCollectionData(slice: Slice) {
    let sc_0 = slice;
    let _next_item_index = sc_0.loadIntBig(257);
    let _collection_content = sc_0.loadRef();
    let _owner_address = sc_0.loadAddress();
    return { $$type: 'CollectionData' as const, next_item_index: _next_item_index, collection_content: _collection_content, owner_address: _owner_address };
}

function loadTupleCollectionData(source: TupleReader) {
    let _next_item_index = source.readBigNumber();
    let _collection_content = source.readCell();
    let _owner_address = source.readAddress();
    return { $$type: 'CollectionData' as const, next_item_index: _next_item_index, collection_content: _collection_content, owner_address: _owner_address };
}

function loadGetterTupleCollectionData(source: TupleReader) {
    let _next_item_index = source.readBigNumber();
    let _collection_content = source.readCell();
    let _owner_address = source.readAddress();
    return { $$type: 'CollectionData' as const, next_item_index: _next_item_index, collection_content: _collection_content, owner_address: _owner_address };
}

function storeTupleCollectionData(source: CollectionData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.next_item_index);
    builder.writeCell(source.collection_content);
    builder.writeAddress(source.owner_address);
    return builder.build();
}

function dictValueParserCollectionData(): DictionaryValue<CollectionData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCollectionData(src)).endCell());
        },
        parse: (src) => {
            return loadCollectionData(src.loadRef().beginParse());
        }
    }
}

export type WithdrawFunds = {
    $$type: 'WithdrawFunds';
    query_id: bigint;
}

export function storeWithdrawFunds(src: WithdrawFunds) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2050115519, 32);
        b_0.storeInt(src.query_id, 257);
    };
}

export function loadWithdrawFunds(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2050115519) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadIntBig(257);
    return { $$type: 'WithdrawFunds' as const, query_id: _query_id };
}

function loadTupleWithdrawFunds(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'WithdrawFunds' as const, query_id: _query_id };
}

function loadGetterTupleWithdrawFunds(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'WithdrawFunds' as const, query_id: _query_id };
}

function storeTupleWithdrawFunds(source: WithdrawFunds) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserWithdrawFunds(): DictionaryValue<WithdrawFunds> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdrawFunds(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawFunds(src.loadRef().beginParse());
        }
    }
}

export type WithdrawalConfirmation = {
    $$type: 'WithdrawalConfirmation';
    query_id: bigint;
    amount: bigint;
}

export function storeWithdrawalConfirmation(src: WithdrawalConfirmation) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.query_id, 257);
        b_0.storeInt(src.amount, 257);
    };
}

export function loadWithdrawalConfirmation(slice: Slice) {
    let sc_0 = slice;
    let _query_id = sc_0.loadIntBig(257);
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'WithdrawalConfirmation' as const, query_id: _query_id, amount: _amount };
}

function loadTupleWithdrawalConfirmation(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    return { $$type: 'WithdrawalConfirmation' as const, query_id: _query_id, amount: _amount };
}

function loadGetterTupleWithdrawalConfirmation(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    return { $$type: 'WithdrawalConfirmation' as const, query_id: _query_id, amount: _amount };
}

function storeTupleWithdrawalConfirmation(source: WithdrawalConfirmation) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserWithdrawalConfirmation(): DictionaryValue<WithdrawalConfirmation> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdrawalConfirmation(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawalConfirmation(src.loadRef().beginParse());
        }
    }
}

export type VerifySingle = {
    $$type: 'VerifySingle';
    ship_level: bigint;
    signature: Slice;
}

export function storeVerifySingle(src: VerifySingle) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1607862665, 32);
        b_0.storeInt(src.ship_level, 257);
        b_0.storeRef(src.signature.asCell());
    };
}

export function loadVerifySingle(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1607862665) { throw Error('Invalid prefix'); }
    let _ship_level = sc_0.loadIntBig(257);
    let _signature = sc_0.loadRef().asSlice();
    return { $$type: 'VerifySingle' as const, ship_level: _ship_level, signature: _signature };
}

function loadTupleVerifySingle(source: TupleReader) {
    let _ship_level = source.readBigNumber();
    let _signature = source.readCell().asSlice();
    return { $$type: 'VerifySingle' as const, ship_level: _ship_level, signature: _signature };
}

function loadGetterTupleVerifySingle(source: TupleReader) {
    let _ship_level = source.readBigNumber();
    let _signature = source.readCell().asSlice();
    return { $$type: 'VerifySingle' as const, ship_level: _ship_level, signature: _signature };
}

function storeTupleVerifySingle(source: VerifySingle) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.ship_level);
    builder.writeSlice(source.signature.asCell());
    return builder.build();
}

function dictValueParserVerifySingle(): DictionaryValue<VerifySingle> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVerifySingle(src)).endCell());
        },
        parse: (src) => {
            return loadVerifySingle(src.loadRef().beginParse());
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
        b_0.storeUint(1766758178, 32);
        b_0.storeInt(src.query_id, 257);
        b_0.storeInt(src.new_public_key, 257);
    };
}

export function loadUpdatePublicKey(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1766758178) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadIntBig(257);
    let _new_public_key = sc_0.loadIntBig(257);
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

export type UpgradeShip = {
    $$type: 'UpgradeShip';
    nft_contract_1: Address;
    nft_contract_2: Address;
    nft_contract_3: Address;
    nft_contract_4: Address;
    nft_contract_5: Address;
    nft_contract_6: Address;
    nft_contract_7: Address;
    ship_content: Cell;
    ship_level: bigint;
    signature: Slice;
}

export function storeUpgradeShip(src: UpgradeShip) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(74989363, 32);
        b_0.storeAddress(src.nft_contract_1);
        b_0.storeAddress(src.nft_contract_2);
        b_0.storeAddress(src.nft_contract_3);
        let b_1 = new Builder();
        b_1.storeAddress(src.nft_contract_4);
        b_1.storeAddress(src.nft_contract_5);
        b_1.storeAddress(src.nft_contract_6);
        let b_2 = new Builder();
        b_2.storeAddress(src.nft_contract_7);
        b_2.storeRef(src.ship_content);
        b_2.storeInt(src.ship_level, 257);
        b_2.storeRef(src.signature.asCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadUpgradeShip(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 74989363) { throw Error('Invalid prefix'); }
    let _nft_contract_1 = sc_0.loadAddress();
    let _nft_contract_2 = sc_0.loadAddress();
    let _nft_contract_3 = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _nft_contract_4 = sc_1.loadAddress();
    let _nft_contract_5 = sc_1.loadAddress();
    let _nft_contract_6 = sc_1.loadAddress();
    let sc_2 = sc_1.loadRef().beginParse();
    let _nft_contract_7 = sc_2.loadAddress();
    let _ship_content = sc_2.loadRef();
    let _ship_level = sc_2.loadIntBig(257);
    let _signature = sc_2.loadRef().asSlice();
    return { $$type: 'UpgradeShip' as const, nft_contract_1: _nft_contract_1, nft_contract_2: _nft_contract_2, nft_contract_3: _nft_contract_3, nft_contract_4: _nft_contract_4, nft_contract_5: _nft_contract_5, nft_contract_6: _nft_contract_6, nft_contract_7: _nft_contract_7, ship_content: _ship_content, ship_level: _ship_level, signature: _signature };
}

function loadTupleUpgradeShip(source: TupleReader) {
    let _nft_contract_1 = source.readAddress();
    let _nft_contract_2 = source.readAddress();
    let _nft_contract_3 = source.readAddress();
    let _nft_contract_4 = source.readAddress();
    let _nft_contract_5 = source.readAddress();
    let _nft_contract_6 = source.readAddress();
    let _nft_contract_7 = source.readAddress();
    let _ship_content = source.readCell();
    let _ship_level = source.readBigNumber();
    let _signature = source.readCell().asSlice();
    return { $$type: 'UpgradeShip' as const, nft_contract_1: _nft_contract_1, nft_contract_2: _nft_contract_2, nft_contract_3: _nft_contract_3, nft_contract_4: _nft_contract_4, nft_contract_5: _nft_contract_5, nft_contract_6: _nft_contract_6, nft_contract_7: _nft_contract_7, ship_content: _ship_content, ship_level: _ship_level, signature: _signature };
}

function loadGetterTupleUpgradeShip(source: TupleReader) {
    let _nft_contract_1 = source.readAddress();
    let _nft_contract_2 = source.readAddress();
    let _nft_contract_3 = source.readAddress();
    let _nft_contract_4 = source.readAddress();
    let _nft_contract_5 = source.readAddress();
    let _nft_contract_6 = source.readAddress();
    let _nft_contract_7 = source.readAddress();
    let _ship_content = source.readCell();
    let _ship_level = source.readBigNumber();
    let _signature = source.readCell().asSlice();
    return { $$type: 'UpgradeShip' as const, nft_contract_1: _nft_contract_1, nft_contract_2: _nft_contract_2, nft_contract_3: _nft_contract_3, nft_contract_4: _nft_contract_4, nft_contract_5: _nft_contract_5, nft_contract_6: _nft_contract_6, nft_contract_7: _nft_contract_7, ship_content: _ship_content, ship_level: _ship_level, signature: _signature };
}

function storeTupleUpgradeShip(source: UpgradeShip) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.nft_contract_1);
    builder.writeAddress(source.nft_contract_2);
    builder.writeAddress(source.nft_contract_3);
    builder.writeAddress(source.nft_contract_4);
    builder.writeAddress(source.nft_contract_5);
    builder.writeAddress(source.nft_contract_6);
    builder.writeAddress(source.nft_contract_7);
    builder.writeCell(source.ship_content);
    builder.writeNumber(source.ship_level);
    builder.writeSlice(source.signature.asCell());
    return builder.build();
}

function dictValueParserUpgradeShip(): DictionaryValue<UpgradeShip> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpgradeShip(src)).endCell());
        },
        parse: (src) => {
            return loadUpgradeShip(src.loadRef().beginParse());
        }
    }
}

export type MintNFT = {
    $$type: 'MintNFT';
    ship_level: bigint;
}

export function storeMintNFT(src: MintNFT) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(386813437, 32);
        b_0.storeInt(src.ship_level, 257);
    };
}

export function loadMintNFT(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 386813437) { throw Error('Invalid prefix'); }
    let _ship_level = sc_0.loadIntBig(257);
    return { $$type: 'MintNFT' as const, ship_level: _ship_level };
}

function loadTupleMintNFT(source: TupleReader) {
    let _ship_level = source.readBigNumber();
    return { $$type: 'MintNFT' as const, ship_level: _ship_level };
}

function loadGetterTupleMintNFT(source: TupleReader) {
    let _ship_level = source.readBigNumber();
    return { $$type: 'MintNFT' as const, ship_level: _ship_level };
}

function storeTupleMintNFT(source: MintNFT) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.ship_level);
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

export type Excesses = {
    $$type: 'Excesses';
    query_id: bigint;
}

export function storeExcesses(src: Excesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'Excesses' as const, query_id: _query_id };
}

function loadTupleExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'Excesses' as const, query_id: _query_id };
}

function loadGetterTupleExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'Excesses' as const, query_id: _query_id };
}

function storeTupleExcesses(source: Excesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserExcesses(): DictionaryValue<Excesses> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadExcesses(src.loadRef().beginParse());
        }
    }
}

export type ChangeTrusted = {
    $$type: 'ChangeTrusted';
    trusted_address: Address;
}

export function storeChangeTrusted(src: ChangeTrusted) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1942898974, 32);
        b_0.storeAddress(src.trusted_address);
    };
}

export function loadChangeTrusted(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1942898974) { throw Error('Invalid prefix'); }
    let _trusted_address = sc_0.loadAddress();
    return { $$type: 'ChangeTrusted' as const, trusted_address: _trusted_address };
}

function loadTupleChangeTrusted(source: TupleReader) {
    let _trusted_address = source.readAddress();
    return { $$type: 'ChangeTrusted' as const, trusted_address: _trusted_address };
}

function loadGetterTupleChangeTrusted(source: TupleReader) {
    let _trusted_address = source.readAddress();
    return { $$type: 'ChangeTrusted' as const, trusted_address: _trusted_address };
}

function storeTupleChangeTrusted(source: ChangeTrusted) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.trusted_address);
    return builder.build();
}

function dictValueParserChangeTrusted(): DictionaryValue<ChangeTrusted> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeTrusted(src)).endCell());
        },
        parse: (src) => {
            return loadChangeTrusted(src.loadRef().beginParse());
        }
    }
}

export type Transfer = {
    $$type: 'Transfer';
    query_id: bigint;
    new_owner: Address;
    response_destination: Address | null;
    custom_payload: Cell | null;
    forward_amount: bigint;
    forward_payload: Slice;
}

export function storeTransfer(src: Transfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1607220500, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.new_owner);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1607220500) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _new_owner = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_amount = sc_0.loadCoins();
    let _forward_payload = sc_0;
    return { $$type: 'Transfer' as const, query_id: _query_id, new_owner: _new_owner, response_destination: _response_destination, custom_payload: _custom_payload, forward_amount: _forward_amount, forward_payload: _forward_payload };
}

function loadTupleTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _new_owner = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    let _forward_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'Transfer' as const, query_id: _query_id, new_owner: _new_owner, response_destination: _response_destination, custom_payload: _custom_payload, forward_amount: _forward_amount, forward_payload: _forward_payload };
}

function loadGetterTupleTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _new_owner = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    let _forward_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'Transfer' as const, query_id: _query_id, new_owner: _new_owner, response_destination: _response_destination, custom_payload: _custom_payload, forward_amount: _forward_amount, forward_payload: _forward_payload };
}

function storeTupleTransfer(source: Transfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.new_owner);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_amount);
    builder.writeSlice(source.forward_payload.asCell());
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

export type Destroy = {
    $$type: 'Destroy';
    query_id: bigint;
}

export function storeDestroy(src: Destroy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(520377210, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadDestroy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 520377210) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'Destroy' as const, query_id: _query_id };
}

function loadTupleDestroy(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'Destroy' as const, query_id: _query_id };
}

function loadGetterTupleDestroy(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'Destroy' as const, query_id: _query_id };
}

function storeTupleDestroy(source: Destroy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserDestroy(): DictionaryValue<Destroy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDestroy(src)).endCell());
        },
        parse: (src) => {
            return loadDestroy(src.loadRef().beginParse());
        }
    }
}

export type BurnSingle = {
    $$type: 'BurnSingle';
    nft_contract: Address;
}

export function storeBurnSingle(src: BurnSingle) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3118058887, 32);
        b_0.storeAddress(src.nft_contract);
    };
}

export function loadBurnSingle(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3118058887) { throw Error('Invalid prefix'); }
    let _nft_contract = sc_0.loadAddress();
    return { $$type: 'BurnSingle' as const, nft_contract: _nft_contract };
}

function loadTupleBurnSingle(source: TupleReader) {
    let _nft_contract = source.readAddress();
    return { $$type: 'BurnSingle' as const, nft_contract: _nft_contract };
}

function loadGetterTupleBurnSingle(source: TupleReader) {
    let _nft_contract = source.readAddress();
    return { $$type: 'BurnSingle' as const, nft_contract: _nft_contract };
}

function storeTupleBurnSingle(source: BurnSingle) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.nft_contract);
    return builder.build();
}

function dictValueParserBurnSingle(): DictionaryValue<BurnSingle> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBurnSingle(src)).endCell());
        },
        parse: (src) => {
            return loadBurnSingle(src.loadRef().beginParse());
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

export type GetStaticData = {
    $$type: 'GetStaticData';
    query_id: bigint;
}

export function storeGetStaticData(src: GetStaticData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(801842850, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadGetStaticData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 801842850) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'GetStaticData' as const, query_id: _query_id };
}

function loadTupleGetStaticData(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'GetStaticData' as const, query_id: _query_id };
}

function loadGetterTupleGetStaticData(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'GetStaticData' as const, query_id: _query_id };
}

function storeTupleGetStaticData(source: GetStaticData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserGetStaticData(): DictionaryValue<GetStaticData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetStaticData(src)).endCell());
        },
        parse: (src) => {
            return loadGetStaticData(src.loadRef().beginParse());
        }
    }
}

export type ReportStaticData = {
    $$type: 'ReportStaticData';
    query_id: bigint;
    index_id: bigint;
    collection: Address;
}

export function storeReportStaticData(src: ReportStaticData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2339837749, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeInt(src.index_id, 257);
        b_0.storeAddress(src.collection);
    };
}

export function loadReportStaticData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2339837749) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _index_id = sc_0.loadIntBig(257);
    let _collection = sc_0.loadAddress();
    return { $$type: 'ReportStaticData' as const, query_id: _query_id, index_id: _index_id, collection: _collection };
}

function loadTupleReportStaticData(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _index_id = source.readBigNumber();
    let _collection = source.readAddress();
    return { $$type: 'ReportStaticData' as const, query_id: _query_id, index_id: _index_id, collection: _collection };
}

function loadGetterTupleReportStaticData(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _index_id = source.readBigNumber();
    let _collection = source.readAddress();
    return { $$type: 'ReportStaticData' as const, query_id: _query_id, index_id: _index_id, collection: _collection };
}

function storeTupleReportStaticData(source: ReportStaticData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.index_id);
    builder.writeAddress(source.collection);
    return builder.build();
}

function dictValueParserReportStaticData(): DictionaryValue<ReportStaticData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeReportStaticData(src)).endCell());
        },
        parse: (src) => {
            return loadReportStaticData(src.loadRef().beginParse());
        }
    }
}

export type GetNftData = {
    $$type: 'GetNftData';
    is_initialized: boolean;
    index: bigint;
    collection_address: Address;
    owner_address: Address;
    individual_content: Cell;
}

export function storeGetNftData(src: GetNftData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.is_initialized);
        b_0.storeInt(src.index, 257);
        b_0.storeAddress(src.collection_address);
        b_0.storeAddress(src.owner_address);
        b_0.storeRef(src.individual_content);
    };
}

export function loadGetNftData(slice: Slice) {
    let sc_0 = slice;
    let _is_initialized = sc_0.loadBit();
    let _index = sc_0.loadIntBig(257);
    let _collection_address = sc_0.loadAddress();
    let _owner_address = sc_0.loadAddress();
    let _individual_content = sc_0.loadRef();
    return { $$type: 'GetNftData' as const, is_initialized: _is_initialized, index: _index, collection_address: _collection_address, owner_address: _owner_address, individual_content: _individual_content };
}

function loadTupleGetNftData(source: TupleReader) {
    let _is_initialized = source.readBoolean();
    let _index = source.readBigNumber();
    let _collection_address = source.readAddress();
    let _owner_address = source.readAddress();
    let _individual_content = source.readCell();
    return { $$type: 'GetNftData' as const, is_initialized: _is_initialized, index: _index, collection_address: _collection_address, owner_address: _owner_address, individual_content: _individual_content };
}

function loadGetterTupleGetNftData(source: TupleReader) {
    let _is_initialized = source.readBoolean();
    let _index = source.readBigNumber();
    let _collection_address = source.readAddress();
    let _owner_address = source.readAddress();
    let _individual_content = source.readCell();
    return { $$type: 'GetNftData' as const, is_initialized: _is_initialized, index: _index, collection_address: _collection_address, owner_address: _owner_address, individual_content: _individual_content };
}

function storeTupleGetNftData(source: GetNftData) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.is_initialized);
    builder.writeNumber(source.index);
    builder.writeAddress(source.collection_address);
    builder.writeAddress(source.owner_address);
    builder.writeCell(source.individual_content);
    return builder.build();
}

function dictValueParserGetNftData(): DictionaryValue<GetNftData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetNftData(src)).endCell());
        },
        parse: (src) => {
            return loadGetNftData(src.loadRef().beginParse());
        }
    }
}

export type ShipAssembler$Data = {
    $$type: 'ShipAssembler$Data';
    owner_address: Address;
    treasury_address: Address;
    owner_public_key: bigint;
    nft_counter: bigint;
    collection_metadata: Cell;
    nft_item_metadata: Cell;
}

export function storeShipAssembler$Data(src: ShipAssembler$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner_address);
        b_0.storeAddress(src.treasury_address);
        b_0.storeInt(src.owner_public_key, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.nft_counter, 257);
        b_1.storeRef(src.collection_metadata);
        b_1.storeRef(src.nft_item_metadata);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadShipAssembler$Data(slice: Slice) {
    let sc_0 = slice;
    let _owner_address = sc_0.loadAddress();
    let _treasury_address = sc_0.loadAddress();
    let _owner_public_key = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _nft_counter = sc_1.loadIntBig(257);
    let _collection_metadata = sc_1.loadRef();
    let _nft_item_metadata = sc_1.loadRef();
    return { $$type: 'ShipAssembler$Data' as const, owner_address: _owner_address, treasury_address: _treasury_address, owner_public_key: _owner_public_key, nft_counter: _nft_counter, collection_metadata: _collection_metadata, nft_item_metadata: _nft_item_metadata };
}

function loadTupleShipAssembler$Data(source: TupleReader) {
    let _owner_address = source.readAddress();
    let _treasury_address = source.readAddress();
    let _owner_public_key = source.readBigNumber();
    let _nft_counter = source.readBigNumber();
    let _collection_metadata = source.readCell();
    let _nft_item_metadata = source.readCell();
    return { $$type: 'ShipAssembler$Data' as const, owner_address: _owner_address, treasury_address: _treasury_address, owner_public_key: _owner_public_key, nft_counter: _nft_counter, collection_metadata: _collection_metadata, nft_item_metadata: _nft_item_metadata };
}

function loadGetterTupleShipAssembler$Data(source: TupleReader) {
    let _owner_address = source.readAddress();
    let _treasury_address = source.readAddress();
    let _owner_public_key = source.readBigNumber();
    let _nft_counter = source.readBigNumber();
    let _collection_metadata = source.readCell();
    let _nft_item_metadata = source.readCell();
    return { $$type: 'ShipAssembler$Data' as const, owner_address: _owner_address, treasury_address: _treasury_address, owner_public_key: _owner_public_key, nft_counter: _nft_counter, collection_metadata: _collection_metadata, nft_item_metadata: _nft_item_metadata };
}

function storeTupleShipAssembler$Data(source: ShipAssembler$Data) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner_address);
    builder.writeAddress(source.treasury_address);
    builder.writeNumber(source.owner_public_key);
    builder.writeNumber(source.nft_counter);
    builder.writeCell(source.collection_metadata);
    builder.writeCell(source.nft_item_metadata);
    return builder.build();
}

function dictValueParserShipAssembler$Data(): DictionaryValue<ShipAssembler$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeShipAssembler$Data(src)).endCell());
        },
        parse: (src) => {
            return loadShipAssembler$Data(src.loadRef().beginParse());
        }
    }
}

export type ShipNFT$Data = {
    $$type: 'ShipNFT$Data';
    collection_address: Address;
    item_index: bigint;
    ship_level: bigint;
    is_initialized: boolean;
    trusted_address: Address | null;
    owner: Address | null;
    individual_content: Cell | null;
}

export function storeShipNFT$Data(src: ShipNFT$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.collection_address);
        b_0.storeInt(src.item_index, 257);
        b_0.storeInt(src.ship_level, 257);
        b_0.storeBit(src.is_initialized);
        let b_1 = new Builder();
        b_1.storeAddress(src.trusted_address);
        b_1.storeAddress(src.owner);
        if (src.individual_content !== null && src.individual_content !== undefined) { b_1.storeBit(true).storeRef(src.individual_content); } else { b_1.storeBit(false); }
        b_0.storeRef(b_1.endCell());
    };
}

export function loadShipNFT$Data(slice: Slice) {
    let sc_0 = slice;
    let _collection_address = sc_0.loadAddress();
    let _item_index = sc_0.loadIntBig(257);
    let _ship_level = sc_0.loadIntBig(257);
    let _is_initialized = sc_0.loadBit();
    let sc_1 = sc_0.loadRef().beginParse();
    let _trusted_address = sc_1.loadMaybeAddress();
    let _owner = sc_1.loadMaybeAddress();
    let _individual_content = sc_1.loadBit() ? sc_1.loadRef() : null;
    return { $$type: 'ShipNFT$Data' as const, collection_address: _collection_address, item_index: _item_index, ship_level: _ship_level, is_initialized: _is_initialized, trusted_address: _trusted_address, owner: _owner, individual_content: _individual_content };
}

function loadTupleShipNFT$Data(source: TupleReader) {
    let _collection_address = source.readAddress();
    let _item_index = source.readBigNumber();
    let _ship_level = source.readBigNumber();
    let _is_initialized = source.readBoolean();
    let _trusted_address = source.readAddressOpt();
    let _owner = source.readAddressOpt();
    let _individual_content = source.readCellOpt();
    return { $$type: 'ShipNFT$Data' as const, collection_address: _collection_address, item_index: _item_index, ship_level: _ship_level, is_initialized: _is_initialized, trusted_address: _trusted_address, owner: _owner, individual_content: _individual_content };
}

function loadGetterTupleShipNFT$Data(source: TupleReader) {
    let _collection_address = source.readAddress();
    let _item_index = source.readBigNumber();
    let _ship_level = source.readBigNumber();
    let _is_initialized = source.readBoolean();
    let _trusted_address = source.readAddressOpt();
    let _owner = source.readAddressOpt();
    let _individual_content = source.readCellOpt();
    return { $$type: 'ShipNFT$Data' as const, collection_address: _collection_address, item_index: _item_index, ship_level: _ship_level, is_initialized: _is_initialized, trusted_address: _trusted_address, owner: _owner, individual_content: _individual_content };
}

function storeTupleShipNFT$Data(source: ShipNFT$Data) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.collection_address);
    builder.writeNumber(source.item_index);
    builder.writeNumber(source.ship_level);
    builder.writeBoolean(source.is_initialized);
    builder.writeAddress(source.trusted_address);
    builder.writeAddress(source.owner);
    builder.writeCell(source.individual_content);
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

 type ShipAssembler_init_args = {
    $$type: 'ShipAssembler_init_args';
    owner_address: Address;
    treasury_address: Address;
    owner_public_key: bigint;
    collection_metadata: Cell;
    nft_item_metadata: Cell;
}

function initShipAssembler_init_args(src: ShipAssembler_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner_address);
        b_0.storeAddress(src.treasury_address);
        b_0.storeInt(src.owner_public_key, 257);
        b_0.storeRef(src.collection_metadata);
        b_0.storeRef(src.nft_item_metadata);
    };
}

async function ShipAssembler_init(owner_address: Address, treasury_address: Address, owner_public_key: bigint, collection_metadata: Cell, nft_item_metadata: Cell) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initShipAssembler_init_args({ $$type: 'ShipAssembler_init_args', owner_address, treasury_address, owner_public_key, collection_metadata, nft_item_metadata })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const ShipAssembler_errors: { [key: number]: { message: string } } = {
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
    27499: { message: `initialized tx need from collection` },
    47429: { message: `Only the owner can update the public key` },
    48401: { message: `Invalid signature` },
    49280: { message: `not owner` },
    49469: { message: `not from collection` },
    53983: { message: `Price requirement is not met` },
    58821: { message: `No funds available for withdrawal` },
    63433: { message: `Only the owner can withdraw funds` },
}

const ShipAssembler_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"MintShipNFT","header":3341544087,"fields":[{"name":"new_owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"OwnershipAssigned","header":85167505,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"prev_owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"CollectionData","header":null,"fields":[{"name":"next_item_index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collection_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"WithdrawFunds","header":2050115519,"fields":[{"name":"query_id","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"WithdrawalConfirmation","header":null,"fields":[{"name":"query_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"VerifySingle","header":1607862665,"fields":[{"name":"ship_level","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"signature","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"UpdatePublicKey","header":1766758178,"fields":[{"name":"query_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"new_public_key","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ChangeOwner","header":3652073726,"fields":[{"name":"new_owner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeNFTContent","header":278000414,"fields":[{"name":"new_nft_content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"LogEventShipAssembled","header":1720509213,"fields":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"nft_received","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"GetNftCount","header":3711924588,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"user","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"AssembleShipMessage","header":1997904914,"fields":[{"name":"nft_contract_1","type":{"kind":"simple","type":"address","optional":false}},{"name":"nft_contract_2","type":{"kind":"simple","type":"address","optional":false}},{"name":"nft_contract_3","type":{"kind":"simple","type":"address","optional":false}},{"name":"nft_contract_4","type":{"kind":"simple","type":"address","optional":false}},{"name":"nft_contract_5","type":{"kind":"simple","type":"address","optional":false}},{"name":"nft_contract_6","type":{"kind":"simple","type":"address","optional":false}},{"name":"ship_level","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"signature","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"UpgradeShip","header":74989363,"fields":[{"name":"nft_contract_1","type":{"kind":"simple","type":"address","optional":false}},{"name":"nft_contract_2","type":{"kind":"simple","type":"address","optional":false}},{"name":"nft_contract_3","type":{"kind":"simple","type":"address","optional":false}},{"name":"nft_contract_4","type":{"kind":"simple","type":"address","optional":false}},{"name":"nft_contract_5","type":{"kind":"simple","type":"address","optional":false}},{"name":"nft_contract_6","type":{"kind":"simple","type":"address","optional":false}},{"name":"nft_contract_7","type":{"kind":"simple","type":"address","optional":false}},{"name":"ship_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"ship_level","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"signature","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"MintNFT","header":386813437,"fields":[{"name":"ship_level","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ReportNftCount","header":1134221456,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"nft_count","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Excesses","header":3576854235,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ChangeTrusted","header":1942898974,"fields":[{"name":"trusted_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Transfer","header":1607220500,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"new_owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"Destroy","header":520377210,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"BurnSingle","header":3118058887,"fields":[{"name":"nft_contract","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RequestNftCount","header":1939569222,"fields":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"nft_count","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"GetStaticData","header":801842850,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ReportStaticData","header":2339837749,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"index_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collection","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"GetNftData","header":null,"fields":[{"name":"is_initialized","type":{"kind":"simple","type":"bool","optional":false}},{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collection_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"individual_content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"ShipAssembler$Data","header":null,"fields":[{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"treasury_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner_public_key","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"nft_counter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collection_metadata","type":{"kind":"simple","type":"cell","optional":false}},{"name":"nft_item_metadata","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"ShipNFT$Data","header":null,"fields":[{"name":"collection_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"item_index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"ship_level","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"is_initialized","type":{"kind":"simple","type":"bool","optional":false}},{"name":"trusted_address","type":{"kind":"simple","type":"address","optional":true}},{"name":"owner","type":{"kind":"simple","type":"address","optional":true}},{"name":"individual_content","type":{"kind":"simple","type":"cell","optional":true}}]},
]

const ShipAssembler_getters: ABIGetter[] = [
    {"name":"getNewNftItemInit","arguments":[{"name":"ship_level","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"item_index","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"StateInit","optional":false}},
    {"name":"getOwner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"get_collection_data","arguments":[],"returnType":{"kind":"simple","type":"CollectionData","optional":false}},
]

export const ShipAssembler_getterMapping: { [key: string]: string } = {
    'getNewNftItemInit': 'getGetNewNftItemInit',
    'getOwner': 'getGetOwner',
    'get_collection_data': 'getGetCollectionData',
}

const ShipAssembler_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"AssembleShipMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpgradeShip"}},
    {"receiver":"internal","message":{"kind":"typed","type":"MintNFT"}},
    {"receiver":"internal","message":{"kind":"typed","type":"VerifySingle"}},
    {"receiver":"internal","message":{"kind":"typed","type":"BurnSingle"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdatePublicKey"}},
    {"receiver":"internal","message":{"kind":"typed","type":"WithdrawFunds"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Excesses"}},
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class ShipAssembler implements Contract {
    
    static async init(owner_address: Address, treasury_address: Address, owner_public_key: bigint, collection_metadata: Cell, nft_item_metadata: Cell) {
        return await ShipAssembler_init(owner_address, treasury_address, owner_public_key, collection_metadata, nft_item_metadata);
    }
    
    static async fromInit(owner_address: Address, treasury_address: Address, owner_public_key: bigint, collection_metadata: Cell, nft_item_metadata: Cell) {
        const init = await ShipAssembler_init(owner_address, treasury_address, owner_public_key, collection_metadata, nft_item_metadata);
        const address = contractAddress(0, init);
        return new ShipAssembler(address, init);
    }
    
    static fromAddress(address: Address) {
        return new ShipAssembler(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  ShipAssembler_types,
        getters: ShipAssembler_getters,
        receivers: ShipAssembler_receivers,
        errors: ShipAssembler_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: AssembleShipMessage | UpgradeShip | MintNFT | VerifySingle | BurnSingle | UpdatePublicKey | WithdrawFunds | Excesses | null | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'AssembleShipMessage') {
            body = beginCell().store(storeAssembleShipMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpgradeShip') {
            body = beginCell().store(storeUpgradeShip(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'MintNFT') {
            body = beginCell().store(storeMintNFT(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'VerifySingle') {
            body = beginCell().store(storeVerifySingle(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'BurnSingle') {
            body = beginCell().store(storeBurnSingle(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdatePublicKey') {
            body = beginCell().store(storeUpdatePublicKey(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawFunds') {
            body = beginCell().store(storeWithdrawFunds(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Excesses') {
            body = beginCell().store(storeExcesses(message)).endCell();
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
    
    async getGetNewNftItemInit(provider: ContractProvider, ship_level: bigint, item_index: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(ship_level);
        builder.writeNumber(item_index);
        let source = (await provider.get('getNewNftItemInit', builder.build())).stack;
        const result = loadGetterTupleStateInit(source);
        return result;
    }
    
    async getGetOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getOwner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getGetCollectionData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_collection_data', builder.build())).stack;
        const result = loadGetterTupleCollectionData(source);
        return result;
    }
    
}