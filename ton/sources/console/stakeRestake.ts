import { Address, beginCell, external, internal, SendMode, storeMessage, toNano, TonClient4, WalletContractV4 } from "@ton/ton";
import { mnemonicToPrivateKey } from "ton-crypto";
import * as StakingMaster from "../output/staking/tact_StakeMaster";
import * as Stake from "../output/staking/tact_Stake";
import { sign } from "@ton/crypto";

export const reStake = async (client4: TonClient4, stakeAddress: Address) => {
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

    const query_id = BigInt(Date.now());

    const body = beginCell().store(StakingMaster.storeRestake({
        $$type: "Restake",
        query_id,
    })).endCell();

    const seqno = await walletContract.getSeqno();
    const transfer = await wallet.createTransfer({
        secretKey,
        seqno,
        messages: [internal({
            to: stakeAddress,
            value: toNano("0.05"),
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
    await client4.sendMessage(boc);
    console.log("TxId: ", cell.hash().toString('hex'));
}