import "@stdlib/deploy";
import "./messages.tact";


const minTonsForStorage: Int = ton("0.02");
const gasConsumption: Int = ton("0.02");


contract ShipAssembler with Deployable {
    is_pausable: Bool = false;
    owner_address: Address;
    treasury_address: Address;
    highload_address: Address;
    owner_public_key: Int;
    nft_counter: Int = 0;
    collection_metadata: Cell; 
    nft_item_metadata: Cell;
    royalty_params: RoyaltyParams;   

    init(owner_address: Address, treasury_address: Address, highload_address: Address, royalty_params: RoyaltyParams, 
            owner_public_key: Int, collection_metadata: Cell, nft_item_metadata: Cell) {
        self.owner_address = owner_address;
        self.highload_address = highload_address;
        self.treasury_address = treasury_address;
        self.royalty_params = royalty_params;
        self.owner_public_key = owner_public_key;
        self.collection_metadata = collection_metadata; 
        self.nft_item_metadata = nft_item_metadata; 
    }

    receive(msg: AssembleShipMessage) {
        require(!self.is_pausable, "Mint is on pause");
        let ctx: Context = context(); // get sender Info
        let msgValue: Int = ctx.value;
        let user = sender();

        let initialBalance: Int = myBalance();

        let signature_valid = self.verifySignature(msg.ship_level, msg.signature);
        require(signature_valid, "Invalid signature");

        self.burnNFT(msg.nft_contract_1);
        self.burnNFT(msg.nft_contract_2);
        self.burnNFT(msg.nft_contract_3);
        self.burnNFT(msg.nft_contract_4);
        self.burnNFT(msg.nft_contract_5);
        self.burnNFT(msg.nft_contract_6);

        let royaltyParams: RoyaltyParams = self.royalty_params; 
        let royaltyAmount: Int = (msgValue * royaltyParams.numerator) / royaltyParams.denominator;

        if (royaltyAmount > 0) {
            send(SendParameters{
                to: royaltyParams.destination,
                value: royaltyAmount,
                bounce: true,
                body: null
            });
        }

        let finalBalance: Int = myBalance();

        let mintValue = ton("0.1");

        let ship_content: Cell = self.nft_item_metadata;
        self.mint(user, mintValue, ship_content, msg.ship_level);

    }

    receive(msg: UpgradeShip) {
        require(!self.is_pausable, "Mint is on pause");
        let ctx: Context = context(); // get sender Info
        let msgValue: Int = ctx.value;
        let user = sender();

        let signature_valid = self.verifySignature(msg.ship_level, msg.signature);
        require(signature_valid, "Invalid signature");

        self.burnNFT(msg.nft_contract_1);
        self.burnNFT(msg.nft_contract_2);
        self.burnNFT(msg.nft_contract_3);
        self.burnNFT(msg.nft_contract_4);
        self.burnNFT(msg.nft_contract_5);
        self.burnNFT(msg.nft_contract_6);
        self.burnNFT(msg.nft_contract_7);

        let royaltyParams: RoyaltyParams = self.royalty_params; 
        let royaltyAmount: Int = (msgValue * royaltyParams.numerator) / royaltyParams.denominator;

        if (royaltyAmount > 0) {
            send(SendParameters{
                to: royaltyParams.destination,
                value: royaltyAmount,
                bounce: true,
                body: null
            });
        }

        let mintValue = ton("0.1");

        let ship_content: Cell = msg.ship_content;
        self.mint(user, mintValue, ship_content, msg.ship_level);

    }

    receive(msg: MintNFT) {
        require(sender() == self.owner_address, "Only owner can mint");
        require(!self.is_pausable, "Mint is on pause");
        let ctx: Context = context(); // get sender Info
        let msgValue: Int = ctx.value;
        require(msgValue >= ton("0.05"), "Price requirement is not met");
        let tonBalanceBeforeMsg: Int = myBalance() - msgValue;
        let storageFee: Int = minTonsForStorage - min(tonBalanceBeforeMsg, minTonsForStorage);
        msgValue = msgValue - (storageFee + gasConsumption);
        let ship_content: Cell = self.nft_item_metadata; 

        self.mint(sender(), msgValue, ship_content, msg.ship_level);
    } 

    receive(msg: UpdatePublicKey) {
        require(sender() == self.owner_address, "Only the owner can update the public key");

        self.owner_public_key = msg.new_public_key;
    }

    receive(msg: WithdrawFunds) {
        require(sender() == self.owner_address, "Only the owner can withdraw funds");
        let ctx: Context = context(); 
        let user = sender();

        let currentBalance: Int = myBalance();

        let availableBalance: Int = currentBalance - (minTonsForStorage + gasConsumption);

        require(availableBalance > 0, "No funds available for withdrawal");

        send(SendParameters{
            to: self.owner_address,
            value: availableBalance,
            bounce: false,
            body: WithdrawalConfirmation{
                query_id: msg.query_id,
                amount: availableBalance
            }.toCell()
        });
    }

    receive(msg: Excesses) {
        let ctx: Context = context();

        let msgValue: Int = self.msgValue(ctx.value) - ctx.readForwardFee();

        if (msgValue > 0) {
            send(SendParameters{
                to: self.highload_address,
                value: msgValue,
                bounce: false,
                body: null 
            });
        }
    }

    receive(msg: ChangeHighload){
        require(sender() == self.owner_address, "Only owner can change");
        self.highload_address = msg.highload_address;
    }

    receive(msg: ChangeTreasury){
        require(sender() == self.owner_address, "Only owner can change");
        self.treasury_address = msg.treasury_address;
    }

    receive(msg: ChangeRoyaltyParams){
        require(sender() == self.owner_address, "Only owner can change");
        self.royalty_params.numerator = msg.numerator;
        self.royalty_params.denominator = msg.denominator;
        self.royalty_params.destination = msg.destination;
    }

    receive(msg: SetPause){
        require(sender() == self.owner_address, "Only owner can change");
        self.is_pausable = msg.is_pausable;
    }

    receive(msg: GetRoyaltyParams) {   
        let ctx: Context = context(); // get sender Info
        send(SendParameters{
            to: ctx.sender,
            value: 0,
            mode: 64, 
            bounce: false,
            body: ReportRoyaltyParams {
                query_id: msg.query_id,
                numerator:  self.royalty_params.numerator,
                denominator: self.royalty_params.denominator,
                destination: self.royalty_params.destination
            }.toCell()
        });        
    }

    fun msgValue(value: Int): Int {
        let tonBalanceBeforeMsg: Int = myBalance() - value;
        let storageFee: Int = minTonsForStorage - min(tonBalanceBeforeMsg, minTonsForStorage);
        return value - (storageFee + gasConsumption);
    }

    fun verifySignature(ship_level: Int, signature: Slice): Bool {
        let hash: Int = beginCell().storeUint(ship_level, 256).endCell().hash();
        return checkSignature(hash, signature, self.owner_public_key);
    }

    fun burnNFT(nft_contract: Address) {
        send(SendParameters{
            to: nft_contract,
            value: ton("0.05"),
            bounce: true,
            body: Destroy{
                query_id: self.nft_counter,
            }.toCell()
        });
    }

    fun mint(sender: Address, msgValue: Int, content: Cell, ship_level: Int){
        self.nft_counter = self.nft_counter + 1;
        let nft_init: StateInit = self.getNftItemInit(self.nft_counter);
        send(SendParameters{
            to: contractAddress(nft_init),
            value: msgValue,
            bounce: false,
            body: Transfer {
                query_id: ship_level,
                new_owner: sender,
                response_destination: myAddress(),
                custom_payload: content,
                forward_amount: 0,
                forward_payload: emptySlice()
            }.toCell(),
            code: nft_init.code,
            data: nft_init.data
        }); 
    }

    get fun getNftItemInit(item_index: Int): StateInit {
        return initOf ShipNFT(myAddress(), item_index);
    }

    get fun getOwner(): Address {
        return self.owner_address;
    }

    get fun get_nft_address_by_index(item_index: Int): Address?{      
        let initCode: StateInit = self.getNftItemInit(item_index);
        return contractAddress(initCode);
    }

    get fun get_nft_content(index: Int, individual_content: Cell): Cell { 
        let b: StringBuilder = beginString();
        let ic: String = individual_content.asSlice().asString();
        b.append(ic);
        return b.toCell();
    }

    get fun get_collection_data(): CollectionData {     
        let b: StringBuilder = beginString();
        let collectionDataString: String = self.collection_metadata.asSlice().asString();
        b.append(collectionDataString);
        return CollectionData{
            next_item_index: self.nft_counter, 
            collection_content: self.collection_metadata, 
            owner_address: self.owner_address
        };
    }

    receive() {
    }
}


contract ShipNFT {
    collection_address: Address;
    item_index: Int;
    ship_level: Int?; 
    is_initialized: Bool;
    trusted_address: Address?;

    owner: Address?;
    individual_content: Cell?;

    init(collection_address: Address, item_index: Int){
        require(sender() == collection_address, "not from collection");
        self.collection_address = collection_address;
        self.item_index = item_index;
        self.is_initialized = false;
    }    

    receive(msg: Destroy) {
        let ctx: Context = context(); 
        require(ctx.sender == self.owner || ctx.sender == self.trusted_address!!, "not owner");

        self.owner = null;
        self.is_initialized = false;

        send(SendParameters{
            to: ctx.sender,
            value: 0,
            mode: 64,  // (return msg amount except gas fees) 
            bounce: true,
            body: Excesses { query_id: msg.query_id }.toCell()
        });
    }

    receive(msg: Transfer){
        let ctx: Context = context();
        let msgValue: Int = self.msgValue(ctx.value);

        if (self.is_initialized == false) {  // Initial Transfer, aka the "Minting" of the NFT
            require(ctx.sender == self.collection_address, "initialized tx need from collection");
            self.trusted_address = msg.response_destination!!;
            self.ship_level = msg.query_id;
            self.is_initialized = true;
            self.owner = msg.new_owner;
            self.individual_content = msg.custom_payload;  // Use the same metadata URL
            send(SendParameters{
                to: msg.response_destination!!,
                value: msgValue,
                mode: SendPayGasSeparately,
                body: Excesses { query_id: msg.query_id }.toCell()
            });
        } else {
            require(ctx.sender == self.owner!!, "not owner");
            self.owner = msg.new_owner;  // change current owner to the new_owner
            if (msg.forward_amount > 0) {
                send(SendParameters{
                    to: msg.new_owner,
                    value: msg.forward_amount,
                    mode: SendPayGasSeparately, 
                    bounce: true,
                    body: OwnershipAssigned{
                        query_id: msg.query_id,
                        prev_owner: ctx.sender,
                        forward_payload: msg.forward_payload
                    }.toCell()
                }); 
            }

            msgValue = msgValue - ctx.readForwardFee(); 
            if (msg.response_destination != null) { 
                send(SendParameters{ 
                    to: msg.response_destination!!,
                    value: msgValue - msg.forward_amount,
                    mode: SendPayGasSeparately,
                    bounce: true,
                    body: Excesses { query_id: msg.query_id }.toCell()
                });
            } 
        }
    }

    receive(msg: GetStaticData){ 
        let ctx: Context = context();
        send(SendParameters {
            to: ctx.sender,
            value: 0,
            mode: 64,  // (return msg amount except gas fees) 
            bounce: true,
            body: ReportStaticData{
                query_id: msg.query_id,
                index_id: self.item_index,
                collection: self.collection_address
            }.toCell()
        });
    }

    receive(msg: ChangeTrusted){
        require(sender() == self.owner, "Only the owner");
        self.trusted_address = msg.trusted_address;
    }

    fun msgValue(value: Int): Int {
        let tonBalanceBeforeMsg: Int = myBalance() - value;
        let storageFee: Int = minTonsForStorage - min(tonBalanceBeforeMsg, minTonsForStorage);
        return value - (storageFee + gasConsumption);
    }

    get fun get_ship_level(): Int? {
        return self.ship_level;
    }

    get fun get_nft_data(): GetNftData {
        return GetNftData {
            is_initialized: self.is_initialized, 
            index: self.item_index, 
            collection_address: self.collection_address, 
            owner_address: self.owner!!,
            individual_content: self.individual_content!!  // Return the same metadata URL
        };
    }
}

