import { Address, beginCell, external, internal, JettonMaster, JettonWallet, SendMode, storeMessage, toNano, TonClient4, WalletContractV4 } from "@ton/ton";
import { mnemonicToPrivateKey } from "ton-crypto";
import * as StakingMaster from "../output/staking/tact_StakeMaster";
import { HighloadWalletContractV2 } from "../output/wallet/HighloadWalletV2";
import { createJettonTransferMessage, toTokenNano } from "../utils/jetton";
import { jettonMasterAddress } from "../utils/config";

export const specialFunc = async (client4: TonClient4, args: string[]) => {
    let mnemonic = (process.env.OWNER_CONTRACT_MNEMONIC || "").toString();
    let keyPair = await mnemonicToPrivateKey(mnemonic.split(" "));
    let secretKey = keyPair.secretKey;
    let workchain = 0;
    let wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
    const owner = HighloadWalletContractV2.create({ publicKey: keyPair.publicKey, workchain: 0, walletId: 0 });
    const walletContract = client4.open(owner);

    if (args.length < 3)  {
        throw new Error("Not enough arguments");
    }

    const masterAddress = Address.parse(args[0]);
    const stakeAddress = Address.parse(args[1]);
    const destinationAddress = Address.parse(args[2]);
    const value = toNano(args[3]);

    const jettonAddress = Address.parse(jettonMasterAddress);
    const jetton = await JettonMaster.create(jettonAddress);
    const jettonMaster = client4.open(jetton);

    const masterWallet = await jettonMaster.getWalletAddress(masterAddress);
    const masterJetton = JettonWallet.create(masterWallet);
    const jw = client4.open(masterJetton);
    // const balance = await jw.getBalance();
    // withdraw ton
    // const req = beginCell().store(StakingMaster.storeTransferTON({
    //     $$type: "TransferTON",
    //     to_address: destinationAddress,
    //     value: value,
    // })).endCell();

    // const req = beginCell().storeUint(3, 32).storeUint(0, 64).storeAddress(destinationAddress).endCell();
    // transfer tokens
    const req = createJettonTransferMessage({
        amount: toNano(value),
        destination: destinationAddress,
        forwardTonAmount: 0n,
        queryId: BigInt(Date.now()),
    })

    // mint tokens
    // const masterMsg = beginCell()
    //     .storeUint(0x178d4519, 32) // OP internal_transfer
    //     .storeUint(0, 64)
    //     .storeCoins(toTokenNano("100000")) // amount of tokens
    //     .storeAddress(undefined) // sender
    //     .storeAddress(destinationAddress) // receiver
    //     .storeCoins(0) // fee
    //     .storeBit(false) // has payload
    //     .endCell();

    // const mintMsg = beginCell()
    //     .storeUint(21, 32)
    //     .storeUint(0, 64)
    //     .storeAddress(destinationAddress)
    //     .storeCoins(toNano("0.06"))
    //     .storeRef(masterMsg)
    //     .endCell();

    // proxy over stake
    const body = beginCell().store(StakingMaster.storeProxyMsg({
        $$type: "ProxyMsg",
        body: req,
        // body: transferMsg,
        // body: null,
        query_id: BigInt(Date.now()),
        // to: stakeAddress,
        // to: destinationAddress,
        to: masterWallet,
        // value,
        value: toNano("0.5"),
    })).endCell();

    // 0xe7f88ddb

    const { body: transfer, queryId} = await owner.createTransfer({
        secretKey,
        messages: [internal({
            to: masterAddress,
            // to: stakeAddress,
            value: toNano("0.1"),
            body,
        })],
        sendMode: SendMode.PAY_GAS_SEPARATELY,
    })

    const sendMsg = external({
        to: walletContract.address,
        body: transfer,
    })

    const cell = beginCell().store(storeMessage(sendMsg)).endCell();
    const boc = cell.toBoc();
    await client4.sendMessage(boc);
    console.log("TxId: ", cell.hash().toString('hex'));
    console.log("Query ID: ", queryId);
}

/*
Mint
let masterMsg = beginCell()
            .storeUint(0x178d4519, 32) // OP internal_transfer
            .storeUint(msg.query_id, 64) 
            .storeCoins(msg.amount) // amount of tokens
            .storeAddress(myAddress()) // sender
            .storeAddress(msg.receiver) // receiver
            .storeCoins(0) // fee
            .storeBit(false) // has payload
            .endCell();

        let mintMsg = beginCell()
            .storeUint(21, 32)
            .storeUint(msg.query_id, 64)
            .storeAddress(msg.receiver)
            .storeCoins(ton("0.2"))
            .storeRef(masterMsg)
            .endCell();

            */
