message ProxyMsg {
    to: Address;
    value: Int as coins;
    body: Cell;
}

message Deposit {
    query_id: Int as uint64;
    value: Int as coins;
    signature: Slice;
}

message TransferOwnership {
    query_id: Int as uint64;
    new_owner: Address;
}

message SetReferalAddress {
    query_id: Int as uint64;
    referal_address: Address;
}

message SetPrizeAddress {
    query_id: Int as uint64;
    prize_address: Address;
}

message SetMainAddress {
    query_id: Int as uint64;
    main_address: Address;
}

message UpdatePublicKey {
    query_id: Int as uint64;
    new_public_key: Int as uint256;
}

message UpdateValue {
    query_id: Int as uint64;
    new_value: Int as coins;
}

struct Divider {
    numerator: Int;
    denominator: Int;
}

message SetDividors {
    query_id: Int as uint64;
    ref_divider: Divider;
    prize_divider: Divider;
}