import { Address, toNano } from '@ton/core';
import { ShipNFT } from '../wrappers/ShipNft';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    // Получаем адрес контракта Qwe от пользователя или из аргументов
    const address = Address.parse("kQAzHgXnpQfXumoN6meZFAl-YwLKYRv8HyqrFyAUDbNKaBYv");

    // Проверяем, что контракт на этом адресе развернут
    if (!(await provider.isContractDeployed(address))) {
        ui.write(`Error: Contract at address ${address} is not deployed!`);
        return;
    }

    // Открываем контракт Qwe
    const qwe = provider.open(ShipNFT.fromAddress(address));

    // Подготавливаем данные для минтинга корабля
    const shipLevel = 1; // Например, уровень корабля

    // Отправляем сообщение для минтинга корабля
    console.log('ID', await qwe.getGetOwner());

    ui.write('Minting new ship...');

    console.log('Mint process initiated.');
}
