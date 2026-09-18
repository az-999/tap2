import "@stdlib/deploy";
import "./messages.tact";

struct OwnershipAssigned {
    query_id: Int;
    prev_owner: Address;
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

        if (msg.forward_amount > 0) {
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
    }

    receive(msg: BurnNFT) {
        let ctx: Context = context();
        require(ctx.sender == self.owner!!|| ctx.sender == self.trusted_contract, "not owner");

        // Логика для деактивации NFT (сжигание)
        self.owner = null; // NFT больше не принадлежит пользователю
        self.is_initialized = false; // Деактивация NFT (сжигание)
    }

    get fun getShipData(): Int {
        return self.item_index
    }

}