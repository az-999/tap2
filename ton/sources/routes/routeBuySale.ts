import {Request, Response} from "express";
import { ApiError, getEnv, getJWTHash, getTonClient, sendError } from "../utils/api";
import { validationResult } from "express-validator";
import { Queries } from "../output/nft-fixprice-sale-v3/NftFixpriceSaleV3.data";

export const routeBuySale = async (req: Request, res: Response) => {
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

        const body = Queries.buyMessage({
            queryId: BigInt(0),
        }).toBoc();

        res.send({
            body: body.toString('base64'),
        })
    } catch (e) {
        sendError(res, e);
    }
}