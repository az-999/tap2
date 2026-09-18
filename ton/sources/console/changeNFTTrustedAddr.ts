import { Address, beginCell, external, internal, SendMode, storeMessage, toNano, TonClient4, WalletContractV4 } from "@ton/ton";
import { mnemonicToPrivateKey } from "ton-crypto";
import { HighloadWalletContractV2 } from "../output/wallet/HighloadWalletV2";
import * as ShipApi from "../output/ships/MM-NFT_ShipsCollection";


export const changeNFTTrustedAddress = async (client: TonClient4, nftAddress: string, trustedAddress: string) => {
    let mnemonic = (process.env.OWNER_CONTRACT_MNEMONIC || "").toString();
    let keyPair = await mnemonicToPrivateKey(mnemonic.split(" "));
    let secretKey = keyPair.secretKey;
    let workchain = 0;
    let wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
    let wallet_contract = client.open(wallet);

    const hw = HighloadWalletContractV2.create({
        workchain: 0,
        publicKey: keyPair.publicKey,
        walletId: 0
    });

    const intMsg = internal({
        value: toNano("0.03"),
        to: nftAddress,
        body: beginCell().store(ShipApi.storeChangeTrustedAddress({
            $$type: "ChangeTrustedAddress",
            new_trusted_address: Address.parse(trustedAddress),
        })).endCell(),
        bounce: true,
    })

    const hwallet = client.open(hw);
    const { body, queryId } = hwallet.createTransfer({
        secretKey,
        messages: [intMsg],
        sendMode: SendMode.PAY_GAS_SEPARATELY,
        timeout: 10000,
    });

    
    const sendMsg = external({
        to: hwallet.address,
        body,
    })

    const cell = beginCell().store(storeMessage(sendMsg)).endCell();
    const boc = cell.toBoc();
    await client.sendMessage(boc);

    console.log("Query ID: ", queryId);
    console.log("TxId: ", cell.hash().toString('hex'));
}