import { Address, beginCell, contractAddress, external, internal, MessageRelaxed, SendMode, storeMessage, toNano, TonClient4, WalletContractV4 } from "@ton/ton";
import { mnemonicToPrivateKey } from "ton-crypto";
import { HighloadWalletContractV2 } from "../output/wallet/HighloadWalletV2";
import * as BumpTicket from "../output/bumpticket/tact_Router";
import { randomInt } from "crypto";
import { bumpticketAddress } from "../utils/config";


export const setBumpticketDividers = async (client4: TonClient4, rNum: number, rDenum: number, pNum: number, pDenum: number) => {
    let mnemonic = (process.env.OWNER_CONTRACT_MNEMONIC || "").toString();
    let keyPair = await mnemonicToPrivateKey(mnemonic.split(" "));
    let secretKey = keyPair.secretKey;
    let workchain = 0;
    let wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
    const owner = HighloadWalletContractV2.create({ publicKey: keyPair.publicKey, workchain: 0, walletId: 0 });
    const walletContract = client4.open(owner);

    const queryId = randomInt(1, 4294967295);
    const payload = beginCell().store(BumpTicket.storeSetDividors({
        $$type: "SetDividors",
        query_id: BigInt(queryId),
        prize_divider: {
            $$type: "Divider",
            numerator: BigInt(pNum),
            denominator: BigInt(pDenum),
        },
        ref_divider: {
            $$type: "Divider",
            numerator: BigInt(rNum),
            denominator: BigInt(rDenum),
        }
    })).endCell();

    const { body } = walletContract.createTransfer({
        secretKey,
        messages: [internal({
            to: Address.parse(bumpticketAddress),
            value: toNano("0.01"),
            body: payload
        })],
        sendMode: SendMode.PAY_GAS_SEPARATELY,
        timeout: 10000,
    });

    const msg = external({
        to: walletContract.address,
        body,
    })

    const cell = beginCell().store(storeMessage(msg)).endCell();    
    const boc = cell.toBoc();
    await client4.sendMessage(boc);

    console.log("TxId: ", cell.hash().toString('hex'));
}