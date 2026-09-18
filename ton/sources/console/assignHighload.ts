import { mnemonicToPrivateKey } from "@ton/crypto";
import { Address, toNano, TonClient4, WalletContractV4 } from "@ton/ton";
import { ChangeOwner, VoucherCollection } from "../output/MM-NFT_VoucherCollection";

export const assignToHighload = async (client: TonClient4, address: Address, newOwner: Address) => {
    let mnemonic = (process.env.OWNER_CONTRACT_MNEMONIC || "").toString();
    let keyPair = await mnemonicToPrivateKey(mnemonic.split(" "));
    let secretKey = keyPair.secretKey;
    let workchain = 0;
    let wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
    let wallet_contract = client.open(wallet);

    // Parameters
    const contract = await VoucherCollection.fromAddress(address);
    const client_open = client.open(contract);
    const msg: ChangeOwner = {
        $$type: "ChangeOwner",
        new_owner: newOwner,
    }
    await client_open.send(wallet_contract.sender(secretKey), { value: toNano(0.05), bounce: false }, msg);
}