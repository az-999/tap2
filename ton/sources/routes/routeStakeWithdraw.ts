import {Request, Response} from "express";
import { ApiError, getEnv, getJWTHash, getTonClient, sendError } from "../utils/api";
import { Address, beginCell } from "@ton/core";
import * as StakingMaster from "../output/staking/tact_StakeMaster";
import { validationResult } from "express-validator";
import { ClaimRequest } from "../utils/stake";
import * as Stake from "../output/staking/tact_Stake";
import { mnemonicToWalletKey, sign } from "@ton/crypto";
import { jettonMasterAddress } from "../utils/config";
import { JettonMaster } from "@ton/ton";
import { StakeMasterAddress } from "../utils/stake";

export const routeStakeWithdraw = async (req: Request, res: Response) => {
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

        const data = req.body as ClaimRequest;
        console.log(data);
        const owner_address = Address.parse(data.owner_address);
        const query_id = BigInt(Date.now());
        const dest = Address.parse(data.address);

        let mnemonic = getEnv('OWNER_CONTRACT_MNEMONIC').replaceAll('"', ''); //загружаем с .енв фразу кошелька, с которого деплоили
        const key = await mnemonicToWalletKey(mnemonic.split(" "));

        const client4 = await getTonClient();
        const stake = Stake.Stake.fromAddress(dest);
        const stakeContract = await client4.open(stake);
        const master = await stakeContract.getGetMasterAddress();
        
        const jettonAddress = Address.parse(jettonMasterAddress);
        const jetton = await JettonMaster.create(jettonAddress);
        const jettonMaster = client4.open(jetton);
        const masterWallet = await jettonMaster.getWalletAddress(master);

        // Проверяем существование стейка в старых стейках
        const newMaster = Address.parse(StakeMasterAddress);
        const newMasterContract = StakingMaster.StakeMaster.fromAddress(newMaster);
        const newMasterContractInstance = client4.open(newMasterContract);
        const oldStake = await newMasterContractInstance.getGetOldStakeRecord(BigInt(data.id || 0), owner_address);
        const newMasterWallet = await jettonMaster.getWalletAddress(newMaster);
        let body;
        if (oldStake) {
            // Это старый стейк - используем WithdrawOldStake
            const hash = beginCell()
                .storeUint(query_id, 64)
                .storeAddress(owner_address)
                .storeAddress(newMasterWallet)
                .endCell().hash();
            const signature = sign(hash, key.secretKey);

            body = beginCell().store(StakingMaster.storeWithdrawOldStake({
                $$type: 'WithdrawOldStake',
                query_id,
                stake_id: BigInt(data.id || 0),
                signature: beginCell().storeBuffer(signature).endCell().asSlice(),
                wallet_address: newMasterWallet
            })).endCell();
        } else {
            // Это новый стейк - используем обычный Withdraw
            const hash = beginCell()
                .storeUint(query_id, 64)
                .storeAddress(owner_address)
                .storeAddress(dest)
                .storeAddress(masterWallet)
                .endCell().hash();
            const signature = sign(hash, key.secretKey);

            body = beginCell().store(StakingMaster.storeWithdraw({
                $$type: "Withdraw",
                query_id,
                signature: beginCell().storeBuffer(signature).endCell().asSlice(),
                wallet_address: masterWallet
            })).endCell();
        }

        const response = {
            body: body.toBoc().toString('base64'),
            to: oldStake ? StakeMasterAddress : data.address,
            value: "0.1",
        };
        
        console.log('[StakeWithdraw] Sending response:', {
            to: response.to.toString(),
            value: response.value,
            bodyLength: response.body.length
        });

        res.send(response);
    } catch (e) {
        console.error('[StakeWithdraw] Error:', e);
        sendError(res, e);
    }
}