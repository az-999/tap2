import {Request, Response} from "express";
import { ApiError, BuyRequest, getEnv, getJWTHash, getNftList, getTonClient, sendError } from "../utils/api";
import { mnemonicToWalletKey } from "ton-crypto";
import { HighloadWalletContractV2 } from "../output/wallet/HighloadWalletV2";
import { validationResult } from "express-validator";
import { Address, toNano } from "@ton/core";
import { MintByOwner, VoucherCollection } from "../output/MM-NFT_VoucherCollection";
import { must } from "../utils/retry";
import { getCollectionInfo } from "../utils/config";
import { WalletContractV4 } from "@ton/ton";

export const routeBuyNft = async (req: Request, res: Response) => {
    try {
        res.set({
            'Content-Type': 'application/json'
        });

        const token = (req.header('Authorization'))?.toString() || '';
        console.log('token: ', token);
        if (!token) {
            throw new ApiError(401, 'Token required');
        }

        if (token.substring(7) !== getJWTHash()) {
            throw new ApiError(401, 'Unauthorized');
        }

        console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ApiError(432, errors.array()[0].msg);
        }

        const data = req.body as BuyRequest;
        // if (!validateHash(data)) throw new ApiError(432, 'Invalid hash');

        const userAddress = data.address;
        const nft_id = data.nft_id;

        if (isNaN(nft_id)) {
            throw new ApiError(432, 'Invalid NFT ID');
        }

        const nftList = getNftList(),
            nftAddress = (nftList[nft_id-1]) || '';

        console.log('Selected NFT address: ', nftAddress);
        const user_address = Address.parse(userAddress); // получаем с кошелька пользователя через tonconnect
        const MintMsg: MintByOwner= {
            $$type: 'MintByOwner',
            mint_to: user_address
        };

        const client = await getTonClient();

        // Parameters
        const collection_address = Address.parse(nftAddress); // адрес коллекции

        const contract_address = await VoucherCollection.fromAddress(collection_address);
        const client_open = client.open(contract_address);

        const collectiondata = await must(() => client_open.getGetCollectionData())
        const index = Number(collectiondata.next_item_index);

        const info = getCollectionInfo(nft_id);
        if (!info) {
            throw new ApiError(432, 'Invalid NFT ID');
        }
        
        if (index > info.totalSupply) {
            throw new ApiError(431, 'Maximum amount of NFT minted');
        }

        let mnemonic = getEnv('OWNER_CONTRACT_MNEMONIC').replaceAll('"', ''); //загружаем с .енв фразу кошелька, с которого деплоили
        const key = await mnemonicToWalletKey(mnemonic.split(" "));
        const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });

        // open wallet and read the current seqno of the wallet
        const walletContract = client.open(wallet);
        const walletSender = walletContract.sender(key.secretKey);
        const balance = await must(() => walletContract.getBalance()) // проверяем наш баланс (нужно 0.3, чтобы транза прошла без проблем)
        if (balance < toNano(0.3)) {
            throw new ApiError(430, 'Insufficient balance of deployer\'s wallet');
        }

        // здесь функция заморзки денег юзера на бэке
        // const result = await notifyTransactionStarted(apiUrl, token, nft_id, collectiondata.next_item_index);

        // Вызываю функцию MINT NFT
        await must(() => client_open.send(walletSender, { value: toNano(0.3), bounce: false }, MintMsg)); //сама транза на минт
        res.send(JSON.stringify({index: collectiondata.next_item_index.toString()}));
    } catch (e) {
        sendError(res, e);
    }
}