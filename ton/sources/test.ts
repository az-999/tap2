// @ts-nocheck
import fetch from 'node-fetch';
import { beginCell, toNano, Address, TonClient4, WalletContractV4, TonClient, Cell, loadStateInit, Dictionary } from "@ton/ton";
import * as Stake from "./output/staking/tact_Stake";
import { mnemonicToPrivateKey } from "@ton/crypto";
import * as dotenv from "dotenv";
dotenv.config();

import { getHttpV4Endpoint } from "@orbs-network/ton-access";
import { getJWTHash } from './utils/api';
import { Blockchain } from '@ton/sandbox';
import { SmartContract } from 'ton-contract-executor';
import TonWeb from "tonweb";
import * as ShipApi from "./output/ships/MM-NFT_ShipsCollection";
import { loadDoMint } from './output/staking/tact_Stake';
import { loadDeposit, loadTokenNotification } from './output/staking/tact_StakeMaster';
import { getShipMetadataAsMap } from './utils/ships';
import { toTokenNano } from './utils/jetton';
import { pTonAddress } from './utils/config';

const getEnv = (key: string) => process.env[key]?.toString() || '';

const getTonClient = async () => getEnv('NETWORK') === 'testnet' ? new TonClient4({
    endpoint: 'https://sandbox-v4.tonhubapi.com/',
}) : new TonClient4({endpoint: await getHttpV4Endpoint()});


type User = {
    id: number;
    name: string;
    price: number;
    address: string;
};

type GetUsersResponse = {
    data: User[];
};

type Nft1 = {
    balance: number;
};

type Error22 = {
    code: number;
    message: string;
};

async function getUsers() {
    try {

        const requestOptions: RequestInit = {
            method: "GET",
            headers: {
                Accept: 'application/json',
                Authorization: '$2y$12$5OPpoK/g4g1SxWh0rqVm7en9nbbEMbyLG9pwrjgduz7CkWpER1P6y',
            },
        };

        // 👇️ const response: Response
        const response = await fetch('http://localhost:3100/v1/nft/transaction-start-get?id=1', requestOptions);

        console.log(response);
        if (!response.ok) {
            const result1 = (await response.json()) as Error22;
            console.log(result1);
            throw new Error(`Error! status: ${response.status}`);
        }

        // 👇️ const result: GetUsersResponse
        const result = (await response.json()) as Nft1;

        console.log('result is: ', JSON.stringify(result, null, 4));

        return result;
    } catch (error) {
        if (error instanceof Error) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}

const cell = Cell.fromBoc(Buffer.from("b5ee9c7201010301009800018580142be295ece740c87fce1f4ee349eeccdd63d1fc1619c9b5d61aac925e80b1fa9002fd6619ffdc8831f834e72eab25e5abc0499cded90391d2126b92030bea215a960101020102009868747470733a2f2f697066732e66696c65626173652e696f2f697066732f516d573131636d63687134634d363734706436443546784c764b55755a514d567779696d486a7876696462426a47", "hex"))[0];
const parse = cell.beginParse();
const a = parse.loadUint(8);
const b = parse.loadStringRefTail();
console.log(a, b);