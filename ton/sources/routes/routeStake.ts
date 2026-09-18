import {Request, Response} from "express";
import { ApiError, getEnv, getJWTHash, getTonClient, sendError } from "../utils/api";
import { mnemonicToWalletKey, sign } from "ton-crypto";
import { Address, beginCell, Cell, toNano } from "@ton/core";
import * as StakingMaster from "../output/staking/tact_StakeMaster";
import { validationResult } from "express-validator";
import { JettonMaster, WalletContractV4 } from "@ton/ton";
import { jettonMasterAddress } from "../utils/config";
import { StakeMasterAddress, StakeRequest } from "../utils/stake";
import { storeTokenTransfer } from "../output/jetton/tact_MMPROJetton";
import { createJettonTransferMessage, toTokenNano } from "../utils/jetton";

export const routeStake = async (req: Request, res: Response) => {
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

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ApiError(432, errors.array()[0].msg);
        }

        const data = req.body as StakeRequest;
        let mnemonic = getEnv('OWNER_CONTRACT_MNEMONIC').replaceAll('"', ''); //загружаем с .енв фразу кошелька, с которого деплоили
        const key = await mnemonicToWalletKey(mnemonic.split(" "));

        const client4 = await getTonClient();
        const query_id = BigInt(Date.now());        
        const jettonAddress = Address.parse(jettonMasterAddress);
        const jetton = await JettonMaster.create(jettonAddress);
        const jettonMaster = client4.open(jetton);
        console.log('Get jetton wallet address for ' + data.owner);
        const jettonWalletAddress = await jettonMaster.getWalletAddress(Address.parse(data.owner));
        console.log(jettonWalletAddress);

        const amount = toTokenNano(`${data.amount}`);
        const out = toTokenNano(`${data.out_amount}`);
        const duration = BigInt(`${data.duration}`);
        const max_claims = BigInt(`${data.max_claims}`);
        const mint_count = BigInt(`${data.mint_count}`);
        
        const hash = beginCell()
                        .storeUint(query_id, 64)
                        .storeUint(amount, 256)
                        .storeUint(out, 256)
                        .storeUint(mint_count, 32)
                        .storeUint(duration, 32)
                        .storeUint(max_claims, 32)
                        .endCell().hash();

        const signature = sign(hash, key.secretKey);

        const src: StakingMaster.Deposit = {
            $$type: "Deposit",
            amount,
            duration,
            mint_count,
            out_amount: out,
            owner_address: Address.parse(data.owner),
            query_id,
            signature: beginCell().storeBuffer(signature).endCell().asSlice(),
            max_claims,
        }


        const master = Address.parse(StakeMasterAddress);
        // const forwardPayload = beginCell().store(StakingMaster.storeDeposit()).endCell();
        // const body = beginCell().store(storeTokenTransfer({
        //     $$type: "TokenTransfer",
        //     amount: amount,
        //     destination: master,
        //     forward_payload: beginCell().storeRef(beginCell().store(StakingMaster.storeDeposit(src)).endCell()).endCell().asSlice(),
        //     forward_ton_amount: toNano("0.4"),
        //     custom_payload: null,
        //     response_destination: master,
        //     queryId: 0n,
        // })).endCell();

        
        const body = createJettonTransferMessage({
            amount,
            destination: master,
            forwardPayload: beginCell().storeRef(beginCell().store(StakingMaster.storeDeposit(src)).endCell()).endCell(),
            forwardTonAmount: toNano("0.06"),
            responseDestination: master,
            queryId: 0n
        })

        res.send({
            body: body.toBoc().toString('base64'),
            to: jettonWalletAddress.toString(),
            value: "0.1",
        })
    } catch (e) {
        sendError(res, e);
    }
}
