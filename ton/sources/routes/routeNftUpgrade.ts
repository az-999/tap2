import {Request, Response} from "express";
import {ApiError, getEnv, getJWTHash, sendError} from "../utils/api";
import {storeUpgradeShip} from "../output/ship_contract/tact_ShipAssembler";
import {keyPairFromSeed, sign} from "ton-crypto";
import {Address, beginCell} from "@ton/ton";

function buf2hex(buffer: Buffer) { // buffer is an ArrayBuffer
    return [...new Uint8Array(buffer)]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('');
}

type UpgradeData = {
    nft1: string;
    nft2: string;
    nft3: string;
    nft4: string;
    nft5: string;
    nft6: string;
    nft7: string;
    ship_level: number;
}

export const routeNftUpgrade = async (req: Request, res: Response) => {
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

        const data = req.body as UpgradeData;

        // Генерация секретного и публичного ключей
        const seedKey = getEnv('KRAFT_SEED_KEY');
        const seed = new Buffer(seedKey); // Генерируем seed
        const keyPair = await keyPairFromSeed(seed); // Генерируем пару ключей

        // Получаем публичный и приватный ключи
        const publicKey = keyPair.publicKey;
        const secretKey = keyPair.secretKey;

        const ship_level = data.ship_level;

        console.log(data.nft1);
        console.log(data.nft2);
        console.log(data.nft3);
        console.log(data.nft4);
        console.log(data.nft5);
        console.log(data.nft6);
        console.log(data.nft7);

        const nft_contract_1 = Address.parse(data.nft1);
        const nft_contract_2 = Address.parse(data.nft2);
        const nft_contract_3 = Address.parse(data.nft3);
        const nft_contract_4 = Address.parse(data.nft4);
        const nft_contract_5 = Address.parse(data.nft5);
        const nft_contract_6 = Address.parse(data.nft6);
        const nft_contract_7 = Address.parse(data.nft7);

        let sign_version = 1;
        let hash = beginCell().storeUint(ship_level, 256).endCell().hash();

        const signature = sign(hash, secretKey);
        console.log(signature);

        // const a1:

        let ipfs = [
            'https://itchy-green-dolphin.myfilebase.com/ipfs/Qmb8rWx6zGKyMGobJa4ZoazC1tEgoAMVsxGBttvLQY7UyT',// 2
            'https://ipfs.filebase.io/ipfs/QmQzGsmmfzCo6bCaAHuhi1771sTnpvsg9FuAovkNDtRYjx',// 3
            'https://ipfs.filebase.io/ipfs/QmZhvZoTnFXPq7R584cLSxoWPzzHt7rGc15UqP1PAFpxea',// 4
            'https://ipfs.filebase.io/ipfs/QmfYprwKbAz7oFFVY9knXTS67NJYAr3pA9naDiREaCmAKe',// 5
            'https://ipfs.filebase.io/ipfs/QmcSyzMZFVdwrZNKZNA1Wg5kZu7omfLLoKn67NAfZgvr92',// 6
            'https://ipfs.filebase.io/ipfs/QmUwWXmjpzvXREMT95sNGTKYUuSghxidnXFGcfA8PsVVah',// 7
            'https://ipfs.filebase.io/ipfs/QmddWuH6pPiseaZMmCAMnZzUV4nHDc5S7WkBRgn7GMLbB9',// 8
            'https://ipfs.filebase.io/ipfs/QmYCwKiEyNErH3pDmqD4eagicfxDyMyGA5hNSXP8CJEoba',// 9
            'https://ipfs.filebase.io/ipfs/QmPu6UBwL2eWnTTLj19V2CTwPGGHBJCMMNfgqAZCg2kSKB',// 10
            'https://ipfs.filebase.io/ipfs/Qme2ikAHAZbaz1p295MJGXKnaEQ59YYUDbunAFVnKkTt4y',// 11
            'https://ipfs.filebase.io/ipfs/QmRie4Ttwp5N2k9LKSpGYAgr2sD9zR5Cj9iVXax7Fz2XK5',// 12
            'https://ipfs.filebase.io/ipfs/QmQJXc8ejtDo6csYm2vpKZ7jbZhByfRcshA4JNKzpB82Jk',// 13
            'https://ipfs.filebase.io/ipfs/QmNTNsWmy8Lq9x1FgYfxSKwsqmVcKcSVyKXwWgo59W4QFW',// 14
            'https://ipfs.filebase.io/ipfs/QmNM7rP1qG7CAzcGSzMcj6t7jwK4u3jQGQr4xxSgAQ2f4X',// 15
            'https://ipfs.filebase.io/ipfs/Qmf2pooHwBua2GJtqnDQSvwxWJpGcUKkzuKgj5VjS9DqRE',// 16
            'https://ipfs.filebase.io/ipfs/QmT58jSE8XzYsEoJwX5K6psLAAug42Rk3bvyr89vRzU9Qv',// 17
            'https://ipfs.filebase.io/ipfs/QmbBGh4ckioNTT87tKAREWPAUF9dSGZX8sVwT7C1KojecY',// 18
            'https://ipfs.filebase.io/ipfs/QmRLixEoAMBTbJTinz3dHB1CKTnL6p5Z5AWNECXB1enDBN',// 19
            'https://ipfs.filebase.io/ipfs/QmbaqwTYmEE2vuf2sD3x6dP4kyZHr5T9k4sb3mN5we7y69',// 20
            'https://ipfs.filebase.io/ipfs/QmerNtxcNbaxk34QgnDa57Acn9yxbrzJcRmQVK2YquRd6N',// 21
            'https://ipfs.filebase.io/ipfs/QmW41RU1GySKH4DNWPY4SMdXLFaKStabXNnUjWajja2Nza',// 22
            'https://ipfs.filebase.io/ipfs/QmNucZA3p7bytaHXtkkq6DZqvtxRs55biZzf66JTk8JxtA',// 23
            'https://ipfs.filebase.io/ipfs/Qmc7hRq3jbeLDVdLrFM1zYau51bCc4r8u3otXKman5RzR9',// 24
            'https://ipfs.filebase.io/ipfs/QmZaALHp52AqVgRiNhxUMnePDBHaQmBbPNcNHRzM35sE8C',// 25
            'https://ipfs.filebase.io/ipfs/QmPLQsbscgTqrukam5KEhpmu7t8wYNvfirRMUrNegAK1E9',// 26
            'https://ipfs.filebase.io/ipfs/QmVkW8xmeJ41SVbBCkb5zyBpxbqaGSC1jRuNttfVE9fHh8',// 27
            'https://ipfs.filebase.io/ipfs/QmUdy6PsMoZSu1uzZcpYxnxL69TFt4BGBccpvAa3BuAb8T',// 28
            'https://ipfs.filebase.io/ipfs/QmYEzWfvTU38Byb2AQ1m8uSgtmzmtyvtWw57xvhnhfVscx',// 29
            'https://ipfs.filebase.io/ipfs/QmVWgpZbywmVMHU2ZspbQZ4iaPwx1mDeM7rj3Dkwudergo',// 30

            'https://ipfs.filebase.io/ipfs/QmdRmJBphDDGkYypa18KAKH9LnsuZ4tnVFLwSjt7BtUNm4',// 31
            'https://ipfs.filebase.io/ipfs/QmPPDDf17ua6NK3n2tcq3Q7ztgdHJ5SQSLppEjSNAA2DWv',// 32
            'https://ipfs.filebase.io/ipfs/QmQvXd6xCWEPDjLpKw921y3gmjTdvBSBeUYNyB3V15oAWV',// 33
            'https://ipfs.filebase.io/ipfs/QmYFFdNVHZrQqVi46PpF6gujkZhYBBHhetvd8dYLjVKqgw',// 34
            'https://ipfs.filebase.io/ipfs/QmPVAYfuyPrfo6rguGs9XmukqJU4Yevd1JxR861VqgWsR3',// 35
            'https://ipfs.filebase.io/ipfs/QmRtdvQieQ4HPpiRzWgGpcLRfotoAiypywcn2w2HaaVNEV',// 36
            'https://ipfs.filebase.io/ipfs/QmVKL2WZk75GmNa6X3FwHdEABRBGYJomuUovGUj4sEJzML',// 37
            'https://ipfs.filebase.io/ipfs/QmTzxPZGgRc28Xsb6dR6q1DeFGU3xL6UfLmbN9SgxUrq4C',// 38
            'https://ipfs.filebase.io/ipfs/QmWwYwfKu6reagPimi7sSe9CUv5K3wX3VNzp5yg8inAiSs',// 39
            'https://ipfs.filebase.io/ipfs/QmfTQXqTzoXvwdFkpyptTqVnevuuQhgXptu1QkMhyDjoAv',// 40

            'https://ipfs.filebase.io/ipfs/QmYQgzZSegRrTBDUxmfQbV6YKuEqqT3u6x1fbHoohK8tVz',// 41
            'https://ipfs.filebase.io/ipfs/QmVvo4d6WtKSJBPh5zBhHnJbhyD5NgTdKFiWR37qvaS7by',// 42
            'https://ipfs.filebase.io/ipfs/Qmc2g3CtqXUQGaYq6SjVASuDDTQNp1HhDDFytuQtuAGpmD',// 43
            'https://ipfs.filebase.io/ipfs/QmapkJ7iUrREKXkNLocUx2rTRbDYyHG2z8MjpBPdgL6XHm',// 44
            'https://ipfs.filebase.io/ipfs/QmZznRzpP1PGxuAzegVYD4ZEsmL48suUzSgGJ4pzmuod8f',// 45
            'https://ipfs.filebase.io/ipfs/QmQdBNSutnniFzRFk68wwQCmq9AbPFWYUQBYJv7dMWCpQ7',// 46
            'https://ipfs.filebase.io/ipfs/QmWqyEFPrYTVjCQcHeQScXcnMVPLrTQ8w1AVwWiNrhm7QF',// 47
            'https://ipfs.filebase.io/ipfs/QmQdqxjwPbThtQeVkjXY9g9qhVv4U9iLucp3Vy4EneeHG3',// 48
            'https://ipfs.filebase.io/ipfs/QmY5ueFTmWdUxQtv7CqWmaki2QKEdWpfr4cVUZvbpbcfL3',// 49
            'https://ipfs.filebase.io/ipfs/QmS5w49aaoMSx1KYzZK27UsAS5faZNQxQSRJpt59oSikSx',// 50

            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/51.json", // 51
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/52.json", // 52
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/53.json", // 53
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/54.json", // 54
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/55.json", // 55
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/56.json", // 56
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/57.json", // 57
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/58.json", // 58
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/59.json", // 59
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/60.json", // 60
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/61.json", // 61
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/62.json", // 62
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/63.json", // 63
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/64.json", // 64
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/65.json", // 65
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/66.json", // 66
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/67.json", // 67
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/68.json", // 68
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/69.json", // 69
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/70.json", // 70
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/71.json", // 71
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/72.json", // 72
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/73.json", // 73
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/74.json", // 74
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/75.json", // 75
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/76.json", // 76
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/77.json", // 77
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/78.json", // 78
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/79.json", // 79
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/80.json", // 80
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/81.json", // 81
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/82.json", // 82
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/83.json", // 83
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/84.json", // 84
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/85.json", // 85
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/86.json", // 86
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/87.json", // 87
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/88.json", // 88
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/89.json", // 89
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/90.json", // 90
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/91.json", // 91
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/92.json", // 92
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/93.json", // 93
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/94.json", // 94
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/95.json", // 95
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/96.json", // 96
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/97.json", // 97
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/98.json", // 98
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/99.json", // 99
            "https://ipfs.filebase.io/ipfs/QmQudhVssTGU2WpjZ1b4PeUNDnQkcemudJ4fgHSkyS5uci/100.json", // 100
        ];
        console.log(ipfs[ship_level-2]);

        const cell = beginCell();

        storeUpgradeShip({
            $$type: 'UpgradeShip',
            nft_contract_1: nft_contract_1,
            nft_contract_2: nft_contract_2,
            nft_contract_3: nft_contract_3,
            nft_contract_4: nft_contract_4,
            nft_contract_5: nft_contract_5,
            nft_contract_6: nft_contract_6,
            nft_contract_7: nft_contract_7,
            ship_content: beginCell().storeInt(0x01, 8).storeStringRefTail(ipfs[ship_level-2]).endCell(),
            ship_level: BigInt(ship_level),
            signature: beginCell().storeBuffer(signature).endCell().asSlice()
        }) (cell);

        const payload = cell.endCell();

        res.send({
            signature: buf2hex(signature),
            publicKey: buf2hex(publicKey),
            hash: buf2hex(hash),
            body: payload.toBoc().toString('base64')
        })

    } catch (e) {
        sendError(res, e);
    }
}