import { Address, beginCell, toNano } from '@ton/core';
import { mnemonicToWalletKey, sign } from '@ton/crypto';
import { StakeMaster } from '../output/staking/tact_StakeMaster';
import { TonClient, JettonMaster } from '@ton/ton';
import dotenv from 'dotenv';
import { StakeMasterAddress } from '../utils/stake';
import { toTokenNano } from '../utils/jetton';
import { getTonClient } from '../utils/api';
import { HighloadWalletContractV2 } from "../output/wallet/HighloadWalletV2";
import { jettonMasterAddress } from '../utils/config';

dotenv.config();

async function main() {
    // Инициализация клиента
    const client = await getTonClient();

    // Загрузка ключей
    const mnemonic = (process.env.OWNER_CONTRACT_MNEMONIC || '').toString();
    const key = await mnemonicToWalletKey(mnemonic.split(' '));
    
    // Создаем кошелек
    const workchain = 0;
    const wallet = HighloadWalletContractV2.create({ 
        publicKey: key.publicKey,
        workchain: 0,
        walletId: 0
    });
    const walletContract = client.open(wallet);

    // Адрес мастер-контракта
    const masterAddress = Address.parse(StakeMasterAddress);
    const masterContract = client.open(StakeMaster.fromAddress(masterAddress));

    // Данные стейков из PHP скрипта
    const stakes = [
        {
            id: 1,
            owner: "UQDixNDppHr_M3gCyXzMB70mWoDEOIi-T0Jfhbye4leR47wa",
            address: "0:0623f63c58a225595f880f639f829eee1b0e4fccc0e9ce2ce03f4dcab78bbb8f",
            amount: 10,
            out_amount: 1,
            mint_count: 3,
            max_claims: 1,
            claims: 0,
            duration: 120,
            created_at: 1739821792,
            next_claim: 1739822001,
            last_claim: 0,
            end_time: 1739822301,
            wallet_address: "UQDixNDppHr_M3gCyXzMB70mWoDEOIi-T0Jfhbye4leR47wa"
        }
    ];

    // Загружаем каждый стейк
    for (const stake of stakes) {
        const query_id = BigInt(Date.now());
        
        // Получаем адрес jetton-кошелька пользователя
        const jettonAddress = Address.parse(jettonMasterAddress);
        const jetton = await JettonMaster.create(jettonAddress);
        const jettonMaster = client.open(jetton);
        const userAddress = Address.parse(stake.owner);
        const jettonWalletAddress = await jettonMaster.getWalletAddress(userAddress);
        
        // Отправка транзакции
        await masterContract.send(
            walletContract.sender(key.secretKey),
            {
                value: toNano('0.01')  // minTonsForStorage(0.01) + gasConsumption(0.01)
            },
            {
                $$type: 'AddOldStakeRecord',
                query_id,
                stake_id: BigInt(stake.id),
                user_address: userAddress,  // Адрес пользователя
                stake_amount: toTokenNano(stake.amount.toString()),
                out_amount: toTokenNano(stake.out_amount.toString()),
                mint_count: BigInt(stake.mint_count),
                max_claims: BigInt(stake.max_claims),
                claims_count: BigInt(stake.claims),
                stake_time: BigInt(stake.duration),      // Период времени до клейма (duration)
                created_at: BigInt(stake.created_at),    // Время создания как есть
                next_claim: BigInt(stake.next_claim),    // Время следующего клейма как есть
                last_claim: BigInt(stake.last_claim),    // Время последнего клейма как есть
                end_time: BigInt(stake.end_time),        // Время окончания как есть
                signature: beginCell().storeBuffer(Buffer.alloc(64)).endCell().asSlice(), // 64-байтная пустая подпись
                wallet_address: userAddress  // Используем TON адрес пользователя
            }
        );

        console.log(`Uploaded stake ${stake.id}`);
        
        // Небольшая задержка между транзакциями
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}

main().catch(console.error);
