import {Request, Response} from "express";
import { ApiError, getEnv, getJWTHash, getTonClient, sendError } from "../utils/api";
import { mnemonicToWalletKey } from "ton-crypto";
import { Address, beginCell, Cell, toNano } from "@ton/core";
import { validationResult } from "express-validator";
import { CreateSale } from "../utils/sales";
import { WalletContractV4 } from "@ton/ton";
import * as ton from 'ton';
import { buildNftFixPriceSaleV3R3StateInit } from "../output/nft-fixprice-sale-v3/NftFixpriceSaleV3.data";
import { marketComissionAddress } from "../utils/config";
import { BN } from "bn.js";
import { DeployerLocal } from "../output/Deployer";
import { storeTransfer } from "../output/MM-NFT_VoucherCollection";

export const routePutOnSale = async (req: Request, res: Response) => {
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

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ApiError(432, errors.array()[0].msg);
        }

        const data = req.body as CreateSale;
        const marketplace = getEnv('MARKETPLACE_ADDRESS');
        const client = await getTonClient();
        let mnemonic = getEnv('OWNER_CONTRACT_MNEMONIC').replaceAll('"', ''); //загружаем с .енв фразу кошелька, с которого деплоили
        const key = await mnemonicToWalletKey(mnemonic.split(" "));
        const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });

        // open wallet and read the current seqno of the wallet
        const walletContract = client.open(wallet);
        const walletSender = walletContract.sender(key.secretKey);
        const price = ton.toNano(data.price);

        const saleInit = buildNftFixPriceSaleV3R3StateInit({
            createdAt: Math.floor(Date.now() / 1000),
            fullPrice: price,
            marketplaceFee: new BN(0),
            marketplaceAddress: ton.Address.parse(marketplace),
            marketplaceFeeAddress: ton.Address.parse(marketplace),
            nftAddress: ton.Address.parse(data.address),
            royaltyAddress: ton.Address.parse(marketComissionAddress),
            royaltyAmount: price.mul(new BN(5)).div(new BN(100)),
            nftOwnerAddress: ton.Address.parse(data.owner)
        });

        const putToSale = DeployerLocal.createSaleDeployPayload(saleInit.stateInit, DeployerLocal.createDeployMessage());

        const transfer = beginCell().store(storeTransfer({
            forward_amount: toNano(0.2),
            new_owner: Address.parse(marketplace),
            forward_payload: Cell.fromBoc(putToSale.toBoc())[0],
            query_id: BigInt(0),
            custom_payload: null,
            $$type: 'Transfer',
            response_destination: Address.parse(data.owner),
        })).endCell();

        res.send({
            body: transfer.toBoc().toString('base64'),
            address: saleInit.address.toFriendly({
                testOnly: false,
                bounceable: false,
                urlSafe: true
            })
        })
    } catch (e) {
        sendError(res, e);
    }
}