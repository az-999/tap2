import {Request, Response} from "express";
import { ApiError, getEnv, getJWTHash, getTonClient, sendError } from "../utils/api";
import { mnemonicToWalletKey, sign } from "ton-crypto";
import * as Stake from "../output/staking/tact_Stake";
import * as StakingMaster from "../output/staking/tact_StakeMaster";
import { validationResult } from "express-validator";
import { GetStakeDataRequest, StakeMasterAddress, StakeRequest } from "../utils/stake";
import { Address, fromNano } from "@ton/core";
import { sleep } from "../utils/retry";

export const routeStakeDetails = async (req: Request, res: Response) => {
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

        const data = req.body as GetStakeDataRequest;
        console.log('Received stake details request:', data);
        let mnemonic = getEnv('OWNER_CONTRACT_MNEMONIC').replaceAll('"', ''); //загружаем с .енв фразу кошелька, с которого деплоили
        const key = await mnemonicToWalletKey(mnemonic.split(" "));

        const client4 = await getTonClient();
        
        // Проверяем, является ли это старым стейком
        if (data.id && data.owner_address) {
            console.log('Checking old stake:', {
                id: data.id,
                owner_address: data.owner_address,
                master_address: StakeMasterAddress
            });

            const oldMaster = Address.parse(StakeMasterAddress);
            const masterContract = StakingMaster.StakeMaster.fromAddress(oldMaster);
            const masterContractInstance = client4.open(masterContract);
            
            // Пробуем получить информацию о старом стейке
            const oldStake = await masterContractInstance.getGetOldStakeRecord(BigInt(data.id), Address.parse(data.owner_address));
            console.log('Old stake record:', {
                oldStake,
                next_claim: oldStake ? oldStake.next_claim.toString() : null,
                claims_count: oldStake ? oldStake.claims_count.toString() : null
            });
            
            if (oldStake) {
                const response = {
                    next_claim: oldStake.next_claim.toString(),
                    claims_count: oldStake.claims_count.toString()
                };
                console.log('Returning old stake info:', response);
                res.json(response);
                return;
            } else {
                console.log('Old stake not found, falling back to regular stake');
            }
        } else {
            console.log('Not an old stake request:', data);
        }
        
        // Для обычного стейка используем существующую логику
        console.log(data.address);
        const stake = Stake.Stake.fromAddress(Address.parse(data.address));
        const stakeContract = await client4.open(stake);  
        await sleep(500);
        const next_claim = await stakeContract.getGetNextClaim();
        await sleep(500);
        const claims_count = await stakeContract.getGetClaimsCount();
        console.log('New stake details:', { next_claim, claims_count });
        
        res.json({
            next_claim: next_claim.toString(),
            claims_count: claims_count.toString(),
        });

    } catch (e) {
        console.error('Error in routeStakeDetails:', e);
        sendError(res, e);
    }
}
