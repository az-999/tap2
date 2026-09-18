# Маркетплейс НФТ - основной контракт

Через этот контракт НФТ выставляются на продажу. Производится выставление следующим образом:

- На смарт-контракт НФТ отправляется сообщение с командой сменить владельца на адрес маркетплейса. При этом НФТ отправляет маркетплейсу сообщение с кодом `ownership_assigned`
- Маркетплейс получает это сообщение, а вместе с ним параметры сейла, после чего производит деплой сейла в блокчейне с переданными параметрами. При этом вычисляется адрес этого сейла и нфт отправляется сообщение на смену владельца на адрес сейла
- Сейл получает сообщение с кодом `ownership_assigned` и производит инициализацию.

После этого нфт считается выставленной на продажу. Сам код находится в deployer.fc в строчках 26-69.

Параметры сейла записываются в `forward_payload` сообщения о смене владельца, которое передается нфт. Соответственно и `forward_amount` ненулевым. 

Вот код для сборки сообщения для выставления на сейл:

```js

  const saleInit = buildNftFixPriceSaleV3R3StateInit({
      createdAt: Math.floor(Date.now() / 1000),
      fullPrice: price,
      marketplaceFee: new BN(0),
      marketplaceAddress: ton.Address.parse(marketplace),
      marketplaceFeeAddress: ton.Address.parse(marketplace),
      nftAddress: ton.Address.parse(data.address),
      royaltyAddress: ton.Address.parse(wallet.address.toString()),
      royaltyAmount: price.mul(new BN(5)).div(new BN(100)),
      nftOwnerAddress: ton.Address.parse(data.owner)
  });

  const putToSale = DeployerLocal.createSaleDeployPayload(saleInit.stateInit, DeployerLocal.createDeployMessage());

  const transfer = beginCell().store(storeTransfer({
      forward_amount: toNano(0.2),
      new_owner: Address.parse(marketplace),
      forward_payload: Cell.fromBoc(putToSale.toBoc())[0],
      query_id: BigInt(0),
      custom_payload: null,
      $$type: 'Transfer',
      response_destination: Address.parse(data.owner),
  })).endCell();

```

Так же через него можно отправлять команды сейлам, относящимся к этому маркетплейсу при помощи опкода 555.

Сборка таких сообщений происходит следующим образом:

```js

const withdrawMessageCell = makeWithdrawMessage(saleAddress, wallet.address.toString(), '1.0');
const withdrawMessage = new ton.InternalMessage({
    body: new ton.CommonMessageInfo({
        body: new ton.CellMessage(ton.Cell.fromBoc(withdrawMessageCell.toBoc())[0]),
    }),
    value: ton.toNano(0.1),
    bounce: true,
    to: ton.Address.parse(saleAddress),
})

const proxyMessageCell = DeployerLocal.proxyMessage(withdrawMessage, 3);
const proxyMessage = new ton.InternalMessage({
    body: new ton.CommonMessageInfo({
        body: new ton.CellMessage(proxyMessageCell),
    }),
    value: ton.toNano(0.1),
    bounce: true,
    to: ton.Address.parse(marketAddress),
})

const cell = new ton.Cell();
proxyMessage.writeTo(cell);

await walletSender.send({
    to: Address.parse(marketAddress),
    value: toNano(0.1),
    body: Cell.fromBoc(proxyMessageCell.toBoc())[0],
})
```

# Коды ошибок

2: Stack undeflow
3: Stack overflow
4: Integer overflow
5: Integer out of expected range
6: Invalid opcode
7: Type check error
8: Cell overflow
9: Cell underflow
10: Dictionary error
13: Out of gas error
32: Method ID not found
34: Action is invalid or not supported
37: Not enough TON
38: Not enough extra-currencies
128: Null reference exception
129: Invalid serialization prefix
130: Invalid incoming message
131: Constraints error
132: Access denied
133: Contract stopped
134: Invalid argument
135: Code of a contract was not found
136: Invalid address
137: Masterchain support is not enabled for this contract
404: Invalid sub_op
403: Invalid sender