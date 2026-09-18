import {Request, Response} from "express";
import { ApiError, getEnv, getJWTHash, getTonClient, ProvideLiquidityRequest, sendError } from "../utils/api";
import { mnemonicToPrivateKey } from "ton-crypto";
import { Address, beginCell,  external, internal, SendMode, storeMessage, toNano } from "@ton/core";
import { JettonMaster } from "@ton/ton";
import { pTonAddress, stonFiRouterAddress } from "../utils/config";
import { DEX, pTON } from "@ston-fi/sdk";
import { HighloadWalletContractV2 } from "../output/wallet/HighloadWalletV2";

export const routeProvideLiquidity = async (req: Request, res: Response) => {
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

        const data = req.body as ProvideLiquidityRequest;

        console.log(data);
        const client = await getTonClient();
        const router = client.open(
            DEX.v2_1.Router.create(
            stonFiRouterAddress // CPI Router v2.1.0
            )
        );

        console.log("Router address: ", stonFiRouterAddress);
        
        const proxyTon = pTON.v2_1.create(
            pTonAddress // pTON v2.1.0
        );

        console.log("pTON address: ", pTonAddress);

        let mnemonic = getEnv('OWNER_CONTRACT_MNEMONIC').replaceAll('"', '');
        let keyPair = await mnemonicToPrivateKey(mnemonic.split(" "));
        let secretKey = keyPair.secretKey;
        let workchain = 0;
        const owner = HighloadWalletContractV2.create({ publicKey: keyPair.publicKey, workchain, walletId: 0 });
        const walletContract = client.open(owner);
        const queryId = BigInt(Date.now());

        console.log({
            userWalletAddress: owner.address,
            proxyTon,
            sendAmount: toNano(data.amount),
            otherTokenAddress: Address.parse(data.jetton_address),
            minLpOut: "1",
            queryId,
        })

        const pTonOpen = client.open(proxyTon);
        const jetton = await JettonMaster.create(Address.parse(data.jetton_address));
        const jettonMaster = await client.open(jetton);

        const pTonWallet = await pTonOpen.getWalletAddress(router.address);
        const jettonWallet = await jettonMaster.getWalletAddress(router.address);
        
        // deposit 1 TON to the TON/TestRED pool and get at least 1 nano LP token
        const txParams = await router.getSingleSideProvideLiquidityTonTxParams({
            userWalletAddress: owner.address,
            proxyTon,
            sendAmount: toNano(data.amount),
            otherTokenAddress: Address.parse(data.jetton_address),
            minLpOut: "1",
            queryId,
        });

        const poolAddress = await router.getPoolAddress({
            token1: pTonWallet,
            token0: jettonWallet,
        })

        console.log(txParams);
        
        const transfer = await walletContract.createTransfer({
            secretKey,
            messages: [internal({
                to: txParams.to,
                value: txParams.value,
                body: txParams.body,
                bounce: txParams.bounce,
                init: txParams.init
            })],
            sendMode: SendMode.PAY_GAS_SEPARATELY,
        })

        const sendMsg = external({
            to: owner.address,
            body: transfer.body,
        })

        const cell = beginCell().store(storeMessage(sendMsg)).endCell();
        const boc = cell.toBoc();
        await client.sendMessage(boc);

        res.json({
            success: true,
            queryId: queryId.toString(),
            txid: cell.hash().toString('hex'),
            pool: poolAddress.toString({urlSafe: true, testOnly: false, bounceable: true})
        })
    } catch (e) {
        sendError(res, e);
    }
}