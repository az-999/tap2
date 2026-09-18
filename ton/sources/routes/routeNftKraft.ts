import {Request, Response} from "express";
import {ApiError, BuyRequest, getEnv, getJWTHash, sendError} from "../utils/api";
import {storeAssembleShipMessage, AssembleShipMessage} from "../output/ship_contract/tact_ShipAssembler";
import {keyPairFromSeed, sign} from "ton-crypto";
import {Address, beginCell} from "@ton/ton";

function buf2hex(buffer: Buffer) { // buffer is an ArrayBuffer
    return [...new Uint8Array(buffer)]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('');
}

type KraftData = {
    nft1: string;
    nft2: string;
    nft3: string;
    nft4: string;
    nft5: string;
    nft6: string;
    ship_level: number;
}

export const routeNftKraft = async (req: Request, res: Response) => {
    try {
        res.set({
            'Content-Type': 'application/json'
        });

        const token = (req.header('Authorization'))?.toString() || '';
        if (!token) {
            throw new ApiError(401, 'Unauthorized');
        }

        if (token.substring(7) !== getJWTHash()) {
            throw new ApiError(401, 'Unauthorized');
        }

        const data = req.body as KraftData;

        // Генерация секретного и публичного ключей
        const seedKey = getEnv('KRAFT_SEED_KEY');
        const seed = new Buffer(seedKey); // Генерируем seed
        const keyPair = await keyPairFromSeed(seed); // Генерируем пару ключей

        // Получаем публичный и приватный ключи
        const publicKey = keyPair.publicKey;
        const secretKey = keyPair.secretKey;

        const ship_level = data.ship_level;

        console.log(data.nft1);
        console.log(data.nft2);
        console.log(data.nft3);
        console.log(data.nft4);
        console.log(data.nft5);
        console.log(data.nft6);

        const nft_contract_1 = Address.parse(data.nft1);
        const nft_contract_2 = Address.parse(data.nft2);
        const nft_contract_3 = Address.parse(data.nft3);
        const nft_contract_4 = Address.parse(data.nft4);
        const nft_contract_5 = Address.parse(data.nft5);
        const nft_contract_6 = Address.parse(data.nft6);

        let hash = beginCell().storeUint(ship_level, 256).endCell().hash();

        const signature = sign(hash, secretKey);
        console.log(signature);

        const cell = beginCell();

        storeAssembleShipMessage({
            $$type: 'AssembleShipMessage',
            nft_contract_1: nft_contract_1,
            nft_contract_2: nft_contract_2,
            nft_contract_3: nft_contract_3,
            nft_contract_4: nft_contract_4,
            nft_contract_5: nft_contract_5,
            nft_contract_6: nft_contract_6,
            ship_level: BigInt(ship_level),
            signature: beginCell().storeBuffer(signature).endCell().asSlice()
        }) (cell);

        const payload = cell.endCell();

        res.send({
            signature: buf2hex(signature),
            publicKey: buf2hex(publicKey),
            hash: buf2hex(hash),
            body: payload.toBoc().toString('base64')
        })

    } catch (e) {
        sendError(res, e);
    }
}