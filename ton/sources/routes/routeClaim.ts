import {Request, Response} from "express";
import { ApiError, getEnv, getJWTHash, getTonClient, sendError } from "../utils/api";
import {  Address, beginCell,  fromNano,  toNano } from "@ton/core";
import * as StakingMaster from "../output/staking/tact_StakeMaster";
import { validationResult } from "express-validator";
import { ClaimRequest, StakeMasterAddress } from "../utils/stake";
import * as Stake from "../output/staking/tact_Stake";
import { mnemonicToWalletKey, sign } from "@ton/crypto";
import { jettonMasterAddress } from "../utils/config";
import { JettonMaster } from "@ton/ton";

export const routeClaim = async (req: Request, res: Response) => {
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
        console.log('1. Received claim request data:', {
            id: data.id,
            owner_address: data.owner_address,
            address: data.address
        });

        const owner_address = Address.parse(data.owner_address);
        console.log('2. Parsed owner_address:', owner_address.toString());
        const query_id = BigInt(Date.now());
        console.log('Query ID:', query_id.toString());
        const dest = Address.parse(data.address);
        console.log('3. Parsed destination address:', dest.toString());

        let mnemonic = getEnv('OWNER_CONTRACT_MNEMONIC').replaceAll('"', ''); //загружаем с .енв фразу кошелька, с которого деплоили
        const key = await mnemonicToWalletKey(mnemonic.split(" "));

        const client4 = await getTonClient();
        const stake = Stake.Stake.fromAddress(dest);
        const stakeContract = await client4.open(stake);
        
        const value = await stakeContract.getGetRequiredValue() + toNano("0.05");
        console.log('Calculated value to send:', fromNano(value), 'TON');
        const master = await stakeContract.getGetMasterAddress();
    
        const jettonAddress = Address.parse(jettonMasterAddress);
        const jetton = await JettonMaster.create(jettonAddress);
        const jettonMaster = client4.open(jetton);
        const masterWallet = await jettonMaster.getWalletAddress(master);
        console.log('Current Master Wallet Address:', masterWallet.toString());

        const ownerJettonWallet = await jettonMaster.getWalletAddress(owner_address);
        console.log('Owner Jetton Wallet Address:', ownerJettonWallet.toString());

        // Проверяем существование стейка в старых стейках
        const oldMaster = Address.parse(StakeMasterAddress);
        const masterContract = StakingMaster.StakeMaster.fromAddress(oldMaster);
        const masterContractInstance = client4.open(masterContract);
        console.log('4. Checking old stake record with old master address:', {
            id: data.id,
            owner_address: owner_address.toString(),
            old_master_address: oldMaster.toString()
        });
        const oldStake = await masterContractInstance.getGetOldStakeRecord(BigInt(data.id || 0), owner_address);
        console.log('5. Old stake record result:', oldStake ? 'Found' : 'Not found', oldStake);

        const newMasterWallet = await jettonMaster.getWalletAddress(oldMaster);
        console.log('New Master Contract Jetton Wallet:', newMasterWallet.toString());
        let body;
        if (oldStake) {
            // Это старый стейк - используем ClaimOldStake
            const oldStakeHash = beginCell().
                storeUint(query_id, 64).
                storeUint(BigInt(data.id || 0), 64).
                storeAddress(owner_address).
                storeAddress(newMasterWallet).
                endCell().hash();
            const oldStakeSignature = sign(oldStakeHash, key.secretKey);
            console.log('Old Stake Signature:', oldStakeSignature.toString('hex'));
            
            body = beginCell().store(StakingMaster.storeClaimOldStake({
                $$type: 'ClaimOldStake',
                query_id,
                stake_id: BigInt(data.id || 0),
                wallet_address: newMasterWallet,  // Используем jetton-кошелек мастер-контракта для отправки
                signature: beginCell().storeBuffer(oldStakeSignature).endCell().asSlice()
            })).endCell();
        } else {
            // Это новый стейк - используем обычный Claim
            const hash = beginCell().
                            storeUint(query_id, 64).
                            storeAddress(owner_address).
                            storeAddress(dest).
                            storeAddress(masterWallet).
                            endCell().hash();
            const signature = sign(hash, key.secretKey);
            console.log('Signature:', signature.toString('hex'));
            
            body = beginCell().store(StakingMaster.storeClaim({
                $$type: 'Claim',
                query_id,
                owner_address,
                signature: beginCell().storeBuffer(signature).endCell().asSlice(),
                wallet_address: masterWallet,
            })).endCell();
        }

        console.log('Transaction Body:', body.toBoc().toString('base64'));

        res.send({
            body: body.toBoc().toString('base64'),
            to: oldStake ? oldMaster.toString() : data.address,  // Для старых стейков отправляем на мастер-контракт
            value: fromNano(value),
        })
    } catch (e) {
        sendError(res, e);
    }
}