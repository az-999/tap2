import { Address, beginCell, external, internal, SendMode, storeMessage, toNano, TonClient4, WalletContractV4 } from "@ton/ton";
import { mnemonicToPrivateKey } from "ton-crypto";
import { HighloadWalletContractV2 } from "../output/wallet/HighloadWalletV2";
import * as ShipApi from "../output/ships/MM-NFT_ShipsCollection";

export const withdrawTON = async (client4: TonClient4, collection: string, dest: string, value: string) => {
    let mnemonic = (process.env.OWNER_CONTRACT_MNEMONIC || "").toString();
    let keyPair = await mnemonicToPrivateKey(mnemonic.split(" "));
    let secretKey = keyPair.secretKey;
    let workchain = 0;
    let wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
    const owner = HighloadWalletContractV2.create({ publicKey: keyPair.publicKey, workchain: 0, walletId: 0 });
    const walletContract = client4.open(owner);
    const { body, queryId } = walletContract.createTransfer({
        secretKey,
        messages: [internal({
            to: Address.parse(collection),
            body: beginCell().store(ShipApi.storeTransferTON({ $$type: 'TransferTON', to_address: Address.parse(dest), value: toNano(value) })).endCell(),
            value: "0.01",
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