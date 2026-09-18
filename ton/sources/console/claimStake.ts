import { Address, beginCell, external, internal, JettonMaster, SendMode, storeMessage, toNano, TonClient4, WalletContractV4 } from "@ton/ton";
import { mnemonicToPrivateKey } from "ton-crypto";
import * as StakingMaster from "../output/staking/tact_StakeMaster";
import * as Stake from "../output/staking/tact_Stake";
import { sign } from "@ton/crypto";
import { jettonMasterAddress } from "../utils/config";

export const claimStake = async (client4: TonClient4, stakeAddress: Address) => {
    console.log("claimStake");
    let mnemonic = (process.env.OWNER_CONTRACT_MNEMONIC || "").toString();
    let keyPair = await mnemonicToPrivateKey(mnemonic.split(" "));
    let secretKey = keyPair.secretKey;
    let workchain = 0;
    let wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
    const walletContract = client4.open(wallet);

    const stake = Stake.Stake.fromAddress(stakeAddress);
    const stakeContract = client4.open(stake);
    const owner = await stakeContract.getGetOwnerAddress();
    const master = await stakeContract.getGetMasterAddress();
    
    const jettonAddress = Address.parse(jettonMasterAddress);
    const jetton = await JettonMaster.create(jettonAddress);
    const jettonMaster = client4.open(jetton);
    const masterWallet = await jettonMaster.getWalletAddress(master);

    const query_id = BigInt(Date.now());
    const hash = beginCell().
        storeUint(query_id, 64).
        storeAddress(owner).
        storeAddress(stakeAddress).
        storeAddress(masterWallet).
        endCell().hash();
    const signature = sign(hash, secretKey);

    const body = beginCell().store(StakingMaster.storeClaim({
        $$type: "Claim",
        query_id,
        owner_address: owner,
        signature: beginCell().storeBuffer(signature).endCell().asSlice(),
        wallet_address: masterWallet
    })).endCell();

    const value = await stakeContract.getGetRequiredValue() + toNano("0.05");

    const seqno = await walletContract.getSeqno();
    const transfer = await wallet.createTransfer({
        secretKey,
        seqno,
        messages: [internal({
            to: stakeAddress,
            value,
            body,
        })],
        sendMode: SendMode.PAY_GAS_SEPARATELY,
    })

    const sendMsg = external({
        to: wallet.address,
        body: transfer,
    })

    const cell = beginCell().store(storeMessage(sendMsg)).endCell();
    const boc = cell.toBoc();
    const result = await client4.sendMessage(boc);
    console.log("Status: ", result.status);
    console.log("TxId: ", cell.hash().toString('hex'));
}