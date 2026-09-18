import { Address, beginCell, Cell, external, internal, SendMode, storeMessage, toNano, TonClient4, WalletContractV4 } from "@ton/ton";
import { mnemonicToPrivateKey } from "ton-crypto";
import * as ton from 'ton';
import { buildNftFixPriceSaleV3R3StateInit } from "../output/nft-fixprice-sale-v3/NftFixpriceSaleV3.data";
import { BN } from "bn.js";
import { DeployerLocal } from "../output/Deployer";
import { storeTransfer } from "../output/ships/MM-NFT_ShipsCollection";
import { must } from "../utils/retry";

export const deploySale = async (client: TonClient4, nftAddress: string) => {
    let mnemonic = (process.env.OWNER_CONTRACT_MNEMONIC || "").toString();
    let keyPair = await mnemonicToPrivateKey(mnemonic.split(" "));
    let secretKey = keyPair.secretKey;
    let workchain = 0;
    let wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
    let wallet_contract = client.open(wallet);

    const marketplace = process.env.MARKETPLACE_ADDRESS || "";
    const price = ton.toNano('0.01');

    console.log(wallet.address.toString({ testOnly: false, urlSafe: true, bounceable: false }));
    
    const saleInit = buildNftFixPriceSaleV3R3StateInit({
        createdAt: Math.floor(Date.now() / 1000),
        fullPrice: price,
        marketplaceFee: new BN(0),
        marketplaceAddress: ton.Address.parse(marketplace),
        marketplaceFeeAddress: ton.Address.parse(marketplace),
        nftAddress: ton.Address.parse(nftAddress),
        royaltyAddress: ton.Address.parse(wallet.address.toString()),
        royaltyAmount: price.mul(new BN(5)).div(new BN(100)),
        nftOwnerAddress: ton.Address.parse(wallet.address.toRawString())
    });

    const putToSale = DeployerLocal.createSaleDeployPayload(saleInit.stateInit, DeployerLocal.createDeployMessage());

    const transfer = beginCell().store(storeTransfer({
        forward_amount: toNano(0.2),
        new_owner: Address.parse(marketplace),
        forward_payload: Cell.fromBoc(putToSale.toBoc())[0],
        query_id: BigInt(0),
        custom_payload: null,
        $$type: 'Transfer',
        response_destination: Address.parse(wallet.address.toRawString()),
    })).endCell();

    const seqno = await must(() => wallet_contract.getSeqno());

    console.log(`seqno: ${seqno.toString()}`);
    await wallet_contract.sendTransfer({
        secretKey,
        seqno,
        messages: [internal({
            to: nftAddress,
            value: "0.3",
            body: transfer
        })]
    })
}