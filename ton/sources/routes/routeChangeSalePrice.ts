import {Request, Response} from "express";
import { ApiError, getEnv, getJWTHash, getTonClient, sendError } from "../utils/api";
import { validationResult } from "express-validator";
import { Queries } from "../output/nft-fixprice-sale-v3/NftFixpriceSaleV3.data";
import { ChangePrice } from "../utils/sales";
import * as ton from 'ton';
import { BN } from "bn.js";

export const routeChangeSalePrice = async (req: Request, res: Response) => {
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

        const data = req.body as ChangePrice;
        const price = ton.toNano(data.price);
        const body = Queries.changePrice({
            marketplaceFee: new BN(0),
            royaltyAmount: price.mul(new BN(5)).div(new BN(100)),
            price,
        });

        res.send({
            body: body.toBoc().toString('base64'),
        })
    } catch (e) {
        sendError(res, e);
    }
}