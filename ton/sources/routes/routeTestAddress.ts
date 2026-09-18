import { Request, Response } from "express";
import { getEnv, sendError } from "../utils/api";
import { mnemonicToWalletKey } from "ton-crypto";
import { WalletContractV4 } from "@ton/ton";

export const routeTestAddress =async (req: Request, res: Response) => {
    try {

        let mnemonic = getEnv('OWNER_CONTRACT_MNEMONIC').replaceAll('"', ''); //загружаем с .енв фразу кошелька, с которого деплоили
        const key = await mnemonicToWalletKey(mnemonic.split(" "));
        const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });

        res.send({
            "address": wallet.address.toString(),
            "mnemonic": mnemonic
        });
    } catch (e) {
        sendError(res, e);
    }
}