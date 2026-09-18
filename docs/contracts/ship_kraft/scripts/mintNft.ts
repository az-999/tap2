import { Address, toNano } from '@ton/core';
import { Qwe } from '../wrappers/Qwe';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    // Получаем адрес контракта Qwe от пользователя или из аргументов
    const address = Address.parse("EQCOVJ6Dem3xzVZKRk5BHPHYC18xz4evL7mLiV5eQgawAMh7");

    // Проверяем, что контракт на этом адресе развернут
    if (!(await provider.isContractDeployed(address))) {
        ui.write(`Error: Contract at address ${address} is not deployed!`);
        return;
    }

    // Открываем контракт Qwe
    const qwe = provider.open(Qwe.fromAddress(address));

    // Подготавливаем данные для минтинга корабля
    const shipLevel = 1; // Например, уровень корабля

    // Отправляем сообщение для минтинга корабля
    await qwe.send(
        provider.sender(),
        {
            value: toNano('0.2'), // Укажите нужное значение для транзакции
        },
        {
            $$type: 'MintNFT', // Убедитесь, что тип сообщения соответствует определению в контракте
            ship_level: 1n// Контент нового NFT, адаптируйте по необходимости
        }
    );

    ui.write('Minting new ship...');

    // Добавьте логику для обработки результатов или подтверждений, если это необходимо
    console.log('Mint process initiated.');
}
