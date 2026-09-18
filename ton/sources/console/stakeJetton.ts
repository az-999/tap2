import { Address, beginCell, contractAddress, external, internal, JettonMaster, JettonWallet, MessageRelaxed, SendMode, Slice, storeMessage, toNano, TonClient4, WalletContractV4 } from "@ton/ton";
import { mnemonicToPrivateKey, sign } from "ton-crypto";
import * as StakingMaster from "../output/staking/tact_StakeMaster";
import { createJettonTransferMessage, makeSnakeCell, toTokenNano } from "../utils/jetton";
import { jettonMasterAddress } from "../utils/config";

export const stakeJetton = async (client4: TonClient4, masterAddress: Address) => {
    let mnemonic = (process.env.OWNER_CONTRACT_MNEMONIC || "").toString();
    let keyPair = await mnemonicToPrivateKey(mnemonic.split(" "));
    let secretKey = keyPair.secretKey;
    let workchain = 0;
    let wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
    const walletContract = client4.open(wallet);

    const jettonAddress = Address.parse(jettonMasterAddress);
    const jetton = await JettonMaster.create(jettonAddress);
    const jettonMaster = client4.open(jetton);
    const jettonWalletAddress = await jettonMaster.getWalletAddress(wallet.address);
    console.log(jettonWalletAddress.toString({bounceable: false, testOnly: false, urlSafe: true}));


    const amount = toNano("100"),
            duration = BigInt(180), // 3m
            mint_count = BigInt(10),
            out_amount = toNano("1000"),
            query_id = BigInt(0),
            max_claims = BigInt(1);
    
    const hash = beginCell()
                    .storeUint(query_id, 64)
                    .storeUint(amount, 256)
                    .storeUint(out_amount, 256)
                    .storeUint(mint_count, 32)
                    .storeUint(duration, 32)
                    .storeUint(max_claims, 32)
                    .endCell().hash();

    const signature = sign(hash, secretKey);

    const src: StakingMaster.Deposit = {
        $$type: "Deposit",
        amount,
        duration,
        mint_count,
        out_amount,
        owner_address: wallet.address,
        query_id,
        signature: beginCell().storeBuffer(signature).endCell().asSlice(),
        max_claims
    }

    const body = createJettonTransferMessage({
        amount: amount,
        destination: masterAddress,
        forwardPayload: beginCell().storeRef(beginCell().store(StakingMaster.storeDeposit(src)).endCell()).endCell(),
        forwardTonAmount: toNano("0.06"),
        responseDestination: masterAddress,
        queryId: query_id
    })

    // const forwardPayload = beginCell().store(StakingMaster.storeDeposit()).endCell();
    // const body = beginCell().store(storeTokenTransfer({
    //     $$type: "TokenTransfer",
    //     amount: 1_000n,
    //     destination: masterAddress,
    //     forward_payload: beginCell().storeRef(beginCell().store(StakingMaster.storeDeposit(src)).endCell()).endCell().asSlice(),
    //     forward_ton_amount: toNano("0.4"),
    //     custom_payload: null,
    //     response_destination: masterAddress,
    //     queryId: 0n,
    // })).endCell();

    const seqno = await walletContract.getSeqno();
    const transfer = await wallet.createTransfer({
        secretKey,
        seqno,
        messages: [internal({
            to: jettonWalletAddress,
            value: toNano("0.1"),
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
