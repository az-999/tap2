import { Address, beginCell, contractAddress, external, internal, MessageRelaxed, SendMode, storeMessage, toNano, TonClient4, WalletContractV4 } from "@ton/ton";
import { mnemonicToPrivateKey, sign } from "ton-crypto";
import { HighloadWalletContractV2 } from "../output/wallet/HighloadWalletV2";
import * as BumpTicket from "../output/bumpticket/tact_Router";
import { bumpticketAddress, bumpticketPrice } from "../utils/config";
import { randomInt } from "crypto";

export const testBumpticketRouter = async (client4: TonClient4) => {
    let mnemonic = (process.env.OWNER_CONTRACT_MNEMONIC || "").toString();
    let keyPair = await mnemonicToPrivateKey(mnemonic.split(" "));
    let secretKey = keyPair.secretKey;
    let workchain = 0;
    let wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
    const walletContract = client4.open(wallet);
    console.log(walletContract.address.toString({
        bounceable: false,
        testOnly: false,
        urlSafe: true
    }));

    const queryId = randomInt(1, 4294967295);
    const value = toNano(bumpticketPrice);
    const hash = beginCell().storeUint(queryId, 64).storeUint(value, 256).endCell().hash();
    const signature = sign(hash, secretKey);
    const payload = beginCell().store(BumpTicket.storeDeposit({
        $$type: 'Deposit',
        query_id: BigInt(queryId),
        value,
        signature: beginCell().storeBuffer(signature).endCell().asSlice(),
    })).endCell();

    const seqno = await walletContract.getSeqno();
    const body = walletContract.createTransfer({
        seqno,
        secretKey,
        messages: [internal({
            to: Address.parse(bumpticketAddress),
            value,
            body: payload
        })],
        sendMode: SendMode.PAY_GAS_SEPARATELY,
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
