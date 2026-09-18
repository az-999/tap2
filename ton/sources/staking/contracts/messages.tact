message TransferTON {
    to_address: Address;
    value: Int as coins;
}
message (0x5fcc3d14)MintByOwner {
    mint_to: Address;     
    content: Cell;  
}
message(0x7362d09c) TokenNotification {
    query_id: Int as uint64;
    amount: Int as coins;
    from: Address;
    forward_payload: Slice as remaining;
}
message (21)MintJetton {
    query_id: Int as uint64;
    amount: Int as coins;
    receiver: Address;
}
message(0xd53276db) TokenExcesses {
    queryId: Int as uint64;
}

message(0x595f07bc) TokenBurn {
    query_id: Int as uint64;
    amount: Int as coins;
    response_destination: Address?;
    custom_payload: Cell?;
}
message Claim {
    query_id: Int as uint64;
    owner_address: Address;
    wallet_address: Address;
    signature: Slice;
}
message Released {
    query_id: Int as uint64;
}
message Deposit {
    query_id: Int as uint64;
    amount: Int as coins;
    out_amount: Int as coins;
    mint_count: Int as uint32;
    duration: Int as uint32;
    owner_address: Address;
    signature: Slice;
    max_claims: Int as uint32;
}
message ProxyMsg {
    query_id: Int as uint64;
    to: Address;
    value: Int as coins;
    body: Cell?;
}
message UpdatePublicKey {
    query_id: Int as uint64;
    new_public_key: Int as uint256;
}
message UpdateFeeAddress {
    query_id: Int as uint64;
    new_fee_address: Address;
}
message UpdateJettonAddress {
    query_id: Int as uint64;
    new_jetton_address: Address;
}
message UpdateNftAddress {
    query_id: Int as uint64;
    new_nft_address: Address;
}
message TransferOwnership {
    query_id: Int as uint64;
    new_owner: Address;
}
message Claimed {
    query_id: Int as uint64;
}
message DoMint {
    query_id: Int as uint64;
    receiver: Address;
    sender: Address;
    signature: Slice;
    mint_count: Int as uint32;
    amount: Int as coins;
    wallet_address: Address;
    fees: Int as coins;
}
message Restake {
    query_id: Int as uint64;
}
message Withdraw {
    query_id: Int as uint64;
    signature: Slice;
    wallet_address: Address;
}
message RestakeOldStake {
    query_id: Int as uint64;
    stake_id: Int as uint64;
}
message WithdrawOldStake {
    query_id: Int as uint64;
    stake_id: Int as uint64;
    signature: Slice;
    wallet_address: Address;
}

// Структуры и сообщения для старых стейков
struct OldStakeRecord {
    stake_amount: Int as coins;
    out_amount: Int as coins;
    mint_count: Int as uint8;
    max_claims: Int as uint32;
    claims_count: Int as uint32;
    stake_time: Int as uint32;
    created_at: Int as uint32;
    next_claim: Int as uint32;
    last_claim: Int as uint32;
    end_time: Int as uint32;
    wallet_address: Address;
}

message AddOldStakeRecord {
    query_id: Int as uint64;
    stake_id: Int as uint64;
    user_address: Address;
    stake_amount: Int as coins;
    out_amount: Int as coins;
    mint_count: Int as uint8;
    max_claims: Int as uint32;
    claims_count: Int as uint32;
    stake_time: Int as uint32;
    created_at: Int as uint32;
    next_claim: Int as uint32;
    last_claim: Int as uint32;
    end_time: Int as uint32;
    signature: Slice;
    wallet_address: Address;
}

message ClaimOldStake {
    query_id: Int as uint64;
    stake_id: Int as uint64;
    wallet_address: Address;
    signature: Slice;
}