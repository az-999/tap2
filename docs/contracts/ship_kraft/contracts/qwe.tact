import "@stdlib/deploy";
import "./messages.tact";


const minTonsForStorage: Int = ton("0.02");
const gasConsumption: Int = ton("0.02");


contract Qwes with Deployable {
    owner_address: Address;
    collection_address: Address;
    owner_public_key: Int;
    nft_counter: Int = 0;
    collection_metadata: Cell; 
    nft_item_metadata: Cell; 

    init(owner_address: Address, collection_address: Address, owner_public_key: Int, collection_metadata: Cell, nft_item_metadata: Cell) {
        self.owner_address = owner_address;
        self.collection_address = collection_address;
        self.owner_public_key = owner_public_key;
        self.collection_metadata = collection_metadata; 
        self.nft_item_metadata = nft_item_metadata; 
    }

    receive(msg: AssembleShipMessage) {
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

        let ship_content: Cell = self.collection_metadata;
        self.mintShip(user, msgValue, ship_content,msg.ship_level);

    }

    receive(msg: UpgradeShip) {
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

        let ship_content: Cell = self.collection_metadata;
        self.mintShip(user, msgValue, ship_content,msg.ship_level);

    }

    receive(msg: MintNFT) {
        let ctx: Context = context(); // get sender Info
        let msgValue: Int = ctx.value;
        require(msgValue >= ton("0.05"), "Price requirement is not met");
        let tonBalanceBeforeMsg: Int = myBalance() - msgValue;
        let storageFee: Int = minTonsForStorage - min(tonBalanceBeforeMsg, minTonsForStorage);
        msgValue = msgValue - (storageFee + gasConsumption);
        let ship_content: Cell = self.collection_metadata; 

        self.mintShip(sender(), msgValue, ship_content, msg.ship_level);
    } 

    receive(msg: VerifySingle){
        let verified: Bool = self.verifySignature(msg.ship_level, msg.signature);
        require(verified, "Invalid signature");
    }

    receive(msg: BurnSingle){
        self.burnNFT(msg.nft_contract);
    }

    receive(msg: UpdatePublicKey) {
        let ctx: Context = context(); 
        let user = sender();

        require(user == self.owner_address, "Only the owner can update the public key");

        self.owner_public_key = msg.new_public_key;
    }

    receive(msg: WithdrawFunds) {
        let ctx: Context = context(); 
        let user = sender();

        require(user == self.owner_address, "Only the owner can withdraw funds");

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

    fun verifySignature(ship_level: Int, signature: Slice): Bool {

        let hash: Int = beginCell().storeUint(ship_level, 256).endCell().hash();

        return checkSignature(hash, signature, self.owner_public_key);
    }

    fun burnNFT(nft_contract: Address) {
        send(SendParameters{
            to: nft_contract,
            value: ton("0.05"),
            bounce: true,
            body: BurnNFT{
            }.toCell()
        });
    }

    fun mintShip(sender: Address, msgValue: Int, content: Cell, ship_level: Int){

        let nft_init: StateInit = self.getNewNftItemInit(ship_level);
        send(SendParameters{
            to: contractAddress(nft_init),
            value: ton("0.1"),
            bounce: false,
            body: Transfer {
                new_owner: sender,
                forward_amount: ton("0.05"),
                query_id: 1
            }.toCell(),
            code: nft_init.code,
            data: nft_init.data
        });
    }

    get fun getNewNftItemInit(item_index: Int): StateInit {
        let contract_address = myAddress(); 
        let ship_content = beginCell().endCell();
        return initOf ShipNFT(contract_address, item_index, myAddress(), ship_content);
    }

    get fun getOwner(): Address {
        return self.owner_address;
    }

    receive() {
    }
}



contract ShipNFT {
    collection_address: Address;
    trusted_contract: Address;
    item_index: Int;
    is_initialized: Bool;
    owner: Address?;
    content: Cell?;

    init(collection_address: Address, item_index: Int, owner: Address, content: Cell) {
        require(sender() == collection_address, "Not from collection");
        self.collection_address = collection_address;
        self.trusted_contract = collection_address;
        self.item_index = item_index;
        self.is_initialized = true;
        self.owner = owner;
        self.content = content;
    }

    receive(msg: Transfer) {
        let ctx: Context = context();
        require(ctx.sender == self.owner!!, "Not the owner");

        self.owner = msg.new_owner;

        send(SendParameters{
            to: msg.new_owner,
            value: msg.forward_amount,
            bounce: true,
            body: OwnershipAssigned{
                query_id: msg.query_id,
                prev_owner: ctx.sender
            }.toCell()
        });
    }

    receive(msg: BurnNFT) {
        let ctx: Context = context();
        require(ctx.sender == self.owner!! || ctx.sender == self.trusted_contract, "Not owner");

        self.owner = null; 
        self.is_initialized = false; 


        send(SendParameters{
            to: self.trusted_contract,
            value: ton("0.01"),
            bounce: false,
            body: OwnershipAssigned{
                query_id: 0,
                prev_owner: ctx.sender
            }.toCell()
        });
    }

    // Получение текущего владельца NFT
    get fun getOwner(): Address? {
        return self.owner;
    }

    get fun isInitialized(): Bool {
        return self.is_initialized;
    }

    get fun getContent(): Cell? {
        return self.content;
    }

    get fun getItemIndex(): Int {
        return self.item_index;
    }

    get fun get_nft_data(): GetNftData {
        return GetNftData {
            is_initialized: self.is_initialized, 
            index: self.item_index, 
            collection_address: self.collection_address, 
            owner_address: self.owner!!,
            individual_content: self.content!!  // Return the same metadata URL
        };
    }

}

