import {Request, Response} from "express";
import { ApiError, getEnv, getJWTHash, getTonClient, sendError, SendTokensRequest } from "../utils/api";
import {  Address, beginCell,  external,  fromNano,  internal,  MessageRelaxed,  SendMode,  storeMessage,  toNano } from "@ton/core";
import * as StakingMaster from "../output/staking/tact_StakeMaster";
import { validationResult } from "express-validator";
import { ClaimRequest } from "../utils/stake";
import * as Stake from "../output/staking/tact_Stake";
import { mnemonicToPrivateKey, mnemonicToWalletKey, sign } from "@ton/crypto";
import { HighloadWalletContractV2 } from "../output/wallet/HighloadWalletV2";
import { createJettonTransferMessage, toTokenNano } from "../utils/jetton";
import { jettonMasterAddress } from "../utils/config";
import { JettonMaster } from "@ton/ton";

export const routeSendTokens = async (req: Request, res: Response) => {
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

        const data = req.body as SendTokensRequest;
        const query_id = BigInt(Date.now());

        const client4 = await getTonClient();
        let mnemonic = (process.env.OWNER_CONTRACT_MNEMONIC || "").toString();
        let keyPair = await mnemonicToPrivateKey(mnemonic.split(" "));
        let secretKey = keyPair.secretKey;
        let workchain = 0;
        
        const owner = HighloadWalletContractV2.create({ publicKey: keyPair.publicKey, workchain, walletId: 0 });
        const walletContract = client4.open(owner);
        const txns: MessageRelaxed[] = [];
        if (data.address !== '') {
            const jettonAddress = Address.parse(data.address);
            const jetton = await JettonMaster.create(jettonAddress);
            const jettonMaster = client4.open(jetton);
            console.log('jettonMaster: ', jettonMaster.address.toString({urlSafe: true}));
            console.log('owner: ', owner.address.toString({urlSafe: true}));
            const masterWallet = await jettonMaster.getWalletAddress(owner.address);
            const resp = await fetch(`https://tonapi.io/v2/jettons/` + data.address);
            const json = await resp.json();
            const decimals = parseInt(json.metadata.decimals);

            console.log('masterWallet: ', masterWallet.toString({urlSafe: true}), 'decimals: ', decimals);
            for (const [key, value] of Object.entries(data.items)) {
                const address = Address.parse(key);
                const amount = toTokenNano(value, decimals);
                console.log('Add address: ', address.toString({urlSafe: true}), ' amount: ', fromNano(amount));
                txns.push(internal({
                    value: toNano("0.05"),
                    to: masterWallet,
                    body: createJettonTransferMessage({
                        amount,
                        destination: address,
                        queryId: query_id,
                        forwardTonAmount: 0n,
                    })
                }) as MessageRelaxed);   
            }
        } else {
            for (const [key, value] of Object.entries(data.items)) {
                const address = Address.parse(key);
                const amount = toNano(value);
                console.log('Add address: ', address.toString({urlSafe: true}), ' amount: ', fromNano(amount));
                txns.push(internal({
                    value: amount,
                    to: address,
                }) as MessageRelaxed);   
            }
        }

        const { body, queryId } = walletContract.createTransfer({
            secretKey,
            messages: txns.filter(tx => tx !== undefined && tx !== null) as MessageRelaxed[],
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            timeout: 10000,
        });

        const sendMsg = external({
            to: walletContract.address,
            body,
        })
    
        const cell = beginCell().store(storeMessage(sendMsg)).endCell();
        const boc = cell.toBoc();
        const result = await client4.sendMessage(boc);

        res.json({
            success: true,
            queryId: queryId.toString(),
            status: result.status,
            txid: cell.hash().toString('hex'),
        });
    } catch (e) {
        sendError(res, e);
    }
}