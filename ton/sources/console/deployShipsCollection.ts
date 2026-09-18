import { mnemonicToPrivateKey } from "@ton/crypto";
import { Address, beginCell, contractAddress, external, internal, SendMode, storeMessage, toNano, TonClient4, WalletContractV4 } from "@ton/ton";
import { HighloadWalletContractV2 } from "../output/wallet/HighloadWalletV2";
import { OFFCHAIN_CONTENT_PREFIX } from "../utils/api";
import { shipsConfig } from "../utils/ships";
import { ShipsCollection } from "../output/ships/MM-NFT_ShipsCollection";

export const nftDeployShipsCollection = async (client: TonClient4, trustedAddress: string) => {
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

    let treasury = wallet_contract.address;
    let owner = wallet.address;
    let uniqueNonce = BigInt(Date.now());

    const metadataCell = beginCell().storeInt(OFFCHAIN_CONTENT_PREFIX, 8).storeStringRefTail(shipsConfig.metadata).endCell();
    const collectionCell = beginCell().storeInt(OFFCHAIN_CONTENT_PREFIX, 8).storeStringRefTail(shipsConfig.defaultItem).endCell();
    const trustedAddr = Address.parse('EQCwF7-OQiHBxKePiBFOAWwzHDTFHkJR9likOqTYFQc08OmS');

    const ships = await ShipsCollection.init(hw.address, collectionCell, metadataCell, {
        $$type: "RoyaltyParams",
        numerator: 50n, // 50n = 5%
        denominator: 1000n,
        destination: owner,
    }, uniqueNonce, 10000000n, trustedAddr);

    const payload =  beginCell().storeUint(0, 32).storeStringTail("Mint").endCell();
    const deployContract = contractAddress(0, ships);
    console.log("Calculated new contract address: ", deployContract.toString());
    let deployAmount = toNano("0.3");
    const initMsg = internal({
        to: deployContract,
        value: deployAmount,
        init: { code: ships.code, data: ships.data },
        body: payload,
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
