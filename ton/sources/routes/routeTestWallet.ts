import {Request, Response} from "express";
import { ApiError, getEnv, getTonClient, sendError } from "../utils/api";
import { mnemonicToWalletKey } from "ton-crypto";
import { HighloadWalletContractV2 } from "../output/wallet/HighloadWalletV2";

export const routeTestWallet = async (req: Request, res: Response) => {
    try {
        res.set({
            'Content-Type': 'application/json'
        });

        const client = await getTonClient();
        const mnemonic = getEnv('OWNER_CONTRACT_MNEMONIC').replaceAll('"', '');
        if (!mnemonic) {
            throw new ApiError(432, 'Invalid mnemonic');
        }

        console.log(mnemonic);
        const key = await mnemonicToWalletKey(mnemonic.split(' '));
        const owner = HighloadWalletContractV2.create({ publicKey: key.publicKey, workchain: 0, walletId: 0 });
        const walletContract = client.open(owner);
        console.log(owner.address);

        res.send({
            address: owner.address.toString()
        });
    } catch (e) {
        sendError(res, e);
    }
}