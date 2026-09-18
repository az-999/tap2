import { getEnv, makeBody } from "./utils/api";
import * as dotenv from "dotenv";
dotenv.config();

console.log(': ', makeBody(getEnv('API_PRIVATE_KEY'), {
    // address: 'UQDSni3H4D2iR7ZNU7nxWNm0vLFAAyw7XRD9eEnbM2CElNwB',
    // nft_id: 1,
}));
