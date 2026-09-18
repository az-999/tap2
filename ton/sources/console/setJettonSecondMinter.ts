import { mnemonicToPrivateKey } from "@ton/crypto";
import { Address, beginCell, contractAddress, external, internal, JettonMaster, SendMode, storeMessage, toNano, TonClient4, WalletContractV4 } from "@ton/ton";
import { HighloadWalletContractV2 } from "../output/wallet/HighloadWalletV2";
import { buildOnchainMetadata } from "../utils/jetton";
import { Mint, MMPROJetton, SetSecondMinter, storeMint, storeSetSecondMinter } from "../output/jetton/tact_MMPROJetton";

const jettonMetadata = {
    name: 'Market Making Pro',
    description: 'The Future of SocialFi Trading and Investment!',
    symbol: 'MMPRO',
    image: 'https://thin-white-cobra.myfilebase.com/ipfs/QmNiXxGCSkd5KP9g3UpSRCdVo1eBEX2LRueYXmxNG14abd',
}

export const jettonSetSecondMinter = async (client: TonClient4, masterAddress: Address, secondMinter: Address) => {
    let mnemonic = (process.env.OWNER_CONTRACT_MNEMONIC || "").toString();
    let keyPair = await mnemonicToPrivateKey(mnemonic.split(" "));
    let secretKey = keyPair.secretKey;
    let workchain = 0;
    let wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });

    const hw = HighloadWalletContractV2.create({
        workchain: 0,
        publicKey: keyPair.publicKey,
        walletId: 0
    });

    const setMinterMsg = beginCell().storeUint(3, 32).storeUint(0, 64).storeAddress(secondMinter).endCell();

    const hwallet = client.open(hw);
    const { body, queryId } = hwallet.createTransfer({
        secretKey,
        messages: [internal({
            to: masterAddress,
            value: toNano('0.03'),
            body: setMinterMsg,
            bounce: true,
        })],
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