import { mnemonicToPrivateKey } from "@ton/crypto";
import { Address, beginCell, contractAddress, external, internal, JettonMaster, SendMode, storeMessage, toNano, TonClient4, WalletContractV4 } from "@ton/ton";
import { HighloadWalletContractV2 } from "../output/wallet/HighloadWalletV2";
import { marketComissionAddress } from "../utils/config";
import { OFFCHAIN_CONTENT_PREFIX } from "../utils/api";
import { ogpassConfig } from "../utils/ships";
import { ShipsCollection } from "../output/ships/MM-NFT_ShipsCollection";
import { buildOnchainMetadata } from "../utils/jetton";
import { Mint, MMPROJetton, storeMint } from "../output/jetton/tact_MMPROJetton";

const jettonMetadata = {
    name: 'Market Making Pro',
    description: 'The Future of SocialFi Trading and Investment!',
    symbol: 'MMPRO',
    decimals: '9',
    image: 'https://thin-white-cobra.myfilebase.com/ipfs/QmNiXxGCSkd5KP9g3UpSRCdVo1eBEX2LRueYXmxNG14abd',
}

export const jettonDeploy = async (client: TonClient4) => {
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

    let content = buildOnchainMetadata(jettonMetadata);

    const jetton = await MMPROJetton.fromInit(hw.address, content, 1_000_000_000_000_000_000n);
    const initialMint: Mint = {
        $$type: "Mint",
        amount: 1_000_000_000n,
        receiver: wallet.address,
        query_id: 0n
    }

    const deployContract = contractAddress(0, {
        code: jetton.init?.code,
        data: jetton.init?.data
    });
    console.log("Calculated new contract address: ", deployContract.toString());
    let deployAmount = toNano("0.3");
    const initMsg = internal({
        to: deployContract,
        value: deployAmount,
        init: { code: jetton.init?.code, data: jetton.init?.data },
        body: beginCell().store(storeMint(initialMint)).endCell(),
        bounce: true,
    })

    const hwallet = client.open(hw);
    const { body, queryId } = hwallet.createTransfer({
        secretKey,
        messages: [initMsg],
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