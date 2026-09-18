import { TonClient4} from "@ton/ton";
import * as dotenv from "dotenv";
import express, { Request, Response } from 'express';
import {getHttpV4Endpoint} from "@orbs-network/ton-access";
import { body } from 'express-validator';
import cors from 'cors';
import promClient from 'prom-client';
import { routeIndex } from "./routes/routeIndex";
import { routeNftKraft } from "./routes/routeNftKraft";
import { routeNftUpgrade } from "./routes/routeNftUpgrade";
import { routeNftIssue } from "./routes/routenftIssue";
import { routeTestWallet } from "./routes/routeTestWallet";
import { routeNftCheck } from "./routes/routeNftCheck";
import { routeBuyNft } from "./routes/routeBuyNft";
import { routeTestAddress } from "./routes/routeTestAddress";
import { routeTest } from "./routes/routeTest";
import { routeBumpTicketBuy } from "./routes/routeBumpticketBuy";
import { routePutOnSale } from "./routes/routePutOnSale";
import { routeBuySale } from "./routes/routeBuySale";
import { routeCancelSale } from "./routes/routeCancelSale";
import { routeTestBuy } from "./routes/routeTestBuy";
import { getEnv } from "./utils/api";
import { routeStake } from "./routes/routeStake";
import { routeClaim } from "./routes/routeClaim";
import { routeRestake } from "./routes/routeRestake";
import { routeStakeWithdraw } from "./routes/routeStakeWithdraw";
import { routeSendTokens } from "./routes/routeSendTokens";
import { routeProvideLiquidity } from "./routes/routeProvideLiquidity";
import { routeStakeDetails } from "./routes/routeStakeDetails";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
    origin: '*',
    methods: '*',
};

const buyValidationRules = [
    body('address').notEmpty().isString().withMessage('Invalid address'),
    body('nft_id').notEmpty().isInt().isIn([1, 2, 3, 4, 5]).withMessage('Invalid NFT ID'),
    body('hash').notEmpty().isString().withMessage('Invalid hash'),
];

const saleValidationRules = [
    body('address').notEmpty().isString().withMessage('Invalid address'),
    body('price').notEmpty().isString().withMessage('Invalid price'),
    body('owner').notEmpty().isString().withMessage('Invalid hash'),
];

const changePriceValidationRules = [
    body('price').notEmpty().isString().withMessage('Invalid price'),
];

const getTonClient = async () => getEnv('NETWORK') === 'testnet' ? new TonClient4({
    endpoint: 'https://sandbox-v4.tonhubapi.com/',
}) : new TonClient4({endpoint: await getHttpV4Endpoint(), timeout: 10000});

const register = new promClient.Registry();
register.setDefaultLabels({
    app: 'monitoring-article',
});
promClient.collectDefaultMetrics({ register });

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    routeIndex(req, res);
});

app.get('/metrics', async (req: Request, res: Response) => {
    res.setHeader('Content-Type', register.contentType);
    res.send(await register.metrics());
});

app.post('/nft/issue', routeNftIssue);
app.post('/test/wallet', routeTestWallet);
app.post('/nft/check', routeNftCheck);

app.post('/nft-ship/kraft',  (req: Request, res: Response) => {
    routeNftKraft(req, res);
});

app.post('/nft-ship/upgrade',  (req: Request, res: Response) => {
    routeNftUpgrade(req, res);
});

app.post('/buy', buyValidationRules, routeBuyNft);
app.get('/test-address', routeTestAddress);
app.get('/test', routeTest);

app.get('/bumpticket/buy', routeBumpTicketBuy);

app.post('/sale/put', saleValidationRules, routePutOnSale);
app.post('/sale/buy', routeBuySale);
app.post('/sale/cancel', saleValidationRules, routeCancelSale);
app.post('/sale/change-price', changePriceValidationRules, routeCancelSale);

app.post('/stake', routeStake);
app.post('/claim', routeClaim);
app.post('/restake', routeRestake);
app.post('/stake/withdraw', routeStakeWithdraw);
app.post('/tokens/send', routeSendTokens);
app.post('/stake/details', routeStakeDetails);
app.post('/providelp', routeProvideLiquidity);

app.post('/buy-test', buyValidationRules, routeTestBuy);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});