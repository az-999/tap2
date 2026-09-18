import { Address, beginCell, Cell, Dictionary, external, internal, MessageRelaxed, SendMode, StateInit, storeMessage, toNano } from "@ton/core";
import { mnemonicToPrivateKey } from "@ton/crypto";
import { TonClient4 } from "@ton/ton";
import { getEnv, OFFCHAIN_CONTENT_PREFIX } from "../utils/api";
import { HighloadWalletContractV2 } from "../output/wallet/HighloadWalletV2";
import { shipsConfig } from "../utils/ships";
import { Maybe } from "ton/dist/types";
import { marketComissionAddress } from "../utils/config";
import { MintParams, ShipsCollection } from "../output/wrappers/ShipsCollection";
import { moduleCode } from "../output/wrappers/Module.data";
import { shipsCollectionCode } from "../output/wrappers/ShipsCollection.data";
import { randomInt } from "crypto";

export const multiMint = async (client4: TonClient4, address: Address, to: Address, count: number) => {
    const mnemonic = getEnv('OWNER_CONTRACT_MNEMONIC').replaceAll('"', '');
    const keyPair = await mnemonicToPrivateKey(mnemonic.split(" "));
    const secretKey = keyPair.secretKey;
    const workchain = 0;
    const wallet = HighloadWalletContractV2.create({ workchain, publicKey: keyPair.publicKey, walletId: 0 });
    const walletContract = client4.open(wallet);
    let treasury = Address.parse(marketComissionAddress);

    const collection = ShipsCollection.createFromAddress(address);
    const contract = client4.open(collection);
    const collectionData = await contract.getCollectionData();
    const trustedAddr = Address.parse('EQCwF7-OQiHBxKePiBFOAWwzHDTFHkJR9likOqTYFQc08OmS');
    console.log("Collection Data: ", collectionData);

    const params: MintParams[] = [];
    let idx = collectionData.nextItemIndex;
    for (let i = 0; i < count; i++) {
        const id = randomInt(shipsConfig.items.length);
        const item = shipsConfig.items[id];
        if (!item) throw new Error("Unknown item id: " + id);

        const itemCell = beginCell().storeInt(OFFCHAIN_CONTENT_PREFIX, 8).storeStringRefTail(item.metadata).endCell();
        const content = await collection.createNftContent(to, itemCell, treasury);
        params.push({
            content,
            index: idx++,
            to,
            treasury: trustedAddr,
            queryId: BigInt(0),
            value: toNano("0.01"),
        })
    }
    
    const mintMsg = await collection.createMultiMintTxParams(BigInt(Date.now()), toNano("0.01"), params);
    const value = toNano("0.01") * BigInt(count) + toNano("0.02");

    const { body, queryId } = walletContract.createTransfer({
        secretKey,
        messages: [internal({
            to: mintMsg.to,
            value,
            body: mintMsg.body,
            bounce: false,
        })],
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