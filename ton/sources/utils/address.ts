import {beginCell, toNano} from "@ton/ton";


const body = beginCell()
    .storeUint(0, 32) // write 32 zero bits to indicate that a text comment will follow
    .storeStringTail("Mint") // write our text comment
    .endCell();

let n = body.toBoc().toString("base64")

console.log(n)

n = toNano(0.15).toString()
console.log(n)
