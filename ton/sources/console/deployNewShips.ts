import { Address, beginCell, external, internal, SendMode, StateInit, storeMessage, toNano } from "@ton/core";
import { mnemonicToPrivateKey } from "@ton/crypto";
import { TonClient4 } from "@ton/ton";
import { getEnv, OFFCHAIN_CONTENT_PREFIX } from "../utils/api";
import { HighloadWalletContractV2 } from "../output/wallet/HighloadWalletV2";
import { shipsConfig } from "../utils/ships";
import { Maybe } from "ton/dist/types";
import { marketComissionAddress } from "../utils/config";
import { ShipsCollection } from "../output/wrappers/ShipsCollection";
import { moduleCode } from "../output/wrappers/Module.data";
import { shipsCollectionCode } from "../output/wrappers/ShipsCollection.data";

export const deployNewShipsCollection = async (client4: TonClient4, trustedAddress: Address, secondMinter: Address) => {
    console.log("Starting deployment...");
    const mnemonic = getEnv('OWNER_CONTRACT_MNEMONIC').replaceAll('"', '');
    console.log("Mnemonic retrieved.");
    const keyPair = await mnemonicToPrivateKey(mnemonic.split(" "));
    console.log("Key pair generated.");
    const secretKey = keyPair.secretKey;
    const workchain = 0;
    const wallet = HighloadWalletContractV2.create({ workchain, publicKey: keyPair.publicKey, walletId: 0 });
    console.log("Wallet created.");
    const walletContract = client4.open(wallet);
    console.log("Wallet contract opened.");
    let treasury = Address.parse(marketComissionAddress);
    const content = beginCell().storeInt(OFFCHAIN_CONTENT_PREFIX, 8).storeStringRefTail('\x01' + shipsConfig.metadata).endCell();
    console.log("Content cell created.");
    const collection = ShipsCollection.createFromConfig({
        content,
        item_code: moduleCode,
        owner: walletContract.address,
        royalty: {
            address: treasury,
            base: 1000n,
            factor: 50n
        },
        treasury: trustedAddress,
        secondMinter
    }, shipsCollectionCode, workchain);
    console.log("Collection created.");

    const deployMsg = await collection.createDeployTxParams(toNano("0.3"));
    console.log("Deploy message created.");
    const { body, queryId } = walletContract.createTransfer({
        secretKey,
        messages: [internal({
            to: collection.address,
            value: toNano("0.1"),
            init: deployMsg.init as Maybe<StateInit>,
            bounce: false,
        })],
        sendMode: SendMode.PAY_GAS_SEPARATELY,
        timeout: 10000,
    });
    console.log("Transfer created.");

    const sendMsg = external({
        to: walletContract.address,
        body,
    })

    const cell = beginCell().store(storeMessage(sendMsg)).endCell();
    const boc = cell.toBoc();
    await client4.sendMessage(boc);
    console.log("Message sent.");
    console.log("Collection address: ", collection.address.toString());

    console.log("Query ID: ", queryId);
    console.log("TxId: ", cell.hash().toString('hex'));
}