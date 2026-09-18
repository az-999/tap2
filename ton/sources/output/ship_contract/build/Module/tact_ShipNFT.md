# TACT Compilation Report
Contract: ShipNFT
BOC Size: 984 bytes

# Types
Total Types: 18

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

## FactoryDeploy
TLB: `factory_deploy#6d0ff13b queryId:uint64 cashback:address = FactoryDeploy`
Signature: `FactoryDeploy{queryId:uint64,cashback:address}`

## MintNFT
TLB: `mint_nft#d5bf90dd new_owner:address content:^cell = MintNFT`
Signature: `MintNFT{new_owner:address,content:^cell}`

## ChangeOwner
TLB: `change_owner#d9ae38fe new_owner:address = ChangeOwner`
Signature: `ChangeOwner{new_owner:address}`

## ChangeNFTContent
TLB: `change_nft_content#1091f31e new_nft_content:^cell = ChangeNFTContent`
Signature: `ChangeNFTContent{new_nft_content:^cell}`

## LogEventShipAssembled
TLB: `log_event_ship_assembled#668ce31d user:address nft_received:^cell = LogEventShipAssembled`
Signature: `LogEventShipAssembled{user:address,nft_received:^cell}`

## GetNftCount
TLB: `get_nft_count#dd3f796c query_id:uint64 user:address = GetNftCount`
Signature: `GetNftCount{query_id:uint64,user:address}`

## AssembleShipMessage
TLB: `assemble_ship_message#77159c12 nft_contract_1:address nft_contract_2:address nft_contract_3:address nft_contract_4:address nft_contract_5:address nft_contract_6:address ship_level:int257 signature:^slice = AssembleShipMessage`
Signature: `AssembleShipMessage{nft_contract_1:address,nft_contract_2:address,nft_contract_3:address,nft_contract_4:address,nft_contract_5:address,nft_contract_6:address,ship_level:int257,signature:^slice}`

## ReportNftCount
TLB: `report_nft_count#439ad890 query_id:uint64 user:address nft_count:int257 = ReportNftCount`
Signature: `ReportNftCount{query_id:uint64,user:address,nft_count:int257}`

## Transfer
TLB: `transfer#5b3c1613 new_owner:address forward_amount:uint64 query_id:uint64 = Transfer`
Signature: `Transfer{new_owner:address,forward_amount:uint64,query_id:uint64}`

## BurnNFT
TLB: `burn_nft#a23f2d5a  = BurnNFT`
Signature: `BurnNFT{}`

## RequestNftCount
TLB: `request_nft_count#739b7a46 user:address nft_count:uint64 = RequestNftCount`
Signature: `RequestNftCount{user:address,nft_count:uint64}`

## OwnershipAssigned
TLB: `_ query_id:int257 prev_owner:address = OwnershipAssigned`
Signature: `OwnershipAssigned{query_id:int257,prev_owner:address}`

## ShipNFT$Data
TLB: `null`
Signature: `null`

# Get Methods
Total Get Methods: 1

## getShipData

# Error Codes
2: Stack underflow
3: Stack overflow
4: Integer overflow
5: Integer out of expected range
6: Invalid opcode
7: Type check error
8: Cell overflow
9: Cell underflow
10: Dictionary error
13: Out of gas error
32: Method ID not found
34: Action is invalid or not supported
37: Not enough TON
38: Not enough extra-currencies
128: Null reference exception
129: Invalid serialization prefix
130: Invalid incoming message
131: Constraints error
132: Access denied
133: Contract stopped
134: Invalid argument
135: Code of a contract was not found
136: Invalid address
137: Masterchain support is not enabled for this contract
23386: Not from collection
49280: not owner
54727: Not the owner

# Trait Inheritance Diagram

```mermaid
graph TD
ShipNFT
ShipNFT --> BaseTrait
```

# Contract Dependency Diagram

```mermaid
graph TD
ShipNFT
```