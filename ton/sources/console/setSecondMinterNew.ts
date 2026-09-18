import { Address, beginCell, external, internal, SendMode, storeMessage, toNano, TonClient4, WalletContractV4 } from "@ton/ton";
import { mnemonicToPrivateKey } from "ton-crypto";
import { HighloadWalletContractV2 } from "../output/wallet/HighloadWalletV2";
import { Opcodes } from "../output/wrappers/common";

export const setSecondMinterNew = async (client: TonClient4, address: Address, secondMinter: Address) => {
    let mnemonic = (process.env.OWNER_CONTRACT_MNEMONIC || "").toString();
    let keyPair = await mnemonicToPrivateKey(mnemonic.split(" "));
    let secretKey = keyPair.secretKey;

    // Parameters
    const msg = beginCell()
                    .storeUint(Opcodes.SetSecondMinter, 32)
                    .storeUint(BigInt(Date.now()), 64)
                    .storeAddress(secondMinter)
                    .endCell();
    // await client_open.send(wallet_contract.sender(secretKey), { value: toNano(0.05), bounce: false }, msg);
    const owner = HighloadWalletContractV2.create({ publicKey: keyPair.publicKey, workchain: 0, walletId: 0 });
    const walletContract = client.open(owner);

    const { body, queryId } = walletContract.createTransfer({
        secretKey,
        messages: [internal({
            to: address,
            value: toNano('0.02'),
            body: msg,
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