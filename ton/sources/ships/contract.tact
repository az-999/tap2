import "./message.tact";
const minTonsForStorage: Int = ton("0.02");
const gasConsumption: Int = ton("0.02");
const nftPrice:     Int = ton("0.05");

contract ShipsCollection {
    next_item_index: Int as uint32 = 0;
    owner_address: Address;
    royalty_params: RoyaltyParams?;                      
    collection_content: Cell;   
    collection_base: Cell;
    unique_nonce: Int;
    TOTAL_SUPPLY: Int;
    treasury_address: Address;
    second_minter_address: Address?;
    
    init(owner_address: Address, collection_content: Cell, collection_base: Cell, royalty_params: RoyaltyParams, unique_nonce: Int, TOTAL_SUPPLY: Int, treasury_address: Address){
        self.owner_address = owner_address;
        self.collection_content = collection_content; 
        self.royalty_params = royalty_params;
        self.unique_nonce = unique_nonce;
        self.collection_base = collection_base;
        self.TOTAL_SUPPLY = TOTAL_SUPPLY;
        self.treasury_address = treasury_address;
    }


    receive("Mint") {
        require(sender() == self.owner_address || sender() == self.second_minter_address, "Only owner can mint");
        
        let ctx: Context = context(); // get sender Info
        let msgValue: Int = ctx.value;
        require(msgValue >= ton("0.07"), "Price requirement is not met");
        let tonBalanceBeforeMsg: Int = myBalance() - msgValue;
        let storageFee: Int = minTonsForStorage - min(tonBalanceBeforeMsg, minTonsForStorage);
        msgValue = msgValue - (storageFee + gasConsumption);
        self.mint(sender(), msgValue, self.collection_content);
        emit(LogEventMintRecord{ minter: sender(), item_id: self.next_item_index, generate_number: nativeRandom() }.toCell());
    }

    receive(msg: SetSecondMinter) {
        require(sender() == self.owner_address, "Only owner can set second minter");
        self.second_minter_address = msg.new_second_minter_address;
    }

    receive(msg: TransferTON) {
        require(sender() == self.owner_address, "Only owner can withdraw");
        send(SendParameters{
            to: msg.to_address,
            value: msg.value,
            mode: 64, 
            bounce: false,
        });        
    }
  
    receive(msg: MintByOwner){
        require(sender() == self.owner_address || sender() == self.second_minter_address, "Only owner can mint");
//        require(self.next_item_index < self.TOTAL_SUPPLY, "Total supply reached");
        
        let ctx: Context = context(); // get sender Info
        let msgValue: Int = ctx.value;
        let tonBalanceBeforeMsg: Int = myBalance() - msgValue;
        let storageFee: Int = minTonsForStorage - min(tonBalanceBeforeMsg, minTonsForStorage);
        msgValue = msgValue - (storageFee + gasConsumption);
        self.mint(msg.mint_to, msgValue, msg.content);

        emit(LogEventMintRecord{ minter: sender(), item_id: self.next_item_index, generate_number: nativeRandom() }.toCell());
    }

    receive(msg: MintManyByOwner){
        require(sender() == self.owner_address || sender() == self.second_minter_address, "Only owner can mint");

        let ctx: Context = context(); // get sender Info
        let msgValue: Int = ctx.value;
        let tonBalanceBeforeMsg: Int = myBalance() - msgValue;
        let storageFee: Int = minTonsForStorage - min(tonBalanceBeforeMsg, minTonsForStorage);
        msgValue = msgValue - (storageFee + gasConsumption);
        require(msgValue >= msg.count * nftPrice, "Price requirement is not met");

        let i: Int = 0;
        while(i < msg.count) {
            let content: Cell = msg.contents.get(i)!!;
            self.mint(msg.mint_to, nftPrice, content);
            emit(LogEventMintRecord{ minter: sender(), item_id: self.next_item_index, generate_number: nativeRandom() }.toCell());
            i = i + 1;
        }
    }

    receive(msg: ChangeTreasury){
        require(sender() == self.owner_address, "Only owner can change treasury");
        self.treasury_address = msg.new_treasury;
    }


    receive(msg: ChangeOwner){
        require(sender() == self.owner_address, "Only owner can change owner");
        self.owner_address = msg.new_owner;
    }
  

    // ===== Private Methods ===== //
    fun mint(sender: Address, msgValue: Int, content: Cell) {
        require(self.next_item_index >= 0, "non-sequential NFTs");
        let nft_init: StateInit = self.getNftItemInit(self.next_item_index);
        send(SendParameters{
                to: contractAddress(nft_init), 
                value: msgValue, 
                bounce: false,
                mode: SendIgnoreErrors,
                body: Transfer {
                    query_id: 0,
                    new_owner: sender,
                    response_destination: self.treasury_address,
                    custom_payload: content,
                    forward_amount: 0,
                    forward_payload: emptySlice()
                }.toCell(),
                code: nft_init.code,
                data: nft_init.data
            });
        self.next_item_index = self.next_item_index + 1;
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
                numerator:  (self.royalty_params!!).numerator,
                denominator: (self.royalty_params!!).denominator,
                destination: self.owner_address
            }.toCell()
        });        
    }

    // ------------------ Get Function  ------------------ //
    get fun get_collection_data(): CollectionData {     
        let b: StringBuilder = beginString();
        let collectionDataString: String = self.collection_base.asSlice().asString();
        b.append(collectionDataString);
        return CollectionData{
            next_item_index: self.next_item_index, 
            collection_content: b.toCell(), 
            owner_address: self.owner_address
        };
    }

    get fun get_nft_address_by_index(item_index: Int): Address?{      
        let initCode: StateInit = self.getNftItemInit(item_index);
        return contractAddress(initCode);
    }

    get fun getNftItemInit(item_index: Int): StateInit {
        return initOf Module(myAddress(), item_index);
    }
    
    get fun get_nft_content(index: Int, individual_content: Cell): Cell { 
        let b: StringBuilder = beginString();
        let ic: String = individual_content.asSlice().asString();
        b.append(ic);
        return b.toCell();
    }

    get fun treasury(): Address {
        return self.treasury_address;
    }
    get fun owner(): Address {
        return self.owner_address;
    }
    get fun royalty_params(): RoyaltyParams {
        return self.royalty_params!!;
    }
}

contract Module {
    collection_address: Address;
    item_index: Int; 
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

    receive(msg: ChangeTrustedAddress){
        require(sender() == self.owner!! || sender() == self.trusted_address, "Only owner can change trusted address");
        self.trusted_address = msg.new_trusted_address;
    }

    fun msgValue(value: Int): Int {
        let tonBalanceBeforeMsg: Int = myBalance() - value;
        let storageFee: Int = minTonsForStorage - min(tonBalanceBeforeMsg, minTonsForStorage);
        return value - (storageFee + gasConsumption);
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
