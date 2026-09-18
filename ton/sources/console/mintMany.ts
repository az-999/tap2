import { mnemonicToPrivateKey } from "@ton/crypto";
import { Address, beginCell, Cell, Dictionary, external, internal, SendMode, storeMessage, toNano, TonClient4, WalletContractV4 } from "@ton/ton";
import { HighloadWalletContractV2 } from "../output/wallet/HighloadWalletV2";
import { shipsConfig } from "../utils/ships";
import { OFFCHAIN_CONTENT_PREFIX } from "../utils/api";
import * as ShipApi from "../output/ships/MM-NFT_ShipsCollection";
import { randomInt } from "crypto";

export const nftIssueShipMulti = async (client: TonClient4, count: number, receiverAddress: Address) => {
    let mnemonic = (process.env.OWNER_CONTRACT_MNEMONIC || "").toString();
    let keyPair = await mnemonicToPrivateKey(mnemonic.split(" "));
    let secretKey = keyPair.secretKey;

    // Parameters
    const collectionAddress = Address.parse(shipsConfig.address);
    // const contract = await ShipApi.ShipsCollection.fromAddress(collectionAddress);

    let metadatas = Dictionary.empty<bigint, Cell>();
    for (let i = 0; i < count; i++) {
        const n = randomInt(0, shipsConfig.items.length - 1);
        const item = shipsConfig.items[n];
        metadatas = metadatas.set(BigInt(i), beginCell().storeInt(OFFCHAIN_CONTENT_PREFIX, 8).storeStringRefTail(item.metadata).endCell());
    }

    console.log(metadatas, count);
    const msg: ShipApi.MintManyByOwner = {
        $$type: "MintManyByOwner",
        mint_to: receiverAddress,
        contents: metadatas,
        count: BigInt(count),
    }

    const value = toNano('0.07') * BigInt(count) + toNano('0.04');

    const args = beginCell().store(ShipApi.storeMintManyByOwner(msg)).endCell();
    const message = internal({
        to: collectionAddress,
        value,
        body: args
    })
    const owner = HighloadWalletContractV2.create({ publicKey: keyPair.publicKey, workchain: 0, walletId: 0 });
    const walletContract = client.open(owner);
    const { body, queryId } = walletContract.createTransfer({
        secretKey,
        messages: [message],
        sendMode: SendMode.PAY_GAS_SEPARATELY,
        timeout: 10000,
    });

    
    const sendMsg = external({
        to: walletContract.address,
        body,
    })

    const cell = beginCell().store(storeMessage(sendMsg)).endCell();
    const boc = cell.toBoc();
    await client.sendMessage(boc);

    console.log("Query ID: ", queryId);
    console.log("TxId: ", cell.hash().toString('hex'));
}