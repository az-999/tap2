import { Address, beginCell, contractAddress, external, internal, MessageRelaxed, SendMode, storeMessage, toNano, TonClient4, WalletContractV4 } from "@ton/ton";
import { mnemonicToPrivateKey } from "ton-crypto";
import { HighloadWalletContractV2 } from "../output/wallet/HighloadWalletV2";
import * as StakingMaster from "../output/staking/tact_StakeMaster";
import { getShipMetadataAsMap } from "../utils/ships";
import { storeTokenTransfer } from "../output/jetton/tact_MMPROJetton";
import { JettonDefaultWallet } from "../output/jetton/tact_JettonDefaultWallet";

export const testStake = async (client4: TonClient4, jettonAddress:  Address, masterAddress: Address) => {
    let mnemonic = (process.env.OWNER_CONTRACT_MNEMONIC || "").toString();
    let keyPair = await mnemonicToPrivateKey(mnemonic.split(" "));
    let secretKey = keyPair.secretKey;
    let workchain = 0;
    let wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
    // const owner = HighloadWalletContractV2.create({ publicKey: keyPair.publicKey, workchain: 0, walletId: 0 });
    const walletContract = client4.open(wallet);
    const seqno = await walletContract.getSeqno();

    const transfer = await wallet.createTransfer({
        secretKey,
        seqno,
        messages: [internal({
            to: jettonAddress,
            value: toNano("0.1"),
            body: beginCell().store(storeTokenTransfer({
                $$type: "TokenTransfer",
                amount: toNano("0.1"),
                destination: masterAddress,
                forward_payload: beginCell().store(StakingMaster.storeDeposit({
                    $$type: "Deposit",
                    amount: toNano("100"),
                    duration: BigInt(100),
                    mint_count: BigInt(1),
                    out_amount: toNano("100"),
                    owner_address: wallet.address,
                    query_id: BigInt(0)
                })).endCell().asSlice(),
                forward_ton_amount: toNano("0.1"),
                custom_payload: null,
                response_destination: wallet.address,
                queryId: BigInt(0),
            })).endCell(),
        })],
        sendMode: SendMode.PAY_GAS_SEPARATELY,
        timeout: 10000,
    })

    const sendMsg = external({
        to: walletContract.address,
        body: transfer,
    })

    const cell = beginCell().store(storeMessage(sendMsg)).endCell();
    const boc = cell.toBoc();
    await client4.sendMessage(boc);

    // console.log("Query ID: ", queryId);
    console.log("TxId: ", cell.hash().toString('hex'));
}