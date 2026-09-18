import { Address } from '@ton/core';
import { JettonMaster, JettonWallet } from '@ton/ton';
import { getTonClient } from '../utils/api';
import { jettonMasterAddress} from '../utils/config';
import { StakeMasterAddress } from '../utils/stake';

async function main() {
    const client = await getTonClient();
    
    // Получаем адрес мастер-контракта
    const masterAddress = Address.parse(StakeMasterAddress);
    
    // Инициализируем Jetton Master
    const jettonAddress = Address.parse(jettonMasterAddress);
    const jetton = await JettonMaster.create(jettonAddress);
    const jettonMaster = client.open(jetton);

    // Получаем адрес jetton-кошелька мастер-контракта
    const masterJettonWallet = await jettonMaster.getWalletAddress(masterAddress);
    console.log('Master Contract Jetton Wallet:', masterJettonWallet.toString());

    // Получаем баланс токенов
    const wallet = client.open(JettonWallet.create(masterJettonWallet));
    const balance = await wallet.getBalance();
    console.log('Jetton Balance:', balance.toString());
}

main().catch(console.error);
