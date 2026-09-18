import { Address, beginCell, toNano } from '@ton/core';
import { Qwe } from '../wrappers/Qwe';
import { NetworkProvider } from '@ton/blueprint';
import { Buffer } from 'buffer';

export async function run(provider: NetworkProvider) {

    function bufferToBigInt(buffer: Buffer): bigint {
        return BigInt('0x' + buffer.toString('hex'));
    }

    console.log('Opening provider...');
        
    // Используйте свои значения публичного и приватного ключей
    const publicKeyHex = 'a7a86f5282c07a64e5f5183be251bbf0b75b115fed11511a0894dde5b55ca2f3'; // ваш публичный ключ
    const secretKeyHex = '386c37427645315869555231574f417675477642564b306d70593231716f4839a7a86f5282c07a64e5f5183be251bbf0b75b115fed11511a0894dde5b55ca2f3'; // ваш приватный ключ

    // Преобразование значений из строки в Buffer
    const publicKey = Buffer.from(publicKeyHex, 'hex');
    const secretKey = Buffer.from(secretKeyHex, 'hex');

    const publicKeyBigInt = bufferToBigInt(publicKey);

    const collectionMetadata = beginCell()
    .storeStringTail('https://ton.rwa.mmprotrust.com/metadata/ledger-2/metadata.json') // URL метаданных коллекции
    .endCell();

    const nftItemMetadata = beginCell()
    .storeStringTail('https://ton.rwa.mmprotrust.com/metadata/ledger-2/metadata.json') // URL метаданных NFT
    .endCell();
        
    const ownerAddress = Address.parse('UQBMj2CW3PmAVSccY76mj-EYEa_V3qYuBHtBb9JOcFne-Kmu'); // Адрес владельца контракта
    const collectionAddress = Address.parse('EQAcpd7mZm9jrNgCaV4s4EqUCaLtzZddEJYx07QTefqCr8Q2'); 
    const qwe = provider.open(await Qwe.fromInit(ownerAddress, collectionAddress, publicKeyBigInt, collectionMetadata, nftItemMetadata));

    await qwe.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(qwe.address);

    console.log('Public Key:', publicKey.toString('hex')); // Публичный ключ
    console.log('Secret Key:', secretKey.toString('hex'));
}
