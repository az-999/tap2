import {Request, Response} from "express";

export const routeIndex = (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
}