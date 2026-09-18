import { Address, beginCell, contractAddress, external, internal, MessageRelaxed, SendMode, storeMessage, toNano, TonClient4, WalletContractV4 } from "@ton/ton";
import { mnemonicToPrivateKey } from "ton-crypto";
import { HighloadWalletContractV2 } from "../output/wallet/HighloadWalletV2";
import * as StakingMaster from "../output/staking/tact_StakeMaster";
import { getShipMetadataAsMap, qweCollection } from "../utils/ships";

export const deployStakingMaster = async (client4: TonClient4, jettonAddress: Address, nftAddress: Address, feeAddress: Address) => {
    let mnemonic = (process.env.OWNER_CONTRACT_MNEMONIC || "").toString();
    let keyPair = await mnemonicToPrivateKey(mnemonic.split(" "));
    let secretKey = keyPair.secretKey;
    let workchain = 0;
    let wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
    const owner = HighloadWalletContractV2.create({ publicKey: keyPair.publicKey, workchain: 0, walletId: 0 });
    const walletContract = client4.open(owner);

    const stateInit = await StakingMaster.StakeMaster.init(
        owner.address, 
        BigInt('0x' +owner.publicKey.toString('hex')), 
        jettonAddress, 
        nftAddress, 
        getShipMetadataAsMap(),
        feeAddress, 
        Address.parse(qweCollection),
        2n
    );
    const deployAddress = contractAddress(0, stateInit);
    console.log("Deploying contract to address: ", deployAddress.toString());

    const { body, queryId } = walletContract.createTransfer({
        secretKey,
        messages: [internal({
            to: deployAddress,
            value: toNano("0.1"),
            init: stateInit,
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
    await client4.sendMessage(boc);

    console.log("Query ID: ", queryId);
    console.log("TxId: ", cell.hash().toString('hex'));
}