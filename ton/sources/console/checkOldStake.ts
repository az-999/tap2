import { Address } from '@ton/core';
import { StakeMaster } from '../output/staking/tact_StakeMaster';
import { getTonClient } from '../utils/api';
import { StakeMasterAddress } from '../utils/stake';

async function main() {
    // Инициализация клиента
    const client = await getTonClient();

    // Адрес мастер-контракта
    const masterAddress = Address.parse(StakeMasterAddress);
    const masterContract = client.open(StakeMaster.fromAddress(masterAddress));

    // Параметры для проверки
    const stake_ids = [387n];
    const user_address = Address.parse("UQDixNDppHr_M3gCyXzMB70mWoDEOIi-T0Jfhbye4leR47wa");

    for (const stake_id of stake_ids) {
        console.log('\nCurrent time:', new Date().toISOString());
        console.log('\nChecking stake', stake_id.toString(), '...');
        console.log('----------------------------------------');

        // Получаем запись стейка
        const record = await masterContract.getGetOldStakeRecord(stake_id, user_address);
        
        if (record === null) {
            console.log('Stake record not found!');
            continue;
        }

        // Выводим информацию о стейке
        console.log('Stake record found:');
        console.log('Stake amount:', record.stake_amount);
        console.log('Out amount:', record.out_amount);
        console.log('Mint count:', record.mint_count);
        console.log('Max claims:', record.max_claims);
        console.log('Claims count:', record.claims_count);
        console.log('Stake time:', record.stake_time);
        console.log('Created at:', new Date(Number(record.created_at) * 1000).toISOString());
        console.log('Next claim:', new Date(Number(record.next_claim) * 1000).toISOString());
        console.log('Last claim:', record.last_claim === 0n ? 'Never' : new Date(Number(record.last_claim) * 1000).toISOString());
        console.log('End time:', new Date(Number(record.end_time) * 1000).toISOString());
        console.log('Wallet address:', record.wallet_address.toString());
    }
}

main().catch(console.error);