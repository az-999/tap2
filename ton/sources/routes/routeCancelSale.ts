import {Request, Response} from "express";
import { ApiError, getEnv, getJWTHash, getTonClient, sendError } from "../utils/api";
import { Queries } from "../output/nft-fixprice-sale-v3/NftFixpriceSaleV3.data";

export const routeCancelSale = async (req: Request, res: Response) => {
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

        const body = Queries.cancelSale({
            queryId: 0,
        })


        res.send({
            body: body.toBoc().toString('base64'),
        })    
    } catch (e) {
        sendError(res, e);
    }
}