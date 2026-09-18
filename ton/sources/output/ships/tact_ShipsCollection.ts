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
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
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

export type LogEventMintRecord = {
    $$type: 'LogEventMintRecord';
    minter: Address;
    item_id: bigint;
    generate_number: bigint;
}

export function storeLogEventMintRecord(src: LogEventMintRecord) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2743565669, 32);
        b_0.storeAddress(src.minter);
        b_0.storeInt(src.item_id, 257);
        b_0.storeInt(src.generate_number, 257);
    };
}

export function loadLogEventMintRecord(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2743565669) { throw Error('Invalid prefix'); }
    let _minter = sc_0.loadAddress();
    let _item_id = sc_0.loadIntBig(257);
    let _generate_number = sc_0.loadIntBig(257);
    return { $$type: 'LogEventMintRecord' as const, minter: _minter, item_id: _item_id, generate_number: _generate_number };
}

function loadTupleLogEventMintRecord(source: TupleReader) {
    let _minter = source.readAddress();
    let _item_id = source.readBigNumber();
    let _generate_number = source.readBigNumber();
    return { $$type: 'LogEventMintRecord' as const, minter: _minter, item_id: _item_id, generate_number: _generate_number };
}

function storeTupleLogEventMintRecord(source: LogEventMintRecord) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.minter);
    builder.writeNumber(source.item_id);
    builder.writeNumber(source.generate_number);
    return builder.build();
}

function dictValueParserLogEventMintRecord(): DictionaryValue<LogEventMintRecord> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLogEventMintRecord(src)).endCell());
        },
        parse: (src) => {
            return loadLogEventMintRecord(src.loadRef().beginParse());
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

export type MintManyByOwner = {
    $$type: 'MintManyByOwner';
    mint_to: Address;
    count: bigint;
    contents: Dictionary<bigint, Cell>;
}

export function storeMintManyByOwner(src: MintManyByOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1607220501, 32);
        b_0.storeAddress(src.mint_to);
        b_0.storeUint(src.count, 32);
        b_0.storeDict(src.contents, Dictionary.Keys.BigInt(257), Dictionary.Values.Cell());
    };
}

export function loadMintManyByOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1607220501) { throw Error('Invalid prefix'); }
    let _mint_to = sc_0.loadAddress();
    let _count = sc_0.loadUintBig(32);
    let _contents = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.Cell(), sc_0);
    return { $$type: 'MintManyByOwner' as const, mint_to: _mint_to, count: _count, contents: _contents };
}

function loadTupleMintManyByOwner(source: TupleReader) {
    let _mint_to = source.readAddress();
    let _count = source.readBigNumber();
    let _contents = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Cell(), source.readCellOpt());
    return { $$type: 'MintManyByOwner' as const, mint_to: _mint_to, count: _count, contents: _contents };
}

function storeTupleMintManyByOwner(source: MintManyByOwner) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.mint_to);
    builder.writeNumber(source.count);
    builder.writeCell(source.contents.size > 0 ? beginCell().storeDictDirect(source.contents, Dictionary.Keys.BigInt(257), Dictionary.Values.Cell()).endCell() : null);
    return builder.build();
}

function dictValueParserMintManyByOwner(): DictionaryValue<MintManyByOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMintManyByOwner(src)).endCell());
        },
        parse: (src) => {
            return loadMintManyByOwner(src.loadRef().beginParse());
        }
    }
}

export type SetSecondMinter = {
    $$type: 'SetSecondMinter';
    new_second_minter_address: Address;
}

export function storeSetSecondMinter(src: SetSecondMinter) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2913190011, 32);
        b_0.storeAddress(src.new_second_minter_address);
    };
}

export function loadSetSecondMinter(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2913190011) { throw Error('Invalid prefix'); }
    let _new_second_minter_address = sc_0.loadAddress();
    return { $$type: 'SetSecondMinter' as const, new_second_minter_address: _new_second_minter_address };
}

function loadTupleSetSecondMinter(source: TupleReader) {
    let _new_second_minter_address = source.readAddress();
    return { $$type: 'SetSecondMinter' as const, new_second_minter_address: _new_second_minter_address };
}

function storeTupleSetSecondMinter(source: SetSecondMinter) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.new_second_minter_address);
    return builder.build();
}

function dictValueParserSetSecondMinter(): DictionaryValue<SetSecondMinter> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetSecondMinter(src)).endCell());
        },
        parse: (src) => {
            return loadSetSecondMinter(src.loadRef().beginParse());
        }
    }
}

export type ChangeTreasury = {
    $$type: 'ChangeTreasury';
    new_treasury: Address;
}

export function storeChangeTreasury(src: ChangeTreasury) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4069337386, 32);
        b_0.storeAddress(src.new_treasury);
    };
}

export function loadChangeTreasury(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4069337386) { throw Error('Invalid prefix'); }
    let _new_treasury = sc_0.loadAddress();
    return { $$type: 'ChangeTreasury' as const, new_treasury: _new_treasury };
}

function loadTupleChangeTreasury(source: TupleReader) {
    let _new_treasury = source.readAddress();
    return { $$type: 'ChangeTreasury' as const, new_treasury: _new_treasury };
}

function storeTupleChangeTreasury(source: ChangeTreasury) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.new_treasury);
    return builder.build();
}

function dictValueParserChangeTreasury(): DictionaryValue<ChangeTreasury> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeTreasury(src)).endCell());
        },
        parse: (src) => {
            return loadChangeTreasury(src.loadRef().beginParse());
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

export type ChangeTrustedAddress = {
    $$type: 'ChangeTrustedAddress';
    new_trusted_address: Address;
}

export function storeChangeTrustedAddress(src: ChangeTrustedAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3212554276, 32);
        b_0.storeAddress(src.new_trusted_address);
    };
}

export function loadChangeTrustedAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3212554276) { throw Error('Invalid prefix'); }
    let _new_trusted_address = sc_0.loadAddress();
    return { $$type: 'ChangeTrustedAddress' as const, new_trusted_address: _new_trusted_address };
}

function loadTupleChangeTrustedAddress(source: TupleReader) {
    let _new_trusted_address = source.readAddress();
    return { $$type: 'ChangeTrustedAddress' as const, new_trusted_address: _new_trusted_address };
}

function storeTupleChangeTrustedAddress(source: ChangeTrustedAddress) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.new_trusted_address);
    return builder.build();
}

function dictValueParserChangeTrustedAddress(): DictionaryValue<ChangeTrustedAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeTrustedAddress(src)).endCell());
        },
        parse: (src) => {
            return loadChangeTrustedAddress(src.loadRef().beginParse());
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

export type GetRoyaltyParams = {
    $$type: 'GetRoyaltyParams';
    query_id: bigint;
}

export function storeGetRoyaltyParams(src: GetRoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1765620048, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadGetRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1765620048) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'GetRoyaltyParams' as const, query_id: _query_id };
}

function loadTupleGetRoyaltyParams(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'GetRoyaltyParams' as const, query_id: _query_id };
}

function storeTupleGetRoyaltyParams(source: GetRoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserGetRoyaltyParams(): DictionaryValue<GetRoyaltyParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadGetRoyaltyParams(src.loadRef().beginParse());
        }
    }
}

export type ReportRoyaltyParams = {
    $$type: 'ReportRoyaltyParams';
    query_id: bigint;
    numerator: bigint;
    denominator: bigint;
    destination: Address;
}

export function storeReportRoyaltyParams(src: ReportRoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2831876269, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeUint(src.numerator, 16);
        b_0.storeUint(src.denominator, 16);
        b_0.storeAddress(src.destination);
    };
}

export function loadReportRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2831876269) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _numerator = sc_0.loadUintBig(16);
    let _denominator = sc_0.loadUintBig(16);
    let _destination = sc_0.loadAddress();
    return { $$type: 'ReportRoyaltyParams' as const, query_id: _query_id, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function loadTupleReportRoyaltyParams(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _numerator = source.readBigNumber();
    let _denominator = source.readBigNumber();
    let _destination = source.readAddress();
    return { $$type: 'ReportRoyaltyParams' as const, query_id: _query_id, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function storeTupleReportRoyaltyParams(source: ReportRoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.numerator);
    builder.writeNumber(source.denominator);
    builder.writeAddress(source.destination);
    return builder.build();
}

function dictValueParserReportRoyaltyParams(): DictionaryValue<ReportRoyaltyParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeReportRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadReportRoyaltyParams(src.loadRef().beginParse());
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

export type RoyaltyParams = {
    $$type: 'RoyaltyParams';
    numerator: bigint;
    denominator: bigint;
    destination: Address;
}

export function storeRoyaltyParams(src: RoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.numerator, 257);
        b_0.storeInt(src.denominator, 257);
        b_0.storeAddress(src.destination);
    };
}

export function loadRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    let _numerator = sc_0.loadIntBig(257);
    let _denominator = sc_0.loadIntBig(257);
    let _destination = sc_0.loadAddress();
    return { $$type: 'RoyaltyParams' as const, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function loadTupleRoyaltyParams(source: TupleReader) {
    let _numerator = source.readBigNumber();
    let _denominator = source.readBigNumber();
    let _destination = source.readAddress();
    return { $$type: 'RoyaltyParams' as const, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function storeTupleRoyaltyParams(source: RoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.numerator);
    builder.writeNumber(source.denominator);
    builder.writeAddress(source.destination);
    return builder.build();
}

function dictValueParserRoyaltyParams(): DictionaryValue<RoyaltyParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadRoyaltyParams(src.loadRef().beginParse());
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
    forward_payload: Cell;
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
    let _forward_payload = sc_0.asCell();
    return { $$type: 'Transfer' as const, query_id: _query_id, new_owner: _new_owner, response_destination: _response_destination, custom_payload: _custom_payload, forward_amount: _forward_amount, forward_payload: _forward_payload };
}

function loadTupleTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _new_owner = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    let _forward_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'Transfer' as const, query_id: _query_id, new_owner: _new_owner, response_destination: _response_destination, custom_payload: _custom_payload, forward_amount: _forward_amount, forward_payload: _forward_payload };
}

function storeTupleTransfer(source: Transfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.new_owner);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_amount);
    builder.writeSlice(source.forward_payload);
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

export type OwnershipAssigned = {
    $$type: 'OwnershipAssigned';
    query_id: bigint;
    prev_owner: Address;
    forward_payload: Cell;
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
    let _forward_payload = sc_0.asCell();
    return { $$type: 'OwnershipAssigned' as const, query_id: _query_id, prev_owner: _prev_owner, forward_payload: _forward_payload };
}

function loadTupleOwnershipAssigned(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _prev_owner = source.readAddress();
    let _forward_payload = source.readCell();
    return { $$type: 'OwnershipAssigned' as const, query_id: _query_id, prev_owner: _prev_owner, forward_payload: _forward_payload };
}

function storeTupleOwnershipAssigned(source: OwnershipAssigned) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.prev_owner);
    builder.writeSlice(source.forward_payload);
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

 type ShipsCollection_init_args = {
    $$type: 'ShipsCollection_init_args';
    owner_address: Address;
    collection_content: Cell;
    collection_base: Cell;
    royalty_params: RoyaltyParams;
    unique_nonce: bigint;
    TOTAL_SUPPLY: bigint;
    treasury_address: Address;
}

function initShipsCollection_init_args(src: ShipsCollection_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner_address);
        b_0.storeRef(src.collection_content);
        b_0.storeRef(src.collection_base);
        let b_1 = new Builder();
        b_1.store(storeRoyaltyParams(src.royalty_params));
        let b_2 = new Builder();
        b_2.storeInt(src.unique_nonce, 257);
        b_2.storeInt(src.TOTAL_SUPPLY, 257);
        b_2.storeAddress(src.treasury_address);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

async function ShipsCollection_init(owner_address: Address, collection_content: Cell, collection_base: Cell, royalty_params: RoyaltyParams, unique_nonce: bigint, TOTAL_SUPPLY: bigint, treasury_address: Address) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initShipsCollection_init_args({ $$type: 'ShipsCollection_init_args', owner_address, collection_content, collection_base, royalty_params, unique_nonce, TOTAL_SUPPLY, treasury_address })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const ShipsCollection_errors: { [key: number]: { message: string } } = {
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
    7031: { message: `Only owner can set second minter` },
    17078: { message: `Only owner can change trusted address` },
    26825: { message: `Only owner can withdraw` },
    27145: { message: `Only owner can change owner` },
    27499: { message: `initialized tx need from collection` },
    31295: { message: `Only owner can change treasury` },
    49280: { message: `not owner` },
    49469: { message: `not from collection` },
    53983: { message: `Price requirement is not met` },
    57579: { message: `Only owner can mint` },
    62742: { message: `non-sequential NFTs` },
}

const ShipsCollection_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"LogEventMintRecord","header":2743565669,"fields":[{"name":"minter","type":{"kind":"simple","type":"address","optional":false}},{"name":"item_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"generate_number","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"MintByOwner","header":1607220500,"fields":[{"name":"mint_to","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"MintManyByOwner","header":1607220501,"fields":[{"name":"mint_to","type":{"kind":"simple","type":"address","optional":false}},{"name":"count","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"contents","type":{"kind":"dict","key":"int","value":"cell","valueFormat":"ref"}}]},
    {"name":"SetSecondMinter","header":2913190011,"fields":[{"name":"new_second_minter_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeTreasury","header":4069337386,"fields":[{"name":"new_treasury","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":3652073726,"fields":[{"name":"new_owner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeTrustedAddress","header":3212554276,"fields":[{"name":"new_trusted_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Destroy","header":520377210,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"GetRoyaltyParams","header":1765620048,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ReportRoyaltyParams","header":2831876269,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"numerator","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"denominator","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"CollectionData","header":null,"fields":[{"name":"next_item_index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collection_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RoyaltyParams","header":null,"fields":[{"name":"numerator","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"denominator","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Transfer","header":1607220500,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"new_owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"OwnershipAssigned","header":85167505,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"prev_owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"Excesses","header":3576854235,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"GetStaticData","header":801842850,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ReportStaticData","header":2339837749,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"index_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collection","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"GetNftData","header":null,"fields":[{"name":"is_initialized","type":{"kind":"simple","type":"bool","optional":false}},{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collection_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"individual_content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"TransferTON","header":271167746,"fields":[{"name":"to_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
]

const ShipsCollection_getters: ABIGetter[] = [
    {"name":"get_collection_data","arguments":[],"returnType":{"kind":"simple","type":"CollectionData","optional":false}},
    {"name":"get_nft_address_by_index","arguments":[{"name":"item_index","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"address","optional":true}},
    {"name":"getNftItemInit","arguments":[{"name":"item_index","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"StateInit","optional":false}},
    {"name":"get_nft_content","arguments":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"individual_content","type":{"kind":"simple","type":"cell","optional":false}}],"returnType":{"kind":"simple","type":"cell","optional":false}},
    {"name":"treasury","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"royalty_params","arguments":[],"returnType":{"kind":"simple","type":"RoyaltyParams","optional":false}},
]

const ShipsCollection_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"text","text":"Mint"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetSecondMinter"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TransferTON"}},
    {"receiver":"internal","message":{"kind":"typed","type":"MintByOwner"}},
    {"receiver":"internal","message":{"kind":"typed","type":"MintManyByOwner"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeTreasury"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeOwner"}},
    {"receiver":"internal","message":{"kind":"typed","type":"GetRoyaltyParams"}},
]

export class ShipsCollection implements Contract {
    
    static async init(owner_address: Address, collection_content: Cell, collection_base: Cell, royalty_params: RoyaltyParams, unique_nonce: bigint, TOTAL_SUPPLY: bigint, treasury_address: Address) {
        return await ShipsCollection_init(owner_address, collection_content, collection_base, royalty_params, unique_nonce, TOTAL_SUPPLY, treasury_address);
    }
    
    static async fromInit(owner_address: Address, collection_content: Cell, collection_base: Cell, royalty_params: RoyaltyParams, unique_nonce: bigint, TOTAL_SUPPLY: bigint, treasury_address: Address) {
        const init = await ShipsCollection_init(owner_address, collection_content, collection_base, royalty_params, unique_nonce, TOTAL_SUPPLY, treasury_address);
        const address = contractAddress(0, init);
        return new ShipsCollection(address, init);
    }
    
    static fromAddress(address: Address) {
        return new ShipsCollection(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  ShipsCollection_types,
        getters: ShipsCollection_getters,
        receivers: ShipsCollection_receivers,
        errors: ShipsCollection_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: 'Mint' | SetSecondMinter | TransferTON | MintByOwner | MintManyByOwner | ChangeTreasury | ChangeOwner | GetRoyaltyParams) {
        
        let body: Cell | null = null;
        if (message === 'Mint') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetSecondMinter') {
            body = beginCell().store(storeSetSecondMinter(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TransferTON') {
            body = beginCell().store(storeTransferTON(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'MintByOwner') {
            body = beginCell().store(storeMintByOwner(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'MintManyByOwner') {
            body = beginCell().store(storeMintManyByOwner(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeTreasury') {
            body = beginCell().store(storeChangeTreasury(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeOwner') {
            body = beginCell().store(storeChangeOwner(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'GetRoyaltyParams') {
            body = beginCell().store(storeGetRoyaltyParams(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetCollectionData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_collection_data', builder.build())).stack;
        const result = loadTupleCollectionData(source);
        return result;
    }
    
    async getGetNftAddressByIndex(provider: ContractProvider, item_index: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(item_index);
        let source = (await provider.get('get_nft_address_by_index', builder.build())).stack;
        let result = source.readAddressOpt();
        return result;
    }
    
    async getGetNftItemInit(provider: ContractProvider, item_index: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(item_index);
        let source = (await provider.get('getNftItemInit', builder.build())).stack;
        const result = loadTupleStateInit(source);
        return result;
    }
    
    async getGetNftContent(provider: ContractProvider, index: bigint, individual_content: Cell) {
        let builder = new TupleBuilder();
        builder.writeNumber(index);
        builder.writeCell(individual_content);
        let source = (await provider.get('get_nft_content', builder.build())).stack;
        let result = source.readCell();
        return result;
    }
    
    async getTreasury(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('treasury', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getRoyaltyParams(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('royalty_params', builder.build())).stack;
        const result = loadTupleRoyaltyParams(source);
        return result;
    }
    
}