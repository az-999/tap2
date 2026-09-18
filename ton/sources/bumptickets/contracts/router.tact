import "@stdlib/deploy";
import "./messages.tact";

contract Router with Deployable {
    owner_address: Address;
    owner_pubkey: Int;

    referal_address: Address;
    prize_address: Address;
    main_address: Address;

    value: Int;
    refDivider: Divider = Divider{
        numerator: 1,
        denominator: 10
    };
    prizeDivider: Divider = Divider{
        numerator: 1,
        denominator: 100
    };

    init(owner_address: Address, owner_pubkey: Int, referal_address: Address, prize_address: Address, main_address: Address, value: Int) {
        self.owner_address = owner_address;
        self.owner_pubkey = owner_pubkey;
        self.referal_address = referal_address;
        self.prize_address = prize_address;
        self.main_address = main_address;
        self.value = value;
    }

    receive(msg: TransferOwnership) {
        require(sender() == self.owner_address, "Only owner can transfer");
        self.owner_address = msg.new_owner;
    }

    receive(msg: ProxyMsg) {
        require(sender() == self.owner_address, "Only owner can proxy message");
        send(SendParameters{
            to: msg.to, 
            mode: 64,
            value: msg.value, 
            body: msg.body,
            bounce: false,
        });        
    }

    receive(msg: SetMainAddress) {
        require(sender() == self.owner_address, "Only owner can set main address");
        self.main_address = msg.main_address;
    }

    receive(msg: SetPrizeAddress) {
        require(sender() == self.owner_address, "Only owner can set prize address");
        self.prize_address = msg.prize_address;
    }

    receive(msg: SetReferalAddress) {
        require(sender() == self.owner_address, "Only owner can set referal address");
        self.referal_address = msg.referal_address;
    }

    receive(msg: UpdatePublicKey) {
        require(sender() == self.owner_address, "Only owner can update public key");
        self.owner_pubkey = msg.new_public_key;
    }

    receive(msg: UpdateValue) {
        require(sender() == self.owner_address, "Only owner can set value");
        self.value = msg.new_value;
    }

    receive(msg: SetDividors) {
        require(sender() == self.owner_address, "Only owner can set dividors");
        self.refDivider = msg.ref_divider;
        self.prizeDivider = msg.prize_divider;
    }

    receive(msg: Deposit) {
        let ctx = context();
        let msgValue: Int = ctx.value;
        require(msgValue == self.value, "Price requirement is not met");
        let validate = beginCell()
            .storeUint(msg.query_id, 64)
            .storeUint(msg.value, 256)
            .endCell().hash();
        
        let signature_valid = checkSignature(validate, msg.signature, self.owner_pubkey);
        require(signature_valid, "Invalid signature");

        let refValue: Int = (msgValue * self.refDivider.numerator) / self.refDivider.denominator;
        let prizeValue: Int = (msgValue * self.prizeDivider.numerator) / self.prizeDivider.denominator;
        let mainValue: Int = msgValue - refValue - prizeValue;
        send(SendParameters{
            to: self.referal_address,
            value: refValue,
            bounce: false,
        });
        send(SendParameters{
            to: self.prize_address,
            value: prizeValue,
            bounce: false,
        });
        send(SendParameters{
            to: self.main_address,
            value: mainValue,
            bounce: false,
        });
    }

    receive() {
        require(sender() == self.owner_address, "Only owner can deposit");
    }

    get fun getMainAddress(): Address {
        return self.main_address;
    }

    get fun getPrizeAddress(): Address {
        return self.prize_address;
    }

    get fun getReferalAddress(): Address {
        return self.referal_address;
    }

    get fun getValue(): Int {
        return self.value;
    }

    get fun getRefDivider(): Divider {
        return self.refDivider;
    }

    get fun getPrizeDivider(): Divider {
        return self.prizeDivider;
    }
}
