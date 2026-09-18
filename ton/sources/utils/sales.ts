import { Cell } from "@ton/core";
import { StateInit } from "ton";
import { Maybe } from "ton/dist/types";

export type CreateSale = {
    address: string;
    price: string;
    owner: string;
}

export type BuySale = {
    address: string;
    dest_address: string;
}

export type ChangePrice = {
    price: string;
}

export const convertStateInit = (src: StateInit) => {
    let code: Maybe<Cell> = null;
    let data: Maybe<Cell> = null;
    if (src.code) {
        code = Cell.fromBoc(src.code.toBoc())[0];
    }
    if (src.data) {
        data = Cell.fromBoc(src.data.toBoc())[0];
    }
    return { code, data };
}