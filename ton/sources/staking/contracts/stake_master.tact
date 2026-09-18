import "@stdlib/deploy";

import "./messages.tact";
const minTonsForStorage: Int = ton("0.02");
const gasConsumption: Int = ton("0.02");
const tonForMintNft: Int = ton("0.01");
const tonForMintNftSend: Int = ton("0.011");
const tonForMintWithFee: Int = ton("0.0125");

@name(udict_set)
native mapSet(dest: Cell, key_len: Int, index: Int, value: Slice): Cell;

@name(new_dict)
native newMap(): Cell;

contract StakeMaster {
    owner_address: Address;
    owner_pubkey: Int;
    nft_address: Address;
    jetton_address: Address;
    fee_address: Address;
    metadata: map<Int, Cell>;
    next_stake_id: Int = 0;
    treasury: Address;
    old_stakes: map<Int, Cell>;  
    version: Int;

    init(
        owner_address: Address, 
        owner_pubkey: Int,
        jetton_address: Address,
        nft_address: Address,
        metadata: map<Int, Cell>,
        fee_address: Address,
        treasury: Address,
        version: Int
    ){
        self.owner_address = owner_address;
        self.jetton_address = jetton_address;
        self.metadata = metadata;
        self.owner_pubkey = owner_pubkey;
        self.fee_address = fee_address;
        self.nft_address = nft_address;
        self.treasury = treasury;
        self.version = version;
        self.old_stakes = emptyMap();
    }

    receive(msg: Deposit) {
        let ctx: Context = context();
        let msgValue: Int = ctx.value;
        require(msgValue >= tonForMintNft * msg.mint_count, "Price requirement is not met");
        require(sender() == self.owner_address, "Only owner can deposit");
        let tonBalanceBeforeMsg: Int = myBalance() - msgValue;
        let storageFee: Int = minTonsForStorage - min(tonBalanceBeforeMsg, minTonsForStorage);
        msgValue = msgValue - (storageFee + gasConsumption);
        
        self.deposit(msg, msgValue, self.jetton_address);
    }


    fun deposit(msg: Deposit, value: Int, burnAddress: Address) {
        let validate: Int = beginCell()
            .storeUint(msg.query_id, 64)
            .storeUint(msg.amount, 256)
            .storeUint(msg.out_amount, 256)
            .storeUint(msg.mint_count, 32)
            .storeUint(msg.duration, 32)
            .storeUint(msg.max_claims, 32)
            .endCell().hash();

        let signature_valid: Bool = checkSignature(validate, msg.signature, self.owner_pubkey);
        require(signature_valid, "Invalid signature");

        let stateInit: StateInit = self.getStakeStateInit(msg);
        let stateInitAddress: Address = contractAddress(stateInit);

        send(SendParameters{
            to: stateInitAddress,
            value: value,
            mode: SendIgnoreErrors,
            bounce: false,
            code: stateInit.code,
            data: stateInit.data
        });

        self.next_stake_id = self.next_stake_id + 1;
    }

    receive(msg: DoMint) {
        require(sender() == msg.sender, "Invalid sender");

        let validate: Int = beginCell()
            .storeUint(msg.query_id, 64)
            .storeAddress(msg.receiver)
            .storeAddress(msg.sender)
            .storeAddress(msg.wallet_address)
            .endCell().hash();

        let signature_valid: Bool = checkSignature(validate, msg.signature, self.owner_pubkey);
        require(signature_valid, "Invalid signature");

        let ctx: Context = context();
        let msgValue: Int = ctx.value;
        let requiredForMint: Int = (msg.mint_count * tonForMintNftSend);
        require(msgValue >= requiredForMint, "Not enough value");
        
        if (msg.mint_count > 0) {
            let i: Int = 0;
            let mintDict: Cell = newMap();
            while (i < msg.mint_count) {
                let index: Int = random(0, 6);
                let metadata: Cell = self.metadata.get(index)!!;
                
                // build mint cell
                let nftContentCell: Cell = beginCell()
                    .storeAddress(msg.receiver)
                    .storeRef(metadata)
                    .storeAddress(self.treasury)
                    .endCell();
                
                let itemCell: Cell = beginCell()
                    .storeCoins(tonForMintNft)
                    .storeRef(nftContentCell)
                    .endCell();

                mintDict = mapSet(mintDict, 64, i, itemCell.asSlice());
                i = i + 1;
            }

            if (mintDict != emptyCell()) {
                let mintMsg: Cell = beginCell()
                .storeUint(0x2, 32)
                .storeUint(msg.query_id, 64)
                .storeRef(mintDict)
                .endCell();

                let mintValue: Int = tonForMintNftSend * msg.mint_count + ton("0.05");
                send(SendParameters{
                    to: self.nft_address, 
                    value: mintValue, 
                    mode: SendPayGasSeparately, 
                    bounce: false, 
                    body: mintMsg
                });
                msgValue = msgValue - mintValue;
            }
        }

        let transferMsg: Cell = beginCell()
            .storeUint(0xf8a7ea5, 32) // OP transfer
            .storeUint(msg.query_id, 64) 
            .storeCoins(msg.amount) // amount of tokens
            .storeAddress(msg.receiver) // receiver
            .storeUint(0, 2) // response destination
            .storeBool(false) // custom payload
            .storeCoins(0) // forward ton amount
            .storeBool(false) // forward payload
            .endCell();

        send(SendParameters{
            to: msg.wallet_address, 
            value: ton("0.05"), 
            mode: SendPayGasSeparately, 
            bounce: false, 
            body: transferMsg
        });

        msgValue = msgValue - (minTonsForStorage + gasConsumption) - ton("0.05") - ctx.readForwardFee();
        let balance: Int = myBalance();
        if (balance < msgValue) {
            msgValue = 0;
        }
        if (msgValue > 0) {
            send(SendParameters{
                to: self.fee_address, 
                value: msgValue,
                mode: SendIgnoreErrors, 
                bounce: false,
                body: Claimed { query_id: msg.query_id }.toCell()
            });
        }
    }

    receive(msg: TokenExcesses) {
        let ctx: Context = context();
        let msgValue: Int = ctx.value;
        send(SendParameters{
            to: self.owner_address,
            value: msgValue,
            mode: SendIgnoreErrors,
            bounce: false,
            body: msg.toCell(),
        });
    }

    receive(msg: TokenNotification) {
        let ctx: Context = context();
        let msgValue: Int = ctx.value;
        let depositMsg: Deposit = Deposit.fromCell(msg.forward_payload.loadRef().beginParse().loadRef());

        depositMsg.owner_address = msg.from;
        depositMsg.amount = msg.amount;
        self.deposit(depositMsg, msgValue - (minTonsForStorage + gasConsumption), ctx.sender);
    }



    get fun getStakeStateInit(msg: Deposit): StateInit {
        let selfAddr: Address = myAddress();
        return initOf Stake(
            self.next_stake_id,
            selfAddr,
            msg.owner_address,
            self.fee_address,
            msg.amount,
            msg.out_amount,
            msg.duration,
            msg.mint_count,
            self.metadata,
            msg.max_claims
        );
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

    receive(msg: UpdateFeeAddress) {
        require(sender() == self.owner_address, "Only owner can update fee address");
        self.fee_address = msg.new_fee_address;
    }

    receive(msg: UpdateNftAddress) {
        require(sender() == self.owner_address, "Only owner can update nft address");
        self.nft_address = msg.new_nft_address;
    }

    receive(msg: UpdateJettonAddress) {
        require(sender() == self.owner_address, "Only owner can update jetton address");
        self.jetton_address = msg.new_jetton_address;
    }

    receive(msg: TransferOwnership) {
        require(sender() == self.owner_address, "Only owner can transfer ownership");
        self.owner_address = msg.new_owner;
    }

    receive() {
        require(sender() == self.owner_address, "Only owner can store TONs");
    }

    get fun getJettonAddress(): Address {
        return self.jetton_address;
    }

    get fun getMetadata(): map<Int, Cell> {
        return self.metadata;
    }

    get fun getFeeAddress(): Address {
        return self.fee_address;
    }

    get fun getNftAddress(): Address {
        return self.nft_address;
    }

    get fun getOwnerAddress(): Address {
        return self.owner_address;
    }

    get fun getOwnerPubkey(): Int {
        return self.owner_pubkey;
    }

    get fun nextStakeId(): Int {
        return self.next_stake_id;
    }

    receive(msg: AddOldStakeRecord) {
        require(sender() == self.owner_address, "Not owner");
        
        // Создаем запись стейка
        let record: OldStakeRecord = OldStakeRecord{
            stake_amount: msg.stake_amount,
            out_amount: msg.out_amount,
            mint_count: msg.mint_count,
            max_claims: msg.max_claims,
            claims_count: msg.claims_count,
            stake_time: msg.stake_time,
            created_at: msg.created_at,
            next_claim: msg.next_claim,
            last_claim: msg.last_claim,
            end_time: msg.end_time,
            wallet_address: msg.wallet_address
        };

        // Сохраняем запись в словарь
        let stake_cell: Cell = beginCell()
            .storeUint(msg.stake_id, 64)
            .storeAddress(msg.user_address)
            .storeCoins(record.stake_amount)
            .storeCoins(record.out_amount)
            .storeUint(record.mint_count, 8)
            .storeUint(record.max_claims, 32)
            .storeUint(record.claims_count, 32)
            .storeUint(record.stake_time, 32)
            .storeUint(record.created_at, 32)
            .storeUint(record.next_claim, 32)
            .storeUint(record.last_claim, 32)
            .storeUint(record.end_time, 32)
            .storeAddress(record.wallet_address)
            .endCell();

        self.old_stakes.set(msg.stake_id, stake_cell);
    }

    receive(msg: ClaimOldStake) {
        let ctx: Context = context();
        let msgValue: Int = ctx.value;
        
        // Получаем запись стейка
        let stake_cell: Cell? = self.old_stakes.get(msg.stake_id);
        require(stake_cell != null, "Stake not found");
        
        let sc: Slice = stake_cell!!.beginParse();
        let stake_id: Int = sc.loadUint(64);
        let user_address: Address = sc.loadAddress();
        
        // Проверяем что это стейк отправителя (как в DoMint)
        require(sender() == user_address, "Invalid sender");
        
        // Проверяем подпись
        let validate: Int = beginCell()
            .storeUint(msg.query_id, 64)
            .storeUint(msg.stake_id, 64)
            .storeAddress(sender())
            .storeAddress(msg.wallet_address)
            .endCell().hash();
            
        let signature_valid: Bool = checkSignature(validate, msg.signature, self.owner_pubkey);
        require(signature_valid, "Invalid signature");
        
        let record: OldStakeRecord = OldStakeRecord{
            stake_amount: sc.loadCoins(),
            out_amount: sc.loadCoins(),
            mint_count: sc.loadUint(8),
            max_claims: sc.loadUint(32),
            claims_count: sc.loadUint(32),
            stake_time: sc.loadUint(32),
            created_at: sc.loadUint(32),
            next_claim: sc.loadUint(32),
            last_claim: sc.loadUint(32),
            end_time: sc.loadUint(32),
            wallet_address: sc.loadAddress()
        };
            
        // Проверки в том же порядке как в Claim
        require(record.next_claim < now(), "Early withdrawal");
        require(record.claims_count < record.max_claims, "Max claims reached");

        // Проверка достаточности средств для минтинга как в Claim
        let requiredForMint: Int = (record.mint_count * tonForMintWithFee) + minTonsForStorage + gasConsumption + ton("0.05");
        require(msgValue >= requiredForMint, "Not enough balance");
        
        // Расчет комиссий как в Claim
        let fees: Int = msgValue - requiredForMint;
        if (fees < 0) {
            fees = 0;
        }

        // Отправляем ревард через transfer как в DoMint
        let transferMsg: Cell = beginCell()
            .storeUint(0xf8a7ea5, 32) // OP transfer
            .storeUint(msg.query_id, 64)
            .storeCoins(record.out_amount)
            .storeAddress(record.wallet_address)  // Используем TON адрес из записи стейка как получателя
            .storeUint(0, 2) // response destination
            .storeBool(false) // custom payload
            .storeCoins(0) // forward ton amount
            .storeBool(false) // forward payload
            .endCell();

        send(SendParameters{
            to: msg.wallet_address,
            value: ton("0.05"),
            mode: SendPayGasSeparately,
            bounce: false,
            body: transferMsg
        });

        // Минтим NFT при каждом клейме
        if (record.mint_count > 0) {
            let mintDict: Cell = newMap();
            let i: Int = 0;
            while (i < record.mint_count) {
                let index: Int = random(0, 6);
                let metadata: Cell = self.metadata.get(index)!!;
                
                // build mint cell
                let nftContentCell: Cell = beginCell()
                    .storeAddress(sender())
                    .storeRef(metadata)
                    .storeAddress(self.treasury)
                    .endCell();
                
                let itemCell: Cell = beginCell()
                    .storeCoins(tonForMintNft)
                    .storeRef(nftContentCell)
                    .endCell();

                mintDict = mapSet(mintDict, 64, i, itemCell.asSlice());
                i = i + 1;
            }

            let mintMsg: Cell = beginCell()
                .storeUint(0x2, 32)
                .storeUint(msg.query_id, 64)
                .storeRef(mintDict)
                .endCell();

            let mintValue: Int = tonForMintNftSend * record.mint_count + ton("0.05");
            send(SendParameters{
                to: self.nft_address, 
                value: mintValue, 
                mode: SendPayGasSeparately, 
                bounce: false, 
                body: mintMsg
            });
            msgValue = msgValue - mintValue;
        }
        
        // Отправляем остаток газа и комиссии как в Claim
        msgValue = msgValue - (minTonsForStorage + gasConsumption) - ctx.readForwardFee();
        if (msgValue > 0) {
            send(SendParameters{
                to: self.fee_address, 
                value: msgValue,
                mode: SendIgnoreErrors, 
                bounce: false,
                body: Claimed { query_id: msg.query_id }.toCell()
            });
        }
        
        // Обновляем состояние стейка после всех отправок как в Claim
        record.claims_count = record.claims_count + 1;
        record.next_claim = record.next_claim + record.stake_time;
        
        // Сохраняем обновленную запись
        let updated_cell: Cell = beginCell()
            .storeUint(msg.stake_id, 64)
            .storeAddress(sender())
            .storeCoins(record.stake_amount)
            .storeCoins(record.out_amount)
            .storeUint(record.mint_count, 8)
            .storeUint(record.max_claims, 32)
            .storeUint(record.claims_count, 32)
            .storeUint(record.stake_time, 32)
            .storeUint(record.created_at, 32)
            .storeUint(record.next_claim, 32)
            .storeUint(record.last_claim, 32)
            .storeUint(record.end_time, 32)
            .storeAddress(record.wallet_address)
            .endCell();
            
        self.old_stakes.set(msg.stake_id, updated_cell);
    }

    receive(msg: RestakeOldStake) {
        let sender: Address = context().sender;
        
        // Получаем запись стейка
        let stake_cell: Cell? = self.old_stakes.get(msg.stake_id);
        require(stake_cell != null, "Stake not found");
        
        let sc: Slice = stake_cell!!.beginParse();
        let stake_id: Int = sc.loadUint(64);
        let user_address: Address = sc.loadAddress();
        
        // Проверяем что это стейк отправителя
        require(user_address == sender(), "Only owner can restake");
        
        let record: OldStakeRecord = OldStakeRecord{
            stake_amount: sc.loadCoins(),
            out_amount: sc.loadCoins(),
            mint_count: sc.loadUint(8),
            max_claims: sc.loadUint(32),
            claims_count: sc.loadUint(32),
            stake_time: sc.loadUint(32),
            created_at: sc.loadUint(32),
            next_claim: sc.loadUint(32),
            last_claim: sc.loadUint(32),
            end_time: sc.loadUint(32),
            wallet_address: sc.loadAddress()
        };
            
        require(record.claims_count >= record.max_claims, "Not enough claims");

        // Рестарт стейка
        record.claims_count = 0;
        record.next_claim = now() + record.stake_time;
        
        // Сохраняем обновленную запись
        let updated_cell: Cell = beginCell()
            .storeUint(msg.stake_id, 64)
            .storeAddress(sender())
            .storeCoins(record.stake_amount)
            .storeCoins(record.out_amount)
            .storeUint(record.mint_count, 8)
            .storeUint(record.max_claims, 32)
            .storeUint(record.claims_count, 32)
            .storeUint(record.stake_time, 32)
            .storeUint(record.created_at, 32)
            .storeUint(record.next_claim, 32)
            .storeUint(record.last_claim, 32)
            .storeUint(record.end_time, 32)
            .storeAddress(record.wallet_address)
            .endCell();
            
        self.old_stakes.set(msg.stake_id, updated_cell);
    }

    receive(msg: WithdrawOldStake) {
        let ctx: Context = context();
        let sender: Address = ctx.sender;
        
        let validate: Int = beginCell()
            .storeUint(msg.query_id, 64)
            .storeAddress(sender())
            .storeAddress(msg.wallet_address)
            .endCell().hash();
            
        let signature_valid: Bool = checkSignature(validate, msg.signature, self.owner_pubkey);
        require(signature_valid, "Invalid signature");
        
        // Получаем запись стейка
        let stake_cell: Cell? = self.old_stakes.get(msg.stake_id);
        require(stake_cell != null, "Stake not found");
        
        let sc: Slice = stake_cell!!.beginParse();
        let stake_id: Int = sc.loadUint(64);
        let user_address: Address = sc.loadAddress();
        
        // Проверяем что это стейк отправителя
        require(user_address == sender(), "Only owner can withdraw");
        
        let record: OldStakeRecord = OldStakeRecord{
            stake_amount: sc.loadCoins(),
            out_amount: sc.loadCoins(),
            mint_count: sc.loadUint(8),
            max_claims: sc.loadUint(32),
            claims_count: sc.loadUint(32),
            stake_time: sc.loadUint(32),
            created_at: sc.loadUint(32),
            next_claim: sc.loadUint(32),
            last_claim: sc.loadUint(32),
            end_time: sc.loadUint(32),
            wallet_address: sc.loadAddress()
        };
            
        require(record.claims_count >= record.max_claims, "Not enough claims");

        // Отправляем токены обратно через transfer как в ClaimOldStake
        let transferMsg: Cell = beginCell()
            .storeUint(0xf8a7ea5, 32) // OP transfer
            .storeUint(msg.query_id, 64)
            .storeCoins(record.stake_amount)
            .storeAddress(record.wallet_address)
            .storeUint(0, 2) // response destination
            .storeBool(false) // custom payload
            .storeCoins(0) // forward ton amount
            .storeBool(false) // forward payload
            .endCell();

        send(SendParameters{
            to: msg.wallet_address,
            value: ton("0.05"),
            mode: SendPayGasSeparately,
            bounce: false,
            body: transferMsg
        });

        // Удаляем запись стейка
        self.old_stakes.set(msg.stake_id, null);
    }

    get fun get_old_stake_record(stake_id: Int, user_address: Address): OldStakeRecord? {
        let stake_cell: Cell? = self.old_stakes.get(stake_id);
        if (stake_cell == null) {
            return null;
        }
        
        let sc: Slice = stake_cell!!.beginParse();
        let stored_stake_id: Int = sc.loadUint(64);
        let stored_user_address: Address = sc.loadAddress();
        
        // Проверяем что это запрашиваемый стейк
        if (stored_stake_id != stake_id || stored_user_address != user_address) {
            return null;
        }
        
        return OldStakeRecord{
            stake_amount: sc.loadCoins(),
            out_amount: sc.loadCoins(),
            mint_count: sc.loadUint(8),
            max_claims: sc.loadUint(32),
            claims_count: sc.loadUint(32),
            stake_time: sc.loadUint(32),
            created_at: sc.loadUint(32),
            next_claim: sc.loadUint(32),
            last_claim: sc.loadUint(32),
            end_time: sc.loadUint(32),
            wallet_address: sc.loadAddress()
        };
    }
}

contract Stake {
    id: Int;
    is_active: Bool = true;
    master_address: Address;
    owner_address: Address;
    fee_address: Address;
    amount: Int;
    out_amount: Int;
    created_at: Int;
    stake_time: Int;
    next_claim: Int;
    mint_count: Int;
    max_claims: Int;
    claims_count: Int = 0;
    
    init(
        id: Int,
        master_address: Address, 
        owner_address: Address, 
        fee_address: Address,
        amount: Int, 
        out_amount: Int,
        stake_time: Int, 
        mint_count: Int,
        metadata: map<Int, Cell>,
        max_claims: Int
    ){
        self.id = id;
        self.fee_address = fee_address;
        self.master_address = master_address;
        self.owner_address = owner_address;
        self.amount = amount;
        self.out_amount = out_amount;
        self.created_at = now();
        self.stake_time = stake_time;
        self.mint_count = mint_count;
        self.max_claims = max_claims;
        self.next_claim = self.created_at + self.stake_time;
    }

    receive(msg: Claim) {
        require(self.is_active, "Stake is not active");
        require(sender() == self.master_address || sender() == self.owner_address, "Only master can withdraw");
        require(self.next_claim < now(), "Early withdrawal");
        require(self.claims_count < self.max_claims, "Max claims reached");

        let ctx: Context = context();
        let msgValue: Int = ctx.value;
        let requiredForMint: Int = (self.mint_count * tonForMintWithFee) + minTonsForStorage + gasConsumption + ton("0.05");
        require(msgValue >= requiredForMint, "Not enough balance");
        
        let fees: Int = msgValue - requiredForMint;
        if (fees < 0) {
            fees = 0;
        }

        send(SendParameters{
            to: self.master_address,
            value: self.msgValue(msgValue),
            mode: SendPayGasSeparately,
            bounce: false,
            body: DoMint { 
                query_id: msg.query_id,
                amount: self.out_amount, 
                mint_count: self.mint_count,
                receiver: self.owner_address,
                sender: myAddress(),
                signature: msg.signature,
                wallet_address: msg.wallet_address,
                fees: fees
            }.toCell()
        });

        self.claims_count = self.claims_count + 1;
        self.next_claim = self.next_claim + self.stake_time;
    }

    receive(msg: Restake) {
        require(self.is_active, "Stake is not active");
        require(sender() == self.owner_address, "Only owner can restake");
        require(self.claims_count >= self.max_claims, "Not enough claims");

        self.claims_count = 0;
        self.next_claim = now() + self.stake_time;
    }

    receive(msg: Withdraw) {
        require(self.is_active, "Stake is not active");
        require(sender() == self.owner_address, "Only owner can withdraw");
        require(self.claims_count >= self.max_claims, "Not enough claims");
        
        self.is_active = false;
        send(SendParameters{
            to: self.master_address,
            value: minTonsForStorage + gasConsumption,
            mode: SendIgnoreErrors,
            bounce: false,
            body: DoMint{
                query_id: msg.query_id,
                amount: self.amount,
                mint_count: 0,
                receiver: self.owner_address,
                sender: myAddress(),
                signature: msg.signature,
                wallet_address: msg.wallet_address,
                fees: 0
            }.toCell()
        });

        send(SendParameters{
            to: self.fee_address,
            value: 0,
            mode: SendRemainingBalance | SendDestroyIfZero,
            bounce: false,
            body: Released{ query_id: msg.query_id }.toCell(),
        });
    }

    receive(msg: TransferTON) {
        require(sender() == self.master_address, "Only owner can withdraw");
        send(SendParameters{
            to: msg.to_address,
            value: msg.value,
            mode: 64, 
            bounce: false,
        });        
    }

    receive(msg: ProxyMsg) {
        require(sender() == self.master_address, "Only master contract can proxy message");
        send(SendParameters{
            to: msg.to, 
            mode: 64,
            value: msg.value, 
            body: msg.body,
            bounce: false,
        });
    }

    receive() {
        require(sender() == self.master_address, "Only master contract can store TONs");
        require(self.is_active, "Stake is not active");
    }

    fun msgValue(value: Int): Int {
        let tonBalanceBeforeMsg: Int = myBalance() - value;
        let storageFee: Int = minTonsForStorage - min(tonBalanceBeforeMsg, minTonsForStorage);
        return value - (storageFee + gasConsumption);
    }

    get fun getAmount(): Int {
        return self.amount;
    }

    get fun getOutAmount(): Int {
        return self.out_amount;
    }

    get fun getCreatedAt(): Int {
        return self.created_at;
    }

    get fun getStakeTime(): Int {
        return self.stake_time;
    }

    get fun getNextClaim(): Int {
        return self.next_claim;
    }

    get fun getMintCount(): Int {
        return self.mint_count;
    }

    get fun getMasterAddress(): Address {
        return self.master_address;
    }

    get fun getOwnerAddress(): Address {
        return self.owner_address;
    }

    get fun getMaxClaims(): Int {
        return self.max_claims;
    }

    get fun getClaimsCount(): Int {
        return self.claims_count;
    }

    get fun getRequiredValue(): Int {
        return (self.mint_count * tonForMintWithFee) + minTonsForStorage + gasConsumption + ton("0.05");
    }

    get fun getId(): Int {
        return self.id;
    }
}
