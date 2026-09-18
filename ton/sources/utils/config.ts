import { beginCell } from "@ton/core";

export type CollectionInfo = {
    collection: string,
    item: string,
    address: string,
    totalSupply: bigint
}

const collections: CollectionInfo[] = [
    {
        collection: 'ipfs://bafybeicjoyvtvguxxdvxg2v3gszkn6shtcnpxtzhkujuc57f6hmhvu2wcy/',
        item: 'ipfs://bafybeib66v5rlrwyvclm6ca2nzvs6chkbpafoxydqha53qq2ncuecleyua/',
        address: 'EQClJh2uvO6NjPvq7e9Ncx8QjmMSdpg73xTo324_0TJPFmCD', 
        totalSupply: BigInt(500)
    },
    {
        collection: 'ipfs://bafybeigzbl2fuc5brty3rov2cxsoqrtfvz75pdk277kfvj3gwnsk2d33oi/',
        item: 'ipfs://bafybeid5ofrynzijrbpehexde7wnfftj65vi3bzdfjsznpqbwiincnel2y/',
        address: 'EQCLxOtUQ7ouyNdqnzxcGuChtqxcbLKqxRsRmUKsQZnjwhDb', 
        totalSupply: BigInt(300)
    },
    {
        collection: 'ipfs://bafybeigucpdt5gngbnu7z3js2aylf6m7xlpwxmr7p67ti4keydwsepd4fm/',
        item: 'ipfs://bafybeif3uvsj7jzy6rmafh7bn43kaglttpzmeh2pxunbyx3b3ogtzgouy4/',
        address: 'EQDCU3jFPifA0MoptBDqyS4Td8TKuNN4Mw1N-AW_VGHKzzFK',
        totalSupply: BigInt(50)
    },
    {
        collection: 'ipfs://bafybeic773aq36mhm7ecisisv2jpqnhc4f7lmkcebkuinp26slyvyiuosi/',
        item: 'ipfs://bafybeiaxr2ml23vjto7sfu5j3t6ez64ocx73uct7kmos2z3evvqo6y2en4/',
        address: 'EQD1NhcBmbVgNYFRMtlSDVdWcwQTmvV4YNkFSydD3FaOPQpw',
        totalSupply: BigInt(20)
    },
    {
        collection: 'ipfs://bafybeib2ji3lr6rjoudxpo65mn34o6jtyikivnoxhb2avbdmfb4fqgwqam/',
        item: 'ipfs://bafybeidc5zjqzdu7noyn24vqel6pajpz6sjjvuvyqfjcojqjjfwjr6iqbe/',
        address: 'EQCv9ZPdQ9LQrnlWbgQ7btD5qgyzi1uWqb9trgNmdSL1ei5l',
        totalSupply: BigInt(5)
    }
];

export const getCollectionInfo = (id: number): CollectionInfo|null => collections[id-1] || null;
export const getCollectionConfig = () => collections

export const highloadWalletAddress = 'UQA1ncIYvWqZ8Lba4diqFqbZ5hY0OL2QnkE3tIULrmFnELz2';
export const marketComissionAddress = 'UQC_WYZ_9yIMfg05y6rJeWrwEmc3tkDkdISa5IDC-ohWpWK2';

export const bumpticketPrice = "0.1";
export const bumpticketAddress = "EQB-UOy5ViQ2eaguJTzWRIur9G3bEtAw_q8cz075R0CkvltF";

// export const jettonMasterAddress = "EQATfsaMzGSZHUtHRrOUdTeGH0IKzi8RusaKoPdarrY_AFdq"; // dev
export const jettonMasterAddress = "EQDrqXZfdR-MqwAYImYkR0YHPDazMiI5-oUzaLxvuH4vM_J7"; // prod

export const stonFiRouterAddress = "EQBjM7B2PKa82IPKrUFbMFaKeQDFGTMRnrvY1TmptC7Kxz7B"; // CPI Router v2.1.0
export const pTonAddress = "EQBnGWMCf3-FZZq1W4IWcWiGAc3PHuZ0_H-7sad2oY00o83S"; // pTON v2.1.0

export const buildShipsAddr = "EQCwF7-OQiHBxKePiBFOAWwzHDTFHkJR9likOqTYFQc08OmS";

export const CELL_MAX_SIZE_BYTES = Math.floor((1023 - 8) / 8);
const SNAKE_PREFIX = 0x00;

export function makeSnakeCell(data: Buffer) {
    // Create a cell that package the data
    let chunks = bufferToChunks(data, CELL_MAX_SIZE_BYTES);

    const b = chunks.reduceRight((curCell, chunk, index) => {
        if (index === 0) {
            curCell.storeInt(SNAKE_PREFIX, 8);
        }
        curCell.storeBuffer(chunk);
        if (index > 0) {
            const cell = curCell.endCell();
            return beginCell().storeRef(cell);
        } else {
            return curCell;
        }
    }, beginCell());
    return b.endCell();
}

function bufferToChunks(buff: Buffer, chunkSize: number) {
    let chunks: Buffer[] = [];
    while (buff.byteLength > 0) {
        chunks.push(buff.slice(0, chunkSize));
        buff = buff.slice(chunkSize);
    }
    return chunks;
}