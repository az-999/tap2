import { Address, beginCell, toNano } from '@ton/core';
import { mnemonicToPrivateKey } from 'ton-crypto';
import { StakeMaster } from '../output/staking/tact_StakeMaster';
import { JettonMaster } from '@ton/ton';
import { StakeMasterAddress } from '../utils/stake';
import { toTokenNano } from '../utils/jetton';
import { getTonClient } from '../utils/api';
import { HighloadWalletContractV2 } from "../output/wallet/HighloadWalletV2";
import { jettonMasterAddress } from '../utils/config';
import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';


interface StakeData {
    id: number;
    owner: string;
    address: string;
    amount: number;
    out_amount: number;
    mint_count: number;
    max_claims: number;
    claims: number;
    duration: number;
    created_at: number;
    next_claim: number;
    last_claim: number;
    end_time: number;
    wallet_address: string;
}

interface CsvRow {
    id: string;
    tg_id: string;
    lootbox_id: string;
    amount: string;
    out_amount: string;
    mint_count: string;
    duration: string;
    max_claims: string;
    claims: string;
    address: string;
    owner: string;
    txid: string;
    status: string;
    created_at: string;
    next_claim: string;
    last_claim: string;
    finished_at: string;
    error: string;
    end_time: string;
}

// Функция для чтения CSV файла и преобразования данных в объекты JavaScript
function loadStakesFromCSV(): Promise<StakeData[]> {
    return new Promise((resolve, reject) => {
        const stakes: StakeData[] = [];
        fs.createReadStream(path.join(__dirname, '../../../stake (6).csv'))
            .pipe(csvParser({ 
                separator: ';',
                strict: true
            }))
            .on('data', (row: CsvRow) => {
                stakes.push({
                    id: parseInt(row.id),
                    owner: row.owner,
                    address: row.address,
                    amount: parseFloat(row.amount),
                    out_amount: parseFloat(row.out_amount),
                    mint_count: parseInt(row.mint_count),
                    max_claims: parseInt(row.max_claims),
                    claims: parseInt(row.claims),
                    duration: parseInt(row.duration),
                    created_at: parseInt(row.created_at),
                    next_claim: parseInt(row.next_claim),
                    last_claim: parseInt(row.last_claim),
                    end_time: parseInt(row.end_time),
                    wallet_address: row.owner
                });
            })
            .on('end', () => {
                resolve(stakes);
            })
            .on('error', (error: Error) => {
                reject(error);
            });
    });
}

async function main() {
    // Инициализация клиента
    const client = await getTonClient();

    // Используем мнемонику напрямую
    const mnemonic = "";
    const keyPair = await mnemonicToPrivateKey(mnemonic.split(' '));
    
    // Создаем кошелек
    const wallet = HighloadWalletContractV2.create({ 
        publicKey: keyPair.publicKey,
        workchain: 0,
        walletId: 0
    });
    const walletContract = client.open(wallet);

    // Проверяем баланс кошелька
    const balance = await walletContract.getBalance();
    console.log('Wallet balance:', balance.toString());

    // Адрес мастер-контракта
    const masterAddress = Address.parse(StakeMasterAddress);
    const masterContract = client.open(StakeMaster.fromAddress(masterAddress));

    // Загружаем стейки из CSV файла
    const stakes = await loadStakesFromCSV();

    // Загружаем каждый стейк
    for (const stake of stakes) {
        const query_id = BigInt(Date.now());
        
        // Получаем адрес jetton-кошелька пользователя
        const jettonAddress = Address.parse(jettonMasterAddress);
        const jetton = await JettonMaster.create(jettonAddress);
        const jettonMaster = client.open(jetton);
        const userAddress = Address.parse(stake.owner);
        const jettonWalletAddress = await jettonMaster.getWalletAddress(userAddress);
        
        console.log('Sending transaction for stake:', {
            stake_id: stake.id,
            user_address: stake.owner,
            stake_amount: stake.amount,
            out_amount: stake.out_amount
        });

        // Отправка транзакции
        await masterContract.send(
            walletContract.sender(keyPair.secretKey),
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
