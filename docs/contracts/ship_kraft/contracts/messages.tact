message MintShipNFT {
    new_owner: Address;
    content: Cell;
}

struct OwnershipAssigned {
    query_id: Int;
    prev_owner: Address;
}

message WithdrawFunds {
    query_id: Int;
}

struct WithdrawalConfirmation {
    query_id: Int;
    amount: Int;
}

message VerifySingle {
    ship_level: Int;
    signature: Slice;
}

message UpdatePublicKey {
    query_id: Int;
    new_public_key: Int;
}

message ChangeOwner {
    new_owner: Address;
}

message ChangeNFTContent {
    new_nft_content: Cell;
}

message LogEventShipAssembled {
    user: Address;
    nft_received: Cell;
}

message GetNftCount {
    query_id: Int as uint64;
    user: Address;
}

message AssembleShipMessage {
    nft_contract_1: Address;
    nft_contract_2: Address;
    nft_contract_3: Address;
    nft_contract_4: Address;
    nft_contract_5: Address;
    nft_contract_6: Address;
    ship_level: Int;
    signature: Slice;
}

message UpgradeShip {
    nft_contract_1: Address;
    nft_contract_2: Address;
    nft_contract_3: Address;
    nft_contract_4: Address;
    nft_contract_5: Address;
    nft_contract_6: Address;
    nft_contract_7: Address;
    ship_level: Int;
    signature: Slice;
}

message MintNFT {
    ship_level: Int;
}

message ReportNftCount {
    query_id: Int as uint64;
    user: Address;
    nft_count: Int;
}

message Transfer {
    new_owner: Address;
    forward_amount: Int as uint64;
    query_id: Int as uint64;
}

message BurnNFT {
}

message BurnSingle {
    nft_contract: Address;
}

message RequestNftCount {
    user: Address;
    nft_count: Int as uint64;
}

struct GetNftData {
    is_initialized: Bool;
    index: Int;
    collection_address: Address;
    owner_address: Address;
    individual_content: Cell;
}

