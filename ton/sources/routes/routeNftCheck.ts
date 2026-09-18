import { Request, Response } from "express";
import { ApiError, getEnv, getJWTHash, getTonClient, sendError } from "../utils/api";
import { ValidateIssue2 } from "../utils/ships";
import { mnemonicToWalletKey } from "ton-crypto";
import { HighloadWalletContractV2 } from "../output/wallet/HighloadWalletV2";

export const routeNftCheck = async (req: Request, res: Response) => {
    try {
        res.set({
            'Content-Type': 'application/json'
        });

        const token = (req.header('Authorization'))?.toString() || '';
        if (!token) {
            throw new ApiError(401, 'Unauthorized');
        }

        if (token.substring(7) !== getJWTHash()) {
            throw new ApiError(401, 'Unauthorized');
        }

        console.log('req.body');
        console.log(req.body);
        const {queryId} = req.body as ValidateIssue2;

        var qid: bigint = BigInt(queryId);

        console.log('queryId');
        console.log(queryId);
        console.log('qid');
        console.log(qid);
        if (!queryId) {
            throw new ApiError(432, 'Invalid queryId');
        }

        const client = await getTonClient();
        const mnemonic = getEnv('OWNER_CONTRACT_MNEMONIC').replaceAll('"', '');
        if (!mnemonic) {
            throw new ApiError(432, 'Invalid mnemonic');
        }

        const key = await mnemonicToWalletKey(mnemonic.split(' '));
        const owner = HighloadWalletContractV2.create({ publicKey: key.publicKey, workchain: 0, walletId: 0 });
        const walletContract = client.open(owner);

        const result = await walletContract.getProcessed(qid);
        res.send({
            result
        });
    } catch (e) {
        sendError(res, e);
    }
}