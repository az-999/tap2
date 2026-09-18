import { mnemonicToPrivateKey } from "@ton/crypto";
import { Address, beginCell, external, internal, SendMode, storeMessage, toNano, TonClient4, WalletContractV4 } from "@ton/ton";
import { MintByOwner, storeMintByOwner, VoucherCollection } from "../output/MM-NFT_VoucherCollection";
import { HighloadWalletContractV2 } from "../output/wallet/HighloadWalletV2";


export const nftIssueHighloadTest = async (client: TonClient4, collectionAddress: Address, receiverAddress: Address) => {
    let mnemonic = (process.env.OWNER_CONTRACT_MNEMONIC || "").toString();
    let keyPair = await mnemonicToPrivateKey(mnemonic.split(" "));
    let secretKey = keyPair.secretKey;
    let workchain = 0;
    let wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
    let wallet_contract = client.open(wallet);

    // Parameters
    const contract = await VoucherCollection.fromAddress(collectionAddress);
    const msg: MintByOwner = {
        $$type: "MintByOwner",
        mint_to: receiverAddress,
    }

    const args = beginCell().store(storeMintByOwner(msg)).endCell();
    const message = internal({
        to: collectionAddress,
        value: toNano('0.3'),
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