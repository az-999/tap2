import { internal, SendMode, toNano, TonClient4, WalletContractV4 } from "@ton/ton";
import { mnemonicToPrivateKey } from "ton-crypto";
import { HighloadWalletContractV2 } from "../output/wallet/HighloadWalletV2";
import { must } from "../utils/retry";
import { getEnv } from "../utils/api";

export const higloadWalletDeploy = async (client: TonClient4) => {
    let mnemonic = (process.env.OWNER_CONTRACT_MNEMONIC || "").toString();
    let keyPair = await mnemonicToPrivateKey(mnemonic.split(" "));
    let secretKey = keyPair.secretKey;
    let workchain = 0;
    let wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
    let wallet_contract = client.open(wallet);

    const initData = HighloadWalletContractV2.create({
        workchain: 0,
        publicKey: keyPair.publicKey,
        walletId: 0
    });

    console.log("Address: ", wallet.address.toString({ testOnly: false, urlSafe: true, bounceable: false }), "Testnet: ", getEnv('NETWORK') === 'testnet');
    console.log("Calculated new contract address: ", initData.address.toString({ testOnly: false, urlSafe: true, bounceable: false }));

    const deployAmount = toNano("2");
    const seqno = await must(() => wallet_contract.getSeqno());

    await wallet_contract.sendTransfer({
        secretKey,
        seqno,
        sendMode: SendMode.PAY_GAS_SEPARATELY,
        messages:[internal({
            to: initData.address,
            value: deployAmount,
            init: initData.init,
        })]
    })
}