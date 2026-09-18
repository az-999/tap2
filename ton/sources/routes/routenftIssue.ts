
import { Request, Response } from 'express';
import { ApiError, getEnv, getJWTHash, getTonClient, OFFCHAIN_CONTENT_PREFIX, sendError } from '../utils/api';
import { getCollectionConfig } from '../utils/config';
import { createNftTransferBody, IssueRequest, ogpassConfig, qweCollection, shipsConfig, ValidateIssue, ValidateIssue2 } from "../utils/ships";
import * as ShipApi from "../output/ships/MM-NFT_ShipsCollection";
import { Address, beginCell, external, internal, SendMode, storeMessage, toNano } from '@ton/core';
import { MintByOwner, storeMintByOwner } from '../output/MM-NFT_VoucherCollection';
import { mnemonicToWalletKey } from 'ton-crypto';
import { HighloadWalletContractV2 } from '../output/wallet/HighloadWalletV2';
import { MintParams, ShipsCollection } from "../output/wrappers/ShipsCollection";

export const routeNftIssue = async (req: Request, res: Response) => {
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

        const data = req.body as IssueRequest;
        const msgs = [];
        const nftConfig = getCollectionConfig();
        const client = await getTonClient();
        const mnemonic = getEnv('OWNER_CONTRACT_MNEMONIC').replaceAll('"', '');
        if (!mnemonic) {
            throw new ApiError(432, 'Invalid mnemonic');
        }

        const key = await mnemonicToWalletKey(mnemonic.split(' '));
        const owner = HighloadWalletContractV2.create({ publicKey: key.publicKey, workchain: 0, walletId: 0 });
        const shipsAddr = Address.parse(shipsConfig.address);
        const shipsColection = await ShipsCollection.createFromAddress(shipsAddr);
        const shipContract = await client.open(shipsColection);
        const collectionData = await shipContract.getCollectionData();
        let idx = collectionData.nextItemIndex;

        const ships: MintParams[] = [];
        for (const mint of data.mint) {
            if (mint.nft_id >= nftConfig.length) {
                let metadata: string;
                let address: string;

                switch (mint.nft_id) {
                case shipsConfig.nft_id:
                    console.log('Mint ship')
                    if (mint.item_id >= shipsConfig.items.length) {
                        throw new ApiError(432, 'Invalid item ID');
                    }

                    const item = shipsConfig.items[mint.item_id];
                    metadata = item.metadata;
                    address = shipsConfig.address;
                    ships.push({
                        content: beginCell().storeInt(OFFCHAIN_CONTENT_PREFIX, 8).storeStringRefTail(metadata).endCell(),
                        index: idx++,
                        to: Address.parse(mint.address),
                        value: toNano('0.01'),
                        queryId: BigInt(Date.now()),
                        treasury: Address.parse(qweCollection),
                    });
                    continue;
                case ogpassConfig.nft_id:
                    console.log('Mint OG Pass')
                    metadata = ogpassConfig.metadata;
                    address = ogpassConfig.address;

                    const md = beginCell().storeInt(OFFCHAIN_CONTENT_PREFIX, 8).storeStringRefTail(metadata).endCell();

                    const body = beginCell()
                        .storeUint(0x158dcbb4, 32)
                        .storeAddress(Address.parse(mint.address))
                        .storeRef(md)
                        .endCell();

                    msgs.push(internal({
                        to: Address.parse(address),
                        value: toNano('0.3'),
                        body: body,
                        bounce: true,
                    }));
                    continue;
                default:
                    throw new ApiError(432, 'Invalid NFT ID');   
                }

                const msg: ShipApi.MintByOwner = {
                    $$type: 'MintByOwner',
                    content: beginCell().storeInt(0x01, 8).storeStringRefTail(metadata).endCell(),
                    mint_to: Address.parse(mint.address),
                }

                const body = beginCell().store(ShipApi.storeMintByOwner(msg)).endCell();

                msgs.push(internal({
                    to: Address.parse(address),
                    value: toNano('0.3'),
                    body: body,
                    bounce: true,
                }));

                console.log('Message', {
                    to: address,
                    value: toNano('0.3'),
                    body: body.toBoc().toString('hex'),
                    bounce: true,
                })
            } else {
                const nft = nftConfig[mint.nft_id];
                const msg: MintByOwner = {
                    $$type: 'MintByOwner',
                    mint_to: Address.parse(mint.address),
                }

                const body = beginCell().store(storeMintByOwner(msg)).endCell();
                msgs.push(internal({
                    to: Address.parse(nft.address),
                    value: toNano('0.3'),
                    body: body,
                    bounce: true,
                }));
            }
        }

        if (ships.length > 0) {
            const value = toNano('0.01') * BigInt(ships.length) + toNano('0.02');
            const data = await shipsColection.createMultiMintTxParams(BigInt(Date.now()), value, ships);
            msgs.push(internal({
                to: shipsAddr,
                value,
                body: data.body,
                bounce: true
            }))
        }

        const walletContract = client.open(owner);
        console.log('Send to',owner.address);
        const { body, queryId } = walletContract.createTransfer({
            secretKey: key.secretKey,
            messages: msgs,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            timeout: 10000,
        });

        const msg = external({
            to: walletContract.address,
            body,
        })

        const cell = beginCell().store(storeMessage(msg)).endCell();
        const boc = cell.toBoc();
        await client.sendMessage(boc);

        res.send({
            queryId: queryId.toString(),
            txid: cell.hash().toString('hex'),
        });
    } catch (e) {
        sendError(res, e);
    }
}