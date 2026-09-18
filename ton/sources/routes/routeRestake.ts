import {Request, Response} from "express";
import { ApiError, getEnv, getJWTHash, getTonClient, sendError } from "../utils/api";
import {  Address, beginCell,  fromNano,  toNano } from "@ton/core";
import * as StakingMaster from "../output/staking/tact_StakeMaster";
import { validationResult } from "express-validator";
import { ClaimRequest } from "../utils/stake";
import * as Stake from "../output/staking/tact_Stake";
import { StakeMasterAddress } from "../utils/stake";
export const routeRestake = async (req: Request, res: Response) => {
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
        const owner_address = Address.parse(data.owner_address);
        const query_id = BigInt(Date.now());
        const dest = Address.parse(data.address);

        const client4 = await getTonClient();
        const stake = Stake.Stake.fromAddress(dest);
        const stakeContract = await client4.open(stake);
        
        const master = await stakeContract.getGetMasterAddress();
    
        // Проверяем существование стейка в старых стейках
        const masterContract = StakingMaster.StakeMaster.fromAddress(master);
        const masterContractInstance = client4.open(masterContract);
        const newMaster = Address.parse(StakeMasterAddress);
        const newMasterContract = StakingMaster.StakeMaster.fromAddress(newMaster);
        const newMasterContractInstance = client4.open(newMasterContract);
        const oldStake = await newMasterContractInstance.getGetOldStakeRecord(BigInt(data.id || 0), owner_address);

        let body;
        if (oldStake) {
            // Это старый стейк - используем RestakeOldStake
            body = beginCell().store(StakingMaster.storeRestakeOldStake({
                $$type: 'RestakeOldStake',
                query_id,
                stake_id: BigInt(data.id || 0)
            })).endCell();
        } else {
            // Это новый стейк - используем обычный Restake
            body = beginCell().store(StakingMaster.storeRestake({
                $$type: "Restake",
                query_id,
            })).endCell();
        }

        res.send({
            body: body.toBoc().toString('base64'),
            to: oldStake ? StakeMasterAddress : data.address,
            value: "0.05",
        })
    } catch (e) {
        sendError(res, e);
    }
}