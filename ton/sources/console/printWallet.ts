import { mnemonicToPrivateKey } from "@ton/crypto";
import { TonClient4, WalletContractV4 } from "@ton/ton";

export const printWallet = async (client4: TonClient4) => {
    let mnemonic = (process.env.OWNER_CONTRACT_MNEMONIC || "").toString();
    let keyPair = await mnemonicToPrivateKey(mnemonic.split(" "));
    let secretKey = keyPair.secretKey;
    let workchain = 0;
    let wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });

    console.log(wallet.address.toString({bounceable: false, testOnly: false, urlSafe: true}));
}