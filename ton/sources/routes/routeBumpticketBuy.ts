import {Request, Response} from "express";
import { ApiError, getEnv, getJWTHash, getTonClient, sendError } from "../utils/api";
import { mnemonicToWalletKey,sign } from "ton-crypto";
import { randomInt } from "crypto";
import { bumpticketAddress, bumpticketPrice } from "../utils/config";
import { beginCell, toNano } from "@ton/core";
import * as BumpTicket from "../output/bumpticket/tact_Router";

export const routeBumpTicketBuy = async (req: Request, res: Response) => {
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

        
        let mnemonic = getEnv('OWNER_CONTRACT_MNEMONIC').replaceAll('"', ''); //загружаем с .енв фразу кошелька, с которого деплоили
        const key = await mnemonicToWalletKey(mnemonic.split(" "));

        const queryId = randomInt(1, 4294967295);
        const value = toNano(bumpticketPrice);
        const hash = beginCell().storeUint(queryId, 64).storeUint(value, 256).endCell().hash();
        const signature = sign(hash, key.secretKey);
        const payload = beginCell().store(BumpTicket.storeDeposit({
            $$type: 'Deposit',
            query_id: BigInt(queryId),
            value,
            signature: beginCell().storeBuffer(signature).endCell().asSlice(),
        })).endCell().toBoc().toString('base64');

        res.send({
            to: bumpticketAddress,
            body: payload,
            value: toNano(bumpticketPrice),
        });
    } catch (e) {
        sendError(res, e);
    }    
}