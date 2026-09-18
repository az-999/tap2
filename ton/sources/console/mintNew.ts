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

export const mintNew = async (client4: TonClient4, address: Address, id: number, to: Address) => {
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
    const trustedAddr = Address.parse('UQA1ncIYvWqZ8Lba4diqFqbZ5hY0OL2QnkE3tIULrmFnELz2');
    console.log("Collection Data: ", collectionData);

    const item = shipsConfig.items[id];
    if (!item) throw new Error("Unknown item id: " + id);

    const itemCell = beginCell().storeInt(OFFCHAIN_CONTENT_PREFIX, 8).storeStringRefTail(item.metadata).endCell();

    const itemIndex = collectionData.nextItemIndex;
    const mintMsg = await collection.createMintTxParams({
        content: itemCell,
        index: itemIndex,
        to,
        treasury: trustedAddr,
        queryId: BigInt(Date.now()),
        value: toNano("0.01"),
    });

    const { body, queryId } = walletContract.createTransfer({
        secretKey,
        messages: [internal({
            to: mintMsg.to,
            value: toNano("0.02"),
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