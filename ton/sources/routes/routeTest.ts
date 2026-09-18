import { Request, Response } from "express";
import { ApiError, getEnv, sendError } from "../utils/api";
import jwt, {  JwtPayload } from 'jsonwebtoken';

export const routeTest = async (req: Request, res: Response) => {
    try {
        res.set({
            'Content-Type': 'application/json'
        });

        const token = (req.header('Authorization'))?.toString() || '';
        if (!token) {
            throw new ApiError(401, 'Unauthorized');
        }

        console.log(getEnv('JWT_SECRET'));
        const tokenData = jwt.verify(token.substring(7), getEnv('JWT_SECRET')) as JwtPayload;
        if (!tokenData) {
            throw new ApiError(401, 'Unauthorized');
        }

        res.send({code: 200});
    } catch (e) {
        sendError(res, e);
    }
}