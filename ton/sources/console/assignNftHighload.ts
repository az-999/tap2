import { Address, beginCell, external, internal, SendMode, storeMessage, toNano, TonClient4, WalletContractV4 } from "@ton/ton";
import { mnemonicToPrivateKey } from "ton-crypto";
import { VoucherCollection } from "../output/MM-NFT_VoucherCollection";
import { HighloadWalletContractV2 } from "../output/wallet/HighloadWalletV2";
import * as ShipApi from "../output/ships/MM-NFT_ShipsCollection";

export const nftAssignHighload = async (client: TonClient4, address: Address, newOwner: Address) => {
    let mnemonic = (process.env.OWNER_CONTRACT_MNEMONIC || "").toString();
    let keyPair = await mnemonicToPrivateKey(mnemonic.split(" "));
    let secretKey = keyPair.secretKey;
    let workchain = 0;
    let wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
    let wallet_contract = client.open(wallet);

    // Parameters
    const contract = await VoucherCollection.fromAddress(address);
    const client_open = client.open(contract);
    const msg: ShipApi.ChangeOwner = {
        $$type: "ChangeOwner",
        new_owner: newOwner,
    }
    // await client_open.send(wallet_contract.sender(secretKey), { value: toNano(0.05), bounce: false }, msg);
    const owner = HighloadWalletContractV2.create({ publicKey: keyPair.publicKey, workchain: 0, walletId: 0 });
    const walletContract = client.open(owner);

    const { body, queryId } = walletContract.createTransfer({
        secretKey,
        messages: [internal({
            to: address,
            value: toNano('0.3'),
            body: beginCell().store(ShipApi.storeChangeOwner(msg)).endCell()
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
    await client.sendMessage(boc);

    console.log("Query ID: ", queryId);
    console.log("TxId: ", cell.hash().toString('hex'));
}