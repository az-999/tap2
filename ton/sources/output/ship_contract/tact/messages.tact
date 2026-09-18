message MintShipNFT {
    new_owner: Address;
    content: Cell;
}

message(0x05138d91) OwnershipAssigned {
    query_id: Int as uint64;
    prev_owner: Address;
    forward_payload: Slice as remaining;
}

struct CollectionData {
    next_item_index: Int;
    collection_content: Cell;
    owner_address: Address;
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
    ship_content: Cell;
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

message(0xd53276db) Excesses {
    query_id: Int as uint64;
}

message ChangeTrusted {
    trusted_address: Address;
}

message ChangeHighload {
    highload_address: Address;
}

message ChangeTreasury {
    treasury_address: Address;
}

message SetPause {
    is_pausable: Bool;
}

message(0x5fcc3d14) Transfer {
    query_id: Int as uint64;
    new_owner: Address;
    response_destination: Address?;
    custom_payload: Cell?;
    forward_amount: Int as coins;
    forward_payload: Slice as remaining;
}

struct RoyaltyParams {
    numerator: Int;
    denominator: Int;
    destination: Address;
}

message ChangeRoyaltyParams {
    numerator: Int;
    denominator: Int;
    destination: Address;
}

message(0x693d3950) GetRoyaltyParams {
    query_id: Int as uint64;
}

message(0xa8cb00ad) ReportRoyaltyParams {
    query_id: Int as uint64;
    numerator: Int as uint16;
    denominator: Int as uint16;
    destination: Address;
}

message(0x1f04537a) Destroy {
    query_id: Int as uint64;
}

message BurnSingle {
    nft_contract: Address;
}

message RequestNftCount {
    user: Address;
    nft_count: Int as uint64;
}

message(0x2fcb26a2) GetStaticData {
    query_id: Int as uint64;
}
message(0x8b771735) ReportStaticData {
    query_id: Int as uint64;
    index_id: Int;
    collection: Address;
}

struct GetNftData {
    is_initialized: Bool;
    index: Int;
    collection_address: Address;
    owner_address: Address;
    individual_content: Cell;
}

