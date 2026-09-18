import { Sha256 } from "@aws-crypto/sha256-js";
import { Dictionary, beginCell, Cell, Address, toNano } from "@ton/core";

const ONCHAIN_CONTENT_PREFIX = 0x00;
const SNAKE_PREFIX = 0x00;
const CELL_MAX_SIZE_BYTES = Math.floor((1023 - 8) / 8);

const sha256 = (str: string) => {
    const sha = new Sha256();
    sha.update(str);
    return Buffer.from(sha.digestSync());
};

const toKey = (key: string) => {
    return BigInt(`0x${sha256(key).toString("hex")}`);
};

export function buildOnchainMetadata(data: { name: string; description: string; image: string }): Cell {
    let dict = Dictionary.empty(Dictionary.Keys.BigUint(256), Dictionary.Values.Cell());

    // Store the on-chain metadata in the dictionary
    Object.entries(data).forEach(([key, value]) => {
        dict.set(toKey(key), makeSnakeCell(Buffer.from(value, "utf8")));
    });

    return beginCell().storeInt(ONCHAIN_CONTENT_PREFIX, 8).storeDict(dict).endCell();
}

export function makeSnakeCell(data: Buffer) {
    // Create a cell that package the data
    let chunks = bufferToChunks(data, CELL_MAX_SIZE_BYTES);

    const b = chunks.reduceRight((curCell, chunk, index) => {
        if (index === 0) {
            curCell.storeInt(SNAKE_PREFIX, 8);
        }
        curCell.storeBuffer(chunk);
        if (index > 0) {
            const cell = curCell.endCell();
            return beginCell().storeRef(cell);
        } else {
            return curCell;
        }
    }, beginCell());
    return b.endCell();
}

function bufferToChunks(buff: Buffer, chunkSize: number) {
    let chunks: Buffer[] = [];
    while (buff.byteLength > 0) {
        chunks.push(buff.slice(0, chunkSize));
        buff = buff.slice(chunkSize);
    }
    return chunks;
}


export function createJettonTransferMessage(params: {
    queryId: bigint;
    amount: bigint;
    destination: Address;
    responseDestination?: Address;
    customPayload?: Cell;
    forwardTonAmount: bigint;
    forwardPayload?: Cell;
}) {
    const builder = beginCell();

    builder.storeUint(0xf8a7ea5, 32);
    builder.storeUint(params.queryId, 64);
    builder.storeCoins(params.amount);
    builder.storeAddress(params.destination);
    builder.storeAddress(
        params.responseDestination
            ? params.responseDestination
            : undefined,
    );

    if (params.customPayload) {
        builder.storeBit(true);
        builder.storeRef(params.customPayload);
    } else {
        builder.storeBit(false);
    }

    builder.storeCoins(BigInt(params.forwardTonAmount));

    if (params.forwardPayload) {
        builder.storeBit(true);
        builder.storeRef(params.forwardPayload);
    } else {
        builder.storeBit(false);
    }

    return builder.endCell();
}

export function toTokenNano(src: string | number | bigint, decimals: number = 18) {
    const mul = BigInt(10) ** BigInt(decimals);
    if (typeof src === 'bigint') {
        return src * mul;
    }
    else {
        if (typeof src === 'number') {
            if (!Number.isFinite(src)) {
                throw Error('Invalid number');
            }
            if (Math.log10(src) <= 6) {
                src = src.toLocaleString('en', { minimumFractionDigits: 9, useGrouping: false });
            }
            else if (src - Math.trunc(src) === 0) {
                src = src.toLocaleString('en', { maximumFractionDigits: 0, useGrouping: false });
            }
            else {
                throw Error('Not enough precision for a number value. Use string value instead');
            }
        }
        // Check sign
        let neg = false;
        while (src.startsWith('-')) {
            neg = !neg;
            src = src.slice(1);
        }
        // Split string
        if (src === '.') {
            throw Error('Invalid number');
        }
        let parts = src.split('.');
        if (parts.length > 2) {
            throw Error('Invalid number');
        }
        // Prepare parts
        let whole = parts[0];
        let frac = parts[1];
        if (!whole) {
            whole = '0';
        }
        if (!frac) {
            frac = '0';
        }
        if (frac.length > decimals) {
            throw Error('Invalid number');
        }
        while (frac.length < decimals) {
            frac += '0';
        }
        // Convert
        let r = BigInt(whole) * mul + BigInt(frac);
        if (neg) {
            r = -r;
        }
        return r;
    }
}