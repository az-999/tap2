- [Test net](#test-net)
  - [кошелек TON KEEPER](#кошелек-ton-keeper)
  - [Тестовые тоны](#тестовые-тоны)
- [Работа с НФТ](#работа-с-нфт)
  - [Капча](#капча)
  - [Подтверждение оплаты](#подтверждение-оплаты)
  - [Минт](#минт)
  - [Подтверждение минта](#подтверждение-минта)
  - [Структура таблицы `mint_queue`](#структура-таблицы-mint_queue)
  - [Коллекция корбалей (nft\_id=6)](#коллекция-корбалей-nft_id6)
    - [Добавление новых запчастей](#добавление-новых-запчастей)
  - [Метаданные НФТ](#метаданные-нфт)
  - [Метаданные коллекции](#метаданные-коллекции)
  - [Деплой коллекции с кораблями](#деплой-коллекции-с-кораблями)
  - [Ручной минт](#ручной-минт)
  - [Ручной минт ваучера](#ручной-минт-ваучера)
  - [Передача владения коллекцией ваучеров](#передача-владения-коллекцией-ваучеров)
  - [Проверка статуса query\_id](#проверка-статуса-query_id)
  - [Вывод TON из коллекции](#вывод-ton-из-коллекции)
  - [Вывод TON из хайлоад кошелька](#вывод-ton-из-хайлоад-кошелька)
- [Заметки](#заметки)


# Test net

## кошелек TON KEEPER

нужно зайти в настройки, пролистать в самый низ, несколько раз быстро нажать на значок тонкипера, откроется меню, где нужно включить dev mode. Затем нажать добавить кошелек, пролистать в самый низ и выбрать "аккаунт в testnet"

## Тестовые тоны

https://t.me/testgiver_ton_bot



# Работа с НФТ

https://front.test.bumpstore.app/

## Капча

Капча генерируется в контроллере `CaptchaController` в методе `getChallenge`, проверка капчи и наличия сминченых ваучеров происходит в методе `verify`. Так же в методе `verify` создается запись в таблице `user_nfts` для данного пользователя.

## Подтверждение оплаты

После прохождения капчи и получения хэша транзакции вызывается метод `onTxSuccess` в контроллере `NftController`. Этот метод создает запись в таблице `mint_queue`, которая в дальнейшем используется для верификации транзакции, отправленной пользователем. Верификация происходит в кроне `mint`, и происходит в 3 этапа. На первом этапе крон через tonapi.io получает транзакцию по сохраненному хэшу, если транзакция не существует, то проверка повторяется при следующем выполнении крона до тех пор, пока не выйдет время и она будет помечена как транзакция с ошибкой. Если транзакция найдена, то проверяется отправитель и сумма. Если они совпадают, то запись в таблицу `mint_queue` помечается как верифицированная.

## Минт

Второй этап верификации собирает все запросы на минт, у которых была проверена транзакция, затем проверяет, можно ли эти нфт просто перевести с основного кошелька, либо требуется минт и отправляет на основе них запрос к apiton. Запрос содержит следующие данные:

```json
{
    "transfer": [{
        "address": "<nft_address>",
        "nft_id": "<nft_id>",
        "item_id": "<item_id>",
        "dest": "<destination address>"
    }],
    "mint": [{
        "address": "<destination address>",
        "nft_id": "<nft_id>",
        "item_id": "<item_id>"
    }]
}
```

При успешном срабатывании apiton возвращает параметр `query_id`, который записывается в `mint_queue`, а записи помечаются, как сминченые.

## Подтверждение минта

На третьем этапе беруться записи с заполненным параметром `query_id`. Затем у apiton запрашивается статус по `query_id`. Если апи возвращает true - значит минт прошел успешно. Запись помечается как подтвержденная и сохраняется в БД.

## Структура таблицы `mint_queue`

| Поле | Тип | Описание |
| --- | --- | --- |
| id | int | Идентификатор записи |
| tg_id | int | Идентификатор пользователя |
| nft_id | int | Идентификатор нфт (согл. config('app.nft-list')) |
| item_id | int | Идентификатор предмета для nft_id=6 |
| address | string | Адрес пользователя |
| amount | int | Количество |
| txid | string | Транзакция |
| query_id | int | Идентификатор запроса |
| created_at | timestamp | Время создания записи |
| verified_at | timestamp | Время верификации |
| completed_at | timestamp | Время завершения |

## Коллекция корбалей (nft_id=6)

### Добавление новых запчастей

Эта коллекция позволяет минтить отдельные НФТ со своими метаданными. Сами метаданные требуется загрузить в IPFS (например, через https://filebase.io) и получить на них ссылку. Затем нужно в файле `ton/sources/utils/ships.ts` добавить метаданные в поле `items` объекта `shipsConfig` в следующем формате:

```ts
{
    name: "<Название>",
    metadata: "<Ссылка на метаданные>"
}
```

Затем нужно добавить запись в `config/app.php` в поле `nft-list`:

```php
[
    'id' => <Следующий ид>,
    'nft_id' => 6,
    'item_id' => <индекс в ships.ts shipsConfig.items>,
    'name' => "<Название>",
    'price' => <Цена в пойнтах>,
    'comission' => <Комиссия в нанотонах>,
    'image' => "<Ссылка на изображение>",
    'address_base58' => "<Тот же, что у записи с id=6>",
    'address_hex' => "<Тот же, что у записи с id=6>",
    'total_supply' => <То же, что у записи с id=6>,
]
```

После этого с BUMP Store должна появится новая запчасть корабля

## Метаданные НФТ

Файл с метаданными должен иметь следующий формат:

```json
{
  "name": "<Название НФТ>",
  "description": "<Описание НФТ>",
  "image": "<Ссылка на изображение>",
  "project": "MMPro BUMP",
  "attributes": [
    {
      "trait_type": "<Тип характеристики>",
      "value": "<Значение характеристики>"
    },
    {
      "trait_type": "Rarity",
      "value": "Epic"
    }
  ]
}
```

## Метаданные коллекции

Файл с метаданными должен иметь следующий формат:

```json
{
  "name": "<Название>",
  "description": "<Описание>",
  "image": "<Ссылка на изображение>",
  "project": "MMPro BUMP",
  "social_links": [
    "https://t.me/marketmakingpro",
    "https://x.com/MarketmakingX",
    "<Ссылка на другие соц. сети>"
  ]
}
```

## Деплой коллекции с кораблями

1. Нужно подготовить метаданные
2. Прописать ссылки на них в `ton/sources/utils/ships.ts`
3. Выполнить следующие команды:
```bash
cd ton
yarn api_deploy deploy
```
4. Скрипт вернет id транзакции и query_id

## Ручной минт 

```bash
yarn api_deploy ship <id предмета> <адрес получателя> 
```

## Ручной минт ваучера

```bash
yarn api_deploy issue <адрес коллекции> <адрес получателя>
```

## Передача владения коллекцией ваучеров

```bash
yarn api_deploy assign <адрес коллекции> <адрес получателя>
```

## Проверка статуса query_id

```bash
yarn api_deploy check <query_id>
```
docker exec ton yarn cmd trusted EQAAefRSgWhgxV-9QbTaxHw40a4YvehIVpb7Zfl0938qgxSp EQBnTuSO4PdG67MBwtQWaIo1SeHpWgZfuLoWihfxPNM-4CjL 

## Вывод TON из коллекции

docker exec -it tap_ton yarn cmd withdraw-ton <collection_address> <to_address> <value>
docker exec -it tap_ton yarn cmd withdraw-ton EQCwo-MsbrmWaMtB3Pb-egBCo2ZfZtc8vZ-xnOs8B6O-tFOi UQC_WYZ_9yIMfg05y6rJeWrwEmc3tkDkdISa5IDC-ohWpWK2 1.0
docker exec -it tap_ton yarn cmd withdraw-ton EQCliFZPd1xVOmzrN9Hx45SJX_fZd7DZsWQnNB4IMzoPp1f9 UQAhjQeCQ7OPPi3bvP6fqa15Kp6zZQsL-T0j37zpQEs5d89D 1.0

## Вывод TON из хайлоад кошелька

docker exec -it tap_ton yarn cmd withdraw-coins <address> <value>
docker exec -it tap_ton yarn cmd withdraw-coins UQAhjQeCQ7OPPi3bvP6fqa15Kp6zZQsL-T0j37zpQEs5d89D 1.0




# Заметки 

https://front.test.bumpstore.app

INSERT INTO `mint_queue` (`id`, `tg_id`, `nft_id`, `item_id`, `address`, `amount`, `txid`, `query_id`, `created_at`, `verified_at`, `completed_at`, `status`, `error`) VALUES
(1, 122605414, 6, 0, 'UQAYcB3sHH11WWDKxiXczc0BoCm1jFXhYfYYghI9JNlyma-v', 80000000, '91402f797c349223202a91f1cbd2d96e826ae1e4731f170d1ffc6d342203f7fd', 0, '2024-08-14 15:16:45', NULL, NULL, 4, 'Transaction expired'),
(2, 122605414, 6, 0, 'UQAYcB3sHH11WWDKxiXczc0BoCm1jFXhYfYYghI9JNlyma-v', 80000000, 'cd56585f56a252cea71cc97793a4b5acd9279f1fc1dcb3c601fd830868b9aaf9', 0, '2024-08-15 10:31:01', NULL, NULL, 4, 'Transaction expired');

APP_WALLET UQChXxSvZzoGQ_5w-ncaT3Zm6x6P4LDOTa6w1WSS9AWP1BMy

[
0 => 'EQBw7oaPNVLWIpyjGBq1spzHDWQrlcRVUX95ae-0Disi933v'
1 => 'EQDO0n6fh_UQclnunwAcY9HFadRclodjpbI1Ahn3dwbLu2pr'
2 => 'EQBANEBQkytQvLmE8KwAYBMKB4Xh9__0zjvwQGGalAL3mmme'
3 => 'EQA63xlgeLkx0z8EIYdWS3UEpv-gB2pX4zU-8fF4E_7fEVeO'
4 => 'EQDn5MfCrf8sq-YpVp_Ib8P43Fdsv2G9Z6D177rcG0CdIc8-'
5 => 'EQA_IEh5SSNBzSI1bw4rKOAuKnrU9ptXWknF6xfx5CaM_MYE'
6 => 'EQAqeJTW5TMeF8cAdMPFRenUFwaP0ahIYnYa3W22lkwAtsYu'
7 => 'EQC38uGCbTxQTysN2iVfM9Corqlv0N2NUrn0l18ORPHCro_l'
8 => 'EQAo2y5AdM7NGZ9uIAmiW34HLGK_pNkrzG8LzWEG9AG9aMIZ'
]

docker exec -it php-fpm php artisan mint
docker exec -it ton sh
docker logs ton


https://ton.org/address/

docker cp .env ton:/application/.env
docker stop ton
docker start ton


Address:  UQDSni3H4D2iR7ZNU7nxWNm0vLFAAyw7XRD9eEnbM2CElNwB Testnet:  false
Calculated new contract address:  UQALx4-mamibiA7JKNWO1rhKkBcAfrOh9nf1J0PNTf0NaRKm

Коллекция 6 EQBticnEm95s-xF0IAZ--qbQb3OYVfdmfTIl0HrUCXHF7Tzz 
адрес получателя UQALx4-mamibiA7JKNWO1rhKkBcAfrOh9nf1J0PNTf0NaRKm




`UQA1ncIYvWqZ8Lba4diqFqbZ5hY0OL2QnkE3tIULrmFnELz2` wallet highload

f6e7dce303bb04802e1ce8e57927ba5e54120d23b025209ff0c553ef350dd5ef
2fae9db4e7cab83262d0244e2262d41435ad905b0a630d90d5cb96e18d940f9e



ships - запчасти - коллекция
module - Запчасти - NFT

voucher - NFT ваучера
voucher_collection - NFT ваучера коллекции

# От Димы скрипты

`yarn cmd highload` - создает кошелек
`yarn cmd assign/assign-hw <address> <new-owner>` - меняет овнера у коллекции
`yarn cmd trusted/trusted-nft <address> <trusted address>` - меняет доверенный адрес (сборка кораблей) у деталей
`yarn cmd set-second-minter-new <address> <minter>` - прописывает адрес стейкинга, чтобы он мог выпускать НФТ


# Вывести MMPRO

yarn cmd special EQDkV771tW2vVqGyio9jEfhKpvzbfAiRGUyfnO-ISEZQ8Muy EQDkV771tW2vVqGyio9jEfhKpvzbfAiRGUyfnO-ISEZQ8Muy UQAhjQeCQ7OPPi3bvP6fqa15Kp6zZQsL-T0j37zpQEs5d89D 1.0
нужно закинуть тоны 0,5 TON с хайлода

EQDkV771tW2vVqGyio9jEfhKpvzbfAiRGUyfnO-ISEZQ8Muy - адрес где лежат токены MMPRO