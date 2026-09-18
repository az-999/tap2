import { mnemonicToPrivateKey } from "@ton/crypto";
import { Address, beginCell, external, internal, SendMode, storeMessage, toNano, TonClient4, WalletContractV4 } from "@ton/ton";
import { HighloadWalletContractV2 } from "../output/wallet/HighloadWalletV2";
import { shipsConfig } from "../utils/ships";
import { OFFCHAIN_CONTENT_PREFIX } from "../utils/api";
import * as ShipApi from "../output/ships/MM-NFT_ShipsCollection";

export const nftIssueShipTest = async (client: TonClient4, itemId: number, receiverAddress: Address) => {
    let mnemonic = (process.env.OWNER_CONTRACT_MNEMONIC || "").toString();
    let keyPair = await mnemonicToPrivateKey(mnemonic.split(" "));
    let secretKey = keyPair.secretKey;
    let workchain = 0;
    let wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
    let wallet_contract = client.open(wallet);

    // Parameters
    const collectionAddress = Address.parse(shipsConfig.address);
    const item = shipsConfig.items[itemId];
    if (!item) throw new Error("Unknown item id: " + itemId);

    const itemCell = beginCell().storeInt(OFFCHAIN_CONTENT_PREFIX, 8).storeStringRefTail(item.metadata).endCell();
    // const contract = await ShipApi.ShipsCollection.fromAddress(collectionAddress);
    const msg: ShipApi.MintByOwner = {
        $$type: "MintByOwner",
        mint_to: receiverAddress,
        content: itemCell,
    }

    const args = beginCell().store(ShipApi.storeMintByOwner(msg)).endCell();
    const message = internal({
        to: collectionAddress,
        value: toNano('0.1'),
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