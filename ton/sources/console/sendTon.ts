import { Address, beginCell, external, internal, SendMode, toNano, fromNano, storeMessage } from "@ton/core";
import { mnemonicToPrivateKey } from "@ton/crypto";
import { HighloadWalletContractV2 } from "../output/wallet/HighloadWalletV2";
import { getTonClient, getEnv } from "../utils/api";
import * as dotenv from "dotenv";

async function main() {
    // Загружаем переменные окружения
    dotenv.config();

    // Создаем клиент
    const client4 = await getTonClient();

    // Получаем мнемоническую фразу из переменных окружения
    const mnemonic = (process.env.OWNER_CONTRACT_MNEMONIC || "").toString();
    if (!mnemonic) {
        console.error("Error: OWNER_CONTRACT_MNEMONIC is not set in .env file");
        return;
    }

    // Получаем ключи из мнемоники
    const keyPair = await mnemonicToPrivateKey(mnemonic.split(" "));

    // Создаем кошелек
    const owner = HighloadWalletContractV2.create({
        publicKey: keyPair.publicKey,
        workchain: 0,
        walletId: 0
    });
    const walletContract = client4.open(owner);

    // Адрес получателя
    const destinationAddress = Address.parse("UQAhjQeCQ7OPPi3bvP6fqa15Kp6zZQsL-T0j37zpQEs5d89D");

    // Получаем текущий баланс кошелька
    const walletBalance = await walletContract.getBalance();

    // Оставляем небольшую сумму на комиссию (0.1 TON)
    const gasAmount = toNano("5.0");

    // Вычисляем сумму для отправки (весь баланс минус комиссия)
    const amountToSend = walletBalance > gasAmount ? walletBalance - gasAmount : BigInt(0);

    console.log('Current wallet balance:', fromNano(walletBalance), 'TON');
    console.log('Amount to send:', fromNano(amountToSend), 'TON');

    // Проверяем, что есть что отправлять
    if (amountToSend <= 0) {
        console.error('Not enough balance to send');
        return;
    }

    // Создаем транзакцию на всю доступную сумму
    const txns = [
        internal({
            value: amountToSend,
            to: destinationAddress,
        })
    ];

    // Подписываем транзакцию
    const { body } = walletContract.createTransfer({
        secretKey: keyPair.secretKey,
        messages: txns,
        sendMode: SendMode.PAY_GAS_SEPARATELY,
        timeout: 10000,
    });

    // Формируем сообщение
    const sendMsg = external({
        to: walletContract.address,
        body,
    });

    // Отправляем в сеть
    const cell = beginCell().store(storeMessage(sendMsg)).endCell();
    const boc = cell.toBoc();
    const result = await client4.sendMessage(boc);

    console.log('Transaction sent! Result:', result);
    console.log('From address:', walletContract.address.toString());
    console.log('To address:', destinationAddress.toString());
    console.log('Amount:', fromNano(amountToSend), 'TON');
}

main().catch(console.error);
