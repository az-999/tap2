import { Address, Cell, beginCell, toNano } from '@ton/core';
import { Qwe } from '../wrappers/Qwe';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse("EQClpOiXxMFzEMTlGEtDGYCZCtafEz_K9YLyJugT6wxZv31n");

    if (!(await provider.isContractDeployed(address))) {
        ui.write(`Ошибка: Контракт по адресу ${address} не развернут!`);
        return;
    }

    const qwe = provider.open(Qwe.fromAddress(address));

    const shipLevel = 1;

    // Подпись в виде строки, замените на вашу реальную подпись
    const signatureHex = '08ecd940b7f46c40b8966d80cd827e4efb1a17ca98c1283d7646bb616e2b6609317af6fe51cff5f3988694acbb1dbc75ab4711fa5a3a2657db6034810cbe0909';

    // Преобразование подписи в Buffer
    const signature = Buffer.from(signatureHex, 'hex');

    // Создание ячейки с подписью
    const signatureCell = beginCell().storeBuffer(signature).endCell();

    // Начало парсинга подписи из ячейки
    const signatureSlice = signatureCell.beginParse();

    try {
        await qwe.send(
            provider.sender(),
            {
                value: toNano('0.1'),
            },
            {
                $$type: 'VerifySingle',
                ship_level: BigInt(shipLevel),
                signature: signatureSlice,
            }
        );

        ui.write('Сообщение для проверки подписи отправлено.');
        console.log('Процесс проверки подписи инициирован.');
    } catch (error) {
        console.error('Ошибка при отправке сообщения для проверки:', error);
        ui.write('Ошибка');
    }
}
