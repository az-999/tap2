import express from 'express';

import CryptoJS from 'crypto-js';
import { TonClient4 } from '@ton/ton';
import { getHttpV4Endpoint, Network } from '@orbs-network/ton-access';
import { TonApiClient } from '@ton-api/client';
import { ContractAdapter } from '@ton-api/ton-adapter';


export const getTonClient = async () => getEnv('NETWORK') === 'testnet' ? new TonClient4({
    endpoint: 'https://sandbox-v4.tonhubapi.com',
//}) : new TonClient4({endpoint: await getHttpV4Endpoint(), timeout: 10000});
}) : new TonClient4({endpoint: 'https://mainnet-v4.tonhubapi.com', timeout: 10000});


export const OFFCHAIN_CONTENT_PREFIX = 0x01;

export type SendTokensRequest = {
    address: string;
    items: Map<string, string>;
};

export type ProvideLiquidityRequest = {
    jetton_address: string;
    amount: number;
};

export type Nft1 = {
    balance: number;
};

export type Error22 = {
    code: number;
    message: string;
};


export type BuyRequest = {
    address: string;
    nft_id: number;
    hash: string;
}

export type GetTxRequest = {
    address: string;
    hash: string;
    lt: bigint;
    count?: number;
}

export class ApiError extends Error {
    code: number;
    message: string;

    constructor(code: number, message: string) {
        super(message);
        this.code = code;
        this.message = message;
    }

    toString() {
        return `${this.code} ${this.message}`;
    }
}

export const makeBody = (priv: string, body: Record<string, number | string>) => {
    const time = Math.ceil(Date.now() / 60000);

    const messagesArr = Object.entries(body).reduce((acc, item) => {
        const [key, value] = item;
        acc.push(`${key}=${encodeURI(String(value))}`);
        return acc;
    }, [] as string[]);
    const messageStr = messagesArr.join('&');

    const hashedTime = `time=${time}`;
    const message = messageStr ? `${messageStr}&${hashedTime}` : hashedTime;

    const hash = CryptoJS.HmacSHA256(message, priv).toString();
    body['hash'] = hash;
    return JSON.stringify(body);
}

export const notifyTransactionStarted = async (apiUrl: string, hash: string, id: number, last_id: bigint) => {
    const response = await fetch(apiUrl + `/v1/nft/transaction-start`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: hash,
        },
        body: makeBody(getEnv('API_PRIVATE_KEY'), {
            id,
            last_id: Number(last_id),
        }),
    });

    if (!response.ok) {
        const err = (await response.json()) as Error22;
        throw new ApiError(err.code, err.message);
    }

    return (await response.json()) as Nft1;
}

export const getJWTHash = () => {
    const key = getEnv('JWT_SECRET');
    return CryptoJS.SHA256(key).toString();
}

export const validateHash = (args: Record<string, number | string>) => {
    const time = Math.ceil(Date.now() / 60000);

    const messagesArr = Object.entries(args).reduce((acc, item) => {    
        const [key, value] = item;
        if (key === 'hash') return acc;

        acc.push(`${key}=${encodeURI(String(value))}`);
        return acc;
    }, [] as string[]);

    const messageStr = messagesArr.join('&');
    const hashedTime = `time=${time}`;
    const key = getEnv('API_PRIVATE_KEY');
    const message = messageStr ? `${messageStr}&${hashedTime}` : hashedTime;
    console.log(message + ' ' + key);
    const hash = CryptoJS.HmacSHA256(message, key).toString();
    return hash === args['hash'];
}

export const sendError = (res: express.Response, error: any) => {
    console.error(error);
    
    if (error instanceof ApiError) {
        res.status(400).send(JSON.stringify({"code":error.code, "message": error.message}));
    } else if (error instanceof Error) {
        res.status(400).send(JSON.stringify({"code":426, "message": error.message}));
    } else {
        res.status(400).send(JSON.stringify({"code":427, "message": "An unexpected error occurred"}));
    }
}

export const getEnv = (key: string) => process.env[key]?.toString() || '';

export const getNetwork = (): Network => {
    return getEnv('NETWORK') === 'testnet' ? 'testnet' : 'mainnet';
}

export const getNftList = (): string[] => {
    return [
        // getEnv('COLLECTION_ADDRESS_NFT1'),
        // getEnv('COLLECTION_ADDRESS_NFT2'),
        // getEnv('COLLECTION_ADDRESS_NFT3'),
        // getEnv('COLLECTION_ADDRESS_NFT4'),
        // getEnv('COLLECTION_ADDRESS_NFT5'),
        'EQC5XhGLN5wkEQcifzsiyOpPvDfAqLBzQwsfEEZVRS7LAxGJ',
        'EQCLxOtUQ7ouyNdqnzxcGuChtqxcbLKqxRsRmUKsQZnjwhDb',
        'EQDCU3jFPifA0MoptBDqyS4Td8TKuNN4Mw1N-AW_VGHKzzFK',
        'EQD1NhcBmbVgNYFRMtlSDVdWcwQTmvV4YNkFSydD3FaOPQpw',
        'EQCv9ZPdQ9LQrnlWbgQ7btD5qgyzi1uWqb9trgNmdSL1ei5l',
        'EQAd605-yc-lhVgu05mVwNLUL3kZAtjouSo4j913IKwHceAU'
    ];
}
