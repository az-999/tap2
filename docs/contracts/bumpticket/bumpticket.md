# BumpTicket - смарт-контракт

## Хранимые данные

Смарт-контракт хранит следующие данные:

* `owner_address` - адрес владельца контракта
* `owner_pubkey` - публичный ключ владельца контракта
* `referal_address` - адрес, на котором собираются средства для реферальной программы
* `prize_address` - адрес, на котором собираются средства для призового фонда
* `main_address` - адрес, с которого TON будет заливаться в ликвидность
* `value` - стоимость BumpTicket
* `refDivider` - процент на реферальную программу
* `prizeDivider` - процент на призовый фонд

Формула для вычисления процента в `refDivider` и `prizeDivider`:

```math
\begin{aligned}
refValue &= \frac{refDivider.numerator * value}{refDivider.denominator} \\
prizeValue &= \frac{prizeDivider.numerator * value}{prizeDivider.denominator}
\end{aligned}
```

Стандартные параметры (10%):

- refDivider.numerator = 1
- refDivider.denominator = 10
- prizeDivider.numerator = 1
- prizeDivider.denominator = 10

## Механика работы

Для срабатывания смарт-контракта требуется отправить сообщение типа `Deposit`, где указать:

- query_id - случайно генерируемое значение
- value - стоимость BumpTicket
- signature - подпись

Получение подписи происходит по следующему алгоритму:

```ts
const data = beginCell()
    .storeUint(query_id, 32)
    .storeUint(value, 256)
    .endCell().hash();

const signature = sign(data, owner_privkey);
```

После получения сообщения смарт-контракт верифицирует подпись и раскидает TON по трем кошелькам:

```math
\begin{aligned}
refValue &= \frac{refDivider.numerator * value}{refDivider.denominator} \\
prizeValue &= \frac{prizeDivider.numerator * value}{prizeDivider.denominator}
mainValue &= value - refValue - prizeValue
\end{aligned}
```

## GET-функции

- getMainAddress - возвращает адрес, с которого TON будет заливаться в ликвидность
- getPrizeAddress - возвращает адрес, на котором собираются средства для призового фонда
- getReferalAddress - возвращает адрес, на котором собираются средства для реферальной программы
- getValue - возвращает стоимость BumpTicket
- getRefDivider - возвращает процент на реферальную программу
- getPrizeDivider - возвращает процент на призовый фонд

## Дополнительные функции

- TransferOwnership(0x6b58f3fd){query_id:uint64,new_owner:address} - меняет владельца контракта
- ProxyMsg(0xd2804033){to:address,value:coins,body:^cell} - отправляет сообщение от имени смарт-контракта
- SetMainAddress(0x9715ed31){query_id:uint64,main_address:address} - меняет адрес, с которого TON будет заливаться в ликвидность
- SetPrizeAddress(0x354fb17d){query_id:uint64,prize_address:address} - меняет адрес, на котором собираются средства для призового фонда
- SetReferalAddress(0x49798b39){query_id:uint64,referal_address:address} - меняет адрес, на котором собираются средства для реферальной программы
- UpdateValue(0x5265bdc6){query_id:uint64,new_value:coins} - меняет стоимость BumpTicket
- UpdatePublicKey(0x5f4f68d6){query_id:uint64,new_public_key:pubkey} - меняет публичный ключ владельца контракта
- SetDividors(0xf8af42f9){query_id:uint64,ref_divider:Divider,prize_divider:Divider} - меняет проценты на реферальную программу и призовый фонд

## Загрузка в ликвидность на ston.fy

```ts
import { TonClient, toNano } from "@ton/ton";
import { DEX, pTON } from "@ston-fi/sdk";

const USER_WALLET_ADDRESS = ""; // ! replace with your address
const JETTON_0_ADDRESS = "<JETTON_ADDRESS>"; 

const client = new TonClient({
  endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC",
});

const router = client.open(
  DEX.v2_1.Router.create(
    "kQALh-JBBIKK7gr0o4AVf9JZnEsFndqO0qTCyT-D-yBsWk0v" // CPI Router v2.1.0
  )
);

const proxyTon = pTON.v2_1.create(
  "kQACS30DNoUQ7NfApPvzh7eBmSZ9L4ygJ-lkNWtba8TQT-Px" // pTON v2.1.0
);

// deposit 1 TON to the TON/TestRED pool and get at least 1 nano LP token
const txParams = await router.getSingleSideProvideLiquidityTonTxParams({
  userWalletAddress: USER_WALLET_ADDRESS,
  proxyTon,
  sendAmount: toNano("<value TON>"),
  otherTokenAddress: JETTON_0_ADDRESS,
  minLpOut: "1",
  queryId: 12345,
});
```
