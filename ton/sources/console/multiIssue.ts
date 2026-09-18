import { Address, beginCell, Builder, external, internal, MessageRelaxed, SendMode, storeMessage, toNano, TonClient4, WalletContractV4 } from "@ton/ton";
import { mnemonicToPrivateKey } from "ton-crypto";
import { HighloadWalletContractV2 } from "../output/wallet/HighloadWalletV2";
import { issueQueue } from "../utils/temp";
import { getCollectionInfo } from "../utils/config";
import { ogpassConfig, qweCollection } from "../utils/ships";
import * as ShipApi from "../output/ships/MM-NFT_ShipsCollection";
import { OFFCHAIN_CONTENT_PREFIX } from "../utils/api";

export const multiIssue = async (client4: TonClient4) => {
    let mnemonic = (process.env.OWNER_CONTRACT_MNEMONIC || "").toString();
    let keyPair = await mnemonicToPrivateKey(mnemonic.split(" "));
    let secretKey = keyPair.secretKey;
    let workchain = 0;
    let wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
    let wallet_contract = client4.open(wallet);
    if (issueQueue.length == 0) {
        console.log("Nothing to issue");
        return;
    }

    const ogpassAddr = Address.parse(ogpassConfig.address);
    const itemCell =  beginCell().storeInt(OFFCHAIN_CONTENT_PREFIX, 8).storeStringRefTail(ogpassConfig.item).endCell();
    let txns = issueQueue.map(item => {
        console.log(`Add: ${item}`);
        return internal({
            value: toNano('0.3'),
            to: ogpassAddr,
            body: beginCell().store(storeMintByOwner({
                $$type: "MintByOwner",
                content:itemCell,
                mint_to: Address.parse(item)
            })).endCell()
        })
    })

    // Parameters
    const owner = HighloadWalletContractV2.create({ publicKey: keyPair.publicKey, workchain: 0, walletId: 0 });
    const walletContract = client4.open(owner);
    const { body, queryId } = walletContract.createTransfer({
        secretKey,
        messages: txns.filter(tx => tx !== undefined && tx !== null) as MessageRelaxed[],
        sendMode: SendMode.PAY_GAS_SEPARATELY,
        timeout: 10000,
    });

    
    const sendMsg = external({
        to: walletContract.address,
        body,
    })

    const cell = beginCell().store(storeMessage(sendMsg)).endCell();
    const boc = cell.toBoc();
    await client4.sendMessage(boc);

    console.log("Query ID: ", queryId);
    console.log("TxId: ", cell.hash().toString('hex'));
}

function storeMintByOwner(src: ShipApi.MintByOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(361614260, 32); // ogpass mint by owner code
        b_0.storeAddress(src.mint_to);
        b_0.storeRef(src.content);
    };
}